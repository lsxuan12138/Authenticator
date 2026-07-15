import { AbilityConstant, ConfigurationConstant, UIAbility, Want } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { DiagnosticLogService } from '../services/DiagnosticLogService';
import { AppSettingsService } from '../services/AppSettingsService';

/** 应用入口 Ability：设置跟随系统的颜色模式，并将主窗口加载到 Index 根组件。 */
export default class EntryAbility extends UIAbility {
  /** Ability 创建时初始化应用主题和诊断日志等进程级能力。 */
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    DiagnosticLogService.initialize(this.context);
    try {
      this.context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET);
    } catch (err) {
      DiagnosticLogService.error('Lifecycle', `Failed to set color mode: ${(err as Error).message}`);
    }
    DiagnosticLogService.info('Lifecycle', 'Ability created');
  }

  /** Ability 销毁时记录生命周期结束，便于排查异常退出。 */
  onDestroy(): void {
    DiagnosticLogService.info('Lifecycle', 'Ability destroyed');
  }

  /** 创建主窗口、加载首页，并恢复需要直接作用于窗口的安全设置。 */
  onWindowStageCreate(windowStage: window.WindowStage): void {
    // WindowStage 创建完成后才能挂载 ArkUI 页面。
    DiagnosticLogService.info('Lifecycle', 'Window stage created');

    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) {
        DiagnosticLogService.error('Lifecycle', `Failed to load Index content: code=${err.code}, ${err.message}`);
        return;
      }
      DiagnosticLogService.info('Lifecycle', 'Index content loaded');
      this.restoreScreenshotProtection(windowStage);
    });
  }

  /** 从 Preferences 读取防截屏开关并应用到新建主窗口。 */
  private async restoreScreenshotProtection(windowStage: window.WindowStage): Promise<void> {
    try {
      const enabled = await AppSettingsService.getScreenshotProtectionEnabled(this.context);
      const mainWindow = await windowStage.getMainWindow();
      await AppSettingsService.applyToWindow(mainWindow, enabled);
      DiagnosticLogService.info('Privacy', `Screenshot protection restored, enabled=${enabled}`);
    } catch (error) {
      DiagnosticLogService.error('Privacy', `Failed to restore screenshot protection: ${(error as Error).message}`);
    }
  }

  /** 窗口舞台销毁时记录状态，不再持有 Window 引用。 */
  onWindowStageDestroy(): void {
    // 当前页面资源由 ArkUI 生命周期释放，此处只保留系统生命周期日志。
    DiagnosticLogService.info('Lifecycle', 'Window stage destroyed');
  }

  /** 应用回到前台时记录生命周期，Token 刷新由页面定时器负责。 */
  onForeground(): void {
    // Ability 回到前台。
    DiagnosticLogService.info('Lifecycle', 'Application entered foreground');
  }

  /** 应用进入后台时记录生命周期，供诊断用户反馈。 */
  onBackground(): void {
    // Ability 进入后台。
    DiagnosticLogService.info('Lifecycle', 'Application entered background');
  }
}
