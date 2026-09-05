import { common } from '@kit.AbilityKit';
import { preferences } from '@kit.ArkData';
import { fileIo as fs } from '@kit.CoreFileKit';
import { SteamSessionService } from './SteamSessionService';
import { SteamWebApiClient } from './SteamWebApiClient';
import { DiagnosticLogService } from './DiagnosticLogService';
import { BusinessError } from '@kit.BasicServicesKit';

export interface SteamProfile {
  steamId: string;
  displayName: string;
  avatarUrl: string;
  avatarPath: string;
  updatedAt: number;
}

/** 获取并缓存 Steam Community 的公开昵称和头像；网络失败时优先返回过期缓存。 */
export class SteamProfileService {
  private static readonly STORE_NAME: string = 'authenticator_steam_profiles';
  private static readonly KEY: string = 'profiles_v1';
  private static readonly TTL: number = 12 * 60 * 60 * 1000;

  /** 优先读取 12 小时内的缓存；过期或强制刷新时联网更新昵称和头像。 */
  async load(context: common.UIAbilityContext, steamId: string, accessToken: string,
    refreshToken: string, forceRefresh: boolean = false): Promise<SteamProfile> {
    const profiles = await this.read(context);
    const cached = profiles.find((item: SteamProfile): boolean => item.steamId === steamId);
    if (!forceRefresh && cached && Date.now() - cached.updatedAt < SteamProfileService.TTL) {
      return cached;
    }
    try {
      const usableToken = await new SteamSessionService().accessToken(steamId, accessToken, refreshToken);
      const xml = await SteamWebApiClient.getText('账户公开资料',
        `https://steamcommunity.com/profiles/${steamId}?xml=1`, {
          'Cookie': `steamid=${steamId};steamLoginSecure=${steamId}||${usableToken}`,
          'Accept': 'application/xml'
        });
      const displayName = this.xmlValue(xml, 'steamID');
      const avatarUrl = this.xmlValue(xml, 'avatarMedium') || this.xmlValue(xml, 'avatarFull');
      let avatarPath = cached?.avatarPath ?? '';
      if (avatarUrl.length > 0) {
        try {
          avatarPath = this.saveAvatar(context, steamId,
            await SteamWebApiClient.getBytes('账户头像', avatarUrl));
        } catch (error) {
          DiagnosticLogService.warn('SteamProfile', `Avatar cache failed: ${(error as Error).message}`);
        }
      }
      const profile: SteamProfile = { steamId, displayName, avatarUrl, avatarPath, updatedAt: Date.now() };
      const next = profiles.filter((item: SteamProfile): boolean => item.steamId !== steamId);
      next.push(profile);
      await this.write(context, next);
      return profile;
    } catch (error) {
      if (cached) {
        DiagnosticLogService.warn('SteamProfile', `Using stale profile cache: ${(error as Error).message}`);
        return cached;
      }
      throw new Error((error as Error).message ?? '读取 Steam 账户资料失败');
    }
  }

  /** Token 删除后移除对应的公开资料记录与头像缓存，避免账户数据长期残留。 */
  async remove(context: common.UIAbilityContext, steamId: string): Promise<void> {
    const profiles = await this.read(context);
    const removed = profiles.find((item: SteamProfile): boolean => item.steamId === steamId);
    await this.write(context,
      profiles.filter((item: SteamProfile): boolean => item.steamId !== steamId));
    if (removed?.avatarPath) {
      try {
        if (this.exists(removed.avatarPath)) fs.unlinkSync(removed.avatarPath);
      } catch (error) {
        DiagnosticLogService.warn('SteamProfile',
          `Failed to remove avatar cache for Steam ID ${steamId}: ${(error as Error).message}`);
      }
    }
  }

  /** 从普通文本或 CDATA 节点读取字段并还原常用 XML 实体。 */
  private xmlValue(xml: string, tag: string): string {
    const expression = new RegExp(`<${tag}>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))<\\/${tag}>`, 'i');
    const match = expression.exec(xml);
    return (match?.[1] ?? match?.[2] ?? '').trim()
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  }

  /** 将头像写入应用缓存目录；头像丢失不会影响资料文本缓存。 */
  private saveAvatar(context: common.UIAbilityContext, steamId: string, bytes: Uint8Array): string {
    try {
      const directory = `${context.cacheDir}/steam_profiles`;
      if (!this.exists(directory)) fs.mkdirSync(directory);
      const path = `${directory}/${steamId}.avatar`;
      const file = fs.openSync(path, fs.OpenMode.WRITE_ONLY | fs.OpenMode.CREATE | fs.OpenMode.TRUNC);
      try {
        fs.writeSync(file.fd, bytes.buffer);
      } finally {
        try { fs.closeSync(file); } catch (_error) {}
      }
      return path;
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`缓存 Steam 头像失败：${detail.message ?? '未知错误'}`);
    }
  }

  /** 把文件系统的“路径不存在”异常收敛为布尔值。 */
  private exists(path: string): boolean {
    try { return fs.accessSync(path); } catch (_error) { return false; }
  }

  /** 解密并解析全部公开资料缓存；损坏缓存会被清除后按空集合处理。 */
  private async read(context: common.UIAbilityContext): Promise<SteamProfile[]> {
    try {
      const store = await preferences.getPreferences(context, SteamProfileService.STORE_NAME);
      const raw = await store.get(SteamProfileService.KEY, '[]') as string;
      try {
        const parsed = JSON.parse(raw) as SteamProfile[];
        if (!Array.isArray(parsed)) throw new Error('缓存根节点不是数组');
        return parsed;
      } catch (parseError) {
        // 公开资料缓存不是凭据；损坏时清除并继续联网，不能阻断 Steam 管理页。
        DiagnosticLogService.warn('SteamProfile',
          `Discarding corrupt profile cache: ${(parseError as Error).message}`);
        await store.delete(SteamProfileService.KEY);
        await store.flush();
        return [];
      }
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`读取 Steam 资料缓存失败：${detail.message ?? '未知错误'}`);
    }
  }

  /** 覆盖保存公开资料缓存；调用方负责先合并或移除目标账户。 */
  private async write(context: common.UIAbilityContext, profiles: SteamProfile[]): Promise<void> {
    try {
      const store = await preferences.getPreferences(context, SteamProfileService.STORE_NAME);
      await store.put(SteamProfileService.KEY, JSON.stringify(profiles));
      await store.flush();
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`保存 Steam 资料缓存失败：${detail.message ?? '未知错误'}`);
    }
  }
}
