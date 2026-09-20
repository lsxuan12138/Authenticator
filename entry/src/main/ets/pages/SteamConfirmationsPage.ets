import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { StoredToken } from '../domain/Token';
import { Base32 } from '../core/Base32';
import { SteamConfirmation, SteamGuardService, SteamPendingLogin,
  SteamPendingLoginResult } from '../services/SteamGuardService';
import { DiagnosticLogService } from '../services/DiagnosticLogService';
import { SteamConfirmationHistoryItem, SteamConfirmationHistoryRepository } from
  '../services/SteamConfirmationHistoryRepository';
import { APP_TOKENS_KEY, AppStore } from '../data/AppStore';
import { AppRoute, AppRouter } from '../navigation/AppRouter';
import { Localization } from '../core/Localization';
import { SteamAccessTokenPair, SteamSessionService } from '../services/SteamSessionService';
import { AppError } from '../core/AppError';
import { AppSettingsService } from '../services/AppSettingsService';

@Builder
export function SteamConfirmationsPageBuilder(_name: string, param: ESObject) {
  NavDestination() {
    SteamConfirmationsPage({ tokenId: AppRouter.tokenId(param), onClose: (): void => AppRouter.pop() })
  }.hideTitleBar(true)
    .backgroundColor($r('app.color.page_background'))
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
}

/** 集中显示待登录、移动确认与本机加密操作历史。 */
@Component
export struct SteamConfirmationsPage {
  @StorageLink(APP_TOKENS_KEY) tokens: StoredToken[] = [];
  tokenId: string = '';
  onClose: () => void = (): void => {};
  @State private pendingCategory: number = 0;
  @State private confirmations: SteamConfirmation[] = [];
  @State private pendingLogins: SteamPendingLogin[] = [];
  @State private loading: boolean = false;
  @State private submitting: boolean = false;
  @State private hasLoaded: boolean = false;
  @State private lastRefresh: string = '';
  @State private pendingError: string = '';
  @State private confirmationError: string = '';
  // 默认不显示，等持久化设置读取完成后再决定，避免已关闭用户看到提醒闪现。
  @State private confirmationNoticeVisible: boolean = false;

  /** 页面首次显示时并行读取本地历史与服务端待处理列表。 */
  aboutToAppear(): void {
    this.loadConfirmationNotice();
    this.requestAll();
  }

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

  /** 读取命令式反馈与持久化历史标题所需的当前语言文本。 */
  private localized(resource: Resource, ...args: Array<string | number>): string {
    return Localization.text(this.context(), resource, args);
  }

  /** 翻译可预期业务错误，并阻止底层异常文本直接进入页面。 */
  private localizedError(error: Object): string {
    return Localization.error(this.context(), error, $r('app.string.error_steam_operation_failed'));
  }

  /** 从非敏感应用设置恢复安全提醒的永久关闭状态。 */
  private async loadConfirmationNotice(): Promise<void> {
    try {
      const dismissed = await AppSettingsService.getConfirmationNoticeDismissed(this.context());
      this.confirmationNoticeVisible = !dismissed;
    } catch (error) {
      // 读取失败时宁可继续显示安全提醒；底层异常只进入诊断日志。
      this.confirmationNoticeVisible = true;
      DiagnosticLogService.warn('SteamConfirmations',
        `Failed to load confirmation notice setting: ${(error as Error).message}`);
    }
  }

  /** 立即隐藏安全提醒并持久化；写入失败时恢复，避免误以为已经永久关闭。 */
  private async dismissConfirmationNotice(): Promise<void> {
    this.confirmationNoticeVisible = false;
    try {
      await AppSettingsService.dismissConfirmationNotice(this.context());
    } catch (error) {
      this.confirmationNoticeVisible = true;
      DiagnosticLogService.error('SteamConfirmations',
        `Failed to dismiss confirmation notice: ${(error as Error).message}`);
      this.showToast(this.localized($r('app.string.error_settings_operation_failed')), 3000);
    }
  }

  /** 按 UUID 查找当前 Steam Token，防止列表重排后误用索引。 */
  private currentToken(): StoredToken | null {
    return this.tokens.find((token: StoredToken): boolean => token.id === this.tokenId) ?? null;
  }

