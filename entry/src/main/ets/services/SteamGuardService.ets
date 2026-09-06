import { BusinessError } from '@kit.BasicServicesKit';
import { cryptoFramework } from '@kit.CryptoArchitectureKit';
import { util } from '@kit.ArkTS';
import { SteamSessionService } from './SteamSessionService';
import { SteamHttpHeaders, SteamWebApiClient } from './SteamWebApiClient';
import { SteamTimeService } from './SteamTimeService';
import { SteamProtocol, SteamQrSessionInfoData } from './SteamProtocol';
import { DiagnosticLogService } from './DiagnosticLogService';
import { AppError } from '../core/AppError';

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

/** 扫码确认前展示给用户的登录来源信息。 */
export interface SteamQrLoginInfo {
  ip: string;
  location: string;
  deviceName: string;
  persistent: boolean;
  locationMismatch: boolean;
  highUsage: boolean;
  deviceTrust: number;
}

/** Steam 当前账户中可由移动验证器批准或拒绝的登录会话。 */
export interface SteamPendingLogin extends SteamQrLoginInfo {
  clientId: string;
  version: string;
}

/** 待登录请求解析结果；skipped 用于让 UI 区分“没有请求”和“存在但无法解析”。 */
export interface SteamPendingLoginResult {
  items: SteamPendingLogin[];
  skipped: number;
}

/** Steam 移动确认和扫码登录服务；会话与 HTTP 均复用统一底层。 */
export class SteamGuardService {
  /** 快速判断扫码内容是否符合 Steam 登录挑战 URL 格式。 */
  static isQrLoginChallenge(challengeUrl: string): boolean {
    return /^https:\/\/s\.team\/q\/\d+\/\d+(?:\?.*)?$/.test(challengeUrl.trim());
  }

  /** 查询二维码对应的设备、位置、持久性和风险信息，供用户批准前核对。 */
  async getQrLoginInfo(steamId: string, accessToken: string, refreshToken: string,
    challengeUrl: string): Promise<SteamQrLoginInfo> {
    if (!steamId || (!accessToken && !refreshToken)) {
      throw new AppError('steam_error_qr_session_missing', 'Steam token is missing QR sign-in session data');
    }
    const challenge = this.parseQrChallenge(challengeUrl);
    const usableAccessToken = await new SteamSessionService().accessToken(steamId, accessToken, refreshToken);
    const response = await SteamWebApiClient.protobuf('Authentication', 'GetAuthSessionInfo',
      SteamProtocol.encodeQrSessionInfo(challenge.clientId), usableAccessToken);
    return this.qrLoginInfo(SteamProtocol.decodeQrSessionInfo(response));
  }

  /** 使用 shared_secret 签名，按用户选择批准或拒绝另一设备的登录请求。 */
  async respondQrLogin(steamId: string, accessToken: string, refreshToken: string,
    sharedSecret: Uint8Array, challengeUrl: string, approve: boolean, persistent: boolean): Promise<void> {
    if (!steamId || (!accessToken && !refreshToken) || sharedSecret.length === 0) {
      throw new AppError('steam_error_qr_session_missing', 'Steam token is missing QR sign-in session data');
    }
    const challenge = this.parseQrChallenge(challengeUrl);
    await this.respondLoginChallenge(steamId, accessToken, refreshToken, sharedSecret, challenge,
      approve, persistent);
  }

  /** 查询账户下尚可处理的登录会话，并补齐每条请求的设备与位置详情。 */
  async getPendingLogins(steamId: string, accessToken: string,
    refreshToken: string): Promise<SteamPendingLoginResult> {
    if (!steamId || (!accessToken && !refreshToken)) {
      throw new AppError('steam_error_login_list_session_missing',
        'Steam token is missing session data required to list sign-in requests');
    }
    const usableAccessToken = await new SteamSessionService().accessToken(steamId, accessToken, refreshToken);
    // 该空请求接口当前只接受 GET；使用通用 POST 会稳定返回 HTTP 405。
    const response = await SteamWebApiClient.protobufGet('Authentication', 'GetAuthSessionsForAccount',
      SteamProtocol.encodeAuthSessionsForAccount(), usableAccessToken);
    const clientIds = SteamProtocol.decodeAuthSessionsForAccount(response);
    const result: SteamPendingLogin[] = [];
    let skipped = 0;
    for (const clientId of clientIds) {
      try {
        const detail = await SteamWebApiClient.protobuf('Authentication', 'GetAuthSessionInfo',
          SteamProtocol.encodeQrSessionInfo(clientId), usableAccessToken);
        const data = SteamProtocol.decodeQrSessionInfo(detail);
        const info = this.qrLoginInfo(data);
        result.push({
          clientId: clientId,
          version: `${data.version}`,
          ip: info.ip,
          location: info.location,
          deviceName: info.deviceName,
          persistent: info.persistent,
          locationMismatch: info.locationMismatch,
          highUsage: info.highUsage,
          deviceTrust: info.deviceTrust
        });
      } catch (error) {
        skipped++;
        const detail = error as BusinessError;
        DiagnosticLogService.warn('SteamGuardService',
          `Skipped an unreadable login request: ${detail.message ?? 'unknown'}`);
      }
    }
    return { items: result, skipped: skipped };
  }

