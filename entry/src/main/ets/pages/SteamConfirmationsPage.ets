import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { StoredToken } from '../domain/Token';
import { Base32 } from '../core/Base32';
import { SteamConfirmation, SteamGuardService, SteamPendingLogin,
  SteamPendingLoginResult } from '../services/SteamGuardService';
import { DiagnosticLogService } from '../services/DiagnosticLogService';
import { SteamConfirmationHistoryItem, SteamConfirmationHistoryRepository } from
  '../services/SteamConfirmationHistoryRepository';
import { APP_TOKENS_KEY } from '../data/AppStore';
import { AppRoute, AppRouter } from '../navigation/AppRouter';

@Builder
export function SteamConfirmationsPageBuilder(_name: string, param: ESObject) {
  NavDestination() {
    SteamConfirmationsPage({ tokenId: AppRouter.tokenId(param), onClose: (): void => AppRouter.pop() })
  }.hideTitleBar(true).onShown(() => AppRouter.markCurrent(AppRoute.STEAM))
}

/** 集中显示待登录、移动确认与本机加密操作历史。 */
@Component
export struct SteamConfirmationsPage {
  @StorageLink(APP_TOKENS_KEY) tokens: StoredToken[] = [];
  tokenId: string = '';
  onClose: () => void = (): void => {};
  @State private selectedTab: number = 0;
  @State private confirmations: SteamConfirmation[] = [];
  @State private pendingLogins: SteamPendingLogin[] = [];
  @State private history: SteamConfirmationHistoryItem[] = [];
  @State private loading: boolean = false;
  @State private submitting: boolean = false;
  @State private hasLoaded: boolean = false;
  @State private lastRefresh: string = '';
  @State private pendingError: string = '';
  @State private confirmationError: string = '';

  /** 页面首次显示时并行读取本地历史与服务端待处理列表。 */
  aboutToAppear(): void { this.loadHistory(); this.requestAll(); }

  /** 获取页面所属 UIAbilityContext，供加密历史仓库使用。 */
  private context(): common.UIAbilityContext {
    return this.getUIContext().getHostContext() as common.UIAbilityContext;
  }

