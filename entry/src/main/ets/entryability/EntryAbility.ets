import { AbilityConstant, ConfigurationConstant, UIAbility, Want } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { DiagnosticLogService } from '../services/DiagnosticLogService';

/** 应用入口 Ability：设置跟随系统的颜色模式，并将主窗口加载到 Index 根组件。 */
export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    DiagnosticLogService.initialize(this.context);
    try {
      this.context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET);
    } catch (err) {
      DiagnosticLogService.error('Lifecycle', `Failed to set color mode: ${(err as Error).message}`);
    }
    DiagnosticLogService.info('Lifecycle', 'Ability created');
  }

  onDestroy(): void {
    DiagnosticLogService.info('Lifecycle', 'Ability destroyed');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    // WindowStage 创建完成后才能挂载 ArkUI 页面。
    DiagnosticLogService.info('Lifecycle', 'Window stage created');

    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) {
        DiagnosticLogService.error('Lifecycle', `Failed to load Index content: code=${err.code}, ${err.message}`);
        return;
      }
      DiagnosticLogService.info('Lifecycle', 'Index content loaded');
    });
  }

  onWindowStageDestroy(): void {
    // 当前页面资源由 ArkUI 生命周期释放，此处只保留系统生命周期日志。
    DiagnosticLogService.info('Lifecycle', 'Window stage destroyed');
  }

  onForeground(): void {
    // Ability 回到前台。
    DiagnosticLogService.info('Lifecycle', 'Application entered foreground');
  }

  onBackground(): void {
    // Ability 进入后台。
    DiagnosticLogService.info('Lifecycle', 'Application entered background');
  }
}
