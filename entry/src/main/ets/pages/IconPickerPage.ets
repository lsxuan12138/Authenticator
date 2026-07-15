import { BusinessError } from '@kit.BasicServicesKit';
import { TokenIconPicker } from '../components/TokenIconPicker';
import { StoredToken } from '../domain/Token';
import { APP_ICON_PACKS_KEY, APP_TOKENS_KEY, AppStore } from '../data/AppStore';
import { IconPack } from '../services/IconPackService';
import { DiagnosticLogService } from '../services/DiagnosticLogService';
import { AppRoute, AppRouter } from '../navigation/AppRouter';

/** 系统路由表入口；图标列表只在进入页面后创建，维持原有懒加载行为。 */
@Builder
export function IconPickerPageBuilder(_name: string, param: ESObject) {
  NavDestination() {
    IconPickerPage({
      tokenId: AppRouter.tokenId(param),
      issuer: AppRouter.issuer(param)
    })
  }.hideTitleBar(true).onShown(() => AppRouter.markCurrent(AppRoute.ICON_PICKER))
}

/** 为系统路由封装图标选择、保存和错误反馈。 */
@Component
struct IconPickerPage {
  tokenId: string = '';
  issuer: string = '';
  @StorageLink(APP_TOKENS_KEY) tokens: StoredToken[] = [];
  @StorageLink(APP_ICON_PACKS_KEY) packs: IconPack[] = [];

  /** 显示图标保存错误，UIContext 不可用时写入诊断日志。 */
  private showToast(message: string, duration: number = 2000): void {
    try {
      this.getUIContext().getPromptAction().showToast({ message: message, duration: duration });
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('IconPicker', `Failed to show toast: ${detail.message ?? message}`);
    }
  }

  /** 返回当前手动图标；自动匹配模式和失效 UUID 均返回空路径。 */
  private currentPath(): string {
    const token = this.tokens.find((item: StoredToken): boolean => item.id === this.tokenId);
    return token?.iconManual === true ? token.iconPath : '';
  }

  /** 按 UUID 保存用户选择，失败时恢复页面内对象并保持当前页面。 */
  private async applyManualIcon(path: string): Promise<void> {
    const token = this.tokens.find((item: StoredToken): boolean => item.id === this.tokenId);
    if (!token) {
      this.showToast('对应的 Token 已不存在', 2200);
      return;
    }
    const previousPath = token.iconPath;
    const previousManual = token.iconManual;
    try {
      token.iconPath = path;
      token.iconManual = path.length > 0;
      this.tokens = [...this.tokens];
      await AppStore.updateTokens(this.tokens);
      AppRouter.pop();
    } catch (error) {
      token.iconPath = previousPath;
      token.iconManual = previousManual;
      this.tokens = [...this.tokens];
      this.showToast(`保存图标选择失败：${(error as Error).message}`, 3000);
    }
  }

  /** 构建实际的懒加载图标选择组件。 */
  build() {
    TokenIconPicker({
      issuer: this.issuer,
      currentPath: this.currentPath(),
      packs: this.packs,
      onConfirm: (path: string): void => {
        this.applyManualIcon(path);
      },
      onClose: (): void => AppRouter.pop()
    })
  }
}
