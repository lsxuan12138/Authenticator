import { cryptoFramework } from '@kit.CryptoArchitectureKit';
import { http } from '@kit.NetworkKit';
import { util } from '@kit.ArkTS';
import { BusinessError } from '@kit.BasicServicesKit';
import { DiagnosticLogService } from './DiagnosticLogService';
import { SteamResult } from './SteamResult';

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

export interface SteamAccessTokenResult {
  accessToken: string;
  refreshToken: string;
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
      if (parts.length < 2) {
        return 0;
      }
      const bytes = new util.Base64Helper().decodeSync(parts[1], util.Type.BASIC_URL_SAFE);
      const payload = JSON.parse(new util.TextDecoder().decodeToString(bytes)) as Record<string, Object>;
      return Number(payload['exp'] ?? 0) * 1000;
    } catch (_) {
      return 0;
    }
  }

  static tokenStatus(token: string): string {
    const expiresAt = SteamGuardService.tokenExpiresAt(token);
    if (expiresAt === 0) {
      return token.length > 0 ? '无法读取有效期' : '未配置';
    }
    const remaining = expiresAt - Date.now();
    if (remaining <= 0) {
      return `已于 ${new Date(expiresAt).toLocaleString()} 过期`;
    }
    const hours = Math.floor(remaining / 3600000);
    const days = Math.floor(hours / 24);
    return `有效至 ${new Date(expiresAt).toLocaleString()}（约 ${days > 0 ? `${days} 天` : `${hours} 小时`}）`;
  }

  async refreshAccessToken(steamId: string, refreshToken: string): Promise<string> {
    if (!steamId || !refreshToken) {
      throw new Error('缺少 Steam ID 或 Refresh Token');
    }
    return (await this.generateAccessToken(steamId, refreshToken)).accessToken;
  }

  /** 显式会话更新入口；若 Steam 轮换 Refresh Token，调用方可以与 Access Token 原子保存。 */
  async refreshSessionTokens(steamId: string, refreshToken: string): Promise<SteamAccessTokenResult> {
    if (!steamId || !refreshToken) {
      throw new Error('缺少 Steam ID 或 Refresh Token');
    }
    return this.generateAccessToken(steamId, refreshToken, true);
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
    const signature = this.qrSignature(steamId, sharedSecret, challenge);
    const accessToken = (await this.generateAccessToken(steamId, refreshToken)).accessToken;
    const data = `steamid=${steamId}&confirm=true&persistence=${persistence ? 1 : 0}` +
      `&version=${challenge.version}&client_id=${challenge.clientId}&signature=${encodeURIComponent(signature)}`;
    const request = http.createHttp();
    try {
      DiagnosticLogService.info('SteamGuard', 'Approving Steam QR login');
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
      const eResult = this.readEResult(response.header);
      DiagnosticLogService.info('SteamGuard',
        `Steam QR login response: HTTP=${response.responseCode}, EResult=${eResult || 'missing'}`);
      if (response.responseCode < 200 || response.responseCode >= 300) {
        throw new Error(`Steam 扫码登录请求失败（HTTP ${response.responseCode}）`);
      }
      if (eResult.length > 0 && eResult !== '1') {
        throw new Error(SteamResult.message(eResult, 'Steam 拒绝扫码登录'));
      }
    } catch (error) {
      const detail = error as BusinessError;
      const message = detail.message ?? `${error}`;
      DiagnosticLogService.error('SteamGuard',
        `Steam QR login failed: code=${detail.code !== undefined ? detail.code : 'unknown'}, message=${message}`);
      if (message.startsWith('Steam ')) {
        throw new Error(message);
      }
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
    const usableAccessToken =
      refreshToken.length > 0 ? (await this.generateAccessToken(steamId, refreshToken)).accessToken : accessToken;
    if (usableAccessToken.length === 0) {
      throw new Error('Steam 会话缺少 Access Token 或 Refresh Token');
    }
    const request = http.createHttp();
    try {
      DiagnosticLogService.info('SteamGuard', 'Requesting Steam mobile confirmations');
      const response = await request.request(`https://steamcommunity.com/mobileconf/getlist?${query}`, {
        method: http.RequestMethod.GET,
        header: {
          'Cookie': `dob=;steamid=${steamId};steamLoginSecure=${steamId}||${usableAccessToken}`,
          'Accept': 'application/json',
          'X-Requested-With': 'com.valvesoftware.android.steam.community'
        },
        connectTimeout: SteamGuardService.REQUEST_TIMEOUT,
        readTimeout: SteamGuardService.REQUEST_TIMEOUT
      });
      DiagnosticLogService.info('SteamGuard', `Steam confirmations response: HTTP=${response.responseCode}`);
      const body = typeof response.result === 'string' ? response.result : '{}';
      let parsed: Record<string, Object>;
      try {
        parsed = JSON.parse(body) as Record<string, Object>;
      } catch (_) {
        DiagnosticLogService.error('SteamGuard', `Steam response is not JSON, bodyLength=${body.length}`);
        throw new Error(`Steam 返回了无法解析的数据（HTTP ${response.responseCode}）`);
      }
      if (parsed['success'] !== true) {
        const needAuth = `${parsed['needauth'] ?? parsed['needAuth'] ?? 'unknown'}`;
        const steamMessage = `${parsed['message'] ?? parsed['detail'] ??
          (needAuth === 'true' ? 'Steam 会话需要重新认证' : '未提供错误信息')}`;
        DiagnosticLogService.error('SteamGuard',
          `Steam rejected confirmations request: needAuth=${needAuth}, message=${steamMessage}`);
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
      DiagnosticLogService.info('SteamGuard', `Steam confirmations received: count=${result.length}`);
      return result;
    } catch (error) {
      const businessError = error as BusinessError;
      const code = businessError.code !== undefined ? `${businessError.code}` : 'unknown';
      const message = businessError.message ?? `${error}`;
      DiagnosticLogService.error('SteamGuard', `Steam request exception: code=${code}, message=${message}`);
      if (message.startsWith('Steam ')) {
        throw new Error(message);
      }
      throw new Error(`Steam 网络请求异常（code: ${code}）：${message}`);
    } finally {
      request.destroy();
    }
  }

  async respondToConfirmation(steamId: string, accessToken: string, refreshToken: string,
    identitySecret: string, deviceId: string, confirmation: SteamConfirmation, approve: boolean): Promise<void> {
    await this.respondToConfirmations(steamId, accessToken, refreshToken, identitySecret, deviceId,
      [confirmation], approve);
  }

  /** Steam 的 multiajaxop 原生支持重复 cid[]/ck[]，单条与批量操作共用同一协议。 */
  async respondToConfirmations(steamId: string, accessToken: string, refreshToken: string,
    identitySecret: string, deviceId: string, confirmations: SteamConfirmation[], approve: boolean): Promise<void> {
    if (confirmations.length === 0) {
      throw new Error('没有可处理的 Steam 确认');
    }
    const time = Math.floor(Date.now() / 1000);
    const tag = 'conf';
    const key = this.confirmationKey(identitySecret, time, tag);
    const operation = approve ? 'allow' : 'cancel';
    let data = `p=${encodeURIComponent(deviceId)}&a=${steamId}&t=${time}&m=react&tag=${tag}` +
      `&k=${encodeURIComponent(key)}&op=${operation}`;
    for (const confirmation of confirmations) {
      data += `&cid[]=${encodeURIComponent(confirmation.id)}` +
        `&ck[]=${encodeURIComponent(confirmation.nonce)}`;
    }
    // allow/cancel 共用协议，调用方仅通过操作参数区分确认或拒绝。
    const usableAccessToken =
      refreshToken.length > 0 ? (await this.generateAccessToken(steamId, refreshToken)).accessToken : accessToken;
    if (usableAccessToken.length === 0) {
      throw new Error('Steam 会话缺少 Access Token 或 Refresh Token');
    }
    const request = http.createHttp();
    try {
      DiagnosticLogService.info('SteamGuard',
        `Submitting Steam confirmations: operation=${operation}, count=${confirmations.length}`);
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
      DiagnosticLogService.info('SteamGuard', `Steam confirmation response: HTTP=${response.responseCode}`);
      const body = typeof response.result === 'string' ? response.result : '{}';
      const parsed = JSON.parse(body) as Record<string, Object>;
      if (parsed['success'] !== true) {
        const message = `${parsed['message'] ?? 'Steam 未接受该确认操作'}`;
        throw new Error(`${message}（HTTP ${response.responseCode}）`);
      }
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('SteamGuard',
        `Confirmation failed: code=${detail.code !== undefined ? detail.code : 'unknown'}, ` +
          `message=${detail.message ?? error}`);
      throw new Error(`Steam 确认操作失败：${detail.message ?? error}`);
    } finally {
      request.destroy();
    }
  }

  private async generateAccessToken(steamId: string, refreshToken: string,
    allowRenewal: boolean = false): Promise<SteamAccessTokenResult> {
    // allowRenewal 仅用于用户主动更新会话。后台确认请求保持 false，防止 Steam 轮换出
    // 新 Refresh Token 后调用方没有机会持久化，从而使本地仍持有即将失效的旧令牌。
    DiagnosticLogService.info('SteamGuard', 'Refreshing Steam access token');
    const request = http.createHttp();
    try {
      const response = await request.request(
        'https://api.steampowered.com/IAuthenticationService/GenerateAccessTokenForApp/v1/', {
        method: http.RequestMethod.POST,
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        extraData: `refresh_token=${encodeURIComponent(refreshToken)}&steamid=${steamId}` +
          `&renewal_type=${allowRenewal ? 1 : 0}`,
        expectDataType: http.HttpDataType.STRING,
        connectTimeout: SteamGuardService.REQUEST_TIMEOUT,
        readTimeout: SteamGuardService.REQUEST_TIMEOUT
      });
      DiagnosticLogService.info('SteamGuard', `Access Token refresh response: HTTP=${response.responseCode}`);
      const body = typeof response.result === 'string' ? response.result : '{}';
      const parsed = JSON.parse(body) as Record<string, Object>;
      const responseObject = (parsed['response'] ?? {}) as Record<string, Object>;
      const token = `${responseObject['access_token'] ?? ''}`;
      if (token.length === 0) {
        throw new Error(`Steam 未返回 Access Token（HTTP ${response.responseCode}）`);
      }
      return {
        accessToken: token,
        refreshToken: `${responseObject['refresh_token'] ?? ''}`
      };
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('SteamGuard',
        `Access Token refresh failed: code=${detail.code !== undefined ? detail.code : 'unknown'}, ` +
          `message=${detail.message ?? error}`);
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
    try {
      const key = cryptoFramework.createSymKeyGenerator('HMAC').convertKeySync({ data: keyData });
      // eslint-disable-next-line @security/no-unsafe-mac -- Steam 移动确认协议固定使用 HMAC-SHA1。
      const mac = cryptoFramework.createMac('SHA1');
      mac.initSync(key);
      mac.updateSync({ data: payload });
      return base64.encodeToStringSync(mac.doFinalSync().data, util.Type.BASIC);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`生成 Steam 确认密钥失败：${detail.message ?? 'Identity Secret 无效'}`);
    }
  }

  private qrSignature(steamId: string, sharedSecret: Uint8Array, challenge: SteamQrChallenge): string {
    try {
      const key = cryptoFramework.createSymKeyGenerator('HMAC').convertKeySync({ data: sharedSecret });
      const mac = cryptoFramework.createMac('SHA256');
      mac.initSync(key);
      mac.updateSync({ data: this.littleEndian(BigInt(challenge.version), 2) });
      mac.updateSync({ data: this.littleEndian(BigInt(challenge.clientId), 8) });
      mac.updateSync({ data: this.littleEndian(BigInt(steamId), 8) });
      return new util.Base64Helper().encodeToStringSync(mac.doFinalSync().data, util.Type.BASIC);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`生成 Steam 扫码登录签名失败：${detail.message ?? '二维码或密钥无效'}`);
    }
  }

  private readEResult(header: Object): string {
    const headerText: string = JSON.stringify(header);
    const match: RegExpMatchArray | null = headerText.match(/"x-eresult"\s*:\s*"([^"\\]*)"/i);
    return match !== null && match.length > 1 ? match[1] : '';
  }

  private parseQrChallenge(challengeUrl: string): SteamQrChallenge {
    const match = /^https:\/\/s\.team\/q\/(\d+)\/(\d+)(?:\?.*)?$/.exec(challengeUrl.trim());
    if (!match || match.length < 3) {
      throw new Error('这不是有效的 Steam 登录二维码');
    }
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
