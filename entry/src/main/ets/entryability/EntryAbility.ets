import { AbilityConstant, Configuration, ConfigurationConstant, UIAbility, Want } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { DiagnosticLogService } from '../services/DiagnosticLogService';
import { AppSettingsService } from '../services/AppSettingsService';
import {
  APP_NAVIGATION_INDICATOR_HEIGHT_KEY,
  APP_STATUS_BAR_HEIGHT_KEY
} from '../ui/ImmersiveStyle';

/** 应用入口 Ability：设置跟随系统的颜色模式，并将主窗口加载到 Index 根组件。 */
export default class EntryAbility extends UIAbility {
  private mainWindow: window.Window | null = null;
  private hasAvoidAreaListener: boolean = false;

  /** Ability 创建时初始化应用主题和诊断日志等进程级能力。 */
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    DiagnosticLogService.initialize(this.context);
    AppStorage.setOrCreate<number>(APP_NAVIGATION_INDICATOR_HEIGHT_KEY, 0);
    AppStorage.setOrCreate<number>(APP_STATUS_BAR_HEIGHT_KEY, 0);
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
      this.applyWindowAppearance(windowStage);
      this.restoreScreenshotProtection(windowStage);
    });
  }

  /**
   * 保存主窗口并设置系统栏前景色。
   * 系统栏背景由页面通过安全区扩展绘制，避免使用手机端不可用的窗口背景接口。
   */
  private async applyWindowAppearance(windowStage: window.WindowStage): Promise<void> {
    try {
      const mainWindow = await windowStage.getMainWindow();
      this.mainWindow = mainWindow;
      await this.applyCurrentWindowAppearance(mainWindow, this.context.config.colorMode);
      this.syncNavigationIndicatorHeight(mainWindow);
      this.syncStatusBarHeight(mainWindow);
      if (!this.hasAvoidAreaListener) {
        mainWindow.on('avoidAreaChange', (data) => {
          if (data.type === window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR) {
            this.syncNavigationIndicatorHeight(mainWindow);
          } else if (data.type === window.AvoidAreaType.TYPE_SYSTEM) {
            this.syncStatusBarHeight(mainWindow);
          }
        });
        this.hasAvoidAreaListener = true;
      }
    } catch (error) {
      DiagnosticLogService.error('Window', `Failed to apply window appearance: ${(error as Error).message}`);
    }
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
    this.mainWindow = null;
    this.hasAvoidAreaListener = false;
    DiagnosticLogService.info('Lifecycle', 'Window stage destroyed');
  }

  /** 将不同设备的底部导航指示区高度同步给悬浮页签和首页列表。 */
  private syncNavigationIndicatorHeight(mainWindow: window.Window): void {
    try {
      const avoidArea = mainWindow.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR);
      const height = mainWindow.getUIContext().px2vp(avoidArea.bottomRect.height);
      AppStorage.set<number>(APP_NAVIGATION_INDICATOR_HEIGHT_KEY, height);
    } catch (error) {
      DiagnosticLogService.warn('Window',
        `Failed to read navigation indicator avoid area: ${(error as Error).message}`);
    }
  }

  /** 将状态栏高度同步给需要在系统标题栏背后滚动内容的页面。 */
  private syncStatusBarHeight(mainWindow: window.Window): void {
    try {
      const avoidArea = mainWindow.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
      const height = mainWindow.getUIContext().px2vp(avoidArea.topRect.height);
      AppStorage.set<number>(APP_STATUS_BAR_HEIGHT_KEY, height);
    } catch (error) {
      DiagnosticLogService.warn('Window',
        `Failed to read status bar avoid area: ${(error as Error).message}`);
    }
  }

  /** 系统深浅色模式变化时重新解析主题资源，并同步更新状态栏。 */
  onConfigurationUpdate(newConfig: Configuration): void {
    if (this.mainWindow === null) {
      return;
    }
    this.applyCurrentWindowAppearance(this.mainWindow, newConfig.colorMode);
  }

  /** 对已经创建的窗口刷新主题外观，供运行期间的配置变化回调使用。 */
  private async applyCurrentWindowAppearance(
    mainWindow: window.Window,
    colorMode: ConfigurationConstant.ColorMode | undefined
  ): Promise<void> {
    try {
      const isDark = colorMode === ConfigurationConstant.ColorMode.COLOR_MODE_DARK;
      await mainWindow.setWindowSystemBarProperties({
        statusBarColor: '#00000000',
        statusBarContentColor: isDark ? '#E5FFFFFF' : '#E5000000',
        navigationBarColor: '#00000000',
        navigationBarContentColor: isDark ? '#E5FFFFFF' : '#E5000000'
      });
      DiagnosticLogService.info('Window', `System bars matched to app theme, dark=${isDark}`);
    } catch (error) {
      DiagnosticLogService.error('Window', `Failed to update window appearance: ${(error as Error).message}`);
    }
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
