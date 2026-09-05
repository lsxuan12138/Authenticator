import { StoredToken, SteamGuardMetadata, TokenAlgorithm, TokenKind } from '../domain/Token';
import { Base32 } from './Base32';
import { TokenId } from './TokenId';

/** Token 数据进入共享状态前的唯一运行时校验与规范化边界。 */
export class TokenValidator {
  /** 校验一条来自 JSON/Preferences 的记录，并返回不复用输入对象的规范化副本。 */
  static normalize(token: StoredToken): StoredToken {
    if (!token || typeof token.id !== 'string' || !TokenId.isUuid(token.id)) {
      throw new Error('Token UUID 无效');
    }
    if (typeof token.issuer !== 'string' || token.issuer.trim().length === 0 ||
      typeof token.account !== 'string' || token.account.trim().length === 0) {
      throw new Error('Token 的服务名称或账户无效');
    }
    if (typeof token.secret !== 'string') {
      throw new Error('Token 密钥无效');
    }
    const secret = Base32.normalize(token.secret);
    Base32.decode(secret);
    if (token.kind !== TokenKind.TOTP && token.kind !== TokenKind.STEAM) {
      throw new Error('Token 类型无效');
    }
    if (!Number.isInteger(token.period) || token.period < 1 || token.period > 300) {
      throw new Error('Token 刷新周期无效');
    }
    const algorithm = token.algorithm ?? TokenAlgorithm.SHA1;
    if (algorithm !== TokenAlgorithm.SHA1 && algorithm !== TokenAlgorithm.SHA256 &&
      algorithm !== TokenAlgorithm.SHA512) {
      throw new Error('Token 摘要算法无效');
    }
    if (token.kind === TokenKind.STEAM ? token.digits !== 5 : token.digits !== 6 && token.digits !== 8) {
      throw new Error('Token 验证码位数无效');
    }
    if (!Number.isFinite(token.createdAt) || token.createdAt <= 0) {
      throw new Error('Token 创建时间无效');
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
      throw new Error('普通 TOTP 不应包含 Steam 元信息');
    }
    if (token.kind === TokenKind.STEAM && token.steam !== undefined) {
      normalized.steam = TokenValidator.normalizeSteam(token.steam);
    }
    return normalized;
  }

  /** 校验整个数组的 UUID 唯一性，避免损坏数据覆盖另一条记录。 */
  static normalizeAll(tokens: StoredToken[]): StoredToken[] {
    if (!Array.isArray(tokens)) {
      throw new Error('Token 数据格式无效');
    }
    const ids: Set<string> = new Set();
    return tokens.map((token: StoredToken): StoredToken => {
      const normalized = TokenValidator.normalize(token);
      if (ids.has(normalized.id)) {
        throw new Error('Token 数据包含重复 UUID');
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
      throw new Error('Steam 元信息格式无效');
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
