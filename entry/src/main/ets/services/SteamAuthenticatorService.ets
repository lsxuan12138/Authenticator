import {
  SteamAuthenticatorEnrollmentData,
  SteamAuthenticatorStatusData,
  SteamAuthenticatorUsageData,
  SteamFinalizeData,
  SteamProtocol
} from './SteamProtocol';
import { SteamSessionService } from './SteamSessionService';
import { SteamTimeService } from './SteamTimeService';
import { SteamWebApiClient } from './SteamWebApiClient';
import { DiagnosticLogService } from './DiagnosticLogService';

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
  serverTime: number;
  status: number;
}

export interface SteamAuthenticatorUsage {
  time: number;
  usageType: number;
  confirmationType: number;
  confirmationAction: number;
}

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

/** Steam Guard 注册、状态、撤销和转移流程；所有 wire 与联网细节复用统一底层。 */
export class SteamAuthenticatorService {
  /** 为已登录账户申请一个待激活的移动验证器。 */
  async addAuthenticator(steamId: string, refreshToken: string,
    deviceId: string): Promise<SteamAuthenticatorEnrollment> {
    if (!steamId || !refreshToken || !deviceId) {
      throw new Error('添加验证器需要 Steam ID、Refresh Token 和 Device ID');
    }
    const accessToken = await this.accessToken(steamId, refreshToken);
    const payload = SteamProtocol.encodeAddAuthenticator(steamId, deviceId, await SteamTimeService.now());
    let bytes: Uint8Array;
    try {
      bytes = await SteamWebApiClient.protobuf('TwoFactor', 'AddAuthenticator', payload, accessToken);
    } catch (error) {
      const detail = error as Error;
      if (detail.message.includes('EResult 29')) {
        throw new Error('STEAM_GUARD_ALREADY_EXISTS');
      }
      throw new Error(detail.message);
    }
    const enrollment = SteamProtocol.decodeEnrollment(bytes);
    this.validateEnrollment(enrollment);
    if (enrollment.status !== 1) {
      throw new Error(`Steam 未创建待激活验证器（status ${enrollment.status}）`);
    }
    return this.enrollment(enrollment);
  }

  /** 使用短信激活码和当前五位码完成新验证器绑定。 */
  async finalizeAuthenticator(steamId: string, refreshToken: string, authenticatorCode: string,
    authenticatorTime: number, activationCode: string): Promise<SteamFinalizeResult> {
    const accessToken = await this.accessToken(steamId, refreshToken);
    const payload = SteamProtocol.encodeFinalizeAuthenticator(
      steamId, authenticatorCode, authenticatorTime, activationCode);
    const bytes = await SteamWebApiClient.protobuf('TwoFactor', 'FinalizeAddAuthenticator', payload, accessToken);
    const result: SteamFinalizeData = SteamProtocol.decodeFinalizeAuthenticator(bytes);
    return { success: result.success, serverTime: result.serverTime, status: result.status };
  }

  /** 查询 Steam 服务端记录的验证器状态和最近使用事件。 */
  async queryAuthenticatorStatus(steamId: string, refreshToken: string): Promise<SteamAuthenticatorStatus> {
    const accessToken = await this.accessToken(steamId, refreshToken);
    const bytes = await SteamWebApiClient.protobuf('TwoFactor', 'QueryStatus',
      SteamProtocol.encodeAuthenticatorStatus(steamId), accessToken);
    return this.status(SteamProtocol.decodeAuthenticatorStatus(bytes));
  }

  /** 使用撤销码从账户移除当前移动验证器。 */
  async revokeAuthenticator(steamId: string, refreshToken: string,
    revocationCode: string): Promise<number> {
    if (!revocationCode.trim()) {
      throw new Error('当前 Token 没有撤销码，无法撤销 Steam 验证器');
    }
    const accessToken = await this.accessToken(steamId, refreshToken);
    const bytes = await SteamWebApiClient.protobuf('TwoFactor', 'RemoveAuthenticator',
      SteamProtocol.encodeRemoveAuthenticator(revocationCode.trim()), accessToken);
    const result = SteamProtocol.decodeRemoveAuthenticator(bytes);
    if (!result.success) {
      throw new Error(`Steam 未撤销验证器（剩余尝试次数：${result.revocationAttemptsRemaining}）`);
    }
    return result.revocationAttemptsRemaining;
  }

