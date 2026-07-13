import { http } from '@kit.NetworkKit';
import { util } from '@kit.ArkTS';
import Long from 'long';
import * as steamapi from './protobuf/steam_auth';
import { SteamGuardService } from './SteamGuardService';

export interface SteamAuthenticatorEnrollment {
  sharedSecret: Uint8Array;
  identitySecret: Uint8Array;
  serialNumber: string;
  revocationCode: string;
  uri: string;
  serverTime: number;
  accountName: string;
  tokenGid: string;
  secret1: Uint8Array;
  phoneNumberHint: string;
  confirmType: number;
}

export interface SteamFinalizeResult {
  success: boolean;
  wantMore: boolean;
  serverTime: number;
  status: number;
}

/**
 * Steam Guard 注册服务。请求与响应均由 KiraAuth 同源 proto 的生成代码处理。
 * AddAuthenticator 会创建新的密钥；Finalize 成功前调用方不得把临时密钥保存为可用 Token。
 */
export class SteamAuthenticatorService {
  async addAuthenticator(steamId: string, refreshToken: string,
    deviceId: string): Promise<SteamAuthenticatorEnrollment> {
    const request = steamapi.CTwoFactor_AddAuthenticator_Request.create({
      steamid: Long.fromString(steamId, true),
      authenticatorType: 1,
      deviceIdentifier: deviceId,
      smsPhoneId: '1',
      version: 1
    });
    const data = steamapi.CTwoFactor_AddAuthenticator_Request.encode(request).finish();
    const responseData = await this.protobufRequest('AddAuthenticator', steamId, refreshToken, data);
    const response = steamapi.CTwoFactor_AddAuthenticator_Response.decode(responseData);
    if (response.sharedSecret.length === 0 || response.identitySecret.length === 0 || !response.uri) {
      throw new Error(`Steam 未返回完整 Authenticator 信息（status ${response.status}）`);
    }
    return {
      sharedSecret: response.sharedSecret,
      identitySecret: response.identitySecret,
      serialNumber: response.serialNumber.toString(),
      revocationCode: response.revocationCode,
      uri: response.uri,
      serverTime: Number(response.serverTime.toString()),
      accountName: response.accountName,
      tokenGid: response.tokenGid,
      secret1: response.secret_1,
      phoneNumberHint: response.phoneNumberHint,
      confirmType: response.confirmType
    };
  }

  async finalizeAuthenticator(steamId: string, refreshToken: string, authenticatorCode: string,
    authenticatorTime: number, activationCode: string): Promise<SteamFinalizeResult> {
    const request = steamapi.CTwoFactor_FinalizeAddAuthenticator_Request.create({
      steamid: Long.fromString(steamId, true),
      authenticatorCode: authenticatorCode,
      authenticatorTime: Long.fromNumber(authenticatorTime, true),
      activationCode: activationCode,
      validateSmsCode: true
    });
    const data = steamapi.CTwoFactor_FinalizeAddAuthenticator_Request.encode(request).finish();
    const responseData = await this.protobufRequest('FinalizeAddAuthenticator', steamId, refreshToken, data);
    const response = steamapi.CTwoFactor_FinalizeAddAuthenticator_Response.decode(responseData);
    return {
      success: response.success,
      wantMore: response.wantMore,
      serverTime: Number(response.serverTime.toString()),
      status: response.status
    };
  }

  /** 请求把已有的移动验证器转移到本应用；Steam 会向账户手机号发送验证码。 */
  async beginTransfer(steamId: string, refreshToken: string): Promise<void> {
    const request = steamapi.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.create({});
    const data = steamapi.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.encode(request).finish();
    const responseData = await this.protobufRequest(
      'RemoveAuthenticatorViaChallengeStart', steamId, refreshToken, data);
    const response = steamapi.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.decode(responseData);
    if (!response.success) throw new Error('Steam 未允许转移当前验证器');
  }

  async completeTransfer(steamId: string, refreshToken: string,
    smsCode: string): Promise<SteamAuthenticatorEnrollment> {
    const request = steamapi.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.create({
      smsCode: smsCode,
      generateNewToken: true,
      version: 1
    });
    const data = steamapi.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.encode(request).finish();
    const responseData = await this.protobufRequest(
      'RemoveAuthenticatorViaChallengeContinue', steamId, refreshToken, data);
    const response = steamapi.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.decode(responseData);
    const token = response.replacementToken;
    const sharedSecret = token?.sharedSecret ?? new Uint8Array(0);
    const identitySecret = token?.identitySecret ?? new Uint8Array(0);
    if (!response.success || !token || sharedSecret.length === 0 || identitySecret.length === 0) {
      throw new Error('Steam 未返回转移后的验证器密钥');
    }
    return {
      sharedSecret: sharedSecret,
      identitySecret: identitySecret,
      serialNumber: token.serialNumber?.toString() ?? '',
      revocationCode: token.revocationCode ?? '',
      uri: token.uri ?? '',
      serverTime: Number(token.serverTime?.toString() ?? '0'),
      accountName: token.accountName ?? '',
      tokenGid: token.tokenGid ?? '',
      secret1: token.secret_1 ?? new Uint8Array(0),
      phoneNumberHint: '',
      confirmType: 1
    };
  }

  private async protobufRequest(method: string, steamId: string, refreshToken: string,
    payload: Uint8Array): Promise<Uint8Array> {
    const accessToken = await new SteamGuardService().refreshAccessToken(steamId, refreshToken);
    const base64 = new util.Base64Helper().encodeToStringSync(payload, util.Type.BASIC);
    const request = http.createHttp();
    try {
      const response = await request.request(
        `https://api.steampowered.com/ITwoFactorService/${method}/v1/?access_token=${encodeURIComponent(accessToken)}`, {
          method: http.RequestMethod.POST,
          header: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept-Type': 'application/json' },
          extraData: `input_protobuf_encoded=${encodeURIComponent(base64)}`,
          expectDataType: http.HttpDataType.ARRAY_BUFFER,
          connectTimeout: 15000,
          readTimeout: 15000
        });
      const eResult = `${response.header['x-eresult'] ?? ''}`;
      if (eResult && eResult !== '1' && eResult !== 'OK') {
        if (eResult === '29') throw new Error('STEAM_GUARD_ALREADY_EXISTS');
        throw new Error(`Steam EResult: ${eResult}`);
      }
      return new Uint8Array(response.result as ArrayBuffer);
    } finally {
      request.destroy();
    }
  }
}
