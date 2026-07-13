import { cryptoFramework } from '@kit.CryptoArchitectureKit';
import { http } from '@kit.NetworkKit';
import { util } from '@kit.ArkTS';
import { BusinessError } from '@kit.BasicServicesKit';
import { hilog } from '@kit.PerformanceAnalysisKit';

const LOG_DOMAIN: number = 0xD002;
const LOG_TAG: string = 'SteamGuardService';

export interface SteamConfirmation {
  type: number;
  typeName: string;
  id: string;
  creatorId: string;
  nonce: string;
  creationTime: number;
  icon: string;
  headline: string;
  summary: string[];
}

interface SteamQrChallenge {
  version: string;
  clientId: string;
}

/**
 * Steam Guard 联网服务。
 * 请求参数、确认密钥和扫码签名与 Steam 移动端协议保持一致；服务层不主动保存数据，
 * 由页面在请求成功后决定是否更新 Token，避免一次网络调用产生隐式持久化副作用。
 */
export class SteamGuardService {
  private static readonly REQUEST_TIMEOUT: number = 15000;

  static tokenExpiresAt(token: string): number {
    // JWT payload 只用于展示有效期，不作为令牌真实性校验手段。
    try {
      const parts = token.split('.');
      if (parts.length < 2) return 0;
      const bytes = new util.Base64Helper().decodeSync(parts[1], util.Type.BASIC_URL_SAFE);
      const payload = JSON.parse(new util.TextDecoder().decodeToString(bytes)) as Record<string, Object>;
      return Number(payload['exp'] ?? 0) * 1000;
    } catch (_) {
      return 0;
    }
  }

  static tokenStatus(token: string): string {
    const expiresAt = SteamGuardService.tokenExpiresAt(token);
    if (expiresAt === 0) return token.length > 0 ? '无法读取有效期' : '未配置';
    const remaining = expiresAt - Date.now();
    if (remaining <= 0) return `已于 ${new Date(expiresAt).toLocaleString()} 过期`;
    const hours = Math.floor(remaining / 3600000);
    const days = Math.floor(hours / 24);
    return `有效至 ${new Date(expiresAt).toLocaleString()}（约 ${days > 0 ? `${days} 天` : `${hours} 小时`}）`;
  }

  async refreshAccessToken(steamId: string, refreshToken: string): Promise<string> {
    if (!steamId || !refreshToken) throw new Error('缺少 Steam ID 或 Refresh Token');
    return this.generateAccessToken(steamId, refreshToken);
  }

  static isQrLoginChallenge(challengeUrl: string): boolean {
    return /^https:\/\/s\.team\/q\/\d+\/\d+(?:\?.*)?$/.test(challengeUrl.trim());
  }

