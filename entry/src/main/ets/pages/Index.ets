import { common } from '@kit.AbilityKit';
import { BusinessError, pasteboard } from '@kit.BasicServicesKit';
import { SymbolGlyphModifier } from '@kit.ArkUI';
import { DividerMode, HdsNavigation, HdsTabs, hdsMaterial } from '@kit.UIDesignKit';
import { StoredToken, TokenCode, TokenKind } from '../domain/Token';
import { APP_ACTIVE_ICON_PACK_KEY, APP_ICON_PACKS_KEY, APP_TOKENS_KEY, AppStore } from '../data/AppStore';
import { OtpEngine } from '../core/OtpEngine';
import { OtpUriParser } from '../core/OtpUriParser';
import { IconPack, IconPackService } from '../services/IconPackService';
import { DiagnosticLogService } from '../services/DiagnosticLogService';
import { AppRoute, AppRouter } from '../navigation/AppRouter';
import { SteamLocalDataCleaner } from '../services/SteamLocalDataCleaner';
import { Localization } from '../core/Localization';
import { SettingsPage } from './SettingsPage';

/**
 * 应用主界面，同时协调 Token 持久化、验证码刷新、Steam 操作和图标包设置。
 * 加密、OTP、网络协议等具体规则下沉到 core/service，页面只维护交互状态和调用顺序。
 */
@Entry
@Component
struct Index {
  // 首页与跨页面共享状态。
  @StorageLink(APP_TOKENS_KEY) private tokens: StoredToken[] = [];
  @State private codes: TokenCode[] = [];
  // 图标包及手动图标选择状态。
  @StorageLink(APP_ICON_PACKS_KEY) private iconPacks: IconPack[] = [];
  @StorageLink(APP_ACTIVE_ICON_PACK_KEY) private activeIconPackKey: string = IconPackService.noPackKey();
  @State private reorderMode: boolean = false;
  @State private showTokenQr: boolean = false;
  @State private qrTokenIndex: number = -1;
  @State private now: number = Date.now();
  private navPathStack: NavPathStack = AppRouter.stack();

  /** Toast 失败不应中断用户操作，但需要留下可定位的日志。 */
  private showToast(message: string, duration: number = 2000): void {
    try {
      this.getUIContext().getPromptAction().showToast({ message: message, duration: duration });
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('UI', `Failed to show toast: ${detail.message ?? message}`);
    }
  }

  /** 读取首页命令式反馈使用的当前语言文本。 */
  private localized(resource: Resource, ...args: Array<string | number>): string {
    const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
    return Localization.text(context, resource, args);
  }

  /** 将服务错误翻译为当前语言，未知异常仅在日志中保留技术信息。 */
  private localizedError(error: Object, fallback: Resource): string {
    const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
    return Localization.error(context, error, fallback);
  }

  private timer: number = -1;

  /** 所有二级界面均进入 HDS 路由栈，系统返回手势与页面生命周期由框架统一管理。 */
  private navigate(route: AppRoute): void {
    AppRouter.push(route);
  }

  // ===== 生命周期、存储与动态验证码 =====

  /** 首页出现时加载仓库数据，并启动每秒更新验证码的计时器。 */
  aboutToAppear(): void {
    this.initialize();
    // 每秒刷新一次既能更新倒计时，也能及时跨越 OTP 周期边界。
    this.timer = setInterval(() => {
      this.now = Date.now();
      this.refreshCodes();
    }, 1000);
  }

  /** 首页离开组件树时停止计时器，避免后台无意义刷新和泄漏。 */
  aboutToDisappear(): void {
    if (this.timer >= 0) {
      clearInterval(this.timer);
    }
  }