  /** 获取可用会话，并把透明刷新的凭据立即同步到加密仓库。 */
  private async resolveStoredSession(token: StoredToken): Promise<SteamAccessTokenPair> {
    const metadata = token.steam;
    if (!metadata) throw new Error('Steam metadata is unavailable');
    const session = await new SteamSessionService().resolveAccessToken(
      metadata.steamId, metadata.accessToken, metadata.refreshToken);
    if (session.accessToken !== metadata.accessToken || session.refreshToken !== metadata.refreshToken) {
      const updated = await AppStore.updateSteamSession(token.id, session.accessToken, session.refreshToken);
      if (!updated) {
        throw new AppError('steam_error_session_tokens_missing',
          'Steam token was removed before its refreshed session could be saved');
      }
      DiagnosticLogService.info('SteamConfirmations', 'Persisted transparently refreshed Steam session');
    }
    return session;
  }

  /** 两类列表独立请求，其中一个失败时仍展示另一个结果。 */
  private async requestAll(): Promise<void> {
    const token = this.currentToken();
    const metadata = token?.steam;
    if (!token || !metadata?.steamId || (!metadata.accessToken && !metadata.refreshToken)) {
      this.hasLoaded = true;
      this.showToast(this.localized($r('app.string.confirm_metadata_incomplete')), 2500);
      return;
    }
    this.loading = true;
    // 刷新开始即清空旧结果；失败后绝不能让用户继续操作上一次请求的陈旧条目。
    this.pendingLogins = [];
    this.confirmations = [];
    this.pendingError = '';
    this.confirmationError = '';
    const service = new SteamGuardService();
    let failed = false;
    let session: SteamAccessTokenPair;
    try {
      session = await this.resolveStoredSession(token);
    } catch (error) {
      const message = this.localizedError(error as Object);
      this.pendingError = message;
      this.confirmationError = message;
      this.loading = false;
      this.hasLoaded = true;
      DiagnosticLogService.warn('SteamConfirmations',
        `Session preparation failed: ${(error as Error).message}`);
      return;
    }
    try {
      const logins: SteamPendingLoginResult = await service.getPendingLogins(metadata.steamId,
        session.accessToken, session.refreshToken);
      this.pendingLogins = logins.items;
      if (logins.skipped > 0) {
        failed = true;
        this.pendingError = this.localized($r('app.string.confirm_skipped_requests'), logins.skipped);
        DiagnosticLogService.warn('SteamConfirmations',
          `Skipped unreadable pending login requests, count=${logins.skipped}`);
      }
    } catch (error) {
      failed = true;
      this.pendingError = this.localizedError(error as Object);
      DiagnosticLogService.warn('SteamConfirmations', `Pending login load failed: ${(error as Error).message}`);
    }
    if (metadata.identitySecret && metadata.deviceId) {
      try {
        this.confirmations = await service.getConfirmations(metadata.steamId, session.accessToken,
          session.refreshToken, metadata.identitySecret, metadata.deviceId);
      } catch (error) {
        failed = true;
        this.confirmationError = this.localizedError(error as Object);
        DiagnosticLogService.warn('SteamConfirmations', `Confirmation load failed: ${(error as Error).message}`);
      }
    } else {
      this.confirmationError = this.localized($r('app.string.confirm_missing_mobile_data'));
    }
    this.loading = false; this.hasLoaded = true; this.lastRefresh = new Date().toLocaleTimeString();
    if (failed) this.showToast(this.localized($r('app.string.confirm_partial_failure')), 2800);
  }

  /** 持久化远端已成功的操作；历史失败不得改变远端操作结果。 */
  private async saveHistory(items: SteamConfirmationHistoryItem[]): Promise<boolean> {
    try {
      await new SteamConfirmationHistoryRepository().append(this.context(), items);
      return true;
    } catch (error) {
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
      // 用户可能在列表页停留到 Access Token 临近过期；提交前重新准备并持久化会话，
      // 避免服务层透明刷新后只有本次请求拿到新令牌。
      const session = await this.resolveStoredSession(token);
      await new SteamGuardService().respondPendingLogin(metadata.steamId, session.accessToken,
        session.refreshToken, Base32.decode(token.secret), login, approve);
      this.pendingLogins = this.pendingLogins.filter((item: SteamPendingLogin): boolean =>
        item.clientId !== login.clientId);
      const historySaved = await this.saveHistory([SteamConfirmationHistoryRepository.create(this.tokenId, 'login',
        login.deviceName || this.localized($r('app.string.confirm_login_request')),
        `${login.location}${login.ip ? ` · ${login.ip}` : ''}`, 0, approve)]);
      const result = this.localized(approve ? $r('app.string.confirm_login_approved') :
        $r('app.string.confirm_login_rejected'));
      this.showToast(`${result}${historySaved ? '' : this.localized($r('app.string.confirm_history_failed_suffix'))}`,
        historySaved ? 2000 : 2800);
    } catch (error) { this.showToast(this.localizedError(error as Object), 3200); }
    finally { this.submitting = false; }
  }

