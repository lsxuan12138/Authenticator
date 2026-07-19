import { BusinessError } from '@kit.BasicServicesKit';
import { cryptoFramework } from '@kit.CryptoArchitectureKit';
import { util } from '@kit.ArkTS';
import {
  SteamAllowedConfirmation,
  SteamAuthPollResult,
  SteamAuthSession,
  SteamGuardType,
  SteamProtocol,
  SteamSessionTokens
} from './SteamProtocol';
import { SteamWebApiClient } from './SteamWebApiClient';

interface SteamRsaPublicKey {
  modulus: string;
  exponent: string;
  timestamp: string;
}

/** 页面离开或用户取消时，让登录轮询在下一个安全检查点结束。 */
export class SteamLoginCancellation {
  private cancelled: boolean = false;

  /** 标记当前登录流程应在下一个安全检查点停止。 */
  cancel(): void {
    this.cancelled = true;
  }

  /** 在异步阶段切换点把取消状态转换为可被页面处理的异常。 */
  throwIfCancelled(): void {
    if (this.cancelled) {
      throw new Error('Steam 登录已取消');
    }
  }
}

/** Steam 凭据登录编排；协议和 HTTP 细节分别交给 SteamProtocol 与 SteamWebApiClient。 */
export class SteamLoginService {
  private static readonly DEFAULT_POLL_INTERVAL: number = 5000;

  /** 按 SteamKit 的优先级选择客户端可以处理的确认方式。 */
  static preferredConfirmation(session: SteamAuthSession): SteamAllowedConfirmation | undefined {
    const priority: SteamGuardType[] = [
      SteamGuardType.NONE,
      SteamGuardType.DEVICE_CONFIRMATION,
      SteamGuardType.DEVICE_CODE,
      SteamGuardType.EMAIL_CODE,
      SteamGuardType.EMAIL_CONFIRMATION
    ];
    for (const type of priority) {
      const confirmation = session.confirmations.find(
        (item: SteamAllowedConfirmation): boolean => item.type === type);
      if (confirmation) {
        return confirmation;
      }
    }
    return undefined;
  }

  /** 使用当前 Token 的五位码和 Guard Data 重新建立持久会话。 */
  async refreshSession(account: string, password: string, guardCode: string, guardData: string,
    cancellation: SteamLoginCancellation,
    onWaiting: (type: number) => void = (_type: number): void => {}): Promise<SteamSessionTokens> {
    const session = await this.beginSession(account, password, guardData);
    cancellation.throwIfCancelled();
    const confirmation = SteamLoginService.preferredConfirmation(session);
    if (!confirmation) {
      throw new Error('Steam 没有返回本应用支持的登录确认方式');
    }
    switch (confirmation.type) {
      case SteamGuardType.NONE:
        return this.pollUntilComplete(session, cancellation);
      case SteamGuardType.DEVICE_CONFIRMATION:
      case SteamGuardType.EMAIL_CONFIRMATION:
        onWaiting(confirmation.type);
        return this.pollUntilComplete(session, cancellation, 90000, true);
      case SteamGuardType.DEVICE_CODE:
        await this.submitGuardCode(session, SteamGuardType.DEVICE_CODE, guardCode);
        return this.pollUntilComplete(session, cancellation);
      case SteamGuardType.EMAIL_CODE:
        throw new Error('本次登录需要邮箱验证码，请从“添加 Steam Guard”流程重新登录');
      default:
        throw new Error(`暂不支持 Steam 登录确认方式 ${confirmation.type}`);
    }
  }

  /** 获取临时 RSA 公钥、加密密码并创建凭据登录会话。 */
  async beginSession(account: string, password: string, guardData: string = ''): Promise<SteamAuthSession> {
    if (!account.trim() || !password) {
      throw new Error('请输入 Steam 账户名和密码');
    }
    const publicKey = await this.getRsaPublicKey(account.trim());
    if (!publicKey.modulus || !publicKey.exponent || !publicKey.timestamp) {
      throw new Error('Steam 未返回完整 RSA 公钥');
    }
    const encryptedPassword = this.encryptPassword(publicKey, password);
    const beginBytes = await SteamWebApiClient.protobuf('Authentication', 'BeginAuthSessionViaCredentials',
      SteamProtocol.encodeBeginSession(account.trim(), encryptedPassword, publicKey.timestamp, guardData));
    const session = SteamProtocol.decodeBeginSession(beginBytes);
    if (session.clientId.toString() === '0' || session.steamId.toString() === '0' ||
      session.requestId.length === 0) {
      throw new Error(session.extendedErrorMessage || 'Steam 未返回有效登录会话');
    }
    return session;
  }

