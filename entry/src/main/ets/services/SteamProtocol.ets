import { BusinessError } from '@kit.BasicServicesKit';
import Long from 'long';
import {
  CAuthentication_BeginAuthSessionViaCredentials_Request,
  CAuthentication_BeginAuthSessionViaCredentials_Response,
  CAuthentication_DeviceDetails,
  CAuthentication_GetAuthSessionInfo_Request,
  CAuthentication_GetAuthSessionInfo_Response,
  CAuthentication_GetAuthSessionsForAccount_Request,
  CAuthentication_GetAuthSessionsForAccount_Response,
  CAuthentication_PollAuthSessionStatus_Request,
  CAuthentication_PollAuthSessionStatus_Response,
  CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request,
  CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request,
  CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response,
  CRemoveAuthenticatorViaChallengeContinue_Replacement_Token,
  CTwoFactor_AddAuthenticator_Request,
  CTwoFactor_AddAuthenticator_Response,
  CTwoFactor_FinalizeAddAuthenticator_Request,
  CTwoFactor_FinalizeAddAuthenticator_Response,
  CTwoFactor_RemoveAuthenticator_Request,
  CTwoFactor_RemoveAuthenticator_Response,
  CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request,
  CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response,
  CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request,
  CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response,
  CTwoFactor_Status_Request,
  CTwoFactor_Status_Response,
  CTwoFactor_Time_Request,
  CTwoFactor_Time_Response,
  EAuthSessionGuardType,
  EAuthTokenAppType,
  EAuthTokenPlatformType,
  ESessionPersistence,
  ETwoFactorStatusFieldFlag,
  ETwoFactorUsageType
} from './protobuf/steam_auth';

/** 业务层使用的登录确认类型，避免页面直接依赖生成代码。 */
export enum SteamGuardType {
  UNKNOWN = 0,
  NONE = 1,
  EMAIL_CODE = 2,
  DEVICE_CODE = 3,
  DEVICE_CONFIRMATION = 4,
  EMAIL_CONFIRMATION = 5,
  MACHINE_TOKEN = 6,
  LEGACY_MACHINE_AUTH = 7
}

export interface SteamAllowedConfirmation {
  type: SteamGuardType;
  message: string;
}

export interface SteamAuthSession {
  clientId: Long;
  requestId: Uint8Array;
  steamId: Long;
  interval: number;
  confirmations: SteamAllowedConfirmation[];
  extendedErrorMessage: string;
}

export interface SteamSessionTokens {
  accessToken: string;
  refreshToken: string;
  accountName: string;
  agreementSessionUrl: string;
  guardData: string;
}

export interface SteamAuthPollResult {
  tokens: SteamSessionTokens;
  newClientId: Long;
}

/** 扫码登录请求中由 Steam 返回的设备、位置与风险信息。 */
export interface SteamQrSessionInfoData {
  ip: string;
  geoloc: string;
  city: string;
  state: string;
  country: string;
  platformType: number;
  deviceFriendlyName: string;
  version: number;
  loginHistory: number;
  requestorLocationMismatch: boolean;
  highUsageLogin: boolean;
  persistent: boolean;
  deviceTrust: number;
  appType: number;
}

export interface SteamAuthenticatorEnrollmentData {
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
  status: number;
}

export interface SteamFinalizeData {
  success: boolean;
  serverTime: number;
  status: number;
}

export interface SteamAuthenticatorUsageData {
  time: number;
  usageType: number;
  confirmationType: number;
  confirmationAction: number;
}

export interface SteamAuthenticatorStatusData {
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
  usages: SteamAuthenticatorUsageData[];
}

export interface SteamRemoveAuthenticatorData {
  success: boolean;
  serverTime: number;
  revocationAttemptsRemaining: number;
}

export interface SteamTimeData {
  serverTime: number;
  skewToleranceSeconds: number;
}

/**
 * Steam protobuf 的唯一适配入口。生成文件只负责 wire，本类负责请求构造和领域模型转换。
 * 页面和联网服务不得直接导入 steam_auth 生成类型。
 */
