import { describe, expect, it } from '@ohos/hypium';
import { Base32 } from '../main/ets/core/Base32';
import { TokenDuplicateGuard } from '../main/ets/core/TokenDuplicateGuard';
import { OtpUriCandidate, OtpUriParser } from '../main/ets/core/OtpUriParser';
import { StoredToken, TokenAlgorithm, TokenKind } from '../main/ets/domain/Token';
import { BackupMergeResult, BackupService } from '../main/ets/services/BackupService';

/** 构造不依赖系统能力的固定 Token，供纯逻辑单元测试复用。 */
function createToken(id: string, account: string = 'alice', secret: string = 'JBSWY3DPEHPK3PXP'): StoredToken {
  return {
    id: id,
    issuer: 'Example',
    account: account,
    secret: secret,
    digits: 6,
    period: 30,
    kind: TokenKind.TOTP,
    algorithm: TokenAlgorithm.SHA1,
    iconPath: '',
    iconManual: false,
    createdAt: 1700000000000
  };
}

/** 验证不需要 HarmonyOS 原生运行时的编码、去重和备份合并规则。 */
export default function localUnitTest(): void {
  describe('CoreLogic', (): void => {
    it('decodes canonical unpadded Base32', 0, (): void => {
      const bytes = Base32.decode('MY');
      expect(bytes.length).assertEqual(1);
      expect(bytes[0]).assertEqual(102);
    });

    it('rejects incomplete or non-canonical Base32', 0, (): void => {
      let shortRejected = false;
      let paddingRejected = false;
      try { Base32.decode('A'); } catch (_error) { shortRejected = true; }
      try { Base32.decode('MZ'); } catch (_error) { paddingRejected = true; }
      expect(shortRejected).assertTrue();
      expect(paddingRejected).assertTrue();
    });

    it('compares OTP configuration independently from UUID', 0, (): void => {
      const left = createToken('11111111-1111-4111-8111-111111111111');
      const right = createToken('22222222-2222-4222-8222-222222222222');
      expect(TokenDuplicateGuard.isSameConfiguration(left, right)).assertTrue();
    });

    it('extracts and normalizes multiple OTP URI lines', 0, (): void => {
      const input = '说明文字\n"otpauth://totp/Example:alice?secret=MY&amp;issuer=Example"\n\n' +
        'otpauth%3A%2F%2Ftotp%2FExample%3Abob%3Fsecret%3DMY%26issuer%3DExample';
      const candidates: OtpUriCandidate[] = OtpUriParser.candidates(input);
      expect(candidates.length).assertEqual(2);
      expect(candidates[0].lineNumber).assertEqual(2);
      expect(candidates[0].value.includes('&amp;')).assertFalse();
      expect(candidates[1].lineNumber).assertEqual(4);
      expect(OtpUriParser.parse(candidates[1].value).account).assertEqual('bob');
    });

    it('skips same OTP configuration with a different backup UUID', 0, (): void => {
      const current = createToken('11111111-1111-4111-8111-111111111111');
      const duplicate = createToken('22222222-2222-4222-8222-222222222222');
      const result: BackupMergeResult = BackupService.merge([current], [duplicate]);
      expect(result.tokens.length).assertEqual(1);
      expect(result.added).assertEqual(0);
      expect(result.updated).assertEqual(0);
      expect(result.skipped).assertEqual(1);
    });

    it('updates matching UUID in place during backup restore', 0, (): void => {
      const id = '11111111-1111-4111-8111-111111111111';
      const result: BackupMergeResult = BackupService.merge([createToken(id)], [createToken(id, 'bob')]);
      expect(result.tokens.length).assertEqual(1);
      expect(result.tokens[0].account).assertEqual('bob');
      expect(result.updated).assertEqual(1);
      expect(result.skipped).assertEqual(0);
    });

    it('does not update a UUID into another existing OTP configuration', 0, (): void => {
      const firstId = '11111111-1111-4111-8111-111111111111';
      const secondId = '22222222-2222-4222-8222-222222222222';
      const first = createToken(firstId, 'alice');
      const second = createToken(secondId, 'bob', 'GEZDGNBVGY3TQOJQ');
      const conflictingUpdate = createToken(secondId, 'alice');
      const result: BackupMergeResult = BackupService.merge([first, second], [conflictingUpdate]);
      expect(result.tokens.length).assertEqual(2);
      expect(result.tokens[1].account).assertEqual('bob');
      expect(result.updated).assertEqual(0);
      expect(result.skipped).assertEqual(1);
    });
  });
}
