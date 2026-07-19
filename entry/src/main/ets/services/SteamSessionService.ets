import { util } from '@kit.ArkTS';
import { SteamWebApiClient } from './SteamWebApiClient';

export interface SteamAccessTokenPair {
  accessToken: string;
  refreshToken: string;
}

interface SteamCachedAccessToken {
  token: string;
  expiresAt: number;
}

/** 管理 Steam 会话令牌的解析、短期缓存和显式轮换。 */
export class SteamSessionService {
  private static readonly EXPIRY_MARGIN: number = 120000;
  private static readonly accessTokens: Map<string, SteamCachedAccessToken> = new Map();

  /** 仅解析 JWT 的 exp 用于本地有效期提示，不把未验签载荷用于身份判断。 */
  static tokenExpiresAt(token: string): number {
    try {
      const parts = token.split('.');
      if (parts.length < 2) {
        return 0;
      }
      const bytes = new util.Base64Helper().decodeSync(parts[1], util.Type.BASIC_URL_SAFE);
      const payload = JSON.parse(new util.TextDecoder().decodeToString(bytes)) as Record<string, Object>;
      return Number(payload['exp'] ?? 0) * 1000;
    } catch (_) {
      return 0;
    }
  }

  static tokenStatus(token: string): string {
    const expiresAt = SteamSessionService.tokenExpiresAt(token);
    if (expiresAt === 0) {
      return token.length > 0 ? '无法读取有效期' : '未配置';
    }
    const remaining = expiresAt - Date.now();
    if (remaining <= 0) {
      return `已于 ${new Date(expiresAt).toLocaleString()} 过期`;
    }
    const hours = Math.floor(remaining / 3600000);
    const days = Math.floor(hours / 24);
    return `有效至 ${new Date(expiresAt).toLocaleString()}（约 ${days > 0 ? `${days} 天` : `${hours} 小时`}）`;
  }

  /** 优先复用仍有效的现有 Access Token，仅在需要时使用 Refresh Token 换新。 */
  async accessToken(steamId: string, currentAccessToken: string, refreshToken: string): Promise<string> {
    if (!steamId) {
      throw new Error('缺少 Steam ID');
    }
    if (this.isUsable(currentAccessToken)) {
      this.remember(steamId, currentAccessToken);
      return currentAccessToken;
    }
    const cached = SteamSessionService.accessTokens.get(steamId);
    if (cached && cached.expiresAt - SteamSessionService.EXPIRY_MARGIN > Date.now()) {
      return cached.token;
    }
    if (cached) {
      SteamSessionService.accessTokens.delete(steamId);
    }
    if (!refreshToken) {
      if (currentAccessToken.length > 0) {
        const expiresAt = SteamSessionService.tokenExpiresAt(currentAccessToken);
        if (expiresAt > 0 && expiresAt - SteamSessionService.EXPIRY_MARGIN <= Date.now()) {
          throw new Error('Steam Access Token 已过期且没有 Refresh Token，请重新登录或导入完整会话');
        }
        // 兼容旧备份中无法解析为 JWT、但服务端仍可能接受的 Access Token。
        return currentAccessToken;
      }
      throw new Error('Steam 会话缺少 Access Token 或 Refresh Token');
    }
    return (await this.generate(steamId, refreshToken, false)).accessToken;
  }

  /** 强制换取新 Access Token；用户显式更新会话时允许 Steam 同时轮换 Refresh Token。 */
  async refresh(steamId: string, refreshToken: string,
    allowRenewal: boolean = false): Promise<SteamAccessTokenPair> {
    if (!steamId || !refreshToken) {
      throw new Error('缺少 Steam ID 或 Refresh Token');
    }
    return this.generate(steamId, refreshToken, allowRenewal);
  }

  /** 调用 Steam 表单接口换取令牌，并缓存可解析有效期的 Access Token。 */
  private async generate(steamId: string, refreshToken: string,
    allowRenewal: boolean): Promise<SteamAccessTokenPair> {
    const url = 'https://api.steampowered.com/IAuthenticationService/GenerateAccessTokenForApp/v1/';
    const data = `refresh_token=${encodeURIComponent(refreshToken)}` +
      `&steamid=${encodeURIComponent(steamId)}&renewal_type=${allowRenewal ? 1 : 0}`;
    const root = await SteamWebApiClient.postFormJson('更新 Access Token', url, data, {
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const value: Object | undefined = root['response'];
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw new Error('Steam 未返回 Access Token 响应');
    }
    const response = value as Record<string, Object>;
    const tokens: SteamAccessTokenPair = {
      accessToken: String(response['access_token'] ?? ''),
      refreshToken: String(response['refresh_token'] ?? '')
    };
    if (!tokens.accessToken) {
      throw new Error('Steam 未返回 Access Token');
    }
    this.remember(steamId, tokens.accessToken);
    return tokens;
  }

  /** 判断令牌在预留两分钟安全余量后是否仍可使用。 */
  private isUsable(token: string): boolean {
    const expiresAt = SteamSessionService.tokenExpiresAt(token);
    return expiresAt - SteamSessionService.EXPIRY_MARGIN > Date.now();
  }

  /** 只缓存能够读取过期时间的令牌，避免永久保留不可判断的凭据。 */
  private remember(steamId: string, token: string): void {
    const expiresAt = SteamSessionService.tokenExpiresAt(token);
    if (expiresAt > 0) {
      SteamSessionService.accessTokens.set(steamId, { token: token, expiresAt: expiresAt });
    }
  }
}
