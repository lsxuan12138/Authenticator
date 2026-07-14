/** Token 算法类型；Steam 使用独立的 5 字符显示规则。 */
export enum TokenKind {
  TOTP = 'totp',
  STEAM = 'steam'
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
   * Steam 登录成功后返回的设备信任凭据（Guard Data）。它不是 Device ID，也不参与验证码生成；
   * 后续凭据登录会把它原样交还 Steam，以减少重复验证。通常为有有效期的 JWT，按会话凭据保护。
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