  /** 处理移动确认；成功后才移除条目并写入历史。 */
  private async respond(confirmation: SteamConfirmation, approve: boolean): Promise<void> {
    if (this.submitting) return;
    const token = this.currentToken(); const metadata = token?.steam;
    if (!token || !metadata) return;
    this.submitting = true;
    try {
      const session = await this.resolveStoredSession(token);
      await new SteamGuardService().respondToConfirmation(metadata.steamId, session.accessToken,
        session.refreshToken, metadata.identitySecret, metadata.deviceId, confirmation, approve);
      this.confirmations = this.confirmations.filter((item: SteamConfirmation): boolean => item.id !== confirmation.id);
      const historySaved = await this.saveHistory([SteamConfirmationHistoryRepository.create(this.tokenId, 'mobile',
        confirmation.headline, confirmation.summary.join(' · '), confirmation.creationTime, approve)]);
      const result = this.localized(approve ? $r('app.string.confirm_mobile_approved') :
        $r('app.string.confirm_mobile_rejected'));
      this.showToast(`${result}${historySaved ? '' : this.localized($r('app.string.confirm_history_failed_suffix'))}`,
        historySaved ? 2000 : 2800);
    } catch (error) { this.showToast(this.localizedError(error as Object), 3000); }
    finally { this.submitting = false; }
  }

  /** 二次确认后批量处理移动确认，并为每条成功操作保留历史。 */
  private async respondAll(approve: boolean): Promise<void> {
    const token = this.currentToken(); const metadata = token?.steam;
    if (!token || !metadata || this.submitting || this.confirmations.length === 0) return;
    try {
      const dialog = await this.getUIContext().getPromptAction().showDialog({
        title: this.localized(approve ? $r('app.string.confirm_approve_all_title') :
          $r('app.string.confirm_reject_all_title')),
        message: this.localized(approve ? $r('app.string.confirm_approve_all_message') :
          $r('app.string.confirm_reject_all_message'), this.confirmations.length),
        alignment: DialogAlignment.Bottom,
        buttons: [
          { text: this.localized($r('app.string.common_cancel')), color: $r('app.color.text_tertiary') },
          { text: this.localized(approve ? $r('app.string.confirm_approve_all') :
            $r('app.string.confirm_reject_all'), this.confirmations.length),
            color: approve ? $r('app.color.brand_strong') : $r('app.color.danger') }
        ]
      });
      if (dialog.index !== 1) return;
      this.submitting = true;
      const pending = [...this.confirmations];
      const session = await this.resolveStoredSession(token);
      await new SteamGuardService().respondToConfirmations(metadata.steamId, session.accessToken,
        session.refreshToken, metadata.identitySecret, metadata.deviceId, pending, approve);
      const entries = pending.map((item: SteamConfirmation): SteamConfirmationHistoryItem =>
        SteamConfirmationHistoryRepository.create(this.tokenId, 'mobile', item.headline,
          item.summary.join(' · '), item.creationTime, approve));
      this.confirmations = [];
      const historySaved = await this.saveHistory(entries);
      const result = this.localized(approve ? $r('app.string.confirm_all_approved') :
        $r('app.string.confirm_all_rejected'));
      this.showToast(`${result}${historySaved ? '' : this.localized($r('app.string.confirm_history_failed_suffix'))}`,
        historySaved ? 2000 : 2800);
    } catch (error) { this.showToast(this.localizedError(error as Object), 3200); }
    finally { this.submitting = false; }
  }

