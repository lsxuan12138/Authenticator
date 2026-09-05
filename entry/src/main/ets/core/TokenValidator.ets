import { StoredToken, SteamGuardMetadata, TokenAlgorithm, TokenKind } from '../domain/Token';
import { Base32 } from './Base32';
import { TokenId } from './TokenId';
import { AppError } from './AppError';

/** Token 数据进入共享状态前的唯一运行时校验与规范化边界。 */
export class TokenValidator {
  /** 校验一条来自 JSON/Preferences 的记录，并返回不复用输入对象的规范化副本。 */
  static normalize(token: StoredToken): StoredToken {
    if (!token || typeof token.id !== 'string' || !TokenId.isUuid(token.id)) {
      throw new AppError('error_token_uuid_invalid', 'Token UUID is invalid');
    }
    if (typeof token.issuer !== 'string' || token.issuer.trim().length === 0 ||
      typeof token.account !== 'string' || token.account.trim().length === 0) {
      throw new AppError('error_token_identity_invalid', 'Token issuer or account is invalid');
    }
    if (typeof token.secret !== 'string') {
      throw new AppError('error_token_secret_invalid', 'Token secret is invalid');
    }
    const secret = Base32.normalize(token.secret);
    Base32.decode(secret);
    if (token.kind !== TokenKind.TOTP && token.kind !== TokenKind.STEAM) {
      throw new AppError('error_token_kind_invalid', 'Token kind is invalid');
    }
    if (!Number.isInteger(token.period) || token.period < 1 || token.period > 300) {
      throw new AppError('error_token_period_invalid', 'Token period is invalid');
    }
    const algorithm = token.algorithm ?? TokenAlgorithm.SHA1;
    if (algorithm !== TokenAlgorithm.SHA1 && algorithm !== TokenAlgorithm.SHA256 &&
      algorithm !== TokenAlgorithm.SHA512) {
      throw new AppError('error_token_algorithm_invalid', 'Token digest algorithm is invalid');
    }
    if (token.kind === TokenKind.STEAM ? token.digits !== 5 : token.digits !== 6 && token.digits !== 8) {
      throw new AppError('error_token_digits_invalid', 'Token code length is invalid');
    }
    if (!Number.isFinite(token.createdAt) || token.createdAt <= 0) {
      throw new AppError('error_token_created_invalid', 'Token creation time is invalid');
    }
    const normalized: StoredToken = {
      id: token.id.toLowerCase(),
      issuer: token.issuer.trim(),
      account: token.account.trim(),
      secret: secret,
      digits: token.kind === TokenKind.STEAM ? 5 : token.digits,
      period: token.kind === TokenKind.STEAM ? 30 : token.period,
      kind: token.kind,
      algorithm: token.kind === TokenKind.STEAM ? TokenAlgorithm.SHA1 : algorithm,
      iconPath: typeof token.iconPath === 'string' ? token.iconPath : '',
      iconManual: token.iconManual === true,
      createdAt: token.createdAt
    };
    if (token.kind !== TokenKind.STEAM && token.steam !== undefined) {
      throw new AppError('error_token_unexpected_steam_data', 'A standard TOTP token must not contain Steam metadata');
    }
    if (token.kind === TokenKind.STEAM && token.steam !== undefined) {
      normalized.steam = TokenValidator.normalizeSteam(token.steam);
    }
    return normalized;
  }

  /** 校验整个数组的 UUID 唯一性，避免损坏数据覆盖另一条记录。 */
  static normalizeAll(tokens: StoredToken[]): StoredToken[] {
    if (!Array.isArray(tokens)) {
      throw new AppError('error_token_data_invalid', 'Token data format is invalid');
    }
    const ids: Set<string> = new Set();
    return tokens.map((token: StoredToken): StoredToken => {
      const normalized = TokenValidator.normalize(token);
      if (ids.has(normalized.id)) {
        throw new AppError('error_token_duplicate_uuid', 'Token data contains duplicate UUIDs');
      }
      ids.add(normalized.id);
      return normalized;
    });
  }

  /** 校验 Steam 元信息字段类型；字段允许为空，以支持尚未完成联网配置的 Steam Token。 */
  private static normalizeSteam(metadata: SteamGuardMetadata): SteamGuardMetadata {
    if (!metadata || typeof metadata.steamId !== 'string' || typeof metadata.accountName !== 'string' ||
      typeof metadata.identitySecret !== 'string' || typeof metadata.deviceId !== 'string' ||
      typeof metadata.accessToken !== 'string' || typeof metadata.refreshToken !== 'string' ||
      typeof metadata.revocationCode !== 'string') {
      throw new AppError('error_steam_metadata_invalid', 'Steam metadata format is invalid');
    }
    return {
      steamId: metadata.steamId.trim(),
      accountName: metadata.accountName.trim(),
      identitySecret: metadata.identitySecret,
      deviceId: metadata.deviceId.trim(),
      accessToken: metadata.accessToken,
      refreshToken: metadata.refreshToken,
      guardData: typeof metadata.guardData === 'string' ? metadata.guardData : '',
      revocationCode: metadata.revocationCode,
      serialNumber: typeof metadata.serialNumber === 'string' ? metadata.serialNumber : undefined,
      tokenGid: typeof metadata.tokenGid === 'string' ? metadata.tokenGid : undefined,
      uri: typeof metadata.uri === 'string' ? metadata.uri : undefined,
      secret1: typeof metadata.secret1 === 'string' ? metadata.secret1 : undefined
    };
  }
}
