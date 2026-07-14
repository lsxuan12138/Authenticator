import { common } from '@kit.AbilityKit';
import { BusinessError, pasteboard } from '@kit.BasicServicesKit';
import { StoredToken, TokenCode, TokenKind } from '../domain/Token';
import { TokenRepository } from '../data/TokenRepository';
import { OtpEngine } from '../core/OtpEngine';
import { OtpUriParser } from '../core/OtpUriParser';
import { IconPack, IconPackService } from '../services/IconPackService';
import { TokenIconPicker } from '../components/TokenIconPicker';
import { DiagnosticLogService } from '../services/DiagnosticLogService';
import { SettingsPage } from './SettingsPage';
import { AddTokenPage } from './AddTokenPage';
import { SteamConfirmationsPage } from './SteamConfirmationsPage';
import { TokenDetailPage } from './TokenDetailPage';
import { SteamManagementPage } from './SteamManagementPage';

/** Navigation 路由名称；首页是 NavBar，其余界面都是独立 NavDestination。 */
enum AppRoute {
  HOME = 'home',
  ADD = 'add',
  SETTINGS = 'settings',
  STEAM = 'steam',
  STEAM_MANAGEMENT = 'steamManagement',
  DETAIL = 'detail',
  ICON_PICKER = 'iconPicker'
}

/**
 * 应用主界面，同时协调 Token 持久化、验证码刷新、Steam 操作和图标包设置。
 * 加密、OTP、网络协议等具体规则下沉到 core/service，页面只维护交互状态和调用顺序。
 */
@Entry
@Component
struct Index {
  // 首页与跨页面共享状态。
  @State private currentRoute: AppRoute = AppRoute.HOME;
  @State private tokens: StoredToken[] = [];
  @State private codes: TokenCode[] = [];
  // 图标包及手动图标选择状态。
  @State private iconPacks: IconPack[] = [];
  @State private activeIconPackKey: string = IconPackService.defaultPackKey();
  @State private iconPickerIndex: number = -1;
  @State private iconPickerIssuer: string = '';
  @State private reorderMode: boolean = false;
  @State private showTokenQr: boolean = false;
  @State private qrTokenIndex: number = -1;
  @State private now: number = Date.now();
  // 路由参数只保存 Token 索引，编辑副本与 Steam 凭据由详情页自行管理。
  @State private selectedSteamIndex: number = -1;
  private navPathStack: NavPathStack = new NavPathStack();

  /** Toast 失败不应中断用户操作，但需要留下可定位的日志。 */
  private showToast(message: string, duration: number = 2000): void {
    try {
      this.getUIContext().getPromptAction().showToast({ message: message, duration: duration });
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('UI', `Failed to show toast: ${detail.message ?? message}`);
    }
  }

  private repository: TokenRepository = new TokenRepository();
  private timer: number = -1;

  /** 所有二级界面均进入 Navigation 路由栈，系统返回手势与页面生命周期由框架统一管理。 */
  private navigate(route: AppRoute): void {
    this.navPathStack.pushPath({ name: route });
  }

  private returnHome(): void {
    this.navPathStack.clear();
    this.currentRoute = AppRoute.HOME;
  }

  // ===== 生命周期、存储与动态验证码 =====

  aboutToAppear(): void {
    this.initialize();
    // 每秒刷新一次既能更新倒计时，也能及时跨越 OTP 周期边界。
    this.timer = setInterval(() => {
      this.now = Date.now();
      this.refreshCodes();
    }, 1000);
  }

  aboutToDisappear(): void {
    if (this.timer >= 0) {
      clearInterval(this.timer);
    }
  }

