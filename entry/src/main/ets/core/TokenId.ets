import { util } from '@kit.ArkTS';

/**
 * Token 唯一标识工具。
 * 每个 Token 创建时生成随机 UUID，备份恢复时沿用该 UUID 作为合并主键。
 */
export class TokenId {
  private static readonly UUID_PATTERN: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  /** 创建用于持久化记录身份的随机 UUID。 */
  static create(): string {
    return util.generateRandomUUID();
  }

  /** 验证恢复或读取的数据是否使用受支持的 UUID 格式。 */
  static isUuid(value: string): boolean {
    return TokenId.UUID_PATTERN.test(value);
  }
}