  /** 显示短时操作反馈；Toast 本身失败时只写诊断日志。 */
  private showToast(message: string, duration: number = 2000): void {
    try { this.getUIContext().getPromptAction().showToast({ message, duration }); }
    catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('SteamConfirmations', `Toast failed: ${detail.message ?? message}`);
    }
  }

  /** 按 UUID 查找当前 Steam Token，防止列表重排后误用索引。 */
  private currentToken(): StoredToken | null {
    return this.tokens.find((token: StoredToken): boolean => token.id === this.tokenId) ?? null;
  }

  /** 两类列表独立请求，其中一个失败时仍展示另一个结果。 */
  private async requestAll(): Promise<void> {
    const token = this.currentToken();
    const metadata = token?.steam;
    if (!token || !metadata?.steamId || (!metadata.accessToken && !metadata.refreshToken)) {
      this.hasLoaded = true; this.showToast('Steam 元信息不完整，请先在详情页补充', 2500); return;
    }
    this.loading = true;
    // 刷新开始即清空旧结果；失败后绝不能让用户继续操作上一次请求的陈旧条目。
    this.pendingLogins = [];
    this.confirmations = [];
    this.pendingError = '';
    this.confirmationError = '';
    const service = new SteamGuardService();
    let failed = false;
    try {
      const logins: SteamPendingLoginResult = await service.getPendingLogins(metadata.steamId,
        metadata.accessToken, metadata.refreshToken);
      this.pendingLogins = logins.items;
      if (logins.skipped > 0) {
        failed = true;
        this.pendingError = `有 ${logins.skipped} 条登录请求无法解析，请稍后刷新或导出诊断日志`;
        DiagnosticLogService.warn('SteamConfirmations',
          `Skipped unreadable pending login requests, count=${logins.skipped}`);
      }
    } catch (error) {
      failed = true;
      this.pendingError = (error as Error).message;
      DiagnosticLogService.warn('SteamConfirmations', `Pending login load failed: ${(error as Error).message}`);
    }
    if (metadata.identitySecret && metadata.deviceId) {
      try {
        this.confirmations = await service.getConfirmations(metadata.steamId, metadata.accessToken,
          metadata.refreshToken, metadata.identitySecret, metadata.deviceId);
      } catch (error) {
        failed = true;
        this.confirmationError = (error as Error).message;
        DiagnosticLogService.warn('SteamConfirmations', `Confirmation load failed: ${(error as Error).message}`);
      }
    } else {
      this.confirmationError = '当前 Token 缺少 Identity Secret 或 Device ID，无法查询交易与账户操作';
    }
    this.loading = false; this.hasLoaded = true; this.lastRefresh = new Date().toLocaleTimeString();
    if (failed) this.showToast('部分列表获取失败，可从诊断日志查看原因', 2800);
  }

  /** 从本机加密仓库加载当前 Token 的操作历史。 */
  private async loadHistory(): Promise<void> {
    try { this.history = await new SteamConfirmationHistoryRepository().list(this.context(), this.tokenId); }
    catch (error) { DiagnosticLogService.warn('SteamConfirmations', `History load failed: ${(error as Error).message}`); }
  }

  /** 持久化远端已成功的操作；历史失败不得改变远端操作结果。 */
  private async saveHistory(items: SteamConfirmationHistoryItem[]): Promise<boolean> {
    try {
      await new SteamConfirmationHistoryRepository().append(this.context(), items);
      await this.loadHistory();
      return true;
    } catch (error) {
      // Steam 操作已经完成，诊断性历史失败不能反向把远端成功显示为失败。
      DiagnosticLogService.warn('SteamConfirmations',
        `Steam action succeeded but history save failed: ${(error as Error).message}`);
      return false;
    }
  }

  /** 处理登录请求；成功后才移除条目并写入历史。 */
  private async respondLogin(login: SteamPendingLogin, approve: boolean): Promise<void> {
    const token = this.currentToken(); const metadata = token?.steam;
    if (!token || !metadata || this.submitting) return;
    this.submitting = true;
    try {
      await new SteamGuardService().respondPendingLogin(metadata.steamId, metadata.accessToken,
        metadata.refreshToken, Base32.decode(token.secret), login, approve);
      this.pendingLogins = this.pendingLogins.filter((item: SteamPendingLogin): boolean =>
        item.clientId !== login.clientId);
      const historySaved = await this.saveHistory([SteamConfirmationHistoryRepository.create(this.tokenId, 'login',
        login.deviceName || 'Steam 登录请求', `${login.location}${login.ip ? ` · ${login.ip}` : ''}`, 0, approve)]);
      this.showToast(`${approve ? 'Steam 登录已批准' : 'Steam 登录已拒绝'}${historySaved ? '' : '，但历史保存失败'}`,
        historySaved ? 2000 : 2800);
    } catch (error) { this.showToast((error as Error).message, 3200); }
    finally { this.submitting = false; }
  }

  /** 处理移动确认；成功后才移除条目并写入历史。 */
  private async respond(confirmation: SteamConfirmation, approve: boolean): Promise<void> {
    if (this.submitting) return;
    const metadata = this.currentToken()?.steam; if (!metadata) return;
    this.submitting = true;
    try {
      await new SteamGuardService().respondToConfirmation(metadata.steamId, metadata.accessToken,
        metadata.refreshToken, metadata.identitySecret, metadata.deviceId, confirmation, approve);
      this.confirmations = this.confirmations.filter((item: SteamConfirmation): boolean => item.id !== confirmation.id);
      const historySaved = await this.saveHistory([SteamConfirmationHistoryRepository.create(this.tokenId, 'mobile',
        confirmation.headline, confirmation.summary.join(' · '), confirmation.creationTime, approve)]);
      this.showToast(`${approve ? '已批准 Steam 确认' : '已拒绝 Steam 确认'}${historySaved ? '' : '，但历史保存失败'}`,
        historySaved ? 2000 : 2800);
    } catch (error) { this.showToast((error as Error).message, 3000); }
    finally { this.submitting = false; }
  }

  /** 二次确认后批量处理移动确认，并为每条成功操作保留历史。 */
  private async respondAll(approve: boolean): Promise<void> {
    const metadata = this.currentToken()?.steam;
    if (!metadata || this.submitting || this.confirmations.length === 0) return;
    const action = approve ? '批准' : '拒绝';
    try {
      const dialog = await this.getUIContext().getPromptAction().showDialog({
        title: `${action}全部 Steam 确认？`,
        message: `将${action}当前全部 ${this.confirmations.length} 个交易或账户操作，此操作无法撤销。`,
        alignment: DialogAlignment.Bottom,
        buttons: [
          { text: '取消', color: $r('app.color.text_tertiary') },
          { text: `全部${action}`, color: approve ? $r('app.color.brand_strong') : $r('app.color.danger') }
        ]
      });
      if (dialog.index !== 1) return;
      this.submitting = true;
      const pending = [...this.confirmations];
      await new SteamGuardService().respondToConfirmations(metadata.steamId, metadata.accessToken,
        metadata.refreshToken, metadata.identitySecret, metadata.deviceId, pending, approve);
      const entries = pending.map((item: SteamConfirmation): SteamConfirmationHistoryItem =>
        SteamConfirmationHistoryRepository.create(this.tokenId, 'mobile', item.headline,
          item.summary.join(' · '), item.creationTime, approve));
      this.confirmations = [];
      const historySaved = await this.saveHistory(entries);
      this.showToast(`已${action}全部 Steam 确认${historySaved ? '' : '，但历史保存失败'}`,
        historySaved ? 2000 : 2800);
    } catch (error) { this.showToast((error as Error).message, 3200); }
    finally { this.submitting = false; }
  }

  /** 清除当前 Token 的本地历史，不影响 Steam 服务端状态。 */
  private async clearHistory(): Promise<void> {
    try {
      await new SteamConfirmationHistoryRepository().clear(this.context(), this.tokenId);
      this.history = []; this.showToast('操作历史已清除');
    } catch (error) { this.showToast((error as Error).message, 2800); }
  }

  /** 为登录请求和移动确认提供一致的拒绝/批准按钮。 */
  @Builder private actionButtons(reject: () => void, approve: () => void) {
    Row({ space: 10 }) {
      Button('拒绝').layoutWeight(1).backgroundColor($r('app.color.danger_surface'))
        .fontColor($r('app.color.danger')).enabled(!this.submitting).onClick(reject)
      Button('批准').layoutWeight(1).backgroundColor($r('app.color.brand_strong'))
        .enabled(!this.submitting).onClick(approve)
    }.width('100%')
  }

  /** 构建待处理页的分区标题和数量徽标。 */
  @Builder private sectionHeader(title: string, description: string, count: number) {
    Row({ space: 10 }) {
      Column({ space: 3 }) {
        Text(title).fontSize(18).fontWeight(FontWeight.Bold).width('100%')
        Text(description).fontSize(12).fontColor($r('app.color.text_tertiary')).width('100%')
      }.alignItems(HorizontalAlign.Start).layoutWeight(1)
      Text(`${count}`).fontSize(13).fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.brand_strong'))
        .padding({ left: 10, right: 10, top: 5, bottom: 5 })
        .backgroundColor($r('app.color.brand_surface_alt')).borderRadius(12)
    }.width('100%')
  }

  /** 在对应分区内直接显示请求失败原因，避免用户必须先导出日志才能判断问题。 */
  @Builder private inlineError(message: string) {
    Text(message).fontSize(12).fontColor($r('app.color.danger'))
      .lineHeight(18).padding(12).backgroundColor($r('app.color.danger_surface')).borderRadius(12).width('100%')
  }

  @Builder private pendingTab() {
    if (this.loading && !this.hasLoaded) {
      Column({ space: 12 }) { LoadingProgress().width(36).height(36); Text('正在获取待处理请求…') }
        .width('100%').height('100%').justifyContent(FlexAlign.Center)
    } else {
      Scroll() {
        Column({ space: 16 }) {
          Column({ space: 5 }) {
            Text('需要你确认的操作').fontSize(16).fontWeight(FontWeight.Bold).width('100%')
            Text('仅批准由你本人发起且设备、位置和操作内容均符合预期的请求。')
              .fontSize(12).fontColor($r('app.color.text_secondary')).lineHeight(18).width('100%')
          }.padding(16).backgroundColor($r('app.color.brand_surface')).borderRadius(16).width('100%')

          Column({ space: 12 }) {
            this.sectionHeader('登录请求', '来自其他设备的 Steam 登录授权', this.pendingLogins.length)
            if (this.pendingError.length > 0) {
              this.inlineError(this.pendingError)
            } else if (this.pendingLogins.length === 0) {
              Text('当前没有待处理登录请求').fontSize(13).fontColor($r('app.color.text_tertiary'))
                .padding({ top: 8, bottom: 8 }).width('100%')
            }
            ForEach(this.pendingLogins, (login: SteamPendingLogin) => {
              Column({ space: 7 }) {
                Text(login.deviceName || '未知设备').fontSize(16).fontWeight(FontWeight.Bold).width('100%')
                Text(`${login.location || '位置未知'}${login.ip ? ` · ${login.ip}` : ''}`)
                  .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
                Text(login.persistent ? '请求保持登录' : '请求临时登录').fontSize(12)
                  .fontColor($r('app.color.text_tertiary')).width('100%')
                if (login.locationMismatch || login.highUsage) {
                  Text('Steam 已标记该请求存在位置或频率风险').fontSize(12)
                    .fontColor($r('app.color.warning')).width('100%')
                }
                this.actionButtons(() => this.respondLogin(login, false), () => this.respondLogin(login, true))
              }.padding(15).backgroundColor($r('app.color.surface')).borderRadius(14).width('100%')
            }, (login: SteamPendingLogin): string => login.clientId)
          }.padding(16).backgroundColor($r('app.color.surface_subtle')).borderRadius(18).width('100%')

          Column({ space: 12 }) {
            this.sectionHeader('交易与账户操作', '交易、市场及其他移动确认', this.confirmations.length)
            if (this.confirmationError.length > 0) {
              this.inlineError(this.confirmationError)
            } else if (this.confirmations.length === 0) {
              Text('当前没有待处理移动确认').fontSize(13).fontColor($r('app.color.text_tertiary'))
                .padding({ top: 8, bottom: 8 }).width('100%')
            } else {
              Row({ space: 10 }) {
                Button(`全部拒绝（${this.confirmations.length}）`).layoutWeight(1)
                  .backgroundColor($r('app.color.danger_surface')).fontColor($r('app.color.danger'))
                  .enabled(!this.submitting).onClick(() => this.respondAll(false))
                Button(`全部批准（${this.confirmations.length}）`).layoutWeight(1)
                  .backgroundColor($r('app.color.brand_strong')).enabled(!this.submitting)
                  .onClick(() => this.respondAll(true))
              }.width('100%')
            }
            ForEach(this.confirmations, (confirmation: SteamConfirmation) => {
              Column({ space: 8 }) {
                Text(confirmation.headline).fontSize(16).fontWeight(FontWeight.Bold).width('100%')
                Text(confirmation.summary.join(' · ')).fontSize(13)
                  .fontColor($r('app.color.text_tertiary')).width('100%')
                Text(new Date(confirmation.creationTime * 1000).toLocaleString()).fontSize(11)
                  .fontColor($r('app.color.text_disabled')).width('100%')
                this.actionButtons(() => this.respond(confirmation, false), () => this.respond(confirmation, true))
              }.padding(15).backgroundColor($r('app.color.surface')).borderRadius(14).width('100%')
            }, (confirmation: SteamConfirmation): string => confirmation.id)
          }.padding(16).backgroundColor($r('app.color.surface_subtle')).borderRadius(18).width('100%')
        }.padding({ left: 16, right: 16, top: 12, bottom: 24 }).width('100%')
          .alignItems(HorizontalAlign.Start)
      }.width('100%').height('100%').align(Alignment.TopStart)
    }
  }

  @Builder private historyTab() {
    Column({ space: 10 }) {
      Row() {
        Text('仅记录本机成功操作，最多保留 100 条。').fontSize(12)
          .fontColor($r('app.color.text_tertiary')).layoutWeight(1)
        Button('清除').backgroundColor(Color.Transparent).fontColor($r('app.color.danger'))
          .enabled(this.history.length > 0).onClick(() => this.clearHistory())
      }.width('100%').padding({ left: 16, right: 16 })
      if (this.history.length === 0) {
        Column() { Text('暂无操作历史').fontColor($r('app.color.text_tertiary')) }
          .layoutWeight(1).justifyContent(FlexAlign.Center)
      } else {
        List({ space: 10 }) {
          ForEach(this.history, (item: SteamConfirmationHistoryItem) => {
            ListItem() {
              Column({ space: 6 }) {
                Row() {
                  Text(item.title || 'Steam 操作').fontSize(15).fontWeight(FontWeight.Bold).layoutWeight(1)
                  Text(item.approved ? '已批准' : '已拒绝').fontSize(12)
                    .fontColor(item.approved ? $r('app.color.success') : $r('app.color.danger'))
                }.width('100%')
                if (item.summary.length > 0) {
                  Text(item.summary).fontSize(12).fontColor($r('app.color.text_secondary')).width('100%')
                }
                Text(new Date(item.handledAt).toLocaleString()).fontSize(11)
                  .fontColor($r('app.color.text_disabled')).width('100%')
              }.padding(14).backgroundColor($r('app.color.surface')).borderRadius(14).width('100%')
            }
          }, (item: SteamConfirmationHistoryItem): string => item.id)
        }.layoutWeight(1).width('100%').height('100%').padding({ left: 16, right: 16, bottom: 20 })
      }
    }.width('100%').height('100%')
  }

  build() {
    Column() {
      Row({ space: 10 }) {
        Button() { SymbolGlyph($r('sys.symbol.chevron_left')).fontSize(22) }
          .type(ButtonType.Circle).width(38).height(38).backgroundColor($r('app.color.surface_muted'))
          .onClick(() => this.onClose())
        Column({ space: 3 }) {
          Text('Steam 确认').fontSize(26).fontWeight(FontWeight.Bold)
          Text(this.lastRefresh ? `上次刷新 ${this.lastRefresh}` : '登录、交易与账户操作')
            .fontSize(13).fontColor($r('app.color.text_tertiary'))
        }.alignItems(HorizontalAlign.Start).layoutWeight(1)
        Button() {
          if (this.loading) {
            LoadingProgress().width(20).height(20).color(Color.White)
          } else {
            SymbolGlyph($r('sys.symbol.arrow_clockwise')).fontSize(22).fontColor([Color.White])
          }
        }
          .type(ButtonType.Circle).width(40).height(40).backgroundColor($r('app.color.brand_strong'))
          .enabled(!this.loading && !this.submitting).onClick(() => this.requestAll())
      }.width('100%').padding({ left: 18, right: 18, top: 18, bottom: 8 })
      Tabs({ barPosition: BarPosition.Start, index: this.selectedTab }) {
        TabContent() { this.pendingTab() }.tabBar('待处理')
        TabContent() { this.historyTab() }.tabBar('历史')
      }.barMode(BarMode.Fixed).barHeight(48).layoutWeight(1).width('100%')
        .onChange((index: number) => this.selectedTab = index)
    }.width('100%').height('100%').backgroundColor($r('app.color.page_background'))
  }
}
