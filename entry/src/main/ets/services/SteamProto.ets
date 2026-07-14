import Long from 'long';
import { BusinessError } from '@kit.BasicServicesKit';
import {
  CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData,
  CAuthentication_BeginAuthSessionViaCredentials_Response,
  CAuthentication_DeviceDetails,
  CAuthentication_PollAuthSessionStatus_Request,
  CAuthentication_PollAuthSessionStatus_Response,
  CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request,
  EAuthSessionGuardType,
  EAuthTokenPlatformType,
  ESessionPersistence
} from './protobuf/steam_auth';

export class SteamGuardType {
  static readonly UNKNOWN: number = 0;
  static readonly NONE: number = 1;
  static readonly EMAIL_CODE: number = 2;
  static readonly DEVICE_CODE: number = 3;
  static readonly DEVICE_CONFIRMATION: number = 4;
  static readonly EMAIL_CONFIRMATION: number = 5;
  static readonly MACHINE_TOKEN: number = 6;
  static readonly LEGACY_MACHINE_AUTH: number = 7;
}

export interface SteamAllowedConfirmation {
  type: number;
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
}

/**
 * 在 kdada/Authenticator 同源 proto 生成代码之上的轻量适配层。
 * 字段定义和 wire 编解码均由 protobufjs 生成，本类只把生成对象转换为应用领域类型。
 */
export class SteamProto {
  static beginRequest(account: string, encryptedPassword: string, timestamp: string): Uint8Array {
    const device = CAuthentication_DeviceDetails.create({
      deviceFriendlyName: 'Authenticator',
      platformType: EAuthTokenPlatformType.k_EAuthTokenPlatformType_MobileApp,
      osType: -500,
      gamingDeviceType: 528
    });
    const request = CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.create({
      accountName: account,
      encryptedPassword: encryptedPassword,
      encryptionTimestamp: Long.fromString(timestamp, true),
      platformType: EAuthTokenPlatformType.k_EAuthTokenPlatformType_MobileApp,
      persistence: ESessionPersistence.k_ESessionPersistence_Persistent,
      deviceDetails: device,
      language: 0,
      qosLevel: 2
    });
    return CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.encode(request).finish();
  }

  static guardRequest(session: SteamAuthSession, codeType: number, code: string): Uint8Array {
    const request = CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.create({
      clientId: session.clientId,
      steamid: session.steamId,
      code: code,
      codeType: SteamProto.generatedGuardType(codeType)
    });
    return CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.encode(request).finish();
  }

  static pollRequest(session: SteamAuthSession): Uint8Array {
    const request = CAuthentication_PollAuthSessionStatus_Request.create({
      clientId: session.clientId,
      requestId: session.requestId
    });
    return CAuthentication_PollAuthSessionStatus_Request.encode(request).finish();
  }

  static decodeBegin(data: Uint8Array): SteamAuthSession {
    try {
      const response = CAuthentication_BeginAuthSessionViaCredentials_Response.decode(data);
      return {
        clientId: response.clientId as Long,
        requestId: response.requestId,
        steamId: response.steamid as Long,
        interval: response.interval,
        extendedErrorMessage: response.extendedErrorMessage,
        confirmations: response.allowedConfirmations.map(
          (item): SteamAllowedConfirmation => ({
            type: Number(item.confirmationType),
            message: item.associatedMessage ?? ''
          }))
      };
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`解析 Steam 登录会话失败：${detail.message ?? 'Protobuf 数据无效'}`);
    }
  }

  static decodeTokens(data: Uint8Array): SteamSessionTokens {
    try {
      const response = CAuthentication_PollAuthSessionStatus_Response.decode(data);
      return {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        accountName: response.accountName,
        agreementSessionUrl: response.agreementSessionUrl
      };
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`解析 Steam 会话令牌失败：${detail.message ?? 'Protobuf 数据无效'}`);
    }
  }

  private static generatedGuardType(value: number): EAuthSessionGuardType {
    switch (value) {
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
