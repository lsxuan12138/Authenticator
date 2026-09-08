import { common } from '@kit.AbilityKit';
import { preferences } from '@kit.ArkData';
import { window } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';

/** 持久化不含敏感数据的应用偏好，并负责将窗口安全设置应用到当前主窗口。 */
export class AppSettingsService {
  private static readonly STORE_NAME: string = 'authenticator_settings';
  private static readonly SCREENSHOT_PROTECTION_KEY: string = 'screenshot_protection';
  private static readonly CONFIRMATION_NOTICE_DISMISSED_KEY: string = 'confirmation_notice_dismissed';

  /** 读取用户保存的防截屏开关，默认关闭以保持系统常规行为。 */
  static async getScreenshotProtectionEnabled(context: common.Context): Promise<boolean> {
    try {
      const store = await preferences.getPreferences(context, AppSettingsService.STORE_NAME);
      return await store.get(AppSettingsService.SCREENSHOT_PROTECTION_KEY, false) as boolean;
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`读取截屏保护设置失败：${detail.message ?? '未知错误'}`);
    }
  }

  /** 持久化防截屏设置，供下次 Ability 启动时恢复。 */
  static async setScreenshotProtection(context: common.Context, enabled: boolean): Promise<void> {
    try {
      const store = await preferences.getPreferences(context, AppSettingsService.STORE_NAME);
      await store.put(AppSettingsService.SCREENSHOT_PROTECTION_KEY, enabled);
      await store.flush();
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`保存截屏保护设置失败：${detail.message ?? '未知错误'}`);
    }
  }

  /** 读取 Steam 确认页安全提醒是否已被用户永久关闭。 */
  static async getConfirmationNoticeDismissed(context: common.Context): Promise<boolean> {
    try {
      const store = await preferences.getPreferences(context, AppSettingsService.STORE_NAME);
      return await store.get(AppSettingsService.CONFIRMATION_NOTICE_DISMISSED_KEY, false) as boolean;
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`读取 Steam 确认提醒设置失败：${detail.message ?? '未知错误'}`);
    }
  }

  /** 记录用户已经了解 Steam 确认风险，后续启动不再显示大块提醒。 */
  static async dismissConfirmationNotice(context: common.Context): Promise<void> {
    try {
      const store = await preferences.getPreferences(context, AppSettingsService.STORE_NAME);
      await store.put(AppSettingsService.CONFIRMATION_NOTICE_DISMISSED_KEY, true);
      await store.flush();
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`保存 Steam 确认提醒设置失败：${detail.message ?? '未知错误'}`);
    }
  }

  /** 将防截屏标志应用到指定窗口，不负责保存用户设置。 */
  static async applyToWindow(target: window.Window, enabled: boolean): Promise<void> {
    try {
      await target.setWindowPrivacyMode(enabled);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`设置窗口截屏保护失败：${detail.message ?? '未知错误'}`);
    }
  }

  /** 设置页切换开关时立即更新当前 Ability 主窗口。 */
  static async applyToCurrentWindow(context: common.UIAbilityContext, enabled: boolean): Promise<void> {
    try {
      const target = await window.getLastWindow(context);
      await AppSettingsService.applyToWindow(target, enabled);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`获取当前窗口失败：${detail.message ?? '未知错误'}`);
    }
  }
}
