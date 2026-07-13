/**
 * RFC 4648 Base32 编解码工具。
 * OTP 密钥通常省略填充符，因此 normalize() 会统一大小写并移除常见分隔字符。
 */
export class Base32 {
  private static readonly ALPHABET: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  static normalize(value: string): string {
    return value.toUpperCase().replaceAll(' ', '').replaceAll('-', '').replaceAll('=', '');
  }

  static decode(value: string): Uint8Array {
    const input = Base32.normalize(value);
    if (input.length === 0) {
      throw new Error('密钥不能为空');
    }
    let buffer = 0;
    let bits = 0;
    const bytes: number[] = [];
    // 每个 Base32 字符携带 5 bit；累积满 8 bit 后输出一个字节。
    for (let index = 0; index < input.length; index++) {
      const digit = Base32.ALPHABET.indexOf(input[index]);
      if (digit < 0) {
        throw new Error(`密钥包含无效字符：${input[index]}`);
      }
      buffer = (buffer << 5) | digit;
      bits += 5;
      if (bits >= 8) {
        bits -= 8;
        bytes.push((buffer >> bits) & 0xff);
      }
    }
    return new Uint8Array(bytes);
  }

  static encode(data: Uint8Array): string {
    let buffer = 0;
    let bits = 0;
    let result = '';
    // maFile 的 shared_secret 是原始字节，应用内部统一转换为无填充 Base32。
    for (let index = 0; index < data.length; index++) {
      buffer = (buffer << 8) | data[index];
      bits += 8;
      while (bits >= 5) {
        bits -= 5;
        result += Base32.ALPHABET[(buffer >> bits) & 31];
      }
    }
    if (bits > 0) result += Base32.ALPHABET[(buffer << (5 - bits)) & 31];
    return result;
  }
}
