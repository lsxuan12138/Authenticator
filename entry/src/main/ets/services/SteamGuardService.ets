import { BusinessError } from '@kit.BasicServicesKit';
import { cryptoFramework } from '@kit.CryptoArchitectureKit';
import { util } from '@kit.ArkTS';
import { SteamSessionService } from './SteamSessionService';
import { SteamHttpHeaders, SteamWebApiClient } from './SteamWebApiClient';
import { SteamTimeService } from './SteamTimeService';

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

/** Steam 移动确认和扫码登录服务；会话与 HTTP 均复用统一底层。 */
export class SteamGuardService {
  /** 返回 Access Token 的 JWT 过期时间；无法读取时返回 0。 */
  static tokenExpiresAt(token: string): number {
    return SteamSessionService.tokenExpiresAt(token);
  }

  /** 为页面生成人类可读的 Access Token 有效期说明。 */
  static tokenStatus(token: string): string {
    return SteamSessionService.tokenStatus(token);
  }

  /** 使用 Refresh Token 更新短期 Access Token。 */
  async refreshAccessToken(steamId: string, refreshToken: string): Promise<string> {
    return (await new SteamSessionService().refresh(steamId, refreshToken, false)).accessToken;
  }

  /** 显式更新会话时允许 Steam 一并轮换 Refresh Token。 */
  async refreshSessionTokens(steamId: string, refreshToken: string): Promise<SteamAccessTokenResult> {
    const result = await new SteamSessionService().refresh(steamId, refreshToken, true);
    return { accessToken: result.accessToken, refreshToken: result.refreshToken };
  }

  /** 快速判断扫码内容是否符合 Steam 登录挑战 URL 格式。 */
  static isQrLoginChallenge(challengeUrl: string): boolean {
    return /^https:\/\/s\.team\/q\/\d+\/\d+(?:\?.*)?$/.test(challengeUrl.trim());
  }

  /** 使用 shared_secret 签名并批准另一台设备展示的 Steam 登录二维码。 */
  async approveQrLogin(steamId: string, refreshToken: string, sharedSecret: Uint8Array,
    challengeUrl: string, persistence: boolean = false): Promise<void> {
    if (!steamId || !refreshToken || sharedSecret.length === 0) {
      throw new Error('当前 Steam Token 缺少扫码登录所需的会话信息');
    }
    const challenge = this.parseQrChallenge(challengeUrl);
    const signature = this.qrSignature(steamId, sharedSecret, challenge);
    const accessToken = await new SteamSessionService().accessToken(steamId, '', refreshToken);
    const data = `steamid=${steamId}&confirm=true&persistence=${persistence ? 1 : 0}` +
      `&version=${challenge.version}&client_id=${challenge.clientId}` +
      `&signature=${encodeURIComponent(signature)}`;
    await SteamWebApiClient.postForm('扫码登录',
      'https://api.steampowered.com/IAuthenticationService/UpdateAuthSessionWithMobileConfirmation/v1/' +
        `?access_token=${encodeURIComponent(accessToken)}`,
      data, { 'Content-Type': 'application/x-www-form-urlencoded' }, true);
  }

  /** 获取 Steam Community 返回的移动确认列表。 */
  async getConfirmations(steamId: string, accessToken: string, refreshToken: string, identitySecret: string,
    deviceId: string): Promise<SteamConfirmation[]> {
    this.validateConfirmationMetadata(steamId, identitySecret, deviceId);
    const usableAccessToken = await new SteamSessionService().accessToken(steamId, accessToken, refreshToken);
    const query = await this.confirmationParameters(steamId, identitySecret, deviceId, 'conf');
    const parsed = await SteamWebApiClient.getJson('移动确认列表',
      `https://steamcommunity.com/mobileconf/getlist?${query}`, this.communityHeaders(steamId, usableAccessToken));
    this.ensureCommunitySuccess(parsed, '获取移动确认列表');
    const source = parsed['conf'];
    if (!Array.isArray(source)) {
      return [];
    }
    const result: SteamConfirmation[] = [];
    for (const raw of source as Object[]) {
      if (typeof raw !== 'object' || raw === null) {
        continue;
      }
      const item = raw as Record<string, Object>;
      const id = this.text(item['id']);
      const nonce = this.text(item['nonce'] ?? item['key']);
      if (!id || !nonce) {
        continue;
      }
      result.push({
        type: Number(item['type'] ?? 0),
        typeName: this.text(item['type_name']),
        id: id,
        creatorId: this.text(item['creator_id']),
        nonce: nonce,
        creationTime: Number(item['creation_time'] ?? 0),
        icon: this.text(item['icon']),
        headline: this.text(item['headline']),
        summary: this.stringArray(item['summary'])
      });
    }
    return result;
  }

  /** 批量接口的单条便捷包装。 */
  async respondToConfirmation(steamId: string, accessToken: string, refreshToken: string,
    identitySecret: string, deviceId: string, confirmation: SteamConfirmation, approve: boolean): Promise<void> {
    await this.respondToConfirmations(steamId, accessToken, refreshToken, identitySecret, deviceId,
      [confirmation], approve);
  }

