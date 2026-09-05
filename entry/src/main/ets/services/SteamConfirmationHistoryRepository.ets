import { common } from '@kit.AbilityKit';
import { preferences } from '@kit.ArkData';
import { SecureTokenVault } from '../security/SecureTokenVault';
import { TokenId } from '../core/TokenId';
import { BusinessError } from '@kit.BasicServicesKit';
import { DiagnosticLogService } from './DiagnosticLogService';

export type SteamConfirmationHistoryKind = 'mobile' | 'login';

/** 一次已经完成的 Steam 批准或拒绝操作，不保存任何密钥、令牌或确认 nonce。 */
export interface SteamConfirmationHistoryItem {
  id: string;
  tokenId: string;
  kind: SteamConfirmationHistoryKind;
  title: string;
  summary: string;
  sourceTime: number;
  handledAt: number;
  approved: boolean;
}

/** 使用独立 AAD 加密保存最近的 Steam 操作历史。 */
export class SteamConfirmationHistoryRepository {
  private static readonly STORE_NAME: string = 'authenticator_steam_history';
  private static readonly KEY: string = 'history_encrypted_v1';
  private static readonly AAD: string = 'authenticator.steam-confirmation-history.v1';
  private static readonly LIMIT: number = 100;
  private readonly vault: SecureTokenVault = new SecureTokenVault();

  /** 返回指定 Token 的历史，按处理时间从新到旧排序。 */
  async list(context: common.UIAbilityContext, tokenId: string): Promise<SteamConfirmationHistoryItem[]> {
    const items = await this.readAll(context);
    return items.filter((item: SteamConfirmationHistoryItem): boolean => item.tokenId === tokenId)
      .sort((left: SteamConfirmationHistoryItem, right: SteamConfirmationHistoryItem): number =>
        right.handledAt - left.handledAt);
  }

  /** 追加成功操作并限制总量，避免诊断性历史无限增长。 */
  async append(context: common.UIAbilityContext,
    items: SteamConfirmationHistoryItem[]): Promise<void> {
    if (items.length === 0) return;
    const current = await this.readAll(context);
    const next = [...items, ...current]
      .sort((left: SteamConfirmationHistoryItem, right: SteamConfirmationHistoryItem): number =>
        right.handledAt - left.handledAt)
      .slice(0, SteamConfirmationHistoryRepository.LIMIT);
    await this.writeAll(context, next);
  }

  /** 删除当前 Token 的历史，不影响其他 Steam 账户。 */
  async clear(context: common.UIAbilityContext, tokenId: string): Promise<void> {
    const current = await this.readAll(context);
    await this.writeAll(context,
      current.filter((item: SteamConfirmationHistoryItem): boolean => item.tokenId !== tokenId));
  }

  /** 为页面构造统一且带 UUID 的历史条目。 */
  static create(tokenId: string, kind: SteamConfirmationHistoryKind, title: string,
    summary: string, sourceTime: number, approved: boolean): SteamConfirmationHistoryItem {
    return { id: TokenId.create(), tokenId, kind, title, summary, sourceTime,
      handledAt: Date.now(), approved };
  }

  /** 解密全部账户共享的历史集合；非关键缓存损坏时自动清空并恢复为空集合。 */
  private async readAll(context: common.UIAbilityContext): Promise<SteamConfirmationHistoryItem[]> {
    try {
      const store = await preferences.getPreferences(context, SteamConfirmationHistoryRepository.STORE_NAME);
      const encrypted = await store.get(SteamConfirmationHistoryRepository.KEY, '') as string;
      if (!encrypted) return [];
      try {
        const raw = await this.vault.decrypt(encrypted, SteamConfirmationHistoryRepository.AAD);
        const parsed = JSON.parse(raw) as SteamConfirmationHistoryItem[];
        if (!Array.isArray(parsed)) throw new Error('历史根节点不是数组');
        return parsed;
      } catch (parseError) {
        // 历史不是业务凭据；密文或 JSON 损坏时丢弃它，不能阻塞新的确认请求。
        DiagnosticLogService.warn('SteamHistory',
          `Discarding corrupt confirmation history: ${(parseError as Error).message}`);
        await store.delete(SteamConfirmationHistoryRepository.KEY);
        await store.flush();
        return [];
      }
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`读取 Steam 操作历史失败：${detail.message ?? '未知错误'}`);
    }
  }

  /** 使用专用 AAD 加密并覆盖历史集合，避免确认摘要以明文落盘。 */
  private async writeAll(context: common.UIAbilityContext,
    items: SteamConfirmationHistoryItem[]): Promise<void> {
    try {
      const store = await preferences.getPreferences(context, SteamConfirmationHistoryRepository.STORE_NAME);
      const encrypted = await this.vault.encrypt(JSON.stringify(items), SteamConfirmationHistoryRepository.AAD);
      await store.put(SteamConfirmationHistoryRepository.KEY, encrypted);
      await store.flush();
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`保存 Steam 操作历史失败：${detail.message ?? '未知错误'}`);
    }
  }
}