export class SteamProtocol {
  /** 构造 Steam 时间探测请求；senderTime 用于服务端估算客户端时钟偏差。 */
  static encodeTime(senderTime: number): Uint8Array {
    return CTwoFactor_Time_Request.encode(CTwoFactor_Time_Request.create({
      senderTime: Long.fromNumber(senderTime, true)
    })).finish();
  }

  /** 解码服务器时间和允许的签名时间偏差。 */
  static decodeTime(data: Uint8Array): SteamTimeData {
    try {
      const response = CTwoFactor_Time_Response.decode(data);
      return {
        serverTime: Number(response.serverTime.toString()),
        skewToleranceSeconds: Number(response.skewToleranceSeconds.toString())
      };
    } catch (error) {
      throw SteamProtocol.decodeError('时间同步结果', error as Object);
    }
  }

  /** 构造移动端持久凭据登录请求。 */
  static encodeBeginSession(account: string, encryptedPassword: string, timestamp: string,
    guardData: string = ''): Uint8Array {
    const device = CAuthentication_DeviceDetails.create({
      deviceFriendlyName: 'Authenticator',
      platformType: EAuthTokenPlatformType.k_EAuthTokenPlatformType_MobileApp,
      osType: -500,
      gamingDeviceType: 528,
      appType: EAuthTokenAppType.k_EAuthTokenAppType_Mobile_SteamApp
    });
    const request = CAuthentication_BeginAuthSessionViaCredentials_Request.create({
      accountName: account,
      encryptedPassword: encryptedPassword,
      encryptionTimestamp: Long.fromString(timestamp, true),
      platformType: EAuthTokenPlatformType.k_EAuthTokenPlatformType_MobileApp,
      persistence: ESessionPersistence.k_ESessionPersistence_Persistent,
      websiteId: 'Mobile',
      deviceDetails: device,
      guardData: guardData,
      language: 0,
      qosLevel: 2
    });
    return CAuthentication_BeginAuthSessionViaCredentials_Request.encode(request).finish();
  }

  /** 解码登录会话标识、轮询间隔和允许的确认方式。 */
  static decodeBeginSession(data: Uint8Array): SteamAuthSession {
    try {
      const response = CAuthentication_BeginAuthSessionViaCredentials_Response.decode(data);
      return {
        clientId: response.clientId,
        requestId: response.requestId,
        steamId: response.steamid,
        interval: response.interval,
        extendedErrorMessage: response.extendedErrorMessage,
        confirmations: response.allowedConfirmations.map((item): SteamAllowedConfirmation => ({
          type: SteamProtocol.guardType(item.confirmationType ??
            EAuthSessionGuardType.k_EAuthSessionGuardType_Unknown),
          message: item.associatedMessage ?? ''
        }))
      };
    } catch (error) {
      throw SteamProtocol.decodeError('登录会话', error as Object);
    }
  }

  /** 构造邮箱码或 Steam Guard 五位码提交请求。 */
  static encodeGuardCode(session: SteamAuthSession, codeType: SteamGuardType, code: string): Uint8Array {
    const request = CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.create({
      clientId: session.clientId,
      steamid: session.steamId,
      code: code,
      codeType: SteamProtocol.authGuardType(codeType)
    });
    return CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.encode(request).finish();
  }

  /** 读取验证码提交后可能返回的用户协议地址。 */
  static decodeGuardCodeResponse(data: Uint8Array): string {
    try {
      return CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.decode(data).agreementSessionUrl;
    } catch (error) {
      throw SteamProtocol.decodeError('验证码提交结果', error as Object);
    }
  }

  /** 构造只包含 clientId 与 requestId 的会话轮询请求。 */
  static encodePollSession(session: SteamAuthSession): Uint8Array {
    return CAuthentication_PollAuthSessionStatus_Request.encode(
      CAuthentication_PollAuthSessionStatus_Request.create({
        clientId: session.clientId,
        requestId: session.requestId
      })).finish();
  }

