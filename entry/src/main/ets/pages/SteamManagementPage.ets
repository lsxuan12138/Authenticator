import { common } from '@kit.AbilityKit';
import { util } from '@kit.ArkTS';
import { BusinessError } from '@kit.BasicServicesKit';
import { SteamGuardMetadata, StoredToken } from '../domain/Token';
import { Base32 } from '../core/Base32';
import { OtpEngine } from '../core/OtpEngine';
import { SteamImportResult, SteamImportService } from '../services/SteamImportService';
import { SteamLoginCancellation, SteamLoginService } from '../services/SteamLoginService';
import { SteamGuardType } from '../services/SteamProtocol';
import { SteamAuthenticatorService, SteamAuthenticatorStatus } from '../services/SteamAuthenticatorService';
import { DiagnosticLogService } from '../services/DiagnosticLogService';
import { APP_TOKENS_KEY, AppStore } from '../data/AppStore';
import { AppRoute, AppRouter } from '../navigation/AppRouter';
import { PasswordAutoFillService } from '../services/PasswordAutoFillService';
import { SteamAccessTokenPair, SteamSessionService, SteamTokenLifetime,
  SteamTokenLifetimeState } from '../services/SteamSessionService';
import { SteamLocalDataCleaner } from '../services/SteamLocalDataCleaner';
import { Localization } from '../core/Localization';

/** 使用系统路由参数构建 Steam 会话、验证器和数据管理页面。 */
@Builder
export function SteamManagementPageBuilder(_name: string, param: ESObject) {
  NavDestination() {
    SteamManagementPage({
      tokenId: AppRouter.tokenId(param),
      onTokensChanged: (tokens: StoredToken[]): Promise<void> => AppStore.updateTokens(tokens),
      onClose: (): void => AppRouter.pop(),
      onTokenRemoved: (): void => AppRouter.returnHome()
    })
  }.hideTitleBar(true).onShown(() => AppRouter.markCurrent(AppRoute.STEAM_MANAGEMENT))
}

/**
 * Steam 专用管理页。会话、验证器和原始数据分区展示，避免 Token 详情页承载全部高级功能。
 */
@Component
export struct SteamManagementPage {
  @StorageLink(APP_TOKENS_KEY) tokens: StoredToken[] = [];
  tokenId: string = '';
  onTokensChanged: (tokens: StoredToken[]) => Promise<void> = async (_tokens: StoredToken[]): Promise<void> => {};
  onClose: () => void = (): void => {};
  onTokenRemoved: () => void = (): void => {};

  @State private selectedTab: number = 0;
  @State private metadataRepairMode: boolean = false;
  @State private steamId: string = '';
  @State private steamAccessToken: string = '';
  @State private steamDeviceId: string = '';
  @State private steamJsonText: string = '';
  @State private steamLoginAccount: string = '';
  @State private steamLoginPassword: string = '';
  @State private steamSessionLoading: boolean = false;
  @State private steamSessionStatus: string = '';
  @State private steamAuthenticatorLoading: boolean = false;
  @State private steamAuthenticatorStatus: SteamAuthenticatorStatus | null = null;
  private steamLoginCancellation?: SteamLoginCancellation;

  /** 页面出现时从当前 Token 加载可展示和可修复的元信息。 */
  aboutToAppear(): void {
    this.loadMetadata();
  }

  /** 页面离开时取消登录轮询，并清除未提交的密码与导入文本。 */
  aboutToDisappear(): void {
    this.steamLoginCancellation?.cancel();
    this.steamLoginPassword = '';
    this.steamJsonText = '';
  }

  /** 将非密钥字段复制到页面状态；敏感字段继续保留在 Token 模型中。 */
  private loadMetadata(): void {
    const metadata = this.currentToken()?.steam;
    this.steamId = metadata?.steamId ?? '';
    this.steamAccessToken = metadata?.accessToken ?? '';
    this.steamDeviceId = metadata?.deviceId ?? '';
    this.steamLoginAccount = metadata?.accountName || this.currentToken()?.account || '';
  }

  /** 显示 Steam 管理操作结果，Toast 失败时写诊断日志。 */
  private showToast(message: string, duration: number = 2000): void {
    try {
      this.getUIContext().getPromptAction().showToast({ message: message, duration: duration });
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('SteamManagement', `Failed to show toast: ${detail.message ?? message}`);
    }
  }

  /** 在页面边界翻译业务错误，未知网络或解析细节只进入诊断日志。 */
  private localizedError(error: Object): string {
    const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
    return Localization.error(context, error, $r('app.string.error_steam_operation_failed'));
  }

  /** 按稳定 UUID 返回当前管理目标，索引变化时仍能阻止误操作其他账户。 */
  private currentToken(): StoredToken | null {
    return this.tokens.find((token: StoredToken): boolean => token.id === this.tokenId) ?? null;
  }