  /** 为登录请求和移动确认提供一致的拒绝/批准按钮。 */
  @Builder private actionButtons(reject: () => void, approve: () => void) {
    Row({ space: 10 }) {
      Button($r('app.string.common_reject')).layoutWeight(1).backgroundColor($r('app.color.danger_surface'))
        .fontColor($r('app.color.danger')).enabled(!this.submitting).onClick(reject)
      Button($r('app.string.common_approve')).layoutWeight(1).backgroundColor($r('app.color.brand_strong'))
        .enabled(!this.submitting).onClick(approve)
    }.width('100%')
  }

  /** 在对应分区内直接显示请求失败原因，避免用户必须先导出日志才能判断问题。 */
  @Builder private inlineError(message: string) {
    Text(message).fontSize(12).fontColor($r('app.color.danger'))
      .lineHeight(18).padding(12).backgroundColor($r('app.color.danger_surface')).borderRadius(12).width('100%')
  }

  /** 用弱化的信息条承载分类说明，避免辅助文字散落在内容区。 */
  @Builder private categoryDescription(description: ResourceStr) {
    Row({ space: 10 }) {
      Divider().vertical(true).width(3).height(28)
        .color($r('app.color.brand')).strokeWidth(3)
      Text(description).fontSize(12).fontColor($r('app.color.text_secondary'))
        .lineHeight(18).layoutWeight(1)
    }.width('100%').padding({ left: 12, right: 12, top: 10, bottom: 10 })
      .backgroundColor($r('app.color.brand_surface')).borderRadius(12)
  }

  /** 以轻量居中布局表达当前分类已无待处理事项。 */
  @Builder private emptyPendingState(message: ResourceStr) {
    Column({ space: 10 }) {
      Stack() {
        Row().width(48).height(48).borderRadius(24)
          .backgroundColor($r('app.color.empty_icon_surface'))
        SymbolGlyph($r('sys.symbol.list_checkmask')).fontSize(24)
          .fontColor([$r('app.color.brand')])
      }
      Text(message).fontSize(13).fontColor($r('app.color.text_tertiary'))
        .textAlign(TextAlign.Center)
    }.width('100%').alignItems(HorizontalAlign.Center)
      .padding({ top: 20, bottom: 16 })
  }

  /** 显示来自其他设备的登录授权请求及其风险信息。 */
  @Builder private loginRequests() {
    Column({ space: 12 }) {
      this.categoryDescription($r('app.string.confirm_login_description'))
      if (this.pendingError.length > 0) {
        this.inlineError(this.pendingError)
      } else if (this.pendingLogins.length === 0) {
        this.emptyPendingState($r('app.string.confirm_no_login'))
      }
      ForEach(this.pendingLogins, (login: SteamPendingLogin) => {
        Column({ space: 7 }) {
          Text(login.deviceName || $r('app.string.common_unknown_device'))
            .fontSize(16).fontWeight(FontWeight.Bold).width('100%')
          Text(login.location || $r('app.string.common_unknown_location'))
            .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
          if (login.ip) {
            Text(login.ip).fontSize(12).fontColor($r('app.color.text_tertiary')).width('100%')
          }
          Text(login.persistent ? $r('app.string.confirm_persistent') : $r('app.string.confirm_temporary')).fontSize(12)
            .fontColor($r('app.color.text_tertiary')).width('100%')
          if (login.locationMismatch || login.highUsage) {
            Text($r('app.string.confirm_risk')).fontSize(12)
              .fontColor($r('app.color.warning')).width('100%')
          }
          this.actionButtons(() => this.respondLogin(login, false), () => this.respondLogin(login, true))
        }.padding(15).backgroundColor($r('app.color.surface')).borderRadius(14).width('100%')
          .border({ width: 1, color: $r('app.color.border') })
      }, (login: SteamPendingLogin): string => login.clientId)
    }.width('100%').alignItems(HorizontalAlign.Start)
  }

  /** 显示交易、市场与账户操作确认，并在有多条时提供批量处理入口。 */
  @Builder private mobileConfirmations() {
    Column({ space: 12 }) {
      this.categoryDescription($r('app.string.confirm_mobile_description'))
      if (this.confirmationError.length > 0) {
        this.inlineError(this.confirmationError)
      } else if (this.confirmations.length === 0) {
        this.emptyPendingState($r('app.string.confirm_no_mobile'))
      } else {
        Row({ space: 10 }) {
          Button($r('app.string.confirm_reject_all', this.confirmations.length)).layoutWeight(1)
            .backgroundColor($r('app.color.danger_surface')).fontColor($r('app.color.danger'))
            .enabled(!this.submitting).onClick(() => this.respondAll(false))
          Button($r('app.string.confirm_approve_all', this.confirmations.length)).layoutWeight(1)
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
          .border({ width: 1, color: $r('app.color.border') })
      }, (confirmation: SteamConfirmation): string => confirmation.id)
    }.width('100%').alignItems(HorizontalAlign.Start)
  }