  /** RSA 公钥接口沿用 Steam 移动端兼容的 JSON 形式，并由共享网络层统一校验。 */
  private async getRsaPublicKey(account: string): Promise<SteamRsaPublicKey> {
    const url = 'https://api.steampowered.com/IAuthenticationService/' +
      `GetPasswordRSAPublicKey/v1/?account_name=${encodeURIComponent(account)}`;
    const root = await SteamWebApiClient.getJson('获取 RSA 公钥', url);
    const value: Object | undefined = root['response'];
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw new Error('Steam 未返回 RSA 公钥响应');
    }
    const response = value as Record<string, Object>;
    return {
      modulus: String(response['publickey_mod'] ?? ''),
      exponent: String(response['publickey_exp'] ?? ''),
      timestamp: String(response['timestamp'] ?? '')
    };
  }

  /** 向已有登录会话提交邮箱码或 Steam Guard 五位码。 */
  async submitGuardCode(session: SteamAuthSession, codeType: SteamGuardType, code: string): Promise<void> {
    if (!code.trim()) {
      throw new Error('请输入 Steam 验证码');
    }
    const response = await SteamWebApiClient.protobuf('Authentication', 'UpdateAuthSessionWithSteamGuardCode',
      SteamProtocol.encodeGuardCode(session, codeType, code.trim()), '', ['1', 'OK', '29']);
    const agreementUrl = SteamProtocol.decodeGuardCodeResponse(response);
    if (agreementUrl.length > 0) {
      throw new Error('Steam 要求先同意最新用户协议，请在 Steam 官方客户端中完成后重试');
    }
  }

  /** 按服务端间隔轮询，处理 client_id 轮换并限制总等待时间。 */
  async pollUntilComplete(session: SteamAuthSession, cancellation: SteamLoginCancellation,
    timeoutMs: number = 90000, waitBeforeFirstPoll: boolean = false): Promise<SteamSessionTokens> {
    const suggested = Number.isFinite(session.interval) && session.interval > 0 ?
      Math.ceil(session.interval * 1000) : SteamLoginService.DEFAULT_POLL_INTERVAL;
    const intervalMs = Math.max(1000, suggested);
    const deadline = Date.now() + timeoutMs;
    if (waitBeforeFirstPoll) {
      await this.delay(intervalMs);
    }
    while (Date.now() < deadline) {
      cancellation.throwIfCancelled();
      const tokens = await this.pollOnce(session);
      cancellation.throwIfCancelled();
      if (tokens) {
        return tokens;
      }
      const remaining = deadline - Date.now();
      if (remaining > 0) {
        await this.delay(Math.min(intervalMs, remaining));
      }
    }
    throw new Error('等待 Steam 登录确认超时，请重新发起登录');
  }

  /** 轮询一次会话状态；尚未签发令牌时返回 null。 */
  private async pollOnce(session: SteamAuthSession): Promise<SteamSessionTokens | null> {
    const bytes = await SteamWebApiClient.protobuf('Authentication', 'PollAuthSessionStatus',
      SteamProtocol.encodePollSession(session));
    const result: SteamAuthPollResult = SteamProtocol.decodePollSession(bytes);
    if (result.newClientId.toString() !== '0') {
      session.clientId = result.newClientId;
    }
    if (result.tokens.agreementSessionUrl.length > 0 && result.tokens.refreshToken.length === 0) {
      throw new Error('Steam 要求先同意最新用户协议，请在 Steam 官方客户端中完成后重试');
    }
    return result.tokens.refreshToken.length > 0 ? result.tokens : null;
  }

  /** 使用 Steam 协议固定的 RSA PKCS#1 v1.5 加密账户密码。 */
  private encryptPassword(publicKey: SteamRsaPublicKey, password: string): string {
    try {
      const rsaSpec: cryptoFramework.RSAPubKeySpec = {
        algName: 'RSA',
        specType: cryptoFramework.AsyKeySpecType.PUBLIC_KEY_SPEC,
        params: {
          algName: 'RSA',
          specType: cryptoFramework.AsyKeySpecType.COMMON_PARAMS_SPEC,
          n: BigInt(`0x${publicKey.modulus}`)
        },
        pk: BigInt(`0x${publicKey.exponent}`)
      };
      const rsa = cryptoFramework.createAsyKeyGeneratorBySpec(rsaSpec).generatePubKeySync();
      // eslint-disable-next-line @security/no-unsafe-rsa-encrypt -- Steam 登录协议固定使用 PKCS#1 v1.5。
      const cipher = cryptoFramework.createCipher('RSA1024|PKCS1');
      cipher.initSync(cryptoFramework.CryptoMode.ENCRYPT_MODE, rsa, null);
      const encrypted = cipher.doFinalSync({ data: new util.TextEncoder().encodeInto(password) });
      return new util.Base64Helper().encodeToStringSync(encrypted.data, util.Type.BASIC);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`加密 Steam 登录密码失败：${detail.message ?? 'RSA 公钥无效'}`);
    }
  }

  /** 使用异步计时器等待服务端建议的轮询间隔。 */
  private async delay(milliseconds: number): Promise<void> {
    return new Promise<void>((resolve: () => void): void => {
      setTimeout(resolve, milliseconds);
    });
  }
}