  /** 读取当前 Refresh Token，仅用于状态展示和联网前置检查。 */
  private currentRefreshToken(): string {
    return this.currentToken()?.steam?.refreshToken ?? '';
  }

  /** 判断当前 Token 是否至少包含一种可用于联网请求的会话凭据。 */
  private hasCurrentSession(): boolean {
    const metadata = this.currentToken()?.steam;
    return !!metadata?.steamId && (!!metadata.accessToken || !!metadata.refreshToken);
  }

  /** 用新的 Steam 元信息复制 Token，避免原地修改 @StorageLink 中的旧对象。 */
  private tokenWithSteam(token: StoredToken, steam: SteamGuardMetadata): StoredToken {
    return {
      id: token.id, issuer: token.issuer, account: token.account, secret: token.secret,
      digits: token.digits, period: token.period, kind: token.kind, algorithm: token.algorithm,
      iconPath: token.iconPath, iconManual: token.iconManual, createdAt: token.createdAt, steam: steam
    };
  }

  /**
   * 获取实际可用的 Access Token，并在发生透明刷新时立即写回加密仓库。
   * 这样查询状态等只读操作也不会把新凭据仅留在进程内存中。
   */
  private async resolveStoredSession(token: StoredToken): Promise<SteamAccessTokenPair> {
    const metadata = token.steam;
    if (!metadata) {
      throw new Error('Steam metadata is unavailable');
    }
    const session = await new SteamSessionService().resolveAccessToken(
      metadata.steamId, metadata.accessToken, metadata.refreshToken);
    if (session.accessToken === metadata.accessToken && session.refreshToken === metadata.refreshToken) {
      return session;
    }
    const steam: SteamGuardMetadata = {
      steamId: metadata.steamId, accountName: metadata.accountName,
      identitySecret: metadata.identitySecret, deviceId: metadata.deviceId,
      accessToken: session.accessToken, refreshToken: session.refreshToken,
      guardData: metadata.guardData, revocationCode: metadata.revocationCode,
      serialNumber: metadata.serialNumber, tokenGid: metadata.tokenGid,
      uri: metadata.uri, secret1: metadata.secret1
    };
    const updated = this.tokenWithSteam(token, steam);
    const next = this.tokens.map((item: StoredToken): StoredToken => item.id === token.id ? updated : item);
    await this.onTokensChanged(next);
    this.tokens = next;
    this.steamAccessToken = session.accessToken;
    DiagnosticLogService.info('SteamManagement', 'Persisted transparently refreshed Steam session');
    return session;
  }

  /** 保存 Steam 已返回的新会话；失败时仍保留在内存，避免立刻丢失可能已轮换的 Refresh Token。 */
  private async persistRemoteSession(next: StoredToken[], accessToken: string): Promise<boolean> {
    this.tokens = next;
    this.steamAccessToken = accessToken;
    try {
      await this.onTokensChanged(next);
      return true;
    } catch (error) {
      DiagnosticLogService.error('SteamManagement',
        `Steam session changed remotely but local save failed: ${(error as Error).message}`);
      this.showToast(this.localized($r('app.string.steam_session_save_failed')), 4500);
      return false;
    }
  }

  /** 主动更新 Access Token，并原子保存 Steam 可能轮换的新 Refresh Token。 */
  private async refreshSteamSession(): Promise<void> {
    const token = this.currentToken();
    if (!token?.steam?.steamId || !token.steam.refreshToken) {
      this.showToast(this.localized($r('app.string.steam_refresh_requires_tokens')), 2600);
      return;
    }
    this.steamSessionLoading = true;
    try {
      const refreshed: SteamAccessTokenPair = await new SteamSessionService().refresh(
        token.steam.steamId, token.steam.refreshToken, true);
      const steam: SteamGuardMetadata = {
        steamId: token.steam.steamId,
        accountName: token.steam.accountName,
        identitySecret: token.steam.identitySecret,
        deviceId: token.steam.deviceId,
        accessToken: refreshed.accessToken,
        refreshToken: refreshed.refreshToken.length > 0 ? refreshed.refreshToken : token.steam.refreshToken,
        guardData: token.steam.guardData,
        revocationCode: token.steam.revocationCode,
        serialNumber: token.steam.serialNumber,
        tokenGid: token.steam.tokenGid,
        uri: token.steam.uri,
        secret1: token.steam.secret1
      };
      const updated = this.tokenWithSteam(token, steam);
      const next = this.tokens.map((item: StoredToken): StoredToken => item.id === token.id ? updated : item);
      if (await this.persistRemoteSession(next, refreshed.accessToken)) {
        this.showToast(this.localized($r('app.string.steam_access_updated')), 1800);
      }
    } catch (error) {
      this.showToast(this.localizedError(error as Object), 3200);
    } finally {
      this.steamSessionLoading = false;
    }
  }

