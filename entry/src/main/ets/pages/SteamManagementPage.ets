import { common } from '@kit.AbilityKit';
import { util } from '@kit.ArkTS';
import { BusinessError } from '@kit.BasicServicesKit';
import { SteamGuardMetadata, StoredToken } from '../domain/Token';
import { Base32 } from '../core/Base32';
import { OtpEngine } from '../core/OtpEngine';
import { SteamAccessTokenResult, SteamGuardService } from '../services/SteamGuardService';
import { SteamImportResult, SteamImportService } from '../services/SteamImportService';
import { SteamLoginCancellation, SteamLoginService } from '../services/SteamLoginService';
import { SteamGuardType } from '../services/SteamProtocol';
import { SteamAuthenticatorService, SteamAuthenticatorStatus } from '../services/SteamAuthenticatorService';
import { DiagnosticLogService } from '../services/DiagnosticLogService';
import { APP_TOKENS_KEY, AppStore } from '../data/AppStore';
import { AppRoute, AppRouter } from '../navigation/AppRouter';
import { SteamProfile, SteamProfileService } from '../services/SteamProfileService';
import { SteamLocalDataCleaner } from '../services/SteamLocalDataCleaner';

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
  @State private steamLoginPassword: string = '';
  @State private steamSessionLoading: boolean = false;
  @State private steamSessionStatus: string = '';
  @State private steamAuthenticatorLoading: boolean = false;
  @State private steamAuthenticatorStatus: SteamAuthenticatorStatus | null = null;
  @State private steamProfile: SteamProfile | null = null;
  @State private steamProfileLoading: boolean = false;
  private steamLoginCancellation?: SteamLoginCancellation;

  /** 页面出现时从当前 Token 加载可展示和可修复的元信息。 */
  aboutToAppear(): void {
    this.loadMetadata();
    this.loadSteamProfile(false);
  }

  /** 读取带 12 小时有效期的公开资料缓存；手动刷新时强制联网更新。 */
  private async loadSteamProfile(forceRefresh: boolean): Promise<void> {
    const metadata = this.currentToken()?.steam;
    if (!metadata?.steamId || (!metadata.accessToken && !metadata.refreshToken)) return;
    this.steamProfileLoading = true;
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      this.steamProfile = await new SteamProfileService().load(context, metadata.steamId,
        metadata.accessToken, metadata.refreshToken, forceRefresh);
      if (forceRefresh) this.showToast('Steam 账户资料已更新', 1600);
    } catch (error) {
      DiagnosticLogService.warn('SteamManagement', `Profile load failed: ${(error as Error).message}`);
      if (forceRefresh) this.showToast((error as Error).message, 2800);
    } finally {
      this.steamProfileLoading = false;
    }
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

  /** 按稳定 UUID 返回当前管理目标，索引变化时仍能阻止误操作其他账户。 */
  private currentToken(): StoredToken | null {
    return this.tokens.find((token: StoredToken): boolean => token.id === this.tokenId) ?? null;
  }

  /** 读取当前 Refresh Token，仅用于状态展示和联网前置检查。 */
  private currentRefreshToken(): string {
    return this.currentToken()?.steam?.refreshToken ?? '';
  }

  /** 用新的 Steam 元信息复制 Token，避免原地修改 @StorageLink 中的旧对象。 */
  private tokenWithSteam(token: StoredToken, steam: SteamGuardMetadata): StoredToken {
    return {
      id: token.id, issuer: token.issuer, account: token.account, secret: token.secret,
      digits: token.digits, period: token.period, kind: token.kind, algorithm: token.algorithm,
      iconPath: token.iconPath, iconManual: token.iconManual, createdAt: token.createdAt, steam: steam
    };
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
      this.showToast('Steam 会话已更新，但本地保存失败；请勿退出应用并重试更新', 4500);
      return false;
    }
  }

  /** 主动更新 Access Token，并原子保存 Steam 可能轮换的新 Refresh Token。 */
  private async refreshSteamSession(): Promise<void> {
    const token = this.currentToken();
    if (!token?.steam?.steamId || !token.steam.refreshToken) {
      this.showToast('更新 Access Token 需要 Steam ID 和 Refresh Token', 2600);
      return;
    }
    this.steamSessionLoading = true;
    try {
      const refreshed: SteamAccessTokenResult = await new SteamGuardService().refreshSessionTokens(
        token.steam.steamId, token.steam.refreshToken);
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
        this.showToast('Steam Access Token 已更新', 1800);
      }
    } catch (error) {
      this.showToast((error as Error).message, 3200);
    } finally {
      this.steamSessionLoading = false;
    }
  }

  /** 使用密码和当前五位码重新认证；已有 Guard Data 时仅作为兼容字段一并提交。 */
  private async reauthenticateSteam(): Promise<void> {
    const token = this.currentToken();
    if (!token || !this.steamLoginPassword) {
      return;
    }
    this.steamSessionLoading = true;
    this.steamSessionStatus = '正在创建 Steam 登录会话…';
    this.steamLoginCancellation?.cancel();
    const cancellation = new SteamLoginCancellation();
    this.steamLoginCancellation = cancellation;
    try {
      const code = OtpEngine.generate(token).value;
      const loginAccount = token.steam?.accountName || token.account;
      const session = await new SteamLoginService().refreshSession(
        loginAccount, this.steamLoginPassword, code, token.steam?.guardData ?? '', cancellation,
        (type: number): void => {
          if (type === SteamGuardType.DEVICE_CONFIRMATION) {
            this.steamSessionStatus = '请在已登录的 Steam 手机应用中批准登录，应用会自动继续';
          } else if (type === SteamGuardType.EMAIL_CONFIRMATION) {
            this.steamSessionStatus = '请点击 Steam 邮件中的确认链接，应用会自动继续';
          }
        });
      if (!token.steam) {
        throw new Error('Steam 元信息尚未初始化');
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
      this.steamLoginPassword = '';
      if (await this.persistRemoteSession(next, session.accessToken)) {
        this.showToast('Steam 会话已重新认证并更新', 2200);
        this.steamSessionStatus = '会话已更新';
      } else {
        this.steamSessionStatus = '会话已更新，但尚未安全保存';
      }
    } catch (error) {
      this.steamSessionStatus = (error as Error).message;
      this.showToast((error as Error).message, 3500);
    } finally {
      this.steamSessionLoading = false;
    }
  }

  /** 响应取消按钮，在下一个轮询安全点终止重新认证。 */
  private cancelSteamLogin(): void {
    this.steamLoginCancellation?.cancel();
    this.steamSessionStatus = '正在取消 Steam 登录…';
  }

  /** 将 Steam 返回的 Unix 秒时间转换为本地可读文本。 */
  private formatStatusTime(seconds: number): string {
    if (seconds <= 0) {
      return '未提供';
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
      return '移动确认';
    }
    if (type === 3) {
      return '登录验证';
    }
    return '其他操作';
  }

  /** 从 Steam 服务端查询验证器状态和最近使用记录。 */
  private async queryAuthenticatorStatus(): Promise<void> {
    const metadata = this.currentToken()?.steam;
    if (!metadata?.steamId || !metadata.refreshToken) {
      this.showToast('查询状态需要 Steam ID 和 Refresh Token', 2500);
      return;
    }
    this.steamAuthenticatorLoading = true;
    try {
      this.steamAuthenticatorStatus = await new SteamAuthenticatorService().queryAuthenticatorStatus(
        metadata.steamId, metadata.refreshToken);
      this.showToast('验证器状态已更新', 1600);
    } catch (error) {
      this.showToast((error as Error).message, 3500);
    } finally {
      this.steamAuthenticatorLoading = false;
    }
  }

  /** 二次确认后撤销服务端验证器，并仅在成功后删除本地 Token。 */
  private async revokeAuthenticator(): Promise<void> {
    const token = this.currentToken();
    const metadata = token?.steam;
    if (!token || !metadata?.steamId || !metadata.refreshToken || !metadata.revocationCode) {
      this.showToast('撤销需要 Steam ID、Refresh Token 和撤销码', 2800);
      return;
    }
    try {
      const result = await this.getUIContext().getPromptAction().showDialog({
        title: '撤销 Steam 验证器？',
        message: `这会从 Steam 账户“${metadata.accountName || token.account}”移除移动验证器，` +
          '当前验证码和确认功能会立即失效。成功后，本地对应 Token 也会删除。此操作无法撤销。',
        alignment: DialogAlignment.Bottom,
        buttons: [
          { text: '取消', color: $r('app.color.text_tertiary') },
          { text: '撤销并删除', color: $r('app.color.danger_strong') }
        ]
      });
      if (result.index !== 1) {
        return;
      }
      this.steamAuthenticatorLoading = true;
      await new SteamAuthenticatorService().revokeAuthenticator(
        metadata.steamId, metadata.refreshToken, metadata.revocationCode);
      const next: StoredToken[] = this.tokens.filter((item: StoredToken): boolean => item.id !== this.tokenId);
      try {
        await this.onTokensChanged(next);
        this.tokens = next;
        const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        await SteamLocalDataCleaner.clean(context, token);
        this.showToast('Steam 验证器已撤销，本地 Token 已删除', 2600);
      } catch (saveError) {
        // 远端撤销不可回滚；明确告诉用户仅本地清理失败，避免误以为 Steam 操作未执行。
        this.tokens = next;
        DiagnosticLogService.error('SteamManagement',
          `Authenticator revoked but local token deletion failed: ${(saveError as Error).message}`);
        this.showToast('Steam 验证器已撤销，但本地 Token 删除失败；重启后请手动删除失效条目', 5000);
      }
      this.onTokenRemoved();
    } catch (error) {
      this.showToast((error as Error).message, 4000);
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
      this.showToast('Steam ID 应为 16 到 20 位数字', 2600);
      return;
    }
    if (normalizedDeviceId.length > 0 && !/^[A-Za-z0-9._:-]{4,128}$/.test(normalizedDeviceId)) {
      this.showToast('Device ID 格式无效', 2600);
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
      this.showToast('Steam 元信息已保存', 1800);
    } catch (error) {
      DiagnosticLogService.error('SteamManagement',
        `Failed to save repaired metadata: ${(error as Error).message}`);
      this.showToast(`保存 Steam 元信息失败：${(error as Error).message}`, 3200);
    }
  }

  /** 显示风险说明并在用户确认后开放 Steam ID 与 Device ID 编辑。 */
  private async enterMetadataRepair(): Promise<void> {
    try {
      const result = await this.getUIContext().getPromptAction().showDialog({
        title: '进入高级修复？',
        message: '错误的 Steam ID 或 Device ID 会导致确认、扫码登录和会话请求失败。' +
          '令牌与密钥不会在此处开放编辑，请优先通过重新登录或 maFile / JSON 导入修复。',
        alignment: DialogAlignment.Bottom,
        buttons: [
          { text: '取消', color: $r('app.color.text_tertiary') },
          { text: '继续修复', color: $r('app.color.warning') }
        ]
      });
      if (result.index === 1) {
        this.loadMetadata();
        this.metadataRepairMode = true;
      }
    } catch (error) {
      this.showToast((error as Error).message, 2600);
    }
  }

  /** 放弃未保存修复并从 Token 重新加载原始标识。 */
  private cancelMetadataRepair(): void {
    this.loadMetadata();
    this.metadataRepairMode = false;
  }

  /** 将敏感字段转换为不泄露内容的“已配置/未配置”状态。 */
  private configuredStatus(value: string): string {
    return value.length > 0 ? '已配置' : '未配置';
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
      this.showToast('Steam 数据已导入并绑定', 2000);
    } catch (error) {
      this.showToast((error as Error).message, 3200);
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
      this.showToast((error as Error).message, 3000);
    }
  }

  /** 构建令牌有效期、主动更新和重新认证区域。 */
  @Builder
  private sessionTab() {
    Scroll() {
      Column({ space: 14 }) {
        Column({ space: 8 }) {
          Text('Steam 会话').fontSize(18).fontWeight(FontWeight.Bold).width('100%')
          Text('Refresh Token 决定登录会话可维持多久；Access Token 过期时通常可以直接更新。')
            .fontSize(13).fontColor($r('app.color.text_secondary')).lineHeight(20).width('100%')
          Divider().color($r('app.color.steam_divider'))
          Text('会话有效期').fontSize(14).fontWeight(FontWeight.Medium).width('100%')
          Text(SteamGuardService.tokenStatus(this.currentRefreshToken()))
            .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
          Text('Access Token 有效期').fontSize(14).fontWeight(FontWeight.Medium).width('100%')
          Text(SteamGuardService.tokenStatus(this.steamAccessToken))
            .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
          Text('兼容登录数据（Guard Data）').fontSize(14).fontWeight(FontWeight.Medium).width('100%')
          Text(this.configuredStatus(this.currentToken()?.steam?.guardData ?? ''))
            .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
          Text('MobileApp 登录通常不会下发该字段，未配置是正常状态，不影响验证码、确认或会话更新。')
            .fontSize(12).fontColor($r('app.color.text_tertiary')).lineHeight(18).width('100%')
          Button(this.steamSessionLoading ? '正在更新…' : '更新 Access Token')
            .width('100%').enabled(!this.steamSessionLoading && this.currentRefreshToken().length > 0)
            .backgroundColor($r('app.color.brand_surface_alt')).fontColor($r('app.color.brand_strong'))
            .onClick(() => this.refreshSteamSession())
        }.width('100%').padding(16).alignItems(HorizontalAlign.Start)
          .backgroundColor($r('app.color.surface')).borderRadius(18)

        Column({ space: 9 }) {
          Text('重新认证').fontSize(17).fontWeight(FontWeight.Bold).width('100%')
          Text('密码只用于本次登录，不会保存；Steam Guard 验证码由当前 Token 自动提交。如果 Steam 返回可选的 Guard Data，应用会加密保存以兼容后续登录。')
            .fontSize(13).fontColor($r('app.color.text_tertiary')).lineHeight(20).width('100%')
          TextInput({ placeholder: 'Steam 账户密码', text: this.steamLoginPassword }).type(InputType.Password)
            .onChange((value: string) => this.steamLoginPassword = value)
          Button(this.steamSessionLoading ? '正在登录…' : '重新登录并更新会话')
            .width('100%').enabled(!this.steamSessionLoading && this.steamLoginPassword.length > 0)
            .backgroundColor($r('app.color.brand_strong')).onClick(() => this.reauthenticateSteam())
          if (this.steamSessionLoading) {
            Button('取消登录').width('100%')
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
              Text('服务端状态').fontSize(18).fontWeight(FontWeight.Bold).width('100%')
              Text('这些字段由 Steam QueryStatus 接口直接返回。')
                .fontSize(13).fontColor($r('app.color.text_tertiary')).width('100%')
            }.alignItems(HorizontalAlign.Start).layoutWeight(1)
            if (this.steamAuthenticatorLoading) {
              LoadingProgress().width(22).height(22).color($r('app.color.brand_strong'))
            }
          }.width('100%')

          if (this.steamAuthenticatorStatus === null) {
            Text('尚未查询').fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
          } else {
            Column({ space: 7 }) {
              Text(`服务端状态值：${this.steamAuthenticatorStatus.state}`)
                .fontSize(14).fontWeight(FontWeight.Medium).width('100%')
              Text(`Device ID：${this.steamAuthenticatorStatus.deviceIdentifier || '未提供'}`)
                .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
              Text(`创建时间：${this.formatStatusTime(this.steamAuthenticatorStatus.timeCreated)}`)
                .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
              if (this.steamAuthenticatorStatus.usages.length > 0) {
                Text(`最近使用：${this.formatStatusTime(this.steamAuthenticatorStatus.usages[0].time)} · ` +
                  `${this.usageTypeLabel(this.steamAuthenticatorStatus.usages[0].usageType)}`)
                  .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
              }
              if (this.steamAuthenticatorStatus.timeTransferred > 0) {
                Text(`最近转移：${this.formatStatusTime(this.steamAuthenticatorStatus.timeTransferred)}`)
                  .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
              }
              Text(`方案 / 版本：${this.steamAuthenticatorStatus.steamguardScheme} / ` +
                `${this.steamAuthenticatorStatus.version}`)
                .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
              Text(`撤销尝试剩余：${this.steamAuthenticatorStatus.revocationAttemptsRemaining}`)
                .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
            }.width('100%').padding(12).backgroundColor($r('app.color.surface_muted')).borderRadius(12)
          }
          Button('查询最新状态').width('100%')
            .enabled(!this.steamAuthenticatorLoading && this.currentRefreshToken().length > 0)
            .backgroundColor($r('app.color.brand_surface_alt')).fontColor($r('app.color.brand_strong'))
            .onClick(() => this.queryAuthenticatorStatus())
        }.width('100%').padding(16).alignItems(HorizontalAlign.Start)
          .backgroundColor($r('app.color.surface')).borderRadius(18)

        Column({ space: 8 }) {
          Text('危险操作').fontSize(17).fontWeight(FontWeight.Bold)
            .fontColor($r('app.color.danger_strong')).width('100%')
          Text('撤销会从 Steam 账户移除移动验证器，并使本地验证码与确认功能失效。')
            .fontSize(13).fontColor($r('app.color.text_secondary')).lineHeight(20).width('100%')
          Button('撤销 Steam 验证器').width('100%')
            .enabled(!this.steamAuthenticatorLoading &&
              (this.currentToken()?.steam?.revocationCode?.length ?? 0) > 0)
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
          Text(this.metadataRepairMode ? '高级修复' : '数据状态')
            .fontSize(18).fontWeight(FontWeight.Bold).width('100%')
          if (this.metadataRepairMode) {
            Text('这里只允许修复可识别字段。Access Token、Refresh Token 和密钥请通过重新登录或导入更新。')
              .fontSize(13).fontColor($r('app.color.warning')).lineHeight(20).width('100%')
            TextInput({ placeholder: 'Steam ID', text: this.steamId })
              .onChange((value: string) => this.steamId = value)
            TextInput({ placeholder: 'Device ID', text: this.steamDeviceId })
              .onChange((value: string) => this.steamDeviceId = value)
            Row({ space: 10 }) {
              Button('取消').layoutWeight(1)
                .backgroundColor($r('app.color.surface_muted')).fontColor($r('app.color.text_secondary'))
                .onClick(() => this.cancelMetadataRepair())
              Button('保存修复').layoutWeight(1).backgroundColor($r('app.color.brand_strong'))
                .onClick(() => this.saveMetadata())
            }.width('100%')
          } else {
            Text(`Steam ID：${this.steamId || '未配置'}`)
              .fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
            Text(`Device ID：${this.steamDeviceId || '未配置'}`)
              .fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
            Divider().color($r('app.color.steam_divider'))
            Text(`Access Token：${this.configuredStatus(this.currentToken()?.steam?.accessToken ?? '')}`)
              .fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
            Text(`Refresh Token：${this.configuredStatus(this.currentToken()?.steam?.refreshToken ?? '')}`)
              .fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
            Text(`Identity Secret：${this.configuredStatus(this.currentToken()?.steam?.identitySecret ?? '')}`)
              .fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
            Text(`兼容登录数据（Guard Data）：${this.configuredStatus(
              this.currentToken()?.steam?.guardData ?? '')}`)
              .fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
            Text(`撤销码：${this.configuredStatus(this.currentToken()?.steam?.revocationCode ?? '')}`)
              .fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
            Button('高级修复').width('100%')
              .backgroundColor($r('app.color.surface_muted')).fontColor($r('app.color.warning'))
              .onClick(() => this.enterMetadataRepair())
          }
        }.width('100%').padding(16).alignItems(HorizontalAlign.Start)
          .backgroundColor($r('app.color.surface')).borderRadius(18)

        Column({ space: 10 }) {
          Text('maFile / JSON 导入').fontSize(18).fontWeight(FontWeight.Bold).width('100%')
          TextArea({ placeholder: '粘贴 maFile 或 JSON 文本', text: this.steamJsonText }).height(130)
            .onChange((value: string) => this.steamJsonText = value)
          Row({ space: 10 }) {
            Button('选择文件').layoutWeight(1)
              .backgroundColor($r('app.color.brand_surface_alt')).fontColor($r('app.color.brand_strong'))
              .onClick(() => this.pickSteamFile())
            Button('导入文本').layoutWeight(1).backgroundColor($r('app.color.brand_strong'))
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
        if (this.steamProfile?.avatarPath) {
          Image(this.steamProfile.avatarPath).width(42).height(42).borderRadius(21)
            .objectFit(ImageFit.Cover).draggable(false)
        }
        Column({ space: 3 }) {
          Text('Steam 管理').fontSize(26).fontWeight(FontWeight.Bold)
          Text(this.steamProfile?.displayName || this.currentToken()?.steam?.accountName ||
            this.currentToken()?.account || 'Steam Token')
            .fontSize(13).fontColor($r('app.color.text_tertiary'))
        }.alignItems(HorizontalAlign.Start).layoutWeight(1)
        Button() {
          if (this.steamProfileLoading) {
            LoadingProgress().width(20).height(20).color($r('app.color.brand_strong'))
          } else {
            SymbolGlyph($r('sys.symbol.arrow_clockwise')).fontSize(20)
              .fontColor([$r('app.color.text_secondary')])
          }
        }.type(ButtonType.Circle).width(38).height(38).enabled(!this.steamProfileLoading)
          .backgroundColor($r('app.color.surface_muted')).accessibilityText('刷新 Steam 账户资料')
          .onClick(() => this.loadSteamProfile(true))
      }.width('100%').padding({ left: 18, right: 18, top: 18, bottom: 8 })

      Tabs({ barPosition: BarPosition.Start, index: this.selectedTab }) {
        TabContent() {
          this.sessionTab()
        }.tabBar('会话').align(Alignment.TopStart)
        TabContent() {
          this.authenticatorTab()
        }.tabBar('验证器').align(Alignment.TopStart)
        TabContent() {
          this.dataTab()
        }.tabBar('数据').align(Alignment.TopStart)
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
      .backgroundColor($r('app.color.surface_subtle'))
  }
}