  /** 打开安全仓库、读取 Token 和图标包，并清理已失效的旧自动图标路径。 */
  private async initialize(): Promise<void> {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      await AppStore.initialize(context);
      this.refreshCodes();
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('UI', `Application initialization failed: ${detail.message ?? 'unknown'}`);
      this.showToast(this.localizedError(error as Object, $r('app.string.error_operation_failed')), 3500);
    }
  }

  /** 为当前 Token 快照重新计算验证码、进度和剩余秒数。 */
  private refreshCodes(): void {
    this.codes = this.tokens.map((token: StoredToken): TokenCode => {
      try {
        return OtpEngine.generate(token, this.now);
      } catch (error) {
        const detail = error as BusinessError;
        DiagnosticLogService.error('OTP',
          `Failed to generate code for issuer=${token.issuer}: ${detail.message ?? 'unknown'}`);
        return { value: token.kind === TokenKind.STEAM ? '-----' : '-'.repeat(token.digits),
          remainingSeconds: 0, progress: 0 };
      }
    });
  }

  /** 先把候选 Token 快照写入加密仓库，成功后再更新页面状态。 */
  private async persist(next: StoredToken[]): Promise<void> {
    await AppStore.updateTokens(next);
    this.tokens = next;
    this.refreshCodes();
  }

  // ===== Token 添加、编辑与排序 =====

  /** 将验证码写入系统剪贴板，并向用户反馈操作结果。 */
  private async copyCode(value: string): Promise<void> {
    try {
      await pasteboard.getSystemPasteboard().setData(
        pasteboard.createData(pasteboard.MIMETYPE_TEXT_PLAIN, value));
      this.showToast(this.localized($r('app.string.home_code_copied')), 1600);
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.warn('Clipboard', `Copy failed: ${detail.message ?? 'unknown'}`);
      // 系统异常原文可能与应用当前语言不同，仅在日志中保留技术细节。
      this.showToast(this.localized($r('app.string.error_copy'),
        this.localized($r('app.string.error_unknown'))), 2500);
    }
  }

  /** 删除指定 Token、同步验证码数组并立即持久化。 */
  private async removeToken(index: number): Promise<void> {
    if (index < 0 || index >= this.tokens.length) return;
    const removed = this.tokens[index];
    try {
      const next = this.tokens.filter((_item: StoredToken, itemIndex: number) => itemIndex !== index);
      await this.persist(next);
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      await SteamLocalDataCleaner.clean(context, removed);
    } catch (error) {
      this.showToast(this.localizedError(error as Object, $r('app.string.error_operation_failed')), 3000);
    }
  }

  /** 响应拖拽排序，移动 Token 后保存新的首页顺序。 */
  private async moveToken(from: number, to: number): Promise<void> {
    // 数组顺序就是首页顺序，拖拽结束后立即持久化，重启应用仍保持该顺序。
    if (from === to || from < 0 || to < 0 || from >= this.tokens.length || to >= this.tokens.length) {
      return;
    }
    const next = [...this.tokens];
    const moved = next.splice(from, 1);
    next.splice(to, 0, moved[0]);
    try {
      await this.persist(next);
    } catch (error) {
      this.showToast(this.localizedError(error as Object, $r('app.string.error_token_save_failed')), 3000);
    }
  }

  /** 使用 UUID 进入 Token 详情路由，排序不会改变该页面对应的记录。 */
  private openTokenDetail(index: number): void {
    if (index < 0 || index >= this.tokens.length) {
      return;
    }
    AppRouter.pushToken(AppRoute.DETAIL, this.tokens[index].id);
  }

  // ===== 图标解析与图标包管理 =====

  /** 按手动选择和活动图标包规则解析首页实际显示路径。 */
  private resolvedIcon(token: StoredToken): string {
    return IconPackService.resolveIcon(token.issuer, token.iconPath, token.iconManual === true,
      this.iconPacks, this.activeIconPackKey);
  }

  /** 将 Token UUID 和预览 issuer 随路由入栈并进入懒加载图标选择页。 */
  private openIconPicker(index: number, issuer: string = ''): void {
    if (index < 0 || index >= this.tokens.length) {
      return;
    }
    const token = this.tokens[index];
    const previewIssuer = issuer.trim().length > 0 ? issuer.trim() : token.issuer;
    AppRouter.pushToken(AppRoute.ICON_PICKER, token.id, previewIssuer);
  }

  /** 选择 Token 并打开包含敏感 otpauth URI 的二维码弹层。 */
  private openTokenQr(index: number): void {
    if (index < 0 || index >= this.tokens.length) {
      return;
    }
    this.qrTokenIndex = index;
    this.showTokenQr = true;
  }

  /** 安全取得当前二维码弹层对应的 Token，索引失效时返回 null。 */
  private currentQrToken(): StoredToken | null {
    if (this.qrTokenIndex < 0 || this.qrTokenIndex >= this.tokens.length) {
      return null;
    }
    return this.tokens[this.qrTokenIndex];
  }

  /** 为二维码弹层序列化当前 Token，异常时返回空字符串关闭内容。 */
  private currentQrUri(): string {
    const token = this.currentQrToken();
    return token === null ? '' : OtpUriParser.serialize(token);
  }

  // ===== 可复用 UI Builder =====

  /** 构建首页左滑操作区，提供编辑、二维码和删除快捷操作。 */
  @Builder
  private swipeActions(index: number) {
    Row({ space: 8 }) {
      Button() {
        SymbolGlyph($r('sys.symbol.qrcode')).fontSize(23).fontColor([Color.White])
      }
      .width(54)
      .height('100%')
      .borderRadius(18)
      .backgroundColor('#4668E8')
      .accessibilityText($r('app.string.home_show_qr'))
      .onClick(() => this.openTokenQr(index))

      Button() {
        SymbolGlyph($r('sys.symbol.trash')).fontSize(23).fontColor([Color.White])
      }
      .width(54)
      .height('100%')
      .borderRadius(18)
      .backgroundColor($r('app.color.danger_strong'))
      .onClick(() => this.removeToken(index))
    }.width(124).height('100%').padding({ left: 8 }).backgroundColor(Color.Transparent)
  }

  /** 构建 Token URI 二维码弹层，并提示其等同于密钥。 */
  @Builder
  private tokenQrSheet() {
    Column({ space: 12 }) {
      if (this.currentQrToken() !== null) {
        Text(this.currentQrToken()?.issuer ?? 'Token').fontSize(20).fontWeight(FontWeight.Bold)
          .fontColor($r('app.color.text_primary')).width('100%').textAlign(TextAlign.Center)
        Text(this.currentQrToken()?.account ?? '').fontSize(14)
          .fontColor($r('app.color.text_secondary')).width('100%').textAlign(TextAlign.Center)
        Stack() {
          QRCode(this.currentQrUri()).width(236).height(236).color(Color.Black).backgroundColor(Color.White)
        }.width(260).height(260).padding(12).backgroundColor(Color.White).borderRadius(18)
        Text($r('app.string.token_qr_warning'))
          .fontSize(13).fontColor($r('app.color.warning')).lineHeight(20)
          .width('100%').textAlign(TextAlign.Center)
      }
      Button($r('app.string.common_close')).width('100%').backgroundColor($r('app.color.brand_strong'))
        .onClick(() => this.showTokenQr = false)
    }.width('100%').padding({ left: 20, right: 20, bottom: 20 }).alignItems(HorizontalAlign.Center)
  }

  /** 渲染 Token 图标；没有可用图片时使用稳定色块和首字母。 */
  @Builder
  private tokenIcon(token: StoredToken, index: number) {
    Stack() {
      if (this.resolvedIcon(token).length > 0) {
        Image(this.resolvedIcon(token)).width(42).height(42).objectFit(ImageFit.Contain).draggable(false)
      } else {
        Text(token.issuer.length > 0 ? token.issuer.substring(0, 1).toUpperCase() : '?')
          .fontSize(20).fontWeight(FontWeight.Bold).fontColor(Color.White)
      }
    }
    .width(46)
    .height(46)
    .padding(2)
    .borderRadius(14)
    .backgroundColor(
      this.resolvedIcon(token).length > 0 ? $r('app.color.icon_surface') : IconPackService.fallbackColor(token.issuer))
    .gesture(LongPressGesture({ repeat: false, duration: 500 })
      .onAction(() => this.openIconPicker(index)))
  }

  /** 渲染单个验证码条目以及可选的拖拽手柄。 */
  @Builder
  private tokenRow(token: StoredToken, index: number, showHandle: boolean) {
    Row({ space: 14 }) {
      this.tokenIcon(token, index)
      Column({ space: 4 }) {
        Text(token.issuer).fontSize(16).fontWeight(FontWeight.Medium).maxLines(1)
        Text(token.account).fontSize(13).fontColor($r('app.color.text_muted')).maxLines(1)
      }.alignItems(HorizontalAlign.Start).layoutWeight(1)

      Column({ space: 5 }) {
        Text(this.codes[index]?.value ?? '------').fontSize(25).fontWeight(FontWeight.Bold)
          .fontColor($r('app.color.text_primary')).letterSpacing(1.5)
        Text(`${this.codes[index]?.remainingSeconds ?? 30}s`).fontSize(12).fontColor($r('app.color.text_tertiary'))
      }.gesture(LongPressGesture({ repeat: false, duration: 500 })
        .onAction(() => {
          if (!this.reorderMode) {
            this.copyCode(this.codes[index]?.value ?? '');
          }
        }))

      if (showHandle) {
        SymbolGlyph($r('sys.symbol.list_bullet'))
          .fontSize(22)
          .fontColor([$r('app.color.text_muted')])
          .width(28)
      }
    }.width('100%').padding(16).backgroundColor($r('app.color.surface')).borderRadius(18)
      .onClick(() => {
        if (!showHandle) {
          this.openTokenDetail(index);
        }
      })
  }

  /**
   * UUID 保持数据身份稳定，追加可见字段用于通知 ForEach 重建已编辑卡片。
   * 密钥和会话凭据不进入渲染键，避免无意义地扩大敏感数据传播范围。
   */
  private tokenRenderKey(token: StoredToken): string {
    return `${token.id}:${token.issuer}:${token.account}:${token.iconPath}:${token.iconManual === true}`;
  }

  /** 构建支持左滑操作和拖拽排序的 Token 列表。 （包含头部）*/
  @Builder
  private tokenList() {
    Column() {
      Row({ space: 10 }) {
        Column({ space: 4 }) {
          Text($r('app.string.home_title')).fontSize(30).fontWeight(FontWeight.Bold)
            .fontColor($r('app.color.text_primary'))
          Text(this.reorderMode ? $r('app.string.home_reorder_hint') :
            (this.tokens.length === 0 ? $r('app.string.home_empty_hint') :
              $r('app.string.home_account_count', this.tokens.length)))
            .fontSize(14).fontColor($r('app.color.text_tertiary'))
        }.alignItems(HorizontalAlign.Start).layoutWeight(1)

        // 排序模式
        if (this.reorderMode) {
          Button($r('app.string.common_done')).backgroundColor('#4668E8').onClick(() => this.reorderMode = false)
        } else {
          if (this.tokens.length > 1) {
            Button() {
              SymbolGlyph($r('sys.symbol.sort')).fontSize(22)
                .fontColor([$r('app.color.text_secondary')])
            }
              .type(ButtonType.Circle)
              .width(42)
              .height(42)
              .backgroundColor($r('app.color.surface_muted'))
              .accessibilityText($r('app.string.home_sort_codes'))
              .onClick(() => this.reorderMode = true)
          }
          Button() {
            SymbolGlyph($r('sys.symbol.plus')).fontSize(24).fontColor([Color.White])
          }
            .type(ButtonType.Circle)
            .width(42)
            .height(42)
            .backgroundColor('#4668E8')
            .accessibilityText($r('app.string.home_add_account'))
            .onClick(() => {
              this.navigate(AppRoute.ADD);
            })
        }
      }
      .width('100%')
      .padding({
        left: 22,
        right: 22,
        top: 18,
        bottom: 14
      })

      if (this.tokens.length === 0) {
        Column({ space: 14 }) {
          SymbolGlyph($r('sys.symbol.rays')).fontSize(42).fontColor(['#4668E8'])
          Text($r('app.string.home_empty_title')).fontSize(19).fontWeight(FontWeight.Medium)
          Text($r('app.string.home_empty_description')).fontSize(14).fontColor($r('app.color.text_muted'))
          Button($r('app.string.home_add_account')).onClick(() => {
            this.navigate(AppRoute.ADD);
          }).backgroundColor('#4668E8')
        }.layoutWeight(1).justifyContent(FlexAlign.Center).width('100%')
      } else {
        List({ space: 12 }) {
          // 排序模式
          if (this.reorderMode) {
            ForEach(this.tokens, (token: StoredToken, index: number) => {
              ListItem() {
                this.tokenRow(token, index, true)
              }
            }, (item: StoredToken) => this.tokenRenderKey(item))
              .onMove((from: number, to: number) => this.moveToken(from, to))
          } else {
            ForEach(this.tokens, (token: StoredToken, index: number) => {
              ListItem() {
                this.tokenRow(token, index, false)
              }
              .swipeAction({
                edgeEffect: SwipeEdgeEffect.None,
                end: {
                  builder: () => {
                    this.swipeActions(index)
                  }
                }
              })
            }, (item: StoredToken) => this.tokenRenderKey(item))
          }
        }.layoutWeight(1).width('100%').height('100%').padding({ left: 16, right: 16, bottom: 84 })
      }
    }.width('100%').height('100%').align(Alignment.TopStart)
  }

  /**
   * 构建系统一级页签。验证码和设置保持并列，二级业务页面仍由外层 HdsNavigation 管理。
   * HdsTabs 会统一处理页签栏、安全区和窗口大小变化，后续可直接启用系统材质效果。
   */
  @Builder
  private primaryTabs() {
    HdsTabs() {
      TabContent() {
        this.tokenList()
      }.tabBar(BottomTabBarStyle.of({
        normal: new SymbolGlyphModifier($r('sys.symbol.list_bullet'))
          .fontSize(24).fontColor([$r('app.color.text_tertiary')]),
        selected: new SymbolGlyphModifier($r('sys.symbol.list_bullet'))
          .fontSize(24).fontColor(['#4668E8'])
      }, $r('app.string.home_title')).labelStyle({
        font: { size: 14, weight: FontWeight.Medium },
        selectedColor: '#4668E8',
        unselectedColor: $r('app.color.text_tertiary')
      }).layoutMode(LayoutMode.VERTICAL))

      TabContent() {
        SettingsPage({
          onTokensChanged: (tokens: StoredToken[]): Promise<void> => AppStore.updateTokens(tokens),
          onIconPacksChanged: (packs: IconPack[]): void => AppStore.updateIconPacks(packs),
          onActiveIconPackChanged: (key: string): void => AppStore.updateActiveIconPack(key)
        })
      }.tabBar(BottomTabBarStyle.of({
        normal: new SymbolGlyphModifier($r('sys.symbol.gearshape'))
          .fontSize(24).fontColor([$r('app.color.text_tertiary')]),
        selected: new SymbolGlyphModifier($r('sys.symbol.gearshape'))
          .fontSize(24).fontColor(['#4668E8'])
      }, $r('app.string.home_settings')).labelStyle({
        font: { size: 14, weight: FontWeight.Medium },
        selectedColor: '#4668E8',
        unselectedColor: $r('app.color.text_tertiary')
      }).layoutMode(LayoutMode.VERTICAL))
    }
    // 页签栏悬浮在内容上方，使用系统自适应材质随明暗模式和壁纸环境变化。
    .barOverlap(true)
    .barPosition(BarPosition.End)
    .vertical(false)
    .scrollable(false)
    .barBackgroundColor(Color.Transparent)
    .divider({ mode: DividerMode.NONE })
    .barFloatingStyle({
      barWidth: {
        smallWidth: 224,
        mediumWidth: 240,
        largeWidth: 256
      },
      barBottomMargin: 8,
      systemMaterialEffect: {
        materialType: hdsMaterial.MaterialType.ADAPTIVE,
        materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
      }
    })
    .width('100%')
    .height('100%')
  }

  /** 组合一级系统页签、二级 HDS 导航页面与首页弹层。 */
  build() {
    Column() {
      HdsNavigation(this.navPathStack) {
        this.primaryTabs()
      }.layoutWeight(1).width('100%').height('100%')
        .hideTitleBar(true).mode(NavigationMode.Stack)
    }.width('100%').height('100%').backgroundColor($r('app.color.page_background'))
      // 根背景覆盖状态栏；HdsTabs 自身负责底部页签栏与手势导航安全区。
      .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
      .bindSheet(this.showTokenQr, this.tokenQrSheet(), {
        height: 500,
        preferType: SheetType.BOTTOM,
        dragBar: true,
        title: { title: $r('app.string.token_qr_title') },
        onDisappear: () => this.showTokenQr = false
      })
  }
}
