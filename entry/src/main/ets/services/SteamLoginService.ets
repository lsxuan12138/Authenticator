import { cryptoFramework } from '@kit.CryptoArchitectureKit';
import { http } from '@kit.NetworkKit';
import { util } from '@kit.ArkTS';
import { SteamAuthSession, SteamGuardType, SteamProto, SteamSessionTokens } from './SteamProto';

/**
 * Steam 凭据登录流程。密码只参与本次 RSA 加密和会话创建，不写入本地存储；
 * 登录完成后仅返回 Steam Guard 后续所需的会话令牌和账号信息。
 */
export class SteamLoginService {
  async refreshSession(account: string, password: string, guardCode: string): Promise<SteamSessionTokens> {
    const session = await this.beginSession(account, password);
    if (!session.confirmations.some((item) => item.type === SteamGuardType.DEVICE_CODE)) {
      throw new Error('Steam 未允许使用当前设备验证码重新认证');
    }
    await this.submitGuardCode(session, SteamGuardType.DEVICE_CODE, guardCode);
    return this.pollSession(session);
  }

  /** 创建凭据登录会话，但不擅自选择验证方式，供添加 Steam Guard 的分步 UI 使用。 */
  async beginSession(account: string, password: string): Promise<SteamAuthSession> {
    // 多阶段协议第一步：获取临时 RSA 公钥并提交加密密码。
    const publicKey = await this.getPublicKey(account);
    const rsaSpec: cryptoFramework.RSAPubKeySpec = {
      algName: 'RSA', specType: cryptoFramework.AsyKeySpecType.PUBLIC_KEY_SPEC,
      params: { algName: 'RSA', specType: cryptoFramework.AsyKeySpecType.COMMON_PARAMS_SPEC,
        n: BigInt(`0x${publicKey['publickey_mod']}`) }, pk: BigInt(`0x${publicKey['publickey_exp']}`)
    };
    const rsa = cryptoFramework.createAsyKeyGeneratorBySpec(rsaSpec).generatePubKeySync();
    const cipher = cryptoFramework.createCipher('RSA1024|PKCS1');
    cipher.initSync(cryptoFramework.CryptoMode.ENCRYPT_MODE, rsa, null);
    const encrypted = cipher.doFinalSync({ data: new util.TextEncoder().encodeInto(password) });
    const encryptedPassword = new util.Base64Helper().encodeToStringSync(encrypted.data);
    const begin = await this.protobufRequest('BeginAuthSessionViaCredentials',
      SteamProto.beginRequest(account, encryptedPassword, `${publicKey['timestamp']}`));
    const session = SteamProto.decodeBegin(begin);
    if (session.clientId.toString() === '0' || session.steamId.toString() === '0') {
      throw new Error(session.extendedErrorMessage || 'Steam 未返回有效登录会话');
    }
    return session;
  }

  async submitGuardCode(session: SteamAuthSession, codeType: number, code: string): Promise<void> {
    if (!code) throw new Error('请输入 Steam 验证码');
    await this.protobufRequest('UpdateAuthSessionWithSteamGuardCode',
      SteamProto.guardRequest(session, codeType, code));
  }

  async pollSession(session: SteamAuthSession): Promise<SteamSessionTokens> {
    const poll = await this.protobufRequest('PollAuthSessionStatus', SteamProto.pollRequest(session));
    const tokens = SteamProto.decodeTokens(poll);
    if (!tokens.accessToken || !tokens.refreshToken) throw new Error('Steam 登录完成但尚未返回会话 Token，请稍后重试');
    return tokens;
  }

  private async getPublicKey(account: string): Promise<Record<string, Object>> {
    const request = http.createHttp();
    try {
      const response = await request.request(
        `https://api.steampowered.com/IAuthenticationService/GetPasswordRSAPublicKey/v1/?account_name=${encodeURIComponent(account)}`,
        { method: http.RequestMethod.GET, expectDataType: http.HttpDataType.STRING });
      const parsed = JSON.parse(response.result as string) as Record<string, Object>;
      return parsed['response'] as Record<string, Object>;
    } finally { request.destroy(); }
  }

  private async protobufRequest(method: string, payload: Uint8Array): Promise<Uint8Array> {
    // Steam Web API 使用 Base64 包装 protobuf，并用 x-eresult 表达协议级错误。
    const base64 = new util.Base64Helper().encodeToStringSync(payload);
    const request = http.createHttp();
    try {
      const response = await request.request(`https://api.steampowered.com/IAuthenticationService/${method}/v1/`, {
        method: http.RequestMethod.POST, header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        extraData: `input_protobuf_encoded=${encodeURIComponent(base64)}`,
        expectDataType: http.HttpDataType.ARRAY_BUFFER, connectTimeout: 15000, readTimeout: 15000
      });
      const result = `${response.header['x-eresult'] ?? ''}`;
      if (result && result !== '1') throw new Error(`Steam EResult: ${result}`);
      return new Uint8Array(response.result as ArrayBuffer);
    } finally { request.destroy(); }
  }
}
