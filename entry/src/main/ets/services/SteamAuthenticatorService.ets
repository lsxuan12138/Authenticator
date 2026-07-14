import { http } from '@kit.NetworkKit';
import { util } from '@kit.ArkTS';
import { BusinessError } from '@kit.BasicServicesKit';
import Long from 'long';
import {
  CTwoFactor_AddAuthenticator_Request,
  CTwoFactor_AddAuthenticator_Response,
  CTwoFactor_FinalizeAddAuthenticator_Request,
  CTwoFactor_FinalizeAddAuthenticator_Response,
  CTwoFactor_Status_Request,
  CTwoFactor_Status_Response,
  CTwoFactor_RemoveAuthenticator_Request,
  CTwoFactor_RemoveAuthenticator_Response,
  CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request,
  CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response,
  CRemoveAuthenticatorViaChallengeContinue_Replacement_Token,
  CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request,
  CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response,
  ETwoFactorStatusFieldFlag
} from './protobuf/steam_auth';
import { SteamGuardService } from './SteamGuardService';
import { SteamResult } from './SteamResult';

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

/** Steam 当前为账户记录的移动验证器状态。数值字段保持服务端原值，便于诊断协议变化。 */
export interface SteamAuthenticatorStatus {
  state: number;
  inactivationReason: number;
  authenticatorType: number;
  authenticatorAllowed: boolean;
  steamguardScheme: number;
  tokenGid: string;
  emailValidated: boolean;
  deviceIdentifier: string;
  timeCreated: number;
  revocationAttemptsRemaining: number;
  classifiedAgent: string;
  allowExternalAuthenticator: boolean;
  timeTransferred: number;
  version: number;
  lastSeenAuthTokenId: string;
  usages: SteamAuthenticatorUsage[];
}

export interface SteamAuthenticatorUsage {
  time: number;
  usageType: number;
  confirmationType: number;
  confirmationAction: number;
}

/**
 * Steam Guard 注册服务。请求与响应均由 SteamTracking 字段定义生成的 protobuf 代码处理。
 * AddAuthenticator 会创建新的密钥；Finalize 成功前调用方不得把临时密钥保存为可用 Token。
 */
