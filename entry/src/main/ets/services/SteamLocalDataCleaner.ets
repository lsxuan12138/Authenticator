import { common } from '@kit.AbilityKit';
import { StoredToken, TokenKind } from '../domain/Token';
import { DiagnosticLogService } from './DiagnosticLogService';
import { SteamConfirmationHistoryRepository } from './SteamConfirmationHistoryRepository';
import { SteamSessionService } from './SteamSessionService';

/** 集中清理 Steam Token 的操作历史与进程内会话；失败不撤销已经完成的 Token 删除。 */
export class SteamLocalDataCleaner {
  /** 删除当前 Token 的确认历史，并让对应 Steam ID 的内存会话立即失效。 */
  static async clean(context: common.UIAbilityContext, token: StoredToken): Promise<void> {
    if (token.kind !== TokenKind.STEAM) return;
    try {
      await new SteamConfirmationHistoryRepository().clear(context, token.id);
    } catch (error) {
      DiagnosticLogService.warn('SteamCleanup',
        `Failed to clear confirmation history for token ${token.id}: ${(error as Error).message}`);
    }
    SteamSessionService.forget(token.steam?.steamId ?? '');
  }
}
