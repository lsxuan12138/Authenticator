import { describe, expect, it } from '@ohos/hypium';
import {
  CAuthentication_BeginAuthSessionViaCredentials_Request,
  CTwoFactor_AddAuthenticator_Request,
  CTwoFactor_Time_Request,
  EAuthTokenAppType,
  EAuthTokenPlatformType,
  ESessionPersistence
} from '../main/ets/services/protobuf/steam_auth';
import { SteamImportService } from '../main/ets/services/SteamImportService';
import { SteamProtocol } from '../main/ets/services/SteamProtocol';

/** 固定关键协议字段，避免上游 proto 同步或生成器变更悄悄改变 Steam 请求。 */
export default function steamProtocolTest(): void {
  describe('SteamProtocol', (): void => {
    it('encodes mobile persistent credential sessions', 0, (): void => {
      const bytes = SteamProtocol.encodeBeginSession('tester', 'encrypted', '123456', 'guard');
      const request = CAuthentication_BeginAuthSessionViaCredentials_Request.decode(bytes);

      expect(request.accountName).assertEqual('tester');
      expect(request.encryptionTimestamp.toString()).assertEqual('123456');
      expect(request.platformType).assertEqual(EAuthTokenPlatformType.k_EAuthTokenPlatformType_MobileApp);
      expect(request.persistence).assertEqual(ESessionPersistence.k_ESessionPersistence_Persistent);
      expect(request.websiteId).assertEqual('Mobile');
      expect(request.guardData).assertEqual('guard');
      expect(request.deviceDetails !== null && request.deviceDetails !== undefined).assertTrue();
      if (request.deviceDetails !== null && request.deviceDetails !== undefined) {
        expect(request.deviceDetails.appType)
          .assertEqual(EAuthTokenAppType.k_EAuthTokenAppType_Mobile_SteamApp);
      }
    });

    it('encodes time probes without losing Unix seconds', 0, (): void => {
      const bytes = SteamProtocol.encodeTime(2000000000);
      const request = CTwoFactor_Time_Request.decode(bytes);

      expect(request.senderTime.toString()).assertEqual('2000000000');
    });

    it('encodes authenticator identity and client time', 0, (): void => {
      const bytes = SteamProtocol.encodeAddAuthenticator('76561198000000000', 'android:test', 1234567890);
      const request = CTwoFactor_AddAuthenticator_Request.decode(bytes);

      expect(request.steamid.toString()).assertEqual('76561198000000000');
      expect(request.authenticatorTime.toString()).assertEqual('1234567890');
      expect(request.deviceIdentifier).assertEqual('android:test');
      expect(request.version).assertEqual(1);
    });

    it('imports numeric Steam IDs without precision loss', 0, (): void => {
      const imported = SteamImportService.parse(`{
        "account_name":"tester",
        "steam_id":76561198000000000,
        "shared_secret":"AQIDBA==",
        "identity_secret":"BQYHCA==",
        "device_id":"android:test",
        "tokens":{"refresh_token":"refresh"}
      }`);

      expect(imported.metadata.steamId).assertEqual('76561198000000000');
      expect(imported.metadata.refreshToken).assertEqual('refresh');
      expect(imported.sharedSecret).assertEqual('AQIDBA==');
    });
  });
}