  /** 使用密码和当前五位码重新认证；已有 Guard Data 时仅作为兼容字段一并提交。 */
  private async reauthenticateSteam(): Promise<void> {
    const token = this.currentToken();
    if (!token || !this.steamLoginAccount.trim() || !this.steamLoginPassword) {
      return;
    }
    this.steamSessionLoading = true;
    this.steamSessionStatus = this.localized($r('app.string.steam_creating_session'));
    this.steamLoginCancellation?.cancel();
    const cancellation = new SteamLoginCancellation();
    this.steamLoginCancellation = cancellation;
    try {
      const code = OtpEngine.generate(token).value;
      const session = await new SteamLoginService().refreshSession(
        this.steamLoginAccount.trim(), this.steamLoginPassword, code, token.steam?.guardData ?? '', cancellation,
        token.steam?.steamId ?? '',
        (type: number): void => {
          if (type === SteamGuardType.DEVICE_CONFIRMATION) {
            this.steamSessionStatus = this.localized($r('app.string.steam_approve_in_app'));
          } else if (type === SteamGuardType.EMAIL_CONFIRMATION) {
            this.steamSessionStatus = this.localized($r('app.string.steam_confirm_by_email'));
          }
        });
      if (!token.steam) {
        throw new Error(this.localized($r('app.string.steam_metadata_uninitialized')));
      }
      const steam: SteamGuardMetadata = {
        steamId: token.steam.steamId,
        identitySecret: token.steam.identitySecret,
        deviceId: token.steam.deviceId,
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        // MobileApp 会话通常不返回 new_guard_data；只有 Steam 明确下发新值时才覆盖已有兼容数据。
        guardData: session.guardData || token.steam.guardData || '',
        accountName: session.accountName || token.account,
        revocationCode: token.steam.revocationCode,
        serialNumber: token.steam.serialNumber,
        tokenGid: token.steam.tokenGid,
        uri: token.steam.uri,
        secret1: token.steam.secret1
      };
      const updated = this.tokenWithSteam(token, steam);
      const next = this.tokens.map((item: StoredToken): StoredToken => item.id === token.id ? updated : item);
      // 完整重新认证成功后主动请求保存；不需要重新添加或迁移验证器即可建立密码保险箱记录。
      PasswordAutoFillService.requestSave(this.getUIContext(), 'Steam reauthentication');
      this.steamLoginPassword = '';
      if (await this.persistRemoteSession(next, session.accessToken)) {
        this.showToast(this.localized($r('app.string.steam_session_reauthenticated')), 2200);
        this.steamSessionStatus = this.localized($r('app.string.steam_session_updated'));
      } else {
        this.steamSessionStatus = this.localized($r('app.string.steam_session_not_saved'));
      }
    } catch (error) {
      this.steamSessionStatus = this.localizedError(error as Object);
      this.showToast(this.steamSessionStatus, 3500);
    } finally {
      this.steamSessionLoading = false;
    }
  }

  /** 响应取消按钮，在下一个轮询安全点终止重新认证。 */
  private cancelSteamLogin(): void {
    this.steamLoginCancellation?.cancel();
    this.steamSessionStatus = this.localized($r('app.string.steam_login_canceling'));
  }

  /** 将 Steam 返回的 Unix 秒时间转换为本地可读文本。 */
  private formatStatusTime(seconds: number): string {
    if (seconds <= 0) {
      return this.localized($r('app.string.common_not_provided'));
    }
    try {
      return new Date(seconds * 1000).toLocaleString();
    } catch (_error) {
      return `${seconds}`;
    }
  }

  /** 把验证器最近使用类型转换为界面标签，同时保留未知值的兜底。 */
  private usageTypeLabel(type: number): string {
    if (type === 2) {
      return this.localized($r('app.string.steam_mobile_confirmation'));
    }
    if (type === 3) {
      return this.localized($r('app.string.steam_login_verification'));
    }
    return this.localized($r('app.string.steam_other_operation'));
  }

  /** 从 Steam 服务端查询验证器状态和最近使用记录。 */
  private async queryAuthenticatorStatus(): Promise<void> {
    const token = this.currentToken();
    const metadata = token?.steam;
    if (!token || !metadata?.steamId || (!metadata.accessToken && !metadata.refreshToken)) {
      this.showToast(this.localized($r('app.string.steam_query_requires_tokens')), 2500);
      return;
    }
    this.steamAuthenticatorLoading = true;
    try {
      const session = await this.resolveStoredSession(token);
      this.steamAuthenticatorStatus = await new SteamAuthenticatorService().queryAuthenticatorStatus(
        metadata.steamId, session.refreshToken, session.accessToken);
      this.showToast(this.localized($r('app.string.steam_status_updated')), 1600);
    } catch (error) {
      this.showToast(this.localizedError(error as Object), 3500);
    } finally {
      this.steamAuthenticatorLoading = false;
    }
  }

