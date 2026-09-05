import { uri } from '@kit.ArkTS';
import { StoredToken, TokenAlgorithm, TokenKind } from '../domain/Token';
import { Base32 } from './Base32';
import { TokenId } from './TokenId';
import { AppError } from './AppError';

/** 解析 otpauth://totp URI，并把外部参数收敛为应用内部的 StoredToken。 */
export class OtpUriParser {
  /** 校验并解析 otpauth URI，自动识别 Steam issuer 并生成新的记录 UUID。 */
  static parse(rawValue: string): StoredToken {
    const parsed = new uri.URI(rawValue.trim());
    if (parsed.scheme !== 'otpauth' || parsed.host !== 'totp') {
      throw new AppError('error_uri_totp_only', 'Only otpauth://totp URIs are supported');
    }
    const secret = Base32.normalize(parsed.getQueryValue('secret') ?? '');
    Base32.decode(secret);
    let label = decodeURIComponent(parsed.path.startsWith('/') ? parsed.path.substring(1) : parsed.path);
    // 常见标签格式为 issuer:account；query 中显式提供的 issuer 优先级更高。
    const separator = label.indexOf(':');
    const labelIssuer = separator >= 0 ? label.substring(0, separator) : '';
    const account = separator >= 0 ? label.substring(separator + 1) : label;
    const issuer = parsed.getQueryValue('issuer') ?? labelIssuer;
    const kind = issuer.trim().toLowerCase() === 'steam' ? TokenKind.STEAM : TokenKind.TOTP;
    const periodValue = parsed.getQueryValue('period') ?? '30';
    const period = Number(periodValue);
    // URI 是密钥配置，不能静默截断或替换非法值，否则导入后会稳定地产生错误验证码。
    if (!Number.isInteger(period) || period < 1 || period > 300) {
      throw new AppError('error_uri_period_unsupported', `Unsupported OTP period: ${periodValue}`, [periodValue]);
    }
    if (issuer.trim().length === 0 || account.trim().length === 0) {
      throw new AppError('error_uri_identity_missing', 'OTP URI is missing an issuer or account name');
    }
    // Steam 的标准迁移 URI 使用 5 位验证码；普通 TOTP 仅接受应用支持的 6/8 位。
    const digitsValue = parsed.getQueryValue('digits') ?? (kind === TokenKind.STEAM ? '5' : '6');
    const digits = Number(digitsValue);
    const digitsSupported = kind === TokenKind.STEAM ? digits === 5 : digits === 6 || digits === 8;
    if (!Number.isInteger(digits) || !digitsSupported) {
      throw new AppError('error_uri_digits_unsupported', `Unsupported OTP digits: ${digitsValue}`, [digitsValue]);
    }
    const algorithm = OtpUriParser.parseAlgorithm(parsed.getQueryValue('algorithm') ?? 'SHA1');
    return {
      id: OtpUriParser.createId(),
      issuer: issuer.trim(),
      account: account.trim(),
      secret: secret,
      digits: kind === TokenKind.STEAM ? 5 : digits,
      period: kind === TokenKind.STEAM ? 30 : period,
      kind: kind,
      algorithm: kind === TokenKind.STEAM ? TokenAlgorithm.SHA1 : algorithm,
      iconPath: '',
      createdAt: Date.now()
    };
  }

  /** 为新 Token 创建随机 UUID；配置去重由 TokenDuplicateGuard 单独负责。 */
  static createId(): string {
    return TokenId.create();
  }

  /** 根据当前 Token 字段重建可迁移的 otpauth URI；二维码与该 URI 都等同于泄露密钥。 */
  static serialize(token: StoredToken): string {
    const label = encodeURIComponent(`${token.issuer}:${token.account}`);
    const issuer = encodeURIComponent(token.issuer);
    const secret = encodeURIComponent(Base32.normalize(token.secret));
    const digits = token.kind === TokenKind.STEAM ? 5 : token.digits;
    const algorithm = token.kind === TokenKind.STEAM ? TokenAlgorithm.SHA1 :
      (token.algorithm ?? TokenAlgorithm.SHA1);
    const period = token.kind === TokenKind.STEAM ? 30 : token.period;
    return `otpauth://totp/${label}?secret=${secret}&issuer=${issuer}` +
      `&algorithm=${encodeURIComponent(algorithm)}&digits=${digits}&period=${period}`;
  }

  /** 兼容 URI 中 SHA-256、sha256 等常见拼写差异。 */
  private static parseAlgorithm(value: string): TokenAlgorithm {
    const normalized = value.trim().toUpperCase().replace(/[-_]/g, '');
    const algorithms: TokenAlgorithm[] = [TokenAlgorithm.SHA1, TokenAlgorithm.SHA256, TokenAlgorithm.SHA512];
    const matched = algorithms.find((item: TokenAlgorithm): boolean => item === normalized);
    if (!matched) {
      throw new AppError('error_uri_algorithm_unsupported', `Unsupported OTP digest algorithm: ${value}`, [value]);
    }
    return matched;
  }
}
