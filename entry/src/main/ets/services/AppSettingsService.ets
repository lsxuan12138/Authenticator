import { common } from '@kit.AbilityKit';
import { preferences } from '@kit.ArkData';
import { window } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';

/** 持久化不含敏感数据的应用偏好，并负责将窗口安全设置应用到当前主窗口。 */
export class AppSettingsService {
  private static readonly STORE_NAME: string = 'authenticator_settings';
  private static readonly SCREENSHOT_PROTECTION_KEY: string = 'screenshot_protection';

  static async screenshotProtectionEnabled(context: common.Context): Promise<boolean> {
    try {
      const store = await preferences.getPreferences(context, AppSettingsService.STORE_NAME);
      return await store.get(AppSettingsService.SCREENSHOT_PROTECTION_KEY, false) as boolean;
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`读取截屏保护设置失败：${detail.message ?? '未知错误'}`);
    }
  }

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

  static async applyToWindow(target: window.Window, enabled: boolean): Promise<void> {
    try {
      await target.setWindowPrivacyMode(enabled);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`设置窗口截屏保护失败：${detail.message ?? '未知错误'}`);
    }
  }

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
