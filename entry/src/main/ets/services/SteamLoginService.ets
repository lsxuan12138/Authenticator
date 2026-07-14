import { cryptoFramework } from '@kit.CryptoArchitectureKit';
import { http } from '@kit.NetworkKit';
import { util } from '@kit.ArkTS';
import { BusinessError } from '@kit.BasicServicesKit';
import {
  SteamAuthPollResult,
  SteamAuthSession,
  SteamGuardType,
  SteamProto,
  SteamSessionTokens
} from './SteamProto';
import { SteamResult } from './SteamResult';

/** 页面离开或用户取消时，让登录轮询在下一安全检查点结束。 */
export class SteamLoginCancellation {
  private cancelled: boolean = false;

  cancel(): void {
    this.cancelled = true;
  }

  isCancelled(): boolean {
    return this.cancelled;
  }

  throwIfCancelled(): void {
    if (this.cancelled) {
      throw new Error('Steam 登录已取消');
    }
  }
}

/**
 * Steam 凭据登录流程。密码只参与本次 RSA 加密和会话创建，不写入本地存储；
 * 登录完成后仅返回 Steam Guard 后续所需的会话令牌和账号信息。
 */
export class SteamLoginService {
  /**
   * 使用已有 Token 自动生成的五位码重新认证。Guard Data 只帮助 Steam 识别受信任登录，
   * 服务端仍可要求设备确认或其他验证，因此调用方必须展示等待状态并允许取消。
   */
  async refreshSession(account: string, password: string, guardCode: string, guardData: string,
    cancellation: SteamLoginCancellation,
    onWaiting: (type: number) => void = (_type: number): void => {}): Promise<SteamSessionTokens> {
    const session = await this.beginSession(account, password, guardData);
    cancellation.throwIfCancelled();
    if (session.confirmations.some((item) => item.type === SteamGuardType.DEVICE_CODE)) {
      await this.submitGuardCode(session, SteamGuardType.DEVICE_CODE, guardCode);
    } else if (session.confirmations.some((item) => item.type === SteamGuardType.DEVICE_CONFIRMATION)) {
      onWaiting(SteamGuardType.DEVICE_CONFIRMATION);
    } else if (!session.confirmations.some((item) => item.type === SteamGuardType.NONE)) {
      throw new Error('本次登录需要邮箱验证，请从“添加 Steam Guard”流程重新登录');
    }
    return this.pollUntilComplete(session, cancellation);
  }

  /** 创建凭据登录会话，但不擅自选择验证方式，供添加 Steam Guard 的分步 UI 使用。 */
  async beginSession(account: string, password: string, guardData: string = ''): Promise<SteamAuthSession> {
    // 多阶段协议第一步：获取临时 RSA 公钥并提交加密密码。
    const publicKey = await this.getPublicKey(account);
    const encryptedPassword = this.encryptPassword(publicKey, password);
    const begin = await this.protobufRequest('BeginAuthSessionViaCredentials',
      SteamProto.beginRequest(account, encryptedPassword, `${publicKey['timestamp']}`, guardData));
    const session = SteamProto.decodeBegin(begin);
    if (session.clientId.toString() === '0' || session.steamId.toString() === '0') {
      throw new Error(session.extendedErrorMessage || 'Steam 未返回有效登录会话');
    }
    return session;
  }

