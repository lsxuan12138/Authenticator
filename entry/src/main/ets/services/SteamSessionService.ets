import { util } from '@kit.ArkTS';
import { SteamWebApiClient } from './SteamWebApiClient';
import { AppError } from '../core/AppError';

export interface SteamAccessTokenPair {
  accessToken: string;
  refreshToken: string;
}

interface SteamCachedAccessToken {
  token: string;
  expiresAt: number;
}

export enum SteamTokenLifetimeState {
  NOT_CONFIGURED = 'not_configured',
  UNKNOWN = 'unknown',
  VALID = 'valid',
  EXPIRED = 'expired'
}

/** 供界面本地化展示的令牌有效期原始数据，不在服务层拼接自然语言。 */
export interface SteamTokenLifetime {
  state: SteamTokenLifetimeState;
  expiresAt: number;
  distanceMillis: number;
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

  /** 返回有效期状态和时间差，由 UI 按当前语言统一生成文案。 */
  static tokenLifetime(token: string): SteamTokenLifetime {
    const expiresAt = SteamSessionService.tokenExpiresAt(token);
    if (expiresAt === 0) {
      return {
        state: token.length > 0 ? SteamTokenLifetimeState.UNKNOWN : SteamTokenLifetimeState.NOT_CONFIGURED,
        expiresAt: 0,
        distanceMillis: 0
      };
    }
    const remaining = expiresAt - Date.now();
    return {
      state: remaining > 0 ? SteamTokenLifetimeState.VALID : SteamTokenLifetimeState.EXPIRED,
      expiresAt: expiresAt,
      distanceMillis: Math.abs(remaining)
    };
  }

  /** 优先复用仍有效的现有 Access Token，仅在需要时使用 Refresh Token 换新。 */
  async accessToken(steamId: string, currentAccessToken: string, refreshToken: string): Promise<string> {
    if (!steamId) {
      throw new AppError('steam_error_id_missing', 'Steam ID is missing');
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
          throw new AppError('steam_error_access_expired',
            'Steam Access Token expired and no Refresh Token is available');
        }
        // 兼容旧备份中无法解析为 JWT、但服务端仍可能接受的 Access Token。
        return currentAccessToken;
      }
      throw new AppError('steam_error_session_tokens_missing',
        'Steam session is missing an Access Token or Refresh Token');
    }
    return (await this.generate(steamId, refreshToken, false)).accessToken;
  }

  /** 强制换取新 Access Token；用户显式更新会话时允许 Steam 同时轮换 Refresh Token。 */
  async refresh(steamId: string, refreshToken: string,
    allowRenewal: boolean = false): Promise<SteamAccessTokenPair> {
    if (!steamId || !refreshToken) {
      throw new AppError('steam_error_refresh_data_missing', 'Steam ID or Refresh Token is missing');
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
      throw new AppError('steam_error_access_response_missing', 'Steam did not return an Access Token response');
    }
    const response = value as Record<string, Object>;
    const tokens: SteamAccessTokenPair = {
      accessToken: String(response['access_token'] ?? ''),
      refreshToken: String(response['refresh_token'] ?? '')
    };
    if (!tokens.accessToken) {
      throw new AppError('steam_error_access_missing', 'Steam did not return an Access Token');
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