  /** 二次确认后撤销服务端验证器，并仅在成功后删除本地 Token。 */
  private async revokeAuthenticator(): Promise<void> {
    const token = this.currentToken();
    const metadata = token?.steam;
    if (!token || !metadata?.steamId || (!metadata.accessToken && !metadata.refreshToken) ||
      !metadata.revocationCode) {
      this.showToast(this.localized($r('app.string.steam_revoke_requires_data')), 2800);
      return;
    }
    try {
      const result = await this.getUIContext().getPromptAction().showDialog({
        title: this.localized($r('app.string.steam_revoke_dialog_title')),
        message: this.localized($r('app.string.steam_revoke_dialog_message'),
          metadata.accountName || token.account),
        alignment: DialogAlignment.Bottom,
        buttons: [
          { text: this.localized($r('app.string.common_cancel')), color: $r('app.color.text_tertiary') },
          { text: this.localized($r('app.string.steam_revoke_and_delete')), color: $r('app.color.danger_strong') }
        ]
      });
      if (result.index !== 1) {
        return;
      }
      this.steamAuthenticatorLoading = true;
      const session = await this.resolveStoredSession(token);
      await new SteamAuthenticatorService().revokeAuthenticator(
        metadata.steamId, session.refreshToken, metadata.revocationCode, session.accessToken);
      const next: StoredToken[] = this.tokens.filter((item: StoredToken): boolean => item.id !== this.tokenId);
      try {
        await this.onTokensChanged(next);
        this.tokens = next;
        const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        await SteamLocalDataCleaner.clean(context, token);
        this.showToast(this.localized($r('app.string.steam_revoked')), 2600);
      } catch (saveError) {
        // 远端撤销不可回滚；明确告诉用户仅本地清理失败，避免误以为 Steam 操作未执行。
        this.tokens = next;
        DiagnosticLogService.error('SteamManagement',
          `Authenticator revoked but local token deletion failed: ${(saveError as Error).message}`);
        this.showToast(this.localized($r('app.string.steam_revoked_delete_failed')), 5000);
      }
      this.onTokenRemoved();
    } catch (error) {
      this.showToast(this.localizedError(error as Object), 4000);
    } finally {
      this.steamAuthenticatorLoading = false;
    }
  }

  /** 保存高级修复允许的标识字段，受保护的令牌和密钥始终沿用原值。 */
  private async saveMetadata(): Promise<void> {
    const token = this.currentToken();
    if (!token) {
      return;
    }
    const previous = token.steam;
    const normalizedSteamId = this.steamId.trim();
    const normalizedDeviceId = this.steamDeviceId.trim();
    if (normalizedSteamId.length > 0 && !/^\d{16,20}$/.test(normalizedSteamId)) {
      this.showToast(this.localized($r('app.string.steam_invalid_id')), 2600);
      return;
    }
    if (normalizedDeviceId.length > 0 && !/^[A-Za-z0-9._:-]{4,128}$/.test(normalizedDeviceId)) {
      this.showToast(this.localized($r('app.string.steam_invalid_device_id')), 2600);
      return;
    }
    // 高级修复只允许更正标识字段。令牌与密钥保留原值，防止普通表单绕过登录/导入流程。
    const metadata: SteamGuardMetadata = {
      steamId: normalizedSteamId,
      accountName: token.account,
      identitySecret: previous?.identitySecret ?? '',
      deviceId: normalizedDeviceId,
      refreshToken: previous?.refreshToken ?? '',
      accessToken: previous?.accessToken ?? '',
      guardData: previous?.guardData ?? '',
      revocationCode: previous?.revocationCode ?? '',
      serialNumber: previous?.serialNumber,
      tokenGid: previous?.tokenGid,
      uri: previous?.uri,
      secret1: previous?.secret1
    };
    const updated = this.tokenWithSteam(token, metadata);
    const next = this.tokens.map((item: StoredToken): StoredToken => item.id === token.id ? updated : item);
    try {
      await this.onTokensChanged(next);
      this.tokens = next;
      this.metadataRepairMode = false;
      this.showToast(this.localized($r('app.string.steam_metadata_saved')), 1800);
    } catch (error) {
      DiagnosticLogService.error('SteamManagement',
        `Failed to save repaired metadata: ${(error as Error).message}`);
      this.showToast(this.localizedError(error as Object), 3200);
    }
  }

