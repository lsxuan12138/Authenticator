/** Token 算法类型；Steam 使用独立的 5 字符显示规则。 */
export enum TokenKind {
  TOTP = 'totp',
  STEAM = 'steam'
}

/** 主流 otpauth TOTP 使用的 HMAC 摘要算法。 */
export enum TokenAlgorithm {
  SHA1 = 'SHA1',
  SHA256 = 'SHA256',
  SHA512 = 'SHA512'
}

/** 本地 Token 核心字段；数组顺序同时就是首页展示顺序。 */
export interface TokenRecord {
  id: string;
  issuer: string;
  account: string;
  secret: string;
  digits: number;
  period: number;
  kind: TokenKind;
  algorithm?: TokenAlgorithm;

  // 仅保存用户手动选择的本机图标路径；自动匹配结果不持久化，也不进入备份。
  iconPath: string;
  iconManual?: boolean;
  createdAt: number;
}

export interface TokenCode {
  value: string;
  remainingSeconds: number;
  progress: number;
}

export interface SteamGuardMetadata {
  steamId: string;
  accountName: string;
  identitySecret: string;
  deviceId: string;
  accessToken: string;
  refreshToken: string;
  /**
   * Steam 凭据登录可能返回的兼容性登录数据。MobileApp 类型会话通常不会下发该字段；
   * 它不是 Device ID、不参与验证码生成，也不能按 JWT 计算有效期。若存在则加密保存并在后续登录时原样提交。
   */
  guardData?: string;
  revocationCode: string;
  serialNumber?: string;
  tokenGid?: string;
  uri?: string;
  secret1?: string;
}

export interface StoredToken extends TokenRecord {
  steam?: SteamGuardMetadata;
}