  async approveQrLogin(steamId: string, refreshToken: string, sharedSecret: Uint8Array,
    challengeUrl: string, persistence: boolean = false): Promise<void> {
    if (!steamId || !refreshToken || sharedSecret.length === 0) {
      throw new Error('当前 Steam Token 缺少扫码登录所需的会话信息');
    }
    // Steam 对 version、clientId、steamId 组成的二进制消息做 HMAC-SHA256；数值采用小端序。
    const challenge = this.parseQrChallenge(challengeUrl);
    const key = cryptoFramework.createSymKeyGenerator('HMAC').convertKeySync({ data: sharedSecret });
    const mac = cryptoFramework.createMac('SHA256');
    mac.initSync(key);
    mac.updateSync({ data: this.littleEndian(BigInt(challenge.version), 2) });
    mac.updateSync({ data: this.littleEndian(BigInt(challenge.clientId), 8) });
    mac.updateSync({ data: this.littleEndian(BigInt(steamId), 8) });
    const signature = new util.Base64Helper().encodeToStringSync(mac.doFinalSync().data, util.Type.BASIC);
    const accessToken = await this.generateAccessToken(steamId, refreshToken);
    const data = `steamid=${steamId}&confirm=true&persistence=${persistence ? 1 : 0}` +
      `&version=${challenge.version}&client_id=${challenge.clientId}&signature=${encodeURIComponent(signature)}`;
    const request = http.createHttp();
    try {
      hilog.info(LOG_DOMAIN, LOG_TAG, 'Approving Steam QR login, client=%{public}s', challenge.clientId);
      const response = await request.request(
        `https://api.steampowered.com/IAuthenticationService/UpdateAuthSessionWithMobileConfirmation/v1/` +
        `?access_token=${encodeURIComponent(accessToken)}`, {
          method: http.RequestMethod.POST,
          header: { 'Content-Type': 'application/x-www-form-urlencoded' },
          extraData: data,
          expectDataType: http.HttpDataType.STRING,
          connectTimeout: SteamGuardService.REQUEST_TIMEOUT,
          readTimeout: SteamGuardService.REQUEST_TIMEOUT
        });
      const eResult = `${response.header['x-eresult'] ?? ''}`;
      hilog.info(LOG_DOMAIN, LOG_TAG, 'Steam QR login HTTP status: %{public}d, EResult: %{public}s',
        response.responseCode, eResult || 'missing');
      if (response.responseCode < 200 || response.responseCode >= 300) {
        throw new Error(`Steam 扫码登录请求失败（HTTP ${response.responseCode}）`);
      }
      if (eResult.length > 0 && eResult !== '1') throw new Error(`Steam 拒绝扫码登录（EResult ${eResult}）`);
    } catch (error) {
      const detail = error as BusinessError;
      const message = detail.message ?? `${error}`;
      hilog.error(LOG_DOMAIN, LOG_TAG, 'Steam QR login failed, code=%{public}s, message=%{public}s',
        detail.code !== undefined ? `${detail.code}` : 'unknown', message);
      if (message.startsWith('Steam ')) throw new Error(message);
      throw new Error(`Steam 扫码登录网络异常：${message}`);
    } finally {
      request.destroy();
    }
  }

  async getConfirmations(steamId: string, accessToken: string, refreshToken: string, identitySecret: string,
    deviceId: string): Promise<SteamConfirmation[]> {
    const time = Math.floor(Date.now() / 1000);
    const tag = 'conf';
    const key = this.confirmationKey(identitySecret, time, tag);
    const query = `p=${encodeURIComponent(deviceId)}&a=${steamId}&k=${encodeURIComponent(key)}` +
      `&t=${time}&m=react&tag=${tag}`;
    // 有 Refresh Token 时换取新的短期 Access Token，降低已保存 Access Token 过期造成的失败。
    const usableAccessToken = refreshToken.length > 0 ? await this.generateAccessToken(steamId, refreshToken) : accessToken;
    if (usableAccessToken.length === 0) throw new Error('Steam 会话缺少 Access Token 或 Refresh Token');
    const request = http.createHttp();
    try {
      hilog.info(LOG_DOMAIN, LOG_TAG, 'Requesting Steam mobile confirmations');
      const response = await request.request(`https://steamcommunity.com/mobileconf/getlist?${query}`, {
        method: http.RequestMethod.GET,
        header: { 'Cookie': `dob=;steamid=${steamId};steamLoginSecure=${steamId}||${usableAccessToken}`,
          'Accept': 'application/json',
          'X-Requested-With': 'com.valvesoftware.android.steam.community' },
        connectTimeout: SteamGuardService.REQUEST_TIMEOUT,
        readTimeout: SteamGuardService.REQUEST_TIMEOUT
      });
      hilog.info(LOG_DOMAIN, LOG_TAG, 'Steam response HTTP status: %{public}d', response.responseCode);
      const body = typeof response.result === 'string' ? response.result : '{}';
      let parsed: Record<string, Object>;
      try {
        parsed = JSON.parse(body) as Record<string, Object>;
      } catch (_) {
        hilog.error(LOG_DOMAIN, LOG_TAG, 'Steam response is not JSON, body length: %{public}d', body.length);
        throw new Error(`Steam 返回了无法解析的数据（HTTP ${response.responseCode}）`);
      }
      if (parsed['success'] !== true) {
        const needAuth = `${parsed['needauth'] ?? parsed['needAuth'] ?? 'unknown'}`;
        const steamMessage = `${parsed['message'] ?? parsed['detail'] ??
          (needAuth === 'true' ? 'Steam 会话需要重新认证' : '未提供错误信息')}`;
        hilog.error(LOG_DOMAIN, LOG_TAG, 'Steam rejected request, success=false, needauth=%{public}s, message=%{public}s',
          needAuth, steamMessage);
        throw new Error(`Steam 请求失败（HTTP ${response.responseCode}）：${steamMessage}`);
      }
      const confirmations = (parsed['conf'] ?? []) as Array<Record<string, Object>>;
      const result: SteamConfirmation[] = [];
      for (const item of confirmations) {
        const confirmation: SteamConfirmation = {
          type: Number(item['type'] ?? 0),
          typeName: `${item['type_name'] ?? ''}`,
          id: `${item['id'] ?? ''}`,
          creatorId: `${item['creator_id'] ?? ''}`,
          nonce: `${item['nonce'] ?? item['key'] ?? ''}`,
          creationTime: Number(item['creation_time'] ?? 0),
          icon: `${item['icon'] ?? ''}`,
          headline: `${item['headline'] ?? ''}`,
          summary: (item['summary'] ?? []) as string[]
        };
        result.push(confirmation);
      }
      hilog.info(LOG_DOMAIN, LOG_TAG, 'Steam confirmations received: %{public}d', result.length);
      return result;
    } catch (error) {
      const businessError = error as BusinessError;
      const code = businessError.code !== undefined ? `${businessError.code}` : 'unknown';
      const message = businessError.message ?? `${error}`;
      hilog.error(LOG_DOMAIN, LOG_TAG, 'Steam request exception, code=%{public}s, message=%{public}s', code, message);
      if (message.startsWith('Steam ')) throw new Error(message);
      throw new Error(`Steam 网络请求异常（code: ${code}）：${message}`);
    } finally {
      request.destroy();
    }
  }