  /** 解码持久令牌、Steam 可选返回的 Guard Data，以及可能轮换的 clientId。 */
  static decodePollSession(data: Uint8Array): SteamAuthPollResult {
    try {
      const response = CAuthentication_PollAuthSessionStatus_Response.decode(data);
      return {
        newClientId: response.newClientId,
        tokens: {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          accountName: response.accountName,
          agreementSessionUrl: response.agreementSessionUrl,
          guardData: response.newGuardData
        }
      };
    } catch (error) {
      throw SteamProtocol.decodeError('会话轮询结果', error as Object);
    }
  }

  /** 构造扫码登录会话详情查询，clientId 按 uint64 保留完整精度。 */
  static encodeQrSessionInfo(clientId: string): Uint8Array {
    return CAuthentication_GetAuthSessionInfo_Request.encode(
      CAuthentication_GetAuthSessionInfo_Request.create({
        clientId: Long.fromString(clientId, true)
      })).finish();
  }

  /** 构造当前账户认证会话列表请求；该消息按 Steam 协议没有字段。 */
  static encodeAuthSessionsForAccount(): Uint8Array {
    return CAuthentication_GetAuthSessionsForAccount_Request.encode(
      CAuthentication_GetAuthSessionsForAccount_Request.create({})).finish();
  }

  /** 解码待处理认证会话 ID，并以字符串保留 uint64 完整精度。 */
  static decodeAuthSessionsForAccount(data: Uint8Array): string[] {
    try {
      const response = CAuthentication_GetAuthSessionsForAccount_Response.decode(data);
      return response.clientIds.map((clientId: Long): string => clientId.toString());
    } catch (error) {
      throw SteamProtocol.decodeError('账户认证会话列表', error as Object);
    }
  }

  /** 解码扫码请求的来源设备、位置、持久性和风险标记。 */
  static decodeQrSessionInfo(data: Uint8Array): SteamQrSessionInfoData {
    try {
      const response = CAuthentication_GetAuthSessionInfo_Response.decode(data);
      return {
        ip: response.ip,
        geoloc: response.geoloc,
        city: response.city,
        state: response.state,
        country: response.country,
        platformType: response.platformType,
        deviceFriendlyName: response.deviceFriendlyName,
        version: response.version,
        loginHistory: response.loginHistory,
        requestorLocationMismatch: response.requestorLocationMismatch,
        highUsageLogin: response.highUsageLogin,
        persistent: response.requestedPersistence === ESessionPersistence.k_ESessionPersistence_Persistent,
        deviceTrust: response.deviceTrust,
        appType: response.appType
      };
    } catch (error) {
      throw SteamProtocol.decodeError('扫码登录会话详情', error as Object);
    }
  }

  /** 构造扫码登录批准或拒绝请求，并沿用请求方声明的会话持久性。 */
  static encodeQrResponse(version: string, clientId: string, steamId: string, signature: Uint8Array,
    confirm: boolean, persistent: boolean): Uint8Array {
    return CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.encode(
      CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.create({
        version: Number.parseInt(version),
        clientId: Long.fromString(clientId, true),
        steamid: Long.fromString(steamId, true),
        signature: signature,
        confirm: confirm,
        persistence: persistent ? ESessionPersistence.k_ESessionPersistence_Persistent :
          ESessionPersistence.k_ESessionPersistence_Ephemeral
      })).finish();
  }

  /** 构造新移动验证器申请，并带上本机 Device ID 与当前时间。 */
  static encodeAddAuthenticator(steamId: string, deviceId: string, time: number): Uint8Array {
    return CTwoFactor_AddAuthenticator_Request.encode(CTwoFactor_AddAuthenticator_Request.create({
      steamid: Long.fromString(steamId, true),
      authenticatorTime: Long.fromNumber(time, true),
      authenticatorType: 1,
      deviceIdentifier: deviceId,
      version: 1
    })).finish();
  }