  /** 使用待登录列表携带的原始挑战参数批准或拒绝登录。 */
  async respondPendingLogin(steamId: string, accessToken: string, refreshToken: string,
    sharedSecret: Uint8Array, login: SteamPendingLogin, approve: boolean): Promise<void> {
    await this.respondLoginChallenge(steamId, accessToken, refreshToken, sharedSecret,
      { version: login.version, clientId: login.clientId }, approve, login.persistent);
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
      throw new AppError('steam_error_no_confirmations', 'There are no Steam confirmations to process');
    }
    const usableAccessToken = await new SteamSessionService().accessToken(steamId, accessToken, refreshToken);
    const operation = approve ? 'allow' : 'cancel';
    // Steam 当前协议已将签名用途与操作名拆开：签名使用 accept/reject，op 仍使用 allow/cancel。
    // 不对旧 tag 自动重试，避免首个请求实际成功但响应异常时重复提交资金相关操作。
    const signatureTag = approve ? 'accept' : 'reject';
    let data = `${await this.confirmationParameters(
      steamId, identitySecret, deviceId, signatureTag)}&op=${operation}`;
    for (const confirmation of confirmations) {
      if (!confirmation.id || !confirmation.nonce) {
        throw new AppError('steam_error_confirmation_identity_missing',
          'Steam confirmation is missing its ID or nonce');
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
      throw new AppError('steam_error_confirmation_data_missing',
        'Steam confirmation requires Steam ID, Identity Secret, and Device ID');
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
    DiagnosticLogService.warn('SteamGuard', `${action} rejected by Steam: ${message}`);
    throw new AppError('steam_error_community_rejected', `Steam ${action} failed: ${message}`);
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
      throw new AppError('steam_error_confirmation_key',
        `Failed to generate Steam confirmation key: ${detail.message ?? 'invalid Identity Secret'}`);
    }
  }

  /** 按 Steam 移动端协议签名 QR 挑战的 version、clientId 和 steamId。 */
  private qrSignature(steamId: string, sharedSecret: Uint8Array, challenge: SteamQrChallenge): Uint8Array {
    try {
      const version = BigInt(challenge.version);
      const clientId = BigInt(challenge.clientId);
      const accountId = BigInt(steamId);
      if (version < 0n || version > 65535n || clientId < 0n || clientId > 18446744073709551615n ||
        accountId < 0n || accountId > 18446744073709551615n) {
        throw new AppError('steam_error_qr_value_range', 'QR code value is outside the Steam protocol range');
      }
      const key = cryptoFramework.createSymKeyGenerator('HMAC').convertKeySync({ data: sharedSecret });
      const mac = cryptoFramework.createMac('SHA256');
      mac.initSync(key);
      mac.updateSync({ data: this.littleEndian(version, 2) });
      mac.updateSync({ data: this.littleEndian(clientId, 8) });
      mac.updateSync({ data: this.littleEndian(accountId, 8) });
      return mac.doFinalSync().data;
    } catch (error) {
      const detail = error as BusinessError;
      if (error instanceof AppError) throw error;
      throw new AppError('steam_error_qr_signature',
        `Failed to generate Steam QR sign-in signature: ${detail.message ?? 'invalid QR code or secret'}`);
    }
  }

  /** 汇合扫码与列表入口，确保两者使用完全相同的签名和协议请求。 */
  private async respondLoginChallenge(steamId: string, accessToken: string, refreshToken: string,
    sharedSecret: Uint8Array, challenge: SteamQrChallenge, approve: boolean, persistent: boolean): Promise<void> {
    if (!steamId || (!accessToken && !refreshToken) || sharedSecret.length === 0) {
      throw new AppError('steam_error_login_confirmation_session_missing',
        'Steam token is missing session data required to confirm sign-in');
    }
    const signature = this.qrSignature(steamId, sharedSecret, challenge);
    const usableAccessToken = await new SteamSessionService().accessToken(steamId, accessToken, refreshToken);
    await SteamWebApiClient.protobuf('Authentication', 'UpdateAuthSessionWithMobileConfirmation',
      SteamProtocol.encodeQrResponse(challenge.version, challenge.clientId, steamId, signature,
        approve, persistent), usableAccessToken);
  }

  /** 将协议层的分散位置字段整理为适合确认弹窗展示的摘要。 */
  private qrLoginInfo(data: SteamQrSessionInfoData): SteamQrLoginInfo {
    const locationParts: string[] = [];
    for (const part of [data.city, data.state, data.country]) {
      if (part.length > 0 && !locationParts.includes(part)) {
        locationParts.push(part);
      }
    }
    return {
      ip: data.ip,
      location: locationParts.length > 0 ? locationParts.join(' · ') : data.geoloc,
      deviceName: data.deviceFriendlyName,
      persistent: data.persistent,
      locationMismatch: data.requestorLocationMismatch,
      highUsage: data.highUsageLogin,
      deviceTrust: data.deviceTrust
    };
  }

  /** 从短链接中提取并保留无精度损失的 QR 数值字段。 */
  private parseQrChallenge(challengeUrl: string): SteamQrChallenge {
    const match = /^https:\/\/s\.team\/q\/(\d+)\/(\d+)(?:\?.*)?$/.exec(challengeUrl.trim());
    if (!match || match.length < 3) {
      throw new AppError('steam_error_qr_invalid', 'This is not a valid Steam sign-in QR code');
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