  /** 使用 multiajaxop 原生的 cid[]/ck[] 参数批量批准或拒绝。 */
  async respondToConfirmations(steamId: string, accessToken: string, refreshToken: string,
    identitySecret: string, deviceId: string, confirmations: SteamConfirmation[], approve: boolean): Promise<void> {
    this.validateConfirmationMetadata(steamId, identitySecret, deviceId);
    if (confirmations.length === 0) {
      throw new Error('没有可处理的 Steam 确认');
    }
    const usableAccessToken = await new SteamSessionService().accessToken(steamId, accessToken, refreshToken);
    const operation = approve ? 'allow' : 'cancel';
    // 列表签名使用 conf；实际操作必须使用 allow/cancel，否则 Steam 会以 HTTP 200 返回业务失败。
    let data = `${await this.confirmationParameters(
      steamId, identitySecret, deviceId, operation)}&op=${operation}`;
    for (const confirmation of confirmations) {
      if (!confirmation.id || !confirmation.nonce) {
        throw new Error('Steam 确认条目缺少 ID 或 Nonce');
      }
      data += `&cid[]=${encodeURIComponent(confirmation.id)}&ck[]=${encodeURIComponent(confirmation.nonce)}`;
    }
    const parsed = await SteamWebApiClient.postFormJson('移动确认操作',
      'https://steamcommunity.com/mobileconf/multiajaxop', data, {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': this.sessionCookie(steamId, usableAccessToken)
      });
    this.ensureCommunitySuccess(parsed, approve ? '批准移动确认' : '拒绝移动确认');
  }

  /** 校验移动确认签名所依赖的三项本地元信息。 */
  private validateConfirmationMetadata(steamId: string, identitySecret: string, deviceId: string): void {
    if (!steamId || !identitySecret || !deviceId) {
      throw new Error('Steam 确认需要 Steam ID、Identity Secret 和 Device ID');
    }
  }

  /** 生成 Steam Community 移动确认接口共享的查询参数。 */
  private async confirmationParameters(steamId: string, identitySecret: string,
    deviceId: string, tag: string): Promise<string> {
    const time = await SteamTimeService.now();
    const key = this.confirmationKey(identitySecret, time, tag);
    return `p=${encodeURIComponent(deviceId)}&a=${steamId}&k=${encodeURIComponent(key)}` +
      `&t=${time}&m=react&tag=${tag}`;
  }

  /** 构造移动端身份 Cookie 和请求头。 */
  private communityHeaders(steamId: string, accessToken: string): SteamHttpHeaders {
    return {
      'Cookie': this.sessionCookie(steamId, accessToken),
      'Accept': 'application/json',
      'X-Requested-With': 'com.valvesoftware.android.steam.community'
    };
  }

  /** 生成 Steam Community 识别登录会话的 Cookie。 */
  private sessionCookie(steamId: string, accessToken: string): string {
    return `dob=;steamid=${steamId};steamLoginSecure=${steamId}||${accessToken}`;
  }

  /** 解释 Community JSON 中的 success、needauth 和错误说明。 */
  private ensureCommunitySuccess(parsed: Record<string, Object>, action: string): void {
    if (parsed['success'] === true) {
      return;
    }
    const needAuth = this.text(parsed['needauth'] ?? parsed['needAuth']);
    const fallback = needAuth === 'true' ? 'Steam 会话需要重新认证' : 'Steam 未提供错误信息';
    const message = this.text(parsed['message'] ?? parsed['detail']) || fallback;
    throw new Error(`Steam ${action}失败：${message}`);
  }

  /** 按移动确认协议生成 time+tag 的 HMAC-SHA1 签名。 */
  private confirmationKey(secret: string, time: number, tag: string): string {
    try {
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

  /** 按 Steam 移动端协议签名 QR 挑战的 version、clientId 和 steamId。 */
  private qrSignature(steamId: string, sharedSecret: Uint8Array, challenge: SteamQrChallenge): string {
    try {
      const version = BigInt(challenge.version);
      const clientId = BigInt(challenge.clientId);
      const accountId = BigInt(steamId);
      if (version < 0n || version > 65535n || clientId < 0n || clientId > 18446744073709551615n ||
        accountId < 0n || accountId > 18446744073709551615n) {
        throw new Error('二维码数值超出 Steam 协议范围');
      }
      const key = cryptoFramework.createSymKeyGenerator('HMAC').convertKeySync({ data: sharedSecret });
      const mac = cryptoFramework.createMac('SHA256');
      mac.initSync(key);
      mac.updateSync({ data: this.littleEndian(version, 2) });
      mac.updateSync({ data: this.littleEndian(clientId, 8) });
      mac.updateSync({ data: this.littleEndian(accountId, 8) });
      return new util.Base64Helper().encodeToStringSync(mac.doFinalSync().data, util.Type.BASIC);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`生成 Steam 扫码登录签名失败：${detail.message ?? '二维码或密钥无效'}`);
    }
  }

  /** 从短链接中提取并保留无精度损失的 QR 数值字段。 */
  private parseQrChallenge(challengeUrl: string): SteamQrChallenge {
    const match = /^https:\/\/s\.team\/q\/(\d+)\/(\d+)(?:\?.*)?$/.exec(challengeUrl.trim());
    if (!match || match.length < 3) {
      throw new Error('这不是有效的 Steam 登录二维码');
    }
    return { version: match[1], clientId: match[2] };
  }

  /** 把无符号整数序列化为 QR 签名要求的小端定长字节。 */
  private littleEndian(value: bigint, count: number): Uint8Array {
    const bytes = new Uint8Array(count);
    let current = value;
    for (let index = 0; index < count; index++) {
      bytes[index] = Number(current & 255n);
      current >>= 8n;
    }
    return bytes;
  }

  /** 仅接受 JSON 标量，避免把对象隐式转成无意义文本。 */
  private text(value: Object | null | undefined): string {
    return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' ? `${value}` : '';
  }

  /** 将 Community 的 summary 数组安全收敛为非空字符串数组。 */
  private stringArray(value: Object | null | undefined): string[] {
    if (!Array.isArray(value)) {
      return [];
    }
    const result: string[] = [];
    for (const item of value as Object[]) {
      const text = this.text(item);
      if (text.length > 0) {
        result.push(text);
      }
    }
    return result;
  }
}
