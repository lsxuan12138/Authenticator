import { cryptoFramework } from '@kit.CryptoArchitectureKit';
import { Base32 } from './Base32';
import { TokenCode, TokenKind, TokenRecord } from '../domain/Token';

/**
 * TOTP/Steam Guard 验证码生成器。
 * 标准 Token 遵循 RFC 6238；Steam 使用相同 HMAC 结果，但映射为专用的 5 字符字母表。
 */
export class OtpEngine {
  private static readonly STEAM_ALPHABET: string = '23456789BCDFGHJKMNPQRTVWXY';

  static generate(token: TokenRecord, nowMilliseconds: number = Date.now()): TokenCode {
    const period = token.period > 0 ? token.period : 30;
    const seconds = Math.floor(nowMilliseconds / 1000);
    // counter 是从 Unix 时间起经过的 period 数，按 8 字节大端序参与 HMAC。
    const counter = Math.floor(seconds / period);
    const digest = OtpEngine.hmacSha1(Base32.decode(token.secret), OtpEngine.counterBytes(counter));
    // RFC 4226 动态截断：摘要末字节的低 4 bit 决定截取位置。
    const offset = digest[digest.length - 1] & 0x0f;
    let binary = ((digest[offset] & 0x7f) * 0x1000000) +
      ((digest[offset + 1] & 0xff) << 16) + ((digest[offset + 2] & 0xff) << 8) +
      (digest[offset + 3] & 0xff);
    let value = '';
    if (token.kind === TokenKind.STEAM) {
      // Steam 将截断后的整数反复除以专用字母表长度，得到 5 个字符。
      for (let index = 0; index < 5; index++) {
        value += OtpEngine.STEAM_ALPHABET[binary % OtpEngine.STEAM_ALPHABET.length];
        binary = Math.floor(binary / OtpEngine.STEAM_ALPHABET.length);
      }
    } else {
      const digits = token.digits === 8 ? 8 : 6;
      value = (binary % Math.pow(10, digits)).toString().padStart(digits, '0');
    }
    const elapsed = seconds % period;
    return { value: value, remainingSeconds: period - elapsed, progress: (period - elapsed) / period };
  }

  private static hmacSha1(secret: Uint8Array, message: Uint8Array): Uint8Array {
    // Crypto Architecture Kit 需要先把原始密钥字节转换为 HMAC 对称密钥对象。
    const generator = cryptoFramework.createSymKeyGenerator('HMAC');
    const key = generator.convertKeySync({ data: secret });
    const mac = cryptoFramework.createMac('SHA1');
    mac.initSync(key);
    mac.updateSync({ data: message });
    return mac.doFinalSync().data;
  }

  private static counterBytes(counter: number): Uint8Array {
    // 避免 JavaScript 位运算的 32 bit 截断，逐字节使用除法生成高位。
    const bytes = new Uint8Array(8);
    let value = counter;
    for (let index = 7; index >= 0; index--) {
      bytes[index] = value & 0xff;
      value = Math.floor(value / 256);
    }
    return bytes;
  }
}