export class SteamAuthenticatorService {
  async addAuthenticator(steamId: string, refreshToken: string,
    deviceId: string): Promise<SteamAuthenticatorEnrollment> {
    const request: CTwoFactor_AddAuthenticator_Request = CTwoFactor_AddAuthenticator_Request.create({
      steamid: Long.fromString(steamId, true),
      authenticatorType: 1,
      deviceIdentifier: deviceId,
      smsPhoneId: '1',
      version: 1
    });
    const data: Uint8Array = CTwoFactor_AddAuthenticator_Request.encode(request).finish();
    const responseData: Uint8Array = await this.protobufRequest('AddAuthenticator', steamId, refreshToken, data);
    let response: CTwoFactor_AddAuthenticator_Response;
    try {
      response = CTwoFactor_AddAuthenticator_Response.decode(responseData);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`解析 Steam Authenticator 信息失败：${detail.message ?? 'Protobuf 数据无效'}`);
    }
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
    const request: CTwoFactor_FinalizeAddAuthenticator_Request =
      CTwoFactor_FinalizeAddAuthenticator_Request.create({
        steamid: Long.fromString(steamId, true),
        authenticatorCode: authenticatorCode,
        authenticatorTime: Long.fromNumber(authenticatorTime, true),
        activationCode: activationCode,
        validateSmsCode: true
      });
    const data: Uint8Array = CTwoFactor_FinalizeAddAuthenticator_Request.encode(request).finish();
    const responseData: Uint8Array = await this.protobufRequest(
      'FinalizeAddAuthenticator', steamId, refreshToken, data);
    let response: CTwoFactor_FinalizeAddAuthenticator_Response;
    try {
      response = CTwoFactor_FinalizeAddAuthenticator_Response.decode(responseData);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`解析 Steam Authenticator 完成结果失败：${detail.message ?? 'Protobuf 数据无效'}`);
    }
    return {
      success: response.success,
      wantMore: response.wantMore,
      serverTime: Number(response.serverTime.toString()),
      status: response.status
    };
  }

  /** 查询 Steam 服务端记录的验证器状态，并按 SteamTracking 定义请求最近使用记录。 */
  async queryAuthenticatorStatus(steamId: string, refreshToken: string): Promise<SteamAuthenticatorStatus> {
    const request: CTwoFactor_Status_Request = CTwoFactor_Status_Request.create({
      steamid: Long.fromString(steamId, true),
      include: ETwoFactorStatusFieldFlag.k_ETwoFactorStatusFieldFlag_LastUsage
    });
    const data: Uint8Array = CTwoFactor_Status_Request.encode(request).finish();
    const responseData: Uint8Array = await this.protobufRequest('QueryStatus', steamId, refreshToken, data);
    let response: CTwoFactor_Status_Response;
    try {
      response = CTwoFactor_Status_Response.decode(responseData);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`解析 Steam 验证器状态失败：${detail.message ?? 'Protobuf 数据无效'}`);
    }
    return {
      state: response.state,
      inactivationReason: response.inactivationReason,
      authenticatorType: response.authenticatorType,
      authenticatorAllowed: response.authenticatorAllowed,
      steamguardScheme: response.steamguardScheme,
      tokenGid: response.tokenGid,
      emailValidated: response.emailValidated,
      deviceIdentifier: response.deviceIdentifier,
      timeCreated: response.timeCreated,
      revocationAttemptsRemaining: response.revocationAttemptsRemaining,
      classifiedAgent: response.classifiedAgent,
      allowExternalAuthenticator: response.allowExternalAuthenticator,
      timeTransferred: response.timeTransferred,
      version: response.version,
      lastSeenAuthTokenId: response.lastSeenAuthTokenId.toString(),
      usages: response.usages.map((usage): SteamAuthenticatorUsage => ({
        time: usage.time,
        usageType: Number(usage.usageType),
        confirmationType: usage.confirmationType,
        confirmationAction: usage.confirmationAction
      })).sort((left: SteamAuthenticatorUsage, right: SteamAuthenticatorUsage) => right.time - left.time)
    };
  }

  /** 使用注册时返回的撤销码移除账户的移动验证器。成功后原 Steam Guard 密钥立即失效。 */
  async revokeAuthenticator(steamId: string, refreshToken: string,
    revocationCode: string): Promise<number> {
    if (!revocationCode.trim()) {
      throw new Error('当前 Token 没有撤销码，无法撤销 Steam 验证器');
    }
    const request: CTwoFactor_RemoveAuthenticator_Request = CTwoFactor_RemoveAuthenticator_Request.create({
      revocationCode: revocationCode.trim()
    });
    const data: Uint8Array = CTwoFactor_RemoveAuthenticator_Request.encode(request).finish();
    const responseData: Uint8Array = await this.protobufRequest(
      'RemoveAuthenticator', steamId, refreshToken, data);
    let response: CTwoFactor_RemoveAuthenticator_Response;
    try {
      response = CTwoFactor_RemoveAuthenticator_Response.decode(responseData);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`解析 Steam 验证器撤销结果失败：${detail.message ?? 'Protobuf 数据无效'}`);
    }
    if (!response.success) {
      throw new Error(`Steam 未撤销验证器（剩余尝试次数：${response.revocationAttemptsRemaining}）`);
    }
    return response.revocationAttemptsRemaining;
  }

  /** 请求把已有的移动验证器转移到本应用；Steam 会向账户手机号发送验证码。 */
  async beginTransfer(steamId: string, refreshToken: string): Promise<void> {
    const request: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request =
      CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.create({});
    const data: Uint8Array =
      CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.encode(request).finish();
    const responseData: Uint8Array = await this.protobufRequest(
      'RemoveAuthenticatorViaChallengeStart', steamId, refreshToken, data);
    let response: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response;
    try {
      response = CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.decode(responseData);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`解析 Steam 验证器转移响应失败：${detail.message ?? 'Protobuf 数据无效'}`);
    }
    if (!response.success) {
      throw new Error('Steam 未允许转移当前验证器');
    }
  }

  async completeTransfer(steamId: string, refreshToken: string,
    smsCode: string): Promise<SteamAuthenticatorEnrollment> {
    const request: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request =
      CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.create({
        smsCode: smsCode,
        generateNewToken: true,
        version: 1
      });
    const data: Uint8Array =
      CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.encode(request).finish();
    const responseData: Uint8Array = await this.protobufRequest(
      'RemoveAuthenticatorViaChallengeContinue', steamId, refreshToken, data);
    let response: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response;
    try {
      response = CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.decode(responseData);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`解析 Steam 验证器转移结果失败：${detail.message ?? 'Protobuf 数据无效'}`);
    }
    const token: CRemoveAuthenticatorViaChallengeContinue_Replacement_Token | null | undefined =
      response.replacementToken as CRemoveAuthenticatorViaChallengeContinue_Replacement_Token | null | undefined;
    const sharedSecret: Uint8Array = token?.sharedSecret ?? new Uint8Array(0);
    const identitySecret: Uint8Array = token?.identitySecret ?? new Uint8Array(0);
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
    const accessToken: string = await new SteamGuardService().refreshAccessToken(steamId, refreshToken);
    const base64: string = new util.Base64Helper().encodeToStringSync(payload, util.Type.BASIC);
    const request: http.HttpRequest = http.createHttp();
    try {
      const response: http.HttpResponse = await request.request(
        `https://api.steampowered.com/ITwoFactorService/${method}/v1/?access_token=${encodeURIComponent(accessToken)}`,
        {
          method: http.RequestMethod.POST,
          header: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept-Type': 'application/json' },
          extraData: `input_protobuf_encoded=${encodeURIComponent(base64)}`,
          expectDataType: http.HttpDataType.ARRAY_BUFFER,
          connectTimeout: 15000,
          readTimeout: 15000
        });
      const eResult: string = this.readEResult(response.header);
      if (eResult && eResult !== '1' && eResult !== 'OK') {
        if (eResult === '29') {
          throw new Error('STEAM_GUARD_ALREADY_EXISTS');
        }
        throw new Error(SteamResult.message(eResult, 'Steam 验证器操作失败'));
      }
      return new Uint8Array(response.result as ArrayBuffer);
    } catch (error) {
      const detail = error as BusinessError;
      const message = detail.message ?? '未知错误';
      if (message === 'STEAM_GUARD_ALREADY_EXISTS' || message.includes('EResult ')) {
        throw new Error(message);
      }
      throw new Error(`Steam Authenticator 请求失败：${message}`);
    } finally {
      request.destroy();
    }
  }

  /**
   * Network Kit 将响应头声明为 Object，而 ArkTS 禁止用字符串下标读取对象字段。
   * 转为 JSON 后只提取 Steam 的 x-eresult，避免 any/unknown 类型进入业务代码。
   */
  private readEResult(header: Object): string {
    const headerText: string = JSON.stringify(header);
    const match: RegExpMatchArray | null = headerText.match(/"x-eresult"\s*:\s*"([^"\\]*)"/i);
    return match !== null && match.length > 1 ? match[1] : '';
  }
}