  private encryptPassword(publicKey: Record<string, Object>, password: string): string {
    try {
      const rsaSpec: cryptoFramework.RSAPubKeySpec = {
        algName: 'RSA',
        specType: cryptoFramework.AsyKeySpecType.PUBLIC_KEY_SPEC,
        params: {
          algName: 'RSA', specType: cryptoFramework.AsyKeySpecType.COMMON_PARAMS_SPEC,
          n: BigInt(`0x${publicKey['publickey_mod']}`)
        },
        pk: BigInt(`0x${publicKey['publickey_exp']}`)
      };
      const rsa = cryptoFramework.createAsyKeyGeneratorBySpec(rsaSpec).generatePubKeySync();
      // eslint-disable-next-line @security/no-unsafe-rsa-encrypt -- Steam 登录端点固定要求服务端公钥与 PKCS#1 v1.5。
      const cipher = cryptoFramework.createCipher('RSA1024|PKCS1');
      cipher.initSync(cryptoFramework.CryptoMode.ENCRYPT_MODE, rsa, null);
      const encrypted = cipher.doFinalSync({ data: new util.TextEncoder().encodeInto(password) });
      return new util.Base64Helper().encodeToStringSync(encrypted.data);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`加密 Steam 登录密码失败：${detail.message ?? 'RSA 公钥无效'}`);
    }
  }

  async submitGuardCode(session: SteamAuthSession, codeType: number, code: string): Promise<void> {
    if (!code) {
      throw new Error('请输入 Steam 验证码');
    }
    // SteamKit 将 DuplicateRequest(29) 视为可继续：通常表示用户已在另一处确认，随后轮询仍会成功。
    await this.protobufRequest('UpdateAuthSessionWithSteamGuardCode',
      SteamProto.guardRequest(session, codeType, code), true);
  }

  async pollSession(session: SteamAuthSession): Promise<SteamSessionTokens> {
    const tokens = await this.pollOnce(session);
    if (!tokens) {
      throw new Error('Steam 登录尚未完成，请稍后继续');
    }
    return tokens;
  }

  /** 按服务器给出的间隔轮询，处理 client_id 轮换，并限制最长等待时间。 */
  async pollUntilComplete(session: SteamAuthSession, cancellation: SteamLoginCancellation,
    timeoutMs: number = 90000): Promise<SteamSessionTokens> {
    const intervalMs = Math.min(10000, Math.max(1000, Math.ceil(session.interval * 1000)));
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      cancellation.throwIfCancelled();
      const tokens = await this.pollOnce(session);
      cancellation.throwIfCancelled();
      if (tokens) {
        return tokens;
      }
      await this.delay(intervalMs);
    }
    throw new Error('等待 Steam 登录确认超时，请重新发起登录');
  }

  private async pollOnce(session: SteamAuthSession): Promise<SteamSessionTokens | null> {
    const poll = await this.protobufRequest('PollAuthSessionStatus', SteamProto.pollRequest(session));
    const result: SteamAuthPollResult = SteamProto.decodePoll(poll);
    if (result.newClientId.toString() !== '0') {
      // Steam 可在轮询过程中迁移会话；后续请求必须改用新 client_id。
      session.clientId = result.newClientId;
    }
    if (result.tokens.agreementSessionUrl.length > 0 && result.tokens.refreshToken.length === 0) {
      throw new Error('Steam 要求先同意最新用户协议，请在 Steam 官方客户端中完成后重试');
    }
    return result.tokens.refreshToken.length > 0 ? result.tokens : null;
  }

  private async delay(milliseconds: number): Promise<void> {
    return new Promise<void>((resolve: () => void): void => {
      setTimeout(resolve, milliseconds);
    });
  }

  private async getPublicKey(account: string): Promise<Record<string, Object>> {
    const request = http.createHttp();
    try {
      const response = await request.request(
        `https://api.steampowered.com/IAuthenticationService/GetPasswordRSAPublicKey/v1/?account_name=${encodeURIComponent(
          account)}`,
        { method: http.RequestMethod.GET, expectDataType: http.HttpDataType.STRING });
      const parsed = JSON.parse(response.result as string) as Record<string, Object>;
      return parsed['response'] as Record<string, Object>;
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`获取 Steam RSA 公钥失败：${detail.message ?? '未知错误'}`);
    } finally {
      request.destroy();
    }
  }

  private async protobufRequest(method: string, payload: Uint8Array,
    allowDuplicateRequest: boolean = false): Promise<Uint8Array> {
    // Steam Web API 使用 Base64 包装 protobuf，并用 x-eresult 表达协议级错误。
    const base64 = new util.Base64Helper().encodeToStringSync(payload);
    const request = http.createHttp();
    try {
      const response = await request.request(`https://api.steampowered.com/IAuthenticationService/${method}/v1/`, {
        method: http.RequestMethod.POST,
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        extraData: `input_protobuf_encoded=${encodeURIComponent(base64)}`,
        expectDataType: http.HttpDataType.ARRAY_BUFFER,
        connectTimeout: 15000,
        readTimeout: 15000
      });
      const result = this.readEResult(response.header);
      if (result && result !== '1' && !(allowDuplicateRequest && result === '29')) {
        throw new Error(SteamResult.message(result, 'Steam 登录失败'));
      }
      return new Uint8Array(response.result as ArrayBuffer);
    } catch (error) {
      const detail = error as BusinessError;
      const message = detail.message ?? '未知错误';
      if (message.includes('EResult ')) {
        throw new Error(message);
      }
      throw new Error(`Steam Protobuf 请求失败：${message}`);
    } finally {
      request.destroy();
    }
  }

  private readEResult(header: Object): string {
    const headerText: string = JSON.stringify(header);
    const match: RegExpMatchArray | null = headerText.match(/"x-eresult"\s*:\s*"([^"\\]*)"/i);
    return match !== null && match.length > 1 ? match[1] : '';
  }
}