  /** 解码 Steam 下发的完整验证器密钥材料。 */
  static decodeEnrollment(data: Uint8Array): SteamAuthenticatorEnrollmentData {
    try {
      const response = CTwoFactor_AddAuthenticator_Response.decode(data);
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
        confirmType: response.confirmType,
        status: response.status
      };
    } catch (error) {
      throw SteamProtocol.decodeError('Authenticator 信息', error as Object);
    }
  }

  /** 构造验证器最终激活请求。 */
  static encodeFinalizeAuthenticator(steamId: string, authenticatorCode: string,
    authenticatorTime: number, activationCode: string): Uint8Array {
    return CTwoFactor_FinalizeAddAuthenticator_Request.encode(
      CTwoFactor_FinalizeAddAuthenticator_Request.create({
        steamid: Long.fromString(steamId, true),
        authenticatorCode: authenticatorCode,
        authenticatorTime: Long.fromNumber(authenticatorTime, true),
        activationCode: activationCode,
        validateSmsCode: true
      })).finish();
  }

  /** 解码最终激活结果与服务端时间。 */
  static decodeFinalizeAuthenticator(data: Uint8Array): SteamFinalizeData {
    try {
      const response = CTwoFactor_FinalizeAddAuthenticator_Response.decode(data);
      return {
        success: response.success,
        serverTime: Number(response.serverTime.toString()),
        status: response.status
      };
    } catch (error) {
      throw SteamProtocol.decodeError('Authenticator 完成结果', error as Object);
    }
  }

  /** 构造包含最近使用事件的验证器状态查询。 */
  static encodeAuthenticatorStatus(steamId: string): Uint8Array {
    return CTwoFactor_Status_Request.encode(CTwoFactor_Status_Request.create({
      steamid: Long.fromString(steamId, true),
      include: ETwoFactorStatusFieldFlag.k_ETwoFactorStatusFieldFlag_LastUsage
    })).finish();
  }

  /** 解码并按时间倒序整理验证器状态与使用事件。 */
  static decodeAuthenticatorStatus(data: Uint8Array): SteamAuthenticatorStatusData {
    try {
      const response = CTwoFactor_Status_Response.decode(data);
      const usages: SteamAuthenticatorUsageData[] = response.usages.map(
        (usage): SteamAuthenticatorUsageData => ({
          time: usage.time ?? 0,
          usageType: Number(usage.usageType ?? ETwoFactorUsageType.k_ETwoFactorUsageType_Unknown),
          confirmationType: usage.confirmationType ?? 0,
          confirmationAction: usage.confirmationAction ?? 0
        }));
      usages.sort((left: SteamAuthenticatorUsageData, right: SteamAuthenticatorUsageData): number =>
        right.time - left.time);
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
        usages: usages
      };
    } catch (error) {
      throw SteamProtocol.decodeError('验证器状态', error as Object);
    }
  }

  /** 构造撤销码移除验证器请求。 */
  static encodeRemoveAuthenticator(revocationCode: string): Uint8Array {
    return CTwoFactor_RemoveAuthenticator_Request.encode(CTwoFactor_RemoveAuthenticator_Request.create({
      revocationCode: revocationCode
    })).finish();
  }

  /** 解码撤销是否成功及剩余尝试次数。 */
  static decodeRemoveAuthenticator(data: Uint8Array): SteamRemoveAuthenticatorData {
    try {
      const response = CTwoFactor_RemoveAuthenticator_Response.decode(data);
      return {
        success: response.success,
        serverTime: Number(response.serverTime.toString()),
        revocationAttemptsRemaining: response.revocationAttemptsRemaining
      };
    } catch (error) {
      throw SteamProtocol.decodeError('验证器撤销结果', error as Object);
    }
  }

  /** 构造短信转移流程的开始请求。 */
  static encodeBeginTransfer(): Uint8Array {
    return CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.encode(
      CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.create({})).finish();
  }

  /** 解码 Steam 是否接受转移开始请求。 */
  static decodeBeginTransfer(data: Uint8Array): boolean {
    try {
      return CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.decode(data).success;
    } catch (error) {
      throw SteamProtocol.decodeError('验证器转移响应', error as Object);
    }
  }

  /** 构造短信码提交并要求 Steam 生成替换令牌。 */
  static encodeCompleteTransfer(smsCode: string): Uint8Array {
    return CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.encode(
      CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.create({
        smsCode: smsCode,
        generateNewToken: true,
        version: 1
      })).finish();
  }

  /** 解码转移后替换验证器的完整密钥材料。 */
  static decodeCompleteTransfer(data: Uint8Array): SteamAuthenticatorEnrollmentData {
    try {
      const response = CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.decode(data);
      const token = response.replacementToken as CRemoveAuthenticatorViaChallengeContinue_Replacement_Token |
        null | undefined;
      if (!response.success || !token) {
        throw new Error('Steam 未返回转移后的验证器密钥');
      }
      return {
        sharedSecret: token.sharedSecret,
        identitySecret: token.identitySecret,
        serialNumber: token.serialNumber.toString(),
        revocationCode: token.revocationCode,
        uri: token.uri,
        serverTime: Number(token.serverTime.toString()),
        accountName: token.accountName,
        tokenGid: token.tokenGid,
        secret1: token.secret_1,
        phoneNumberHint: '',
        confirmType: 0,
        status: token.status
      };
    } catch (error) {
      if ((error as Error).message === 'Steam 未返回转移后的验证器密钥') {
        throw new Error('Steam 未返回转移后的验证器密钥');
      }
      throw SteamProtocol.decodeError('验证器转移结果', error as Object);
    }
  }

  /** 将生成代码抛出的解析异常转换成稳定的业务错误。 */
  private static decodeError(target: string, error: Object): Error {
    const detail = error as BusinessError;
    return new Error(`解析 Steam ${target}失败：${detail.message ?? 'Protobuf 数据无效'}`);
  }

  /** 显式映射生成枚举，避免业务枚举与上游枚举在类型断言中静默漂移。 */
  private static guardType(type: EAuthSessionGuardType): SteamGuardType {
    switch (type) {
      case EAuthSessionGuardType.k_EAuthSessionGuardType_None:
        return SteamGuardType.NONE;
      case EAuthSessionGuardType.k_EAuthSessionGuardType_EmailCode:
        return SteamGuardType.EMAIL_CODE;
      case EAuthSessionGuardType.k_EAuthSessionGuardType_DeviceCode:
        return SteamGuardType.DEVICE_CODE;
      case EAuthSessionGuardType.k_EAuthSessionGuardType_DeviceConfirmation:
        return SteamGuardType.DEVICE_CONFIRMATION;
      case EAuthSessionGuardType.k_EAuthSessionGuardType_EmailConfirmation:
        return SteamGuardType.EMAIL_CONFIRMATION;
      case EAuthSessionGuardType.k_EAuthSessionGuardType_MachineToken:
        return SteamGuardType.MACHINE_TOKEN;
      case EAuthSessionGuardType.k_EAuthSessionGuardType_LegacyMachineAuth:
        return SteamGuardType.LEGACY_MACHINE_AUTH;
      default:
        return SteamGuardType.UNKNOWN;
    }
  }

  /** 把业务确认类型映射回生成代码的请求枚举。 */
  private static authGuardType(type: SteamGuardType): EAuthSessionGuardType {
    switch (type) {
      case SteamGuardType.NONE:
        return EAuthSessionGuardType.k_EAuthSessionGuardType_None;
      case SteamGuardType.EMAIL_CODE:
        return EAuthSessionGuardType.k_EAuthSessionGuardType_EmailCode;
      case SteamGuardType.DEVICE_CODE:
        return EAuthSessionGuardType.k_EAuthSessionGuardType_DeviceCode;
      case SteamGuardType.DEVICE_CONFIRMATION:
        return EAuthSessionGuardType.k_EAuthSessionGuardType_DeviceConfirmation;
      case SteamGuardType.EMAIL_CONFIRMATION:
        return EAuthSessionGuardType.k_EAuthSessionGuardType_EmailConfirmation;
      case SteamGuardType.MACHINE_TOKEN:
        return EAuthSessionGuardType.k_EAuthSessionGuardType_MachineToken;
      case SteamGuardType.LEGACY_MACHINE_AUTH:
        return EAuthSessionGuardType.k_EAuthSessionGuardType_LegacyMachineAuth;
      default:
        return EAuthSessionGuardType.k_EAuthSessionGuardType_Unknown;
    }
  }
}