  async respondToConfirmation(steamId: string, accessToken: string, refreshToken: string,
    identitySecret: string, deviceId: string, confirmation: SteamConfirmation, approve: boolean): Promise<void> {
    const time = Math.floor(Date.now() / 1000);
    const tag = 'conf';
    const key = this.confirmationKey(identitySecret, time, tag);
    const operation = approve ? 'allow' : 'cancel';
    const data = `p=${encodeURIComponent(deviceId)}&a=${steamId}&t=${time}&m=react&tag=${tag}` +
      `&k=${encodeURIComponent(key)}&op=${operation}&cid[]=${encodeURIComponent(confirmation.id)}` +
      `&ck[]=${encodeURIComponent(confirmation.nonce)}`;
    // allow/cancel 共用协议，调用方仅通过操作参数区分确认或拒绝。
    const usableAccessToken = refreshToken.length > 0 ? await this.generateAccessToken(steamId, refreshToken) : accessToken;
    if (usableAccessToken.length === 0) throw new Error('Steam 会话缺少 Access Token 或 Refresh Token');
    const request = http.createHttp();
    try {
      hilog.info(LOG_DOMAIN, LOG_TAG, 'Submitting Steam confirmation operation: %{public}s', operation);
      const response = await request.request(`https://steamcommunity.com/mobileconf/multiajaxop?${data}`, {
        method: http.RequestMethod.POST,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': `dob=;steamid=${steamId};steamLoginSecure=${steamId}||${usableAccessToken}`
        },
        extraData: data,
        expectDataType: http.HttpDataType.STRING,
        connectTimeout: SteamGuardService.REQUEST_TIMEOUT,
        readTimeout: SteamGuardService.REQUEST_TIMEOUT
      });
      hilog.info(LOG_DOMAIN, LOG_TAG, 'Confirmation operation HTTP status: %{public}d', response.responseCode);
      const body = typeof response.result === 'string' ? response.result : '{}';
      const parsed = JSON.parse(body) as Record<string, Object>;
      if (parsed['success'] !== true) {
        const message = `${parsed['message'] ?? 'Steam 未接受该确认操作'}`;
        throw new Error(`${message}（HTTP ${response.responseCode}）`);
      }
    } catch (error) {
      const detail = error as BusinessError;
      hilog.error(LOG_DOMAIN, LOG_TAG, 'Confirmation operation failed, code=%{public}s, message=%{public}s',
        detail.code !== undefined ? `${detail.code}` : 'unknown', detail.message ?? `${error}`);
      throw new Error(`Steam 确认操作失败：${detail.message ?? error}`);
    } finally {
      request.destroy();
    }
  }

  private async generateAccessToken(steamId: string, refreshToken: string): Promise<string> {
    // Refresh Token 用于换取短期 Access Token；两者用途不同，不能互相替代。
    hilog.info(LOG_DOMAIN, LOG_TAG, 'Refreshing Steam access token');
    const request = http.createHttp();
    try {
      const response = await request.request(
        'https://api.steampowered.com/IAuthenticationService/GenerateAccessTokenForApp/v1/', {
          method: http.RequestMethod.POST,
          header: { 'Content-Type': 'application/x-www-form-urlencoded' },
          extraData: `refresh_token=${encodeURIComponent(refreshToken)}&steamid=${steamId}&renewal_type=0`,
          expectDataType: http.HttpDataType.STRING,
          connectTimeout: SteamGuardService.REQUEST_TIMEOUT,
          readTimeout: SteamGuardService.REQUEST_TIMEOUT
        });
      hilog.info(LOG_DOMAIN, LOG_TAG, 'Access token refresh HTTP status: %{public}d', response.responseCode);
      const body = typeof response.result === 'string' ? response.result : '{}';
      const parsed = JSON.parse(body) as Record<string, Object>;
      const responseObject = (parsed['response'] ?? {}) as Record<string, Object>;
      const token = `${responseObject['access_token'] ?? ''}`;
      if (token.length === 0) throw new Error(`Steam 未返回 Access Token（HTTP ${response.responseCode}）`);
      return token;
    } catch (error) {
      const detail = error as BusinessError;
      hilog.error(LOG_DOMAIN, LOG_TAG, 'Access token refresh failed, code=%{public}s, message=%{public}s',
        detail.code !== undefined ? `${detail.code}` : 'unknown', detail.message ?? `${error}`);
      throw new Error(`Steam Access Token 刷新失败：${detail.message ?? error}`);
    } finally {
      request.destroy();
    }
  }

  private confirmationKey(secret: string, time: number, tag: string): string {
    // 移动确认密钥 = HMAC-SHA1(identitySecret, 8 字节大端 Unix 时间 + ASCII tag)。
    const base64 = new util.Base64Helper();
    const keyData = base64.decodeSync(secret, util.Type.BASIC);
    const tagBytes = new util.TextEncoder().encodeInto(tag);
    const payload = new Uint8Array(8 + Math.min(tagBytes.length, 32));
    let seconds = time;
    for (let index = 7; index >= 0; index--) {
      payload[index] = seconds & 0xff;
      seconds = Math.floor(seconds / 256);
    }
    payload.set(tagBytes.slice(0, 32), 8);
    const key = cryptoFramework.createSymKeyGenerator('HMAC').convertKeySync({ data: keyData });
    const mac = cryptoFramework.createMac('SHA1');
    mac.initSync(key);
    mac.updateSync({ data: payload });
    return base64.encodeToStringSync(mac.doFinalSync().data, util.Type.BASIC);
  }

  private parseQrChallenge(challengeUrl: string): SteamQrChallenge {
    const match = /^https:\/\/s\.team\/q\/(\d+)\/(\d+)(?:\?.*)?$/.exec(challengeUrl.trim());
    if (!match || match.length < 3) throw new Error('这不是有效的 Steam 登录二维码');
    const challenge: SteamQrChallenge = { version: match[1], clientId: match[2] };
    return challenge;
  }

  private littleEndian(value: bigint, count: number): Uint8Array {
    // Steam 扫码登录签名中的整数按小端序写入固定长度缓冲区。
    const bytes = new Uint8Array(count);
    let current = value;
    for (let index = 0; index < count; index++) {
      bytes[index] = Number(current & 255n);
      current >>= 8n;
    }
    return bytes;
  }
}