  private async initialize(): Promise<void> {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      await this.repository.open(context);
      this.tokens = await this.repository.list();
      this.iconPacks = await IconPackService.list(context);
      this.activeIconPackKey = await IconPackService.activePackKey(context);
      if (this.activeIconPackKey !== IconPackService.defaultPackKey() &&
        !this.iconPacks.some((pack: IconPack) => IconPackService.packKey(pack) === this.activeIconPackKey)) {
        this.activeIconPackKey = IconPackService.defaultPackKey();
        await IconPackService.selectPack(context, this.activeIconPackKey);
      }
      // 自动图标不保存路径；手动图标若已随图标包删除，则回退到自动匹配。
      let iconsChanged = false;
      this.tokens = this.tokens.map((token: StoredToken) => {
        if (token.iconManual !== true && token.iconPath.length > 0) {
          token.iconPath = '';
          token.iconManual = false;
          iconsChanged = true;
        } else if (token.iconManual === true && !IconPackService.pathExists(token.iconPath)) {
          token.iconPath = '';
          token.iconManual = false;
          iconsChanged = true;
        }
        return token;
      });
      if (iconsChanged) {
        await this.repository.save(this.tokens);
      }
      this.refreshCodes();
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('UI', `Application initialization failed: ${detail.message ?? 'unknown'}`);
      this.showToast(`应用数据初始化失败：${detail.message ?? '未知错误'}`, 3500);
    }
  }

  private refreshCodes(): void {
    this.codes = this.tokens.map((token: StoredToken): TokenCode => {
      try {
        return OtpEngine.generate(token, this.now);
      } catch (error) {
        const detail = error as BusinessError;
        DiagnosticLogService.error('OTP',
          `Failed to generate code for issuer=${token.issuer}: ${detail.message ?? 'unknown'}`);
        return { value: token.kind === TokenKind.STEAM ? '-----' : '------', remainingSeconds: 0, progress: 0 };
      }
    });
  }

  private async persist(): Promise<void> {
    await this.repository.save(this.tokens);
    this.refreshCodes();
  }

  /** 子页面通过显式回调提交新数组，避免在路由 Builder 中依赖 IDE 无法解析的 $Link 宏。 */
  private async updateTokens(tokens: StoredToken[]): Promise<void> {
    this.tokens = [...tokens];
    await this.persist();
  }

  private updateIconPacks(packs: IconPack[]): void {
    this.iconPacks = [...packs];
  }

  private updateActiveIconPack(key: string): void {
    this.activeIconPackKey = key;
  }

  // ===== Token 添加、编辑与排序 =====

  private async copyCode(value: string): Promise<void> {
    try {
      await pasteboard.getSystemPasteboard().setData(
        pasteboard.createData(pasteboard.MIMETYPE_TEXT_PLAIN, value));
      this.showToast('验证码已复制', 1600);
    } catch (error) {
      const detail = error as BusinessError;
      this.showToast(`复制验证码失败：${detail.message ?? '未知错误'}`, 2500);
    }
  }

  private async removeToken(index: number): Promise<void> {
    const previous = this.tokens;
    try {
      this.tokens = this.tokens.filter((_item: StoredToken, itemIndex: number) => itemIndex !== index);
      await this.persist();
    } catch (error) {
      this.tokens = previous;
      this.refreshCodes();
      this.showToast(`删除 Token 失败：${(error as Error).message}`, 3000);
    }
  }

  private async moveToken(from: number, to: number): Promise<void> {
    // 数组顺序就是首页顺序，拖拽结束后立即持久化，重启应用仍保持该顺序。
    if (from === to || from < 0 || to < 0 || from >= this.tokens.length || to >= this.tokens.length) {
      return;
    }
    const next = [...this.tokens];
    const moved = next.splice(from, 1);
    next.splice(to, 0, moved[0]);
    const previous = this.tokens;
    try {
      this.tokens = next;
      await this.persist();
    } catch (error) {
      this.tokens = previous;
      this.refreshCodes();
      this.showToast(`保存 Token 排序失败：${(error as Error).message}`, 3000);
    }
  }

  private openTokenDetail(index: number): void {
    this.selectedSteamIndex = index;
    this.navigate(AppRoute.DETAIL);
  }

  // ===== 图标解析与图标包管理 =====

  private resolvedIcon(token: StoredToken): string {
    return IconPackService.resolveIcon(token.issuer, token.iconPath, token.iconManual === true,
      this.iconPacks, this.activeIconPackKey);
  }

  private fallbackIconColor(issuer: string): string {
    let hash = 0;
    for (let index = 0; index < issuer.length; index++) {
      hash = issuer.charCodeAt(index) + ((hash << 5) - hash);
    }
    const colors: string[] = ['#4668E8', '#287A52', '#A65B25', '#7A4DA3', '#176C82', '#A33143'];
    return colors[Math.abs(hash) % colors.length];
  }

  private openIconPicker(index: number, issuer: string = ''): void {
    if (index < 0 || index >= this.tokens.length) {
      return;
    }
    this.iconPickerIndex = index;
    this.iconPickerIssuer = issuer.trim().length > 0 ? issuer.trim() : this.tokens[index].issuer;
    this.navigate(AppRoute.ICON_PICKER);
  }

  private async applyManualIcon(path: string): Promise<void> {
    if (this.iconPickerIndex < 0 || this.iconPickerIndex >= this.tokens.length) {
      return;
    }
    const token = this.tokens[this.iconPickerIndex];
    const previousPath = token.iconPath;
    const previousManual = token.iconManual;
    try {
      token.iconPath = path;
      token.iconManual = path.length > 0;
      this.tokens = [...this.tokens];
      await this.persist();
      this.navPathStack.pop();
    } catch (error) {
      token.iconPath = previousPath;
      token.iconManual = previousManual;
      this.tokens = [...this.tokens];
      this.refreshCodes();
      this.showToast(`保存图标选择失败：${(error as Error).message}`, 3000);
    }
  }

  // ===== Steam 会话、移动确认与扫码登录 =====

  private openSteamToken(index: number): void {
    this.selectedSteamIndex = index;
    this.navigate(AppRoute.STEAM);
  }

  private openSteamManagement(index: number): void {
    this.selectedSteamIndex = index;
    this.navigate(AppRoute.STEAM_MANAGEMENT);
  }

  private openTokenQr(index: number): void {
    if (index < 0 || index >= this.tokens.length) {
      return;
    }
    this.qrTokenIndex = index;
    this.showTokenQr = true;
  }

  private currentQrToken(): StoredToken | null {
    if (this.qrTokenIndex < 0 || this.qrTokenIndex >= this.tokens.length) {
      return null;
    }
    return this.tokens[this.qrTokenIndex];
  }

  private currentQrUri(): string {
    const token = this.currentQrToken();
    return token === null ? '' : OtpUriParser.serialize(token);
  }

  // ===== 可复用 UI Builder =====

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
      .accessibilityText('显示 Token 二维码')
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
        Text('此二维码包含完整 OTP 密钥。仅在可信设备上扫描，不要截图、分享或向他人展示。')
          .fontSize(13).fontColor($r('app.color.warning')).lineHeight(20)
          .width('100%').textAlign(TextAlign.Center)
      }
      Button('关闭').width('100%').backgroundColor($r('app.color.brand_strong'))
        .onClick(() => this.showTokenQr = false)
    }.width('100%').padding({ left: 20, right: 20, bottom: 20 }).alignItems(HorizontalAlign.Center)
  }

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
      this.resolvedIcon(token).length > 0 ? $r('app.color.icon_surface') : this.fallbackIconColor(token.issuer))
    .gesture(LongPressGesture({ repeat: false, duration: 500 })
      .onAction(() => this.openIconPicker(index)))
  }

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

  @Builder
  private tokenList() {
    Column() {
      Row() {
        Column({ space: 4 }) {
          Text('验证码').fontSize(30).fontWeight(FontWeight.Bold).fontColor($r('app.color.text_primary'))
          Text(this.reorderMode ? '长按右侧手柄并上下拖动' :
            (this.tokens.length === 0 ? '添加你的第一个双重验证账户' : `${this.tokens.length} 个账户安全保存在本机`))
            .fontSize(14).fontColor($r('app.color.text_tertiary'))
        }.alignItems(HorizontalAlign.Start).layoutWeight(1)

        if (this.reorderMode) {
          Button('完成').backgroundColor('#4668E8').onClick(() => this.reorderMode = false)
        } else {
          if (this.tokens.length > 1) {
            Button('排序').backgroundColor($r('app.color.surface_muted')).fontColor($r('app.color.text_secondary'))
              .onClick(() => this.reorderMode = true)
          }
          Button() {
            SymbolGlyph($r('sys.symbol.plus')).fontSize(24).fontColor([Color.White])
          }
            .type(ButtonType.Circle)
            .width(42)
            .height(42)
            .backgroundColor('#4668E8')
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
          Text('这里还没有验证码').fontSize(19).fontWeight(FontWeight.Medium)
          Text('支持标准 TOTP 与 Steam Guard').fontSize(14).fontColor($r('app.color.text_muted'))
          Button('添加账户').onClick(() => {
            this.navigate(AppRoute.ADD);
          }).backgroundColor('#4668E8')
        }.layoutWeight(1).justifyContent(FlexAlign.Center).width('100%')
      } else {
        List({ space: 12 }) {
          if (this.reorderMode) {
            ForEach(this.tokens, (token: StoredToken, index: number) => {
              ListItem() {
                this.tokenRow(token, index, true)
              }
            }, (item: StoredToken) => item.id)
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
            }, (item: StoredToken) => item.id)
          }
        }.layoutWeight(1).width('100%').height('100%').padding({ left: 16, right: 16, bottom: 8 })
      }
    }.width('100%').height('100%').align(Alignment.TopStart)
  }

  @Builder
  private routeDestination(name: string) {
    if (name === AppRoute.ADD) {
      NavDestination() {
        AddTokenPage({
          tokens: this.tokens,
          onTokensChanged: (tokens: StoredToken[]): Promise<void> => this.updateTokens(tokens),
          onClose: (): void => {
            this.navPathStack.pop();
          }
        })
      }.hideTitleBar(true).onShown(() => this.currentRoute = AppRoute.ADD)
    } else if (name === AppRoute.SETTINGS) {
      NavDestination() {
        SettingsPage({
          tokens: this.tokens,
          iconPacks: this.iconPacks,
          activeIconPackKey: this.activeIconPackKey,
          onTokensChanged: (tokens: StoredToken[]): Promise<void> => this.updateTokens(tokens),
          onIconPacksChanged: (packs: IconPack[]): void => this.updateIconPacks(packs),
          onActiveIconPackChanged: (key: string): void => this.updateActiveIconPack(key)
        })
      }.hideTitleBar(true).onShown(() => {
        this.currentRoute = AppRoute.SETTINGS;
      })
    } else if (name === AppRoute.STEAM) {
      NavDestination() {
        SteamConfirmationsPage({
          tokens: this.tokens,
          tokenIndex: this.selectedSteamIndex,
          onClose: (): void => {
            this.navPathStack.pop();
          }
        })
      }.hideTitleBar(true).onShown(() => this.currentRoute = AppRoute.STEAM)
    } else if (name === AppRoute.STEAM_MANAGEMENT) {
      NavDestination() {
        SteamManagementPage({
          tokens: this.tokens,
          tokenIndex: this.selectedSteamIndex,
          onTokensChanged: (tokens: StoredToken[]): Promise<void> => this.updateTokens(tokens),
          onClose: (): void => {
            this.navPathStack.pop();
          },
          onTokenRemoved: (): void => this.returnHome()
        })
      }.hideTitleBar(true).onShown(() => this.currentRoute = AppRoute.STEAM_MANAGEMENT)
    } else if (name === AppRoute.DETAIL) {
      NavDestination() {
        TokenDetailPage({
          tokens: this.tokens,
          iconPacks: this.iconPacks,
          activeIconPackKey: this.activeIconPackKey,
          tokenIndex: this.selectedSteamIndex,
          onTokensChanged: (tokens: StoredToken[]): Promise<void> => this.updateTokens(tokens),
          onClose: (): void => {
            this.navPathStack.pop();
          },
          onOpenIconPicker: (issuer: string): void =>
            this.openIconPicker(this.selectedSteamIndex, issuer),
          onOpenConfirm: (): void => this.openSteamToken(this.selectedSteamIndex),
          onOpenSteamManagement: (): void => this.openSteamManagement(this.selectedSteamIndex)
        })
      }.hideTitleBar(true).onShown(() => this.currentRoute = AppRoute.DETAIL)
    } else if (name === AppRoute.ICON_PICKER && this.iconPickerIndex >= 0 &&
      this.iconPickerIndex < this.tokens.length) {
      NavDestination() {
        TokenIconPicker({
          issuer: this.iconPickerIssuer,
          currentPath: this.tokens[this.iconPickerIndex].iconManual === true ?
            this.tokens[this.iconPickerIndex].iconPath : '',
          packs: this.iconPacks,
          onConfirm: (path: string): void => {
            this.applyManualIcon(path);
          },
          onClose: (): void => {
            this.navPathStack.pop();
          }
        })
      }.hideTitleBar(true).onShown(() => this.currentRoute = AppRoute.ICON_PICKER)
    }
  }

  @Builder
  private bottomBar() {
    Row() {
      Button('验证码').layoutWeight(1).backgroundColor(Color.Transparent)
        .fontColor(this.currentRoute === AppRoute.HOME ? '#4668E8' : $r('app.color.text_tertiary'))
        .onClick(() => this.returnHome())
      Button('设置').layoutWeight(1).backgroundColor(Color.Transparent)
        .fontColor(this.currentRoute === AppRoute.SETTINGS ? '#4668E8' : $r('app.color.text_tertiary'))
        .onClick(() => {
          if (this.currentRoute !== AppRoute.SETTINGS) {
            this.navPathStack.clear();
            this.navigate(AppRoute.SETTINGS);
          }
        })
    }.height(62).padding({ left: 10, right: 10 }).backgroundColor($r('app.color.surface'))
    .border({ width: { top: 1 }, color: $r('app.color.border') })
  }

  build() {
    Column() {
      Navigation(this.navPathStack) {
        this.tokenList()
      }.layoutWeight(1).width('100%').height('100%')
        .hideTitleBar(true).mode(NavigationMode.Stack)
        .navDestination(this.routeDestination)
        .onNavBarStateChange((isVisible: boolean) => {
          if (isVisible) {
            this.currentRoute = AppRoute.HOME;
          }
        })

      if (this.currentRoute === AppRoute.HOME || this.currentRoute === AppRoute.SETTINGS) {
        this.bottomBar()
      }
    }.width('100%').height('100%').backgroundColor($r('app.color.surface_subtle'))
      .bindSheet(this.showTokenQr, this.tokenQrSheet(), {
        height: 500,
        preferType: SheetType.BOTTOM,
        dragBar: true,
        title: { title: 'Token 二维码' },
        onDisappear: () => this.showTokenQr = false
      })
  }
}