  /** 显示风险说明并在用户确认后开放 Steam ID 与 Device ID 编辑。 */
  private async enterMetadataRepair(): Promise<void> {
    try {
      const result = await this.getUIContext().getPromptAction().showDialog({
        title: this.localized($r('app.string.steam_repair_dialog_title')),
        message: this.localized($r('app.string.steam_repair_dialog_message')),
        alignment: DialogAlignment.Bottom,
        buttons: [
          { text: this.localized($r('app.string.common_cancel')), color: $r('app.color.text_tertiary') },
          { text: this.localized($r('app.string.steam_continue_repair')), color: $r('app.color.warning') }
        ]
      });
      if (result.index === 1) {
        this.loadMetadata();
        this.metadataRepairMode = true;
      }
    } catch (error) {
      this.showToast(this.localizedError(error as Object), 2600);
    }
  }

  /** 放弃未保存修复并从 Token 重新加载原始标识。 */
  private cancelMetadataRepair(): void {
    this.loadMetadata();
    this.metadataRepairMode = false;
  }

  /** 将敏感字段转换为不泄露内容的“已配置/未配置”状态。 */
  private configuredStatus(value: string): string {
    return this.localized(value.length > 0 ? $r('app.string.common_configured') :
      $r('app.string.common_not_configured'));
  }

  /** 读取当前系统语言对应的字符串资源，供 Toast、状态字段等非声明式文本使用。 */
  private localized(resource: Resource, ...args: Array<string | number>): string {
    const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
    return Localization.text(context, resource, args);
  }

  /** 把有效期距离压缩为适合手机界面的天、小时或分钟。 */
  private lifetimeDistance(milliseconds: number): string {
    const minutes = Math.max(1, Math.floor(milliseconds / 60000));
    if (minutes >= 2880) {
      return this.localized($r('app.string.steam_duration_days'), Math.floor(minutes / 1440));
    }
    if (minutes >= 120) {
      return this.localized($r('app.string.steam_duration_hours'), Math.floor(minutes / 60));
    }
    return this.localized($r('app.string.steam_duration_minutes'), minutes);
  }

  /** 以同一结构显示未过期和已过期令牌：状态、相对时长以及绝对到期时间。 */
  private tokenLifetimeStatus(token: string): string {
    const lifetime: SteamTokenLifetime = SteamSessionService.tokenLifetime(token);
    if (lifetime.state === SteamTokenLifetimeState.NOT_CONFIGURED) {
      return this.localized($r('app.string.common_not_configured'));
    }
    if (lifetime.state === SteamTokenLifetimeState.UNKNOWN) {
      return this.localized($r('app.string.steam_lifetime_unknown'));
    }
    const distance = this.lifetimeDistance(lifetime.distanceMillis);
    const expires = new Date(lifetime.expiresAt).toLocaleString();
    return this.localized(lifetime.state === SteamTokenLifetimeState.VALID ?
      $r('app.string.steam_lifetime_valid') : $r('app.string.steam_lifetime_expired'), distance, expires);
  }

  /** 解析 maFile/JSON，并用完整导入结果替换当前 Steam 元信息。 */
  private async importSteamText(text: string): Promise<void> {
    try {
      const imported: SteamImportResult = SteamImportService.parse(text);
      const token = this.currentToken();
      if (!token) {
        return;
      }
      // 所有字段先在临时对象中完成校验和转换，避免失败时留下“旧密钥 + 新账户元信息”。
      const bytes = new util.Base64Helper().decodeSync(imported.sharedSecret, util.Type.BASIC);
      const updated: StoredToken = {
        id: token.id,
        issuer: token.issuer,
        account: imported.accountName || token.account,
        secret: Base32.encode(bytes),
        digits: token.digits,
        period: token.period,
        kind: token.kind,
        algorithm: token.algorithm,
        iconPath: token.iconPath,
        iconManual: token.iconManual,
        createdAt: token.createdAt,
        steam: imported.metadata
      };
      const next = this.tokens.map((item: StoredToken): StoredToken => item.id === token.id ? updated : item);
      await this.onTokensChanged(next);
      this.tokens = next;
      this.steamJsonText = '';
      this.metadataRepairMode = false;
      this.loadMetadata();
      this.showToast(this.localized($r('app.string.steam_data_imported')), 2000);
    } catch (error) {
      this.showToast(this.localizedError(error as Object), 3200);
    }
  }

