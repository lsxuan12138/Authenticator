import { StoredToken } from '../domain/Token';
import { Base32 } from './Base32';

/**
 * UUID 表示本地记录身份；配置重复检查则比较用户实际导入的 OTP 参数。
 * 两者职责分离，避免用密钥派生稳定标识造成隐私和编辑语义问题。
 */
export class TokenDuplicateGuard {
  /** 比较决定验证码结果的配置字段，忽略 UUID、排序和图标等展示信息。 */
  static isSameConfiguration(left: StoredToken, right: StoredToken): boolean {
    return left.kind === right.kind &&
      left.issuer.trim().toLowerCase() === right.issuer.trim().toLowerCase() &&
      left.account.trim() === right.account.trim() &&
      Base32.normalize(left.secret) === Base32.normalize(right.secret) &&
      left.digits === right.digits &&
      left.period === right.period;
  }

  /** 在所有新增和恢复入口提交前阻止重复配置进入仓库。 */
  static assertCanAdd(tokens: StoredToken[], candidate: StoredToken): void {
    if (tokens.some((token: StoredToken) => TokenDuplicateGuard.isSameConfiguration(token, candidate))) {
      throw new Error(`Token 已存在：${candidate.issuer} · ${candidate.account}`);
    }
  }
}
