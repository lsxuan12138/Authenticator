import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import {
  HdsNavDestination,
  HdsNavDestinationTitleMode,
  HdsNavigationMenuContentOptions
} from '@kit.UIDesignKit';
import { DiagnosticLogService } from '../services/DiagnosticLogService';
import { SteamConfirmationHistoryItem, SteamConfirmationHistoryRepository } from
  '../services/SteamConfirmationHistoryRepository';
import { AppRouter } from '../navigation/AppRouter';
import { Localization } from '../core/Localization';
import { ImmersiveStyle } from '../ui/ImmersiveStyle';

/** 从路由参数构建当前 Steam Token 的本机确认历史页。 */
@Builder
export function SteamConfirmationHistoryPageBuilder(_name: string, param: ESObject) {
  SteamConfirmationHistoryPage({ tokenId: AppRouter.tokenId(param) })
}

/** 单独展示本机成功执行的 Steam 登录与移动确认历史。 */
@Component
struct SteamConfirmationHistoryPage {
  tokenId: string = '';
  @State private history: SteamConfirmationHistoryItem[] = [];
  @State private loading: boolean = true;

  /** 将清除操作放入系统标题栏，并在无历史时禁用。 */
  private titleMenu(): HdsNavigationMenuContentOptions {
    return {
      maxCount: 1,
      value: [{
        content: {
          icon: $r('sys.symbol.trash'),
          label: $r('app.string.common_clear'),
          isEnabled: this.history.length > 0,
          action: (): void => {
            this.clearHistory();
          }
        }
      }]
    };
  }

  /** 页面显示时从加密仓库读取当前 Token 的历史。 */
  aboutToAppear(): void {
    this.loadHistory();
  }

  /** 获取历史仓库所需的 UIAbilityContext。 */
  private context(): common.UIAbilityContext {
    return this.getUIContext().getHostContext() as common.UIAbilityContext;
  }

  /** 解析本地化资源，供命令式 Toast 使用。 */
  private localized(resource: Resource, ...args: Array<string | number>): string {
    return Localization.text(this.context(), resource, args);
  }

  /** 显示操作反馈；Toast 不可用时仅写诊断日志。 */
  private showToast(message: string, duration: number = 2000): void {
    try {
      this.getUIContext().getPromptAction().showToast({ message: message, duration: duration });
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('SteamHistory', `Toast failed: ${detail.message ?? message}`);
    }
  }

  /** 刷新当前账户的历史列表；失败时保留空态并记录底层原因。 */
  private async loadHistory(): Promise<void> {
    this.loading = true;
    try {
      this.history = await new SteamConfirmationHistoryRepository().list(this.context(), this.tokenId);
    } catch (error) {
      DiagnosticLogService.warn('SteamHistory', `History load failed: ${(error as Error).message}`);
    } finally {
      this.loading = false;
    }
  }

  /** 清除当前 Token 的历史，不影响其他 Steam 账户。 */
  private async clearHistory(): Promise<void> {
    try {
      await new SteamConfirmationHistoryRepository().clear(this.context(), this.tokenId);
      this.history = [];
      this.showToast(this.localized($r('app.string.confirm_history_cleared')));
    } catch (error) {
      DiagnosticLogService.warn('SteamHistory', `History clear failed: ${(error as Error).message}`);
    }
  }

  /** 构建沉浸式系统标题栏和确认历史列表。 */
  build() {
    HdsNavDestination() {
      if (this.loading) {
        Column({ space: 12 }) {
          LoadingProgress().width(36).height(36)
          Text($r('app.string.confirm_loading'))
        }.layoutWeight(1).width('100%').justifyContent(FlexAlign.Center)
      } else if (this.history.length === 0) {
        Column() {
          Text($r('app.string.confirm_no_history')).fontColor($r('app.color.text_tertiary'))
        }.layoutWeight(1).width('100%').justifyContent(FlexAlign.Center)
      } else {
        List({ space: 10 }) {
          ForEach(this.history, (item: SteamConfirmationHistoryItem) => {
            ListItem() {
              Column({ space: 6 }) {
                Row() {
                  Text(item.title || $r('app.string.confirm_operation'))
                    .fontSize(15).fontWeight(FontWeight.Bold).layoutWeight(1)
                  Text(item.approved ? $r('app.string.confirm_approved') :
                    $r('app.string.confirm_rejected')).fontSize(12)
                    .fontColor(item.approved ? $r('app.color.success') : $r('app.color.danger'))
                }.width('100%')
                if (item.summary.length > 0) {
                  Text(item.summary).fontSize(12)
                    .fontColor($r('app.color.text_secondary')).width('100%')
                }
                Text(new Date(item.handledAt).toLocaleString()).fontSize(11)
                  .fontColor($r('app.color.text_disabled')).width('100%')
              }.padding(14).backgroundColor($r('app.color.surface')).borderRadius(14).width('100%')
                .border({ width: 1, color: $r('app.color.border') })
            }
          }, (item: SteamConfirmationHistoryItem): string => item.id)
        }.layoutWeight(1).width('100%').height('100%')
          .padding({ left: 16, right: 16, bottom: 20 })
      }
    }
    .titleMode(HdsNavDestinationTitleMode.MINI)
    .titleBar({
      enableComponentSafeArea: true,
      content: {
        title: {
          mainTitle: $r('app.string.confirm_history_title'),
          subTitle: $r('app.string.confirm_history_note')
        },
        menu: this.titleMenu()
      },
      style: ImmersiveStyle.titleBarStyle(false,
        $r('app.color.text_primary'),
        $r('app.color.text_secondary'),
        $r('app.color.text_tertiary'),
        $r('app.color.title_bar_scrim'))
    })
    .backgroundColor($r('app.color.page_background'))
    .ignoreLayoutSafeArea([LayoutSafeAreaType.SYSTEM],
      [LayoutSafeAreaEdge.TOP, LayoutSafeAreaEdge.BOTTOM])
  }
}
