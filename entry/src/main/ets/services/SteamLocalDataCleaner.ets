import { common } from '@kit.AbilityKit';
import { StoredToken, TokenKind } from '../domain/Token';
import { DiagnosticLogService } from './DiagnosticLogService';
import { SteamConfirmationHistoryRepository } from './SteamConfirmationHistoryRepository';
import { SteamProfileService } from './SteamProfileService';

/** 集中清理 Steam Token 的非关键缓存；清理失败不能撤销已经完成的 Token 删除。 */
export class SteamLocalDataCleaner {
  /** 删除确认历史和公开资料缓存，并将各项失败分别写入诊断日志。 */
  static async clean(context: common.UIAbilityContext, token: StoredToken): Promise<void> {
    if (token.kind !== TokenKind.STEAM) return;
    try {
      await new SteamConfirmationHistoryRepository().clear(context, token.id);
    } catch (error) {
      DiagnosticLogService.warn('SteamCleanup',
        `Failed to clear confirmation history for token ${token.id}: ${(error as Error).message}`);
    }
    const steamId = token.steam?.steamId ?? '';
    if (steamId.length === 0) return;
    try {
      await new SteamProfileService().remove(context, steamId);
    } catch (error) {
      DiagnosticLogService.warn('SteamCleanup',
        `Failed to clear profile cache for Steam ID ${steamId}: ${(error as Error).message}`);
    }
  }
}