  /** 构建登录请求或交易确认内容；两类内容直接作为页面唯一一层 Tabs。 */
  @Builder private pendingCategoryTab(showLoginRequests: boolean) {
    if (this.loading && !this.hasLoaded) {
      Column({ space: 12 }) {
        LoadingProgress().width(36).height(36)
        Text($r('app.string.confirm_loading'))
      }
        .width('100%').height('100%').justifyContent(FlexAlign.Center)
    } else {
      Scroll() {
        Column({ space: 16 }) {
          if (this.confirmationNoticeVisible) {
            Column({ space: 5 }) {
              Row({ space: 8 }) {
                Text($r('app.string.confirm_notice_title'))
                  .fontSize(16).fontWeight(FontWeight.Bold).layoutWeight(1)
                Button() {
                  SymbolGlyph($r('sys.symbol.xmark')).fontSize(18)
                    .fontColor([$r('app.color.text_secondary')])
                }
                  .width(32).height(32).backgroundColor(Color.Transparent)
                  .accessibilityText($r('app.string.common_close'))
                  .onClick(() => this.dismissConfirmationNotice())
              }.width('100%')
              Text($r('app.string.confirm_notice'))
                .fontSize(12).fontColor($r('app.color.text_secondary')).lineHeight(18).width('100%')
            }.padding({ left: 16, right: 10, top: 10, bottom: 14 })
              .backgroundColor($r('app.color.brand_surface')).borderRadius(16).width('100%')
          }
          if (showLoginRequests) {
            this.loginRequests()
          } else {
            this.mobileConfirmations()
          }
        }.padding({ left: 16, right: 16, top: 12, bottom: 24 }).width('100%')
          .alignItems(HorizontalAlign.Start)
      }.width('100%').height('100%').align(Alignment.TopStart)
    }
  }

  build() {
    Column() {
      Row({ space: 10 }) {
        Button() { SymbolGlyph($r('sys.symbol.chevron_left')).fontSize(22) }
          .type(ButtonType.Circle).width(38).height(38).backgroundColor($r('app.color.surface_muted'))
          .onClick(() => this.onClose())
        Column({ space: 3 }) {
          Text($r('app.string.confirm_title')).fontSize(26).fontWeight(FontWeight.Bold)
          Text(this.lastRefresh ? $r('app.string.confirm_last_refresh', this.lastRefresh) :
            $r('app.string.confirm_subtitle'))
            .fontSize(13).fontColor($r('app.color.text_tertiary'))
        }.alignItems(HorizontalAlign.Start).layoutWeight(1)
        Button() {
          SymbolGlyph($r('sys.symbol.list_checkmask')).fontSize(22)
            .fontColor([$r('app.color.text_secondary')])
        }
          .type(ButtonType.Circle).width(40).height(40)
          .backgroundColor($r('app.color.surface_muted'))
          .accessibilityText($r('app.string.confirm_history_title'))
          .onClick(() => AppRouter.pushToken(AppRoute.STEAM_HISTORY, this.tokenId))
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
      Tabs({ barPosition: BarPosition.Start, index: this.pendingCategory }) {
        TabContent() { this.pendingCategoryTab(true) }
          .tabBar($r('app.string.confirm_login_tab', this.pendingLogins.length))
        TabContent() { this.pendingCategoryTab(false) }
          .tabBar($r('app.string.confirm_mobile_tab', this.confirmations.length))
      }.barMode(BarMode.Fixed).barHeight(48).barBackgroundColor($r('app.color.surface'))
        .divider({ strokeWidth: 1, color: $r('app.color.divider') }).layoutWeight(1).width('100%')
        .onChange((index: number) => this.pendingCategory = index)
    }.width('100%').height('100%').backgroundColor($r('app.color.page_background'))
  }
}
