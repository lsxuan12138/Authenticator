import { uri } from '@kit.ArkTS';
import { StoredToken, TokenKind } from '../domain/Token';
import { Base32 } from './Base32';
import { TokenId } from './TokenId';

/** 解析 otpauth://totp URI，并把外部参数收敛为应用内部的 StoredToken。 */
export class OtpUriParser {
  static parse(rawValue: string): StoredToken {
    const parsed = new uri.URI(rawValue.trim());
    if (parsed.scheme !== 'otpauth' || parsed.host !== 'totp') {
      throw new Error('仅支持 otpauth://totp 格式');
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
    const parsedPeriod = Number.parseInt(parsed.getQueryValue('period') ?? '30');
    // 30 秒只是默认值；保留合法的自定义周期，同时限制异常 URI 的极端值。
    const period = Number.isNaN(parsedPeriod) || parsedPeriod <= 0 ? 30 : Math.min(parsedPeriod, 300);
    return {
      id: OtpUriParser.createId(),
      issuer: issuer,
      account: account,
      secret: secret,
      digits: kind === TokenKind.STEAM ? 5 : (parsed.getQueryValue('digits') === '8' ? 8 : 6),
      period: period,
      kind: kind,
      iconPath: '',
      createdAt: Date.now()
    };
  }

  static createId(): string {
    return TokenId.create();
  }

  /** 根据当前 Token 字段重建可迁移的 otpauth URI；二维码与该 URI 都等同于泄露密钥。 */
  static serialize(token: StoredToken): string {
    const label = encodeURIComponent(`${token.issuer}:${token.account}`);
    const issuer = encodeURIComponent(token.issuer);
    const secret = encodeURIComponent(Base32.normalize(token.secret));
    const digits = token.kind === TokenKind.STEAM ? 5 : token.digits;
    const period = token.kind === TokenKind.STEAM ? 30 : token.period;
    return `otpauth://totp/${label}?secret=${secret}&issuer=${issuer}` +
      `&algorithm=SHA1&digits=${digits}&period=${period}`;
  }
}
