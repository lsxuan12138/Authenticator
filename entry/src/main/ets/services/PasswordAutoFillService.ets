import { autoFillManager } from '@kit.AbilityKit';
import { UIContext } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import { DiagnosticLogService } from './DiagnosticLogService';

/**
 * 封装系统密码保险箱的主动保存请求。
 * Steam 使用分步登录且不会在账号密码验证后立刻发生页面路由，不能只依赖系统的页面离开检测。
 */
export class PasswordAutoFillService {
  /** 请求保存当前界面中已经由 Steam 验证过的账号密码；失败不影响登录主流程。 */
  static requestSave(context: UIContext, source: string): void {
    try {
      const callback: autoFillManager.AutoSaveCallback = {
        onSuccess: (): void => {
          DiagnosticLogService.info('PasswordVault', `${source} save request completed`);
        },
        onFailure: (): void => {
          DiagnosticLogService.warn('PasswordVault', `${source} save request was rejected or failed`);
        }
      };
      autoFillManager.requestAutoSave(context, callback);
      DiagnosticLogService.info('PasswordVault', `${source} save request submitted`);
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.warn('PasswordVault',
        `${source} save request could not start: code=${detail.code ?? 'unknown'}, message=${detail.message ?? 'unknown'}`);
    }
  }
}
