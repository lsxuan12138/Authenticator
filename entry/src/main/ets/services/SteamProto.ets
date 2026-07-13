import Long from 'long';
import * as steamapi from './protobuf/steam_auth';

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
 * 由 KiraAuth 使用的同源 proto 生成代码之上的轻量适配层。
 * 字段定义和 wire 编解码均由 protobufjs 生成，本类只把生成对象转换为应用领域类型。
 */
export class SteamProto {
  static beginRequest(account: string, encryptedPassword: string, timestamp: string): Uint8Array {
    const device = steamapi.CAuthentication_DeviceDetails.create({
      deviceFriendlyName: 'Authenticator',
      platformType: steamapi.EAuthTokenPlatformType.k_EAuthTokenPlatformType_MobileApp,
      osType: -500,
      gamingDeviceType: 528
    });
    const request = steamapi.CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.create({
      accountName: account,
      encryptedPassword: encryptedPassword,
      encryptionTimestamp: Long.fromString(timestamp, true),
      platformType: steamapi.EAuthTokenPlatformType.k_EAuthTokenPlatformType_MobileApp,
      persistence: steamapi.ESessionPersistence.k_ESessionPersistence_Persistent,
      deviceDetails: device,
      language: 0,
      qosLevel: 2
    });
    return steamapi.CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.encode(request).finish();
  }

  static guardRequest(session: SteamAuthSession, codeType: number, code: string): Uint8Array {
    const request = steamapi.CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.create({
      clientId: session.clientId,
      steamid: session.steamId,
      code: code,
      codeType: SteamProto.generatedGuardType(codeType)
    });
    return steamapi.CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.encode(request).finish();
  }

  static pollRequest(session: SteamAuthSession): Uint8Array {
    const request = steamapi.CAuthentication_PollAuthSessionStatus_Request.create({
      clientId: session.clientId,
      requestId: session.requestId
    });
    return steamapi.CAuthentication_PollAuthSessionStatus_Request.encode(request).finish();
  }

  static decodeBegin(data: Uint8Array): SteamAuthSession {
    const response = steamapi.CAuthentication_BeginAuthSessionViaCredentials_Response.decode(data);
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
  }

  static decodeTokens(data: Uint8Array): SteamSessionTokens {
    const response = steamapi.CAuthentication_PollAuthSessionStatus_Response.decode(data);
    return {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      accountName: response.accountName,
      agreementSessionUrl: response.agreementSessionUrl
    };
  }

  private static generatedGuardType(value: number): steamapi.EAuthSessionGuardType {
    switch (value) {
      case SteamGuardType.NONE: return steamapi.EAuthSessionGuardType.k_EAuthSessionGuardType_None;
      case SteamGuardType.EMAIL_CODE: return steamapi.EAuthSessionGuardType.k_EAuthSessionGuardType_EmailCode;
      case SteamGuardType.DEVICE_CODE: return steamapi.EAuthSessionGuardType.k_EAuthSessionGuardType_DeviceCode;
      case SteamGuardType.DEVICE_CONFIRMATION:
        return steamapi.EAuthSessionGuardType.k_EAuthSessionGuardType_DeviceConfirmation;
      case SteamGuardType.EMAIL_CONFIRMATION:
        return steamapi.EAuthSessionGuardType.k_EAuthSessionGuardType_EmailConfirmation;
      case SteamGuardType.MACHINE_TOKEN: return steamapi.EAuthSessionGuardType.k_EAuthSessionGuardType_MachineToken;
      case SteamGuardType.LEGACY_MACHINE_AUTH:
        return steamapi.EAuthSessionGuardType.k_EAuthSessionGuardType_LegacyMachineAuth;
      default: return steamapi.EAuthSessionGuardType.k_EAuthSessionGuardType_Unknown;
    }
  }
}