  /** 请求 Steam 向绑定手机号发送验证器转移短信。 */
  async beginTransfer(steamId: string, refreshToken: string): Promise<void> {
    const accessToken = await this.accessToken(steamId, refreshToken);
    const bytes = await SteamWebApiClient.protobuf('TwoFactor', 'RemoveAuthenticatorViaChallengeStart',
      SteamProtocol.encodeBeginTransfer(), accessToken);
    if (bytes.length === 0) {
      // x-eresult 已由统一网络层校验；记录此兼容路径，便于从用户导出的日志确认实际响应形态。
      DiagnosticLogService.info('SteamTransfer',
        'Challenge start returned an empty protobuf body; accepted because EResult indicates success');
    }
    if (!SteamProtocol.decodeBeginTransfer(bytes)) {
      throw new Error('Steam 未允许转移当前验证器');
    }
  }

  /** 提交转移短信码并读取服务端下发的新验证器密钥。 */
  async completeTransfer(steamId: string, refreshToken: string,
    smsCode: string): Promise<SteamAuthenticatorEnrollment> {
    if (!smsCode.trim()) {
      throw new Error('请输入短信验证码');
    }
    const accessToken = await this.accessToken(steamId, refreshToken);
    const bytes = await SteamWebApiClient.protobuf('TwoFactor', 'RemoveAuthenticatorViaChallengeContinue',
      SteamProtocol.encodeCompleteTransfer(smsCode.trim()), accessToken);
    const enrollment = SteamProtocol.decodeCompleteTransfer(bytes);
    this.validateEnrollment(enrollment);
    return this.enrollment(enrollment);
  }

  /** 为 TwoFactor 调用获取仍有效的短期 Access Token。 */
  private async accessToken(steamId: string, refreshToken: string): Promise<string> {
    return new SteamSessionService().accessToken(steamId, '', refreshToken);
  }

  /** 拒绝缺少验证码或移动确认所需核心密钥的不完整响应。 */
  private validateEnrollment(enrollment: SteamAuthenticatorEnrollmentData): void {
    if (enrollment.sharedSecret.length === 0 || enrollment.identitySecret.length === 0 ||
      !enrollment.uri || !enrollment.revocationCode) {
      throw new Error(`Steam 未返回完整 Authenticator 信息（status ${enrollment.status}）`);
    }
  }

  /** 从协议模型复制出对页面稳定的注册结果模型。 */
  private enrollment(data: SteamAuthenticatorEnrollmentData): SteamAuthenticatorEnrollment {
    return {
      sharedSecret: data.sharedSecret,
      identitySecret: data.identitySecret,
      serialNumber: data.serialNumber,
      revocationCode: data.revocationCode,
      uri: data.uri,
      serverTime: data.serverTime,
      accountName: data.accountName,
      tokenGid: data.tokenGid,
      secret1: data.secret1,
      phoneNumberHint: data.phoneNumberHint,
      confirmType: data.confirmType
    };
  }

  /** 从协议模型复制并收敛验证器状态字段。 */
  private status(data: SteamAuthenticatorStatusData): SteamAuthenticatorStatus {
    return {
      state: data.state,
      inactivationReason: data.inactivationReason,
      authenticatorType: data.authenticatorType,
      authenticatorAllowed: data.authenticatorAllowed,
      steamguardScheme: data.steamguardScheme,
      tokenGid: data.tokenGid,
      emailValidated: data.emailValidated,
      deviceIdentifier: data.deviceIdentifier,
      timeCreated: data.timeCreated,
      revocationAttemptsRemaining: data.revocationAttemptsRemaining,
      classifiedAgent: data.classifiedAgent,
      allowExternalAuthenticator: data.allowExternalAuthenticator,
      timeTransferred: data.timeTransferred,
      version: data.version,
      lastSeenAuthTokenId: data.lastSeenAuthTokenId,
      usages: data.usages.map((usage: SteamAuthenticatorUsageData): SteamAuthenticatorUsage => ({
        time: usage.time,
        usageType: usage.usageType,
        confirmationType: usage.confirmationType,
        confirmationAction: usage.confirmationAction
      }))
    };
  }
}