  /** 选择 Steam 数据文件并交给统一文本导入流程。 */
  private async pickSteamFile(): Promise<void> {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      const content = await SteamImportService.pickAndRead(context);
      if (content.length > 0) {
        await this.importSteamText(content);
      }
    } catch (error) {
      this.showToast(this.localizedError(error as Object), 3000);
    }
  }

  /** 构建令牌有效期、主动更新和重新认证区域。 */
  @Builder
  private sessionTab() {
    Scroll() {
      Column({ space: 14 }) {
        Column({ space: 8 }) {
          Text($r('app.string.steam_session_title')).fontSize(18).fontWeight(FontWeight.Bold).width('100%')
          Text($r('app.string.steam_session_description'))
            .fontSize(13).fontColor($r('app.color.text_secondary')).lineHeight(20).width('100%')
          Divider().color($r('app.color.steam_divider'))
          Text($r('app.string.steam_session_lifetime')).fontSize(14).fontWeight(FontWeight.Medium).width('100%')
          Text(this.tokenLifetimeStatus(this.currentRefreshToken()))
            .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
          Text($r('app.string.steam_access_lifetime')).fontSize(14).fontWeight(FontWeight.Medium).width('100%')
          Text(this.tokenLifetimeStatus(this.steamAccessToken))
            .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
          Text($r('app.string.steam_guard_data')).fontSize(14).fontWeight(FontWeight.Medium).width('100%')
          Text(this.configuredStatus(this.currentToken()?.steam?.guardData ?? ''))
            .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
          Text($r('app.string.steam_guard_data_note'))
            .fontSize(12).fontColor($r('app.color.text_tertiary')).lineHeight(18).width('100%')
          Button(this.steamSessionLoading ? $r('app.string.steam_updating') : $r('app.string.steam_update_access'))
            .width('100%').enabled(!this.steamSessionLoading && this.currentRefreshToken().length > 0)
            .backgroundColor($r('app.color.brand_surface_alt')).fontColor($r('app.color.brand_strong'))
            .onClick(() => this.refreshSteamSession())
        }.width('100%').padding(16).alignItems(HorizontalAlign.Start)
          .backgroundColor($r('app.color.surface')).borderRadius(18)

        Column({ space: 9 }) {
          Text($r('app.string.steam_reauthenticate')).fontSize(17).fontWeight(FontWeight.Bold).width('100%')
          Text($r('app.string.steam_reauthenticate_note'))
            .fontSize(13).fontColor($r('app.color.text_tertiary')).lineHeight(20).width('100%')
          TextInput({ placeholder: $r('app.string.steam_account_placeholder'), text: this.steamLoginAccount })
            .type(InputType.USER_NAME).contentType(ContentType.USER_NAME).enableAutoFill(true)
            .onChange((value: string) => this.steamLoginAccount = value.trim())
          TextInput({ placeholder: $r('app.string.steam_password_placeholder'), text: this.steamLoginPassword })
            .type(InputType.Password)
            .contentType(ContentType.PASSWORD).enableAutoFill(true)
            .onChange((value: string) => this.steamLoginPassword = value)
          Button(this.steamSessionLoading ? $r('app.string.steam_logging_in') : $r('app.string.steam_relogin'))
            .width('100%').enabled(!this.steamSessionLoading && this.steamLoginAccount.trim().length > 0 &&
              this.steamLoginPassword.length > 0)
            .backgroundColor($r('app.color.brand_strong')).onClick(() => this.reauthenticateSteam())
          if (this.steamSessionLoading) {
            Button($r('app.string.steam_cancel_login')).width('100%')
              .backgroundColor($r('app.color.surface_muted')).fontColor($r('app.color.text_secondary'))
              .onClick(() => this.cancelSteamLogin())
          }
          if (this.steamSessionStatus.length > 0) {
            Text(this.steamSessionStatus).fontSize(12).fontColor($r('app.color.text_tertiary'))
              .lineHeight(18).width('100%')
          }
        }.width('100%').padding(16).alignItems(HorizontalAlign.Start)
          .backgroundColor($r('app.color.surface')).borderRadius(18)
      }.width('100%').padding(16).alignItems(HorizontalAlign.Start)
        .justifyContent(FlexAlign.Start).align(Alignment.TopStart)
    }.width('100%').height('100%').align(Alignment.TopStart)
  }

  /** 构建服务端验证器状态、最近使用记录和撤销入口。 */
  @Builder
  private authenticatorTab() {
    Scroll() {
      Column({ space: 14 }) {
        Column({ space: 10 }) {
          Row() {
            Column({ space: 3 }) {
              Text($r('app.string.steam_server_status')).fontSize(18).fontWeight(FontWeight.Bold).width('100%')
              Text($r('app.string.steam_server_status_note'))
                .fontSize(13).fontColor($r('app.color.text_tertiary')).width('100%')
            }.alignItems(HorizontalAlign.Start).layoutWeight(1)
            if (this.steamAuthenticatorLoading) {
              LoadingProgress().width(22).height(22).color($r('app.color.brand_strong'))
            }
          }.width('100%')

          if (this.steamAuthenticatorStatus === null) {
            Text($r('app.string.steam_not_queried')).fontSize(14)
              .fontColor($r('app.color.text_secondary')).width('100%')
          } else {
            Column({ space: 7 }) {
              Text($r('app.string.steam_server_state_value', this.steamAuthenticatorStatus.state))
                .fontSize(14).fontWeight(FontWeight.Medium).width('100%')
              Text($r('app.string.steam_device_id_value',
                this.steamAuthenticatorStatus.deviceIdentifier || this.localized($r('app.string.common_not_provided'))))
                .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
              Text($r('app.string.steam_created_value',
                this.formatStatusTime(this.steamAuthenticatorStatus.timeCreated)))
                .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
              if (this.steamAuthenticatorStatus.usages.length > 0) {
                Text($r('app.string.steam_recent_usage_value',
                  this.formatStatusTime(this.steamAuthenticatorStatus.usages[0].time),
                  this.usageTypeLabel(this.steamAuthenticatorStatus.usages[0].usageType)))
                  .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
              }
              if (this.steamAuthenticatorStatus.timeTransferred > 0) {
                Text($r('app.string.steam_recent_transfer_value',
                  this.formatStatusTime(this.steamAuthenticatorStatus.timeTransferred)))
                  .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
              }
              Text($r('app.string.steam_scheme_version_value',
                this.steamAuthenticatorStatus.steamguardScheme, this.steamAuthenticatorStatus.version))
                .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
              Text($r('app.string.steam_revocation_attempts_value',
                this.steamAuthenticatorStatus.revocationAttemptsRemaining))
                .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
            }.width('100%').padding(12).backgroundColor($r('app.color.surface_muted')).borderRadius(12)
          }
          Button($r('app.string.steam_query_status')).width('100%')
            .enabled(!this.steamAuthenticatorLoading && this.hasCurrentSession())
            .backgroundColor($r('app.color.brand_surface_alt')).fontColor($r('app.color.brand_strong'))
            .onClick(() => this.queryAuthenticatorStatus())
        }.width('100%').padding(16).alignItems(HorizontalAlign.Start)
          .backgroundColor($r('app.color.surface')).borderRadius(18)

        Column({ space: 8 }) {
          Text($r('app.string.steam_danger')).fontSize(17).fontWeight(FontWeight.Bold)
            .fontColor($r('app.color.danger_strong')).width('100%')
          Text($r('app.string.steam_revoke_note'))
            .fontSize(13).fontColor($r('app.color.text_secondary')).lineHeight(20).width('100%')
          Button($r('app.string.steam_revoke')).width('100%')
            .enabled(!this.steamAuthenticatorLoading &&
              this.hasCurrentSession() && (this.currentToken()?.steam?.revocationCode?.length ?? 0) > 0)
            .backgroundColor($r('app.color.danger_surface')).fontColor($r('app.color.danger_strong'))
            .onClick(() => this.revokeAuthenticator())
        }.width('100%').padding(16).alignItems(HorizontalAlign.Start)
          .backgroundColor($r('app.color.surface')).borderRadius(18)
      }.width('100%').padding(16).alignItems(HorizontalAlign.Start)
        .justifyContent(FlexAlign.Start).align(Alignment.TopStart)
    }.width('100%').height('100%').align(Alignment.TopStart)
  }

  /** 构建只读数据状态、受限高级修复和 maFile/JSON 导入区域。 */
  @Builder
  private dataTab() {
    Scroll() {
      Column({ space: 14 }) {
        Column({ space: 10 }) {
          Text(this.metadataRepairMode ? $r('app.string.steam_advanced_repair') :
            $r('app.string.steam_data_status'))
            .fontSize(18).fontWeight(FontWeight.Bold).width('100%')
          if (this.metadataRepairMode) {
            Text($r('app.string.steam_repair_note'))
              .fontSize(13).fontColor($r('app.color.warning')).lineHeight(20).width('100%')
            TextInput({ placeholder: 'Steam ID', text: this.steamId })
              .onChange((value: string) => this.steamId = value)
            TextInput({ placeholder: 'Device ID', text: this.steamDeviceId })
              .onChange((value: string) => this.steamDeviceId = value)
            Text('Revocation Code').fontSize(13).fontColor($r('app.color.text_tertiary')).width('100%')
            TextInput({
              placeholder: 'Not configured',
              text: this.currentToken()?.steam?.revocationCode ?? ''
            })
              // Steam 下发的撤销码只能通过登录/迁移或 maFile 导入更新，高级修复仅供核对。
              .enabled(false)
              .enableAutoFill(false)
              .fontColor($r('app.color.text_secondary'))
              .opacity(1)
            Row({ space: 10 }) {
              Button($r('app.string.common_cancel')).layoutWeight(1)
                .backgroundColor($r('app.color.surface_muted')).fontColor($r('app.color.text_secondary'))
                .onClick(() => this.cancelMetadataRepair())
              Button($r('app.string.steam_save_repair')).layoutWeight(1)
                .backgroundColor($r('app.color.brand_strong'))
                .onClick(() => this.saveMetadata())
            }.width('100%')
          } else {
            Text($r('app.string.steam_id_value',
              this.steamId || this.localized($r('app.string.common_not_configured'))))
              .fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
            Text($r('app.string.steam_device_id_value',
              this.steamDeviceId || this.localized($r('app.string.common_not_configured'))))
              .fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
            Divider().color($r('app.color.steam_divider'))
            Text($r('app.string.steam_access_status_value',
              this.configuredStatus(this.currentToken()?.steam?.accessToken ?? '')))
              .fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
            Text($r('app.string.steam_refresh_status_value',
              this.configuredStatus(this.currentToken()?.steam?.refreshToken ?? '')))
              .fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
            Text($r('app.string.steam_identity_status_value',
              this.configuredStatus(this.currentToken()?.steam?.identitySecret ?? '')))
              .fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
            Text($r('app.string.steam_guard_data_status_value',
              this.configuredStatus(this.currentToken()?.steam?.guardData ?? '')))
              .fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
            Text($r('app.string.steam_revocation_status_value',
              this.configuredStatus(this.currentToken()?.steam?.revocationCode ?? '')))
              .fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
            Button($r('app.string.steam_advanced_repair')).width('100%')
              .backgroundColor($r('app.color.surface_muted')).fontColor($r('app.color.warning'))
              .onClick(() => this.enterMetadataRepair())
          }
        }.width('100%').padding(16).alignItems(HorizontalAlign.Start)
          .backgroundColor($r('app.color.surface')).borderRadius(18)

        Column({ space: 10 }) {
          Text($r('app.string.steam_import_title')).fontSize(18).fontWeight(FontWeight.Bold).width('100%')
          TextArea({ placeholder: $r('app.string.steam_import_placeholder'), text: this.steamJsonText }).height(130)
            .onChange((value: string) => this.steamJsonText = value)
          Row({ space: 10 }) {
            Button($r('app.string.steam_choose_file')).layoutWeight(1)
              .backgroundColor($r('app.color.brand_surface_alt')).fontColor($r('app.color.brand_strong'))
              .onClick(() => this.pickSteamFile())
            Button($r('app.string.steam_import_text')).layoutWeight(1)
              .backgroundColor($r('app.color.brand_strong'))
              .enabled(this.steamJsonText.trim().length > 0)
              .onClick(() => this.importSteamText(this.steamJsonText))
          }.width('100%')
        }.width('100%').padding(16).alignItems(HorizontalAlign.Start)
          .backgroundColor($r('app.color.surface')).borderRadius(18)
      }.width('100%').padding(16).alignItems(HorizontalAlign.Start)
        .justifyContent(FlexAlign.Start).align(Alignment.TopStart)
    }.width('100%').height('100%').align(Alignment.TopStart)
  }

  /** 组合 Steam 管理页标题及会话、验证器、数据三个分区。 */
  build() {
    Column() {
      Row({ space: 10 }) {
        Button() {
          SymbolGlyph($r('sys.symbol.chevron_left')).fontSize(22)
            .fontColor([$r('app.color.text_secondary')])
        }.type(ButtonType.Circle).width(38).height(38)
          .backgroundColor($r('app.color.surface_muted')).onClick(() => this.onClose())
        Column({ space: 3 }) {
          Text($r('app.string.steam_manage_title')).fontSize(26).fontWeight(FontWeight.Bold)
          Text(this.currentToken()?.steam?.accountName ||
            this.currentToken()?.account || 'Steam Token')
            .fontSize(13).fontColor($r('app.color.text_tertiary'))
        }.alignItems(HorizontalAlign.Start).layoutWeight(1)
      }.width('100%').padding({ left: 18, right: 18, top: 18, bottom: 8 })

      Tabs({ barPosition: BarPosition.Start, index: this.selectedTab }) {
        TabContent() {
          this.sessionTab()
        }.tabBar($r('app.string.steam_tab_session')).align(Alignment.TopStart)
        TabContent() {
          this.authenticatorTab()
        }.tabBar($r('app.string.steam_tab_authenticator')).align(Alignment.TopStart)
        TabContent() {
          this.dataTab()
        }.tabBar($r('app.string.steam_tab_data')).align(Alignment.TopStart)
      }
        .barMode(BarMode.Fixed)
        .barHeight(48)
        .barBackgroundColor($r('app.color.surface'))
        .onChange((index: number) => this.selectedTab = index)
        .layoutWeight(1)
        .width('100%')
        .align(Alignment.TopStart)
    }.width('100%').height('100%').alignItems(HorizontalAlign.Start)
      .justifyContent(FlexAlign.Start).align(Alignment.TopStart)
      .backgroundColor($r('app.color.page_background'))
  }
}
