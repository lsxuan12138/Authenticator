import { common } from '@kit.AbilityKit';
import { util } from '@kit.ArkTS';
import { BusinessError } from '@kit.BasicServicesKit';
import { SteamGuardMetadata, StoredToken } from '../domain/Token';
import { Base32 } from '../core/Base32';
import { OtpEngine } from '../core/OtpEngine';
import { SteamAccessTokenResult, SteamGuardService } from '../services/SteamGuardService';
import { SteamImportResult, SteamImportService } from '../services/SteamImportService';
import { SteamLoginCancellation, SteamLoginService } from '../services/SteamLoginService';
import { SteamGuardType } from '../services/SteamProto';
import { SteamAuthenticatorService, SteamAuthenticatorStatus } from '../services/SteamAuthenticatorService';
import { DiagnosticLogService } from '../services/DiagnosticLogService';

/**
 * Steam 专用管理页。会话、验证器和原始数据分区展示，避免 Token 详情页承载全部高级功能。
 */
@Component
export struct SteamManagementPage {
  @Prop tokens: StoredToken[] = [];
  tokenIndex: number = -1;
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
  private steamLoginCancellation?: SteamLoginCancellation;

  aboutToAppear(): void {
    this.loadMetadata();
  }

  aboutToDisappear(): void {
    this.steamLoginCancellation?.cancel();
  }

  private loadMetadata(): void {
    if (this.tokenIndex < 0 || this.tokenIndex >= this.tokens.length) {
      return;
    }
    const metadata = this.tokens[this.tokenIndex].steam;
    this.steamId = metadata?.steamId ?? '';
    this.steamAccessToken = metadata?.accessToken ?? '';
    this.steamDeviceId = metadata?.deviceId ?? '';
  }

  private showToast(message: string, duration: number = 2000): void {
    try {
      this.getUIContext().getPromptAction().showToast({ message: message, duration: duration });
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('SteamManagement', `Failed to show toast: ${detail.message ?? message}`);
    }
  }

  private currentToken(): StoredToken | null {
    if (this.tokenIndex < 0 || this.tokenIndex >= this.tokens.length) {
      return null;
    }
    return this.tokens[this.tokenIndex];
  }

  private currentRefreshToken(): string {
    return this.currentToken()?.steam?.refreshToken ?? '';
  }

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
      token.steam.accessToken = refreshed.accessToken;
      if (refreshed.refreshToken.length > 0) {
        token.steam.refreshToken = refreshed.refreshToken;
      }
      this.steamAccessToken = refreshed.accessToken;
      this.tokens = [...this.tokens];
      await this.onTokensChanged(this.tokens);
      this.showToast('Steam Access Token 已更新', 1800);
    } catch (error) {
      this.showToast((error as Error).message, 3200);
    } finally {
      this.steamSessionLoading = false;
    }
  }

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
          }
        });
      if (!token.steam) {
        throw new Error('Steam 元信息尚未初始化');
      }
      token.steam.accessToken = session.accessToken;
      token.steam.refreshToken = session.refreshToken;
      // new_guard_data 可能为空；只有 Steam 明确返回新值时才覆盖已有信任凭据。
      token.steam.guardData = session.guardData || token.steam.guardData || '';
      token.steam.accountName = session.accountName || token.account;
      this.steamAccessToken = session.accessToken;
      this.steamLoginPassword = '';
      this.tokens = [...this.tokens];
      await this.onTokensChanged(this.tokens);
      this.showToast('Steam 会话已重新认证并更新', 2200);
      this.steamSessionStatus = '会话已更新';
    } catch (error) {
      this.steamSessionStatus = (error as Error).message;
      this.showToast((error as Error).message, 3500);
    } finally {
      this.steamSessionLoading = false;
    }
  }

  private cancelSteamLogin(): void {
    this.steamLoginCancellation?.cancel();
    this.steamSessionStatus = '正在取消 Steam 登录…';
  }

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

  private usageTypeLabel(type: number): string {
    if (type === 2) {
      return '移动确认';
    }
    if (type === 3) {
      return '登录验证';
    }
    return '其他操作';
  }

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
      const next: StoredToken[] = [...this.tokens];
      next.splice(this.tokenIndex, 1);
      this.tokens = next;
      await this.onTokensChanged(next);
      this.showToast('Steam 验证器已撤销，本地 Token 已删除', 2600);
      this.onTokenRemoved();
    } catch (error) {
      this.showToast((error as Error).message, 4000);
    } finally {
      this.steamAuthenticatorLoading = false;
    }
  }

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
    token.steam = metadata;
    this.tokens = [...this.tokens];
    await this.onTokensChanged(this.tokens);
    this.metadataRepairMode = false;
    this.showToast('Steam 元信息已保存', 1800);
  }

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

  private cancelMetadataRepair(): void {
    this.loadMetadata();
    this.metadataRepairMode = false;
  }

  private configuredStatus(value: string): string {
    return value.length > 0 ? '已配置' : '未配置';
  }

  private async importSteamText(text: string): Promise<void> {
    try {
      const imported: SteamImportResult = SteamImportService.parse(text);
      const token = this.currentToken();
      if (!token) {
        return;
      }
      token.steam = imported.metadata;
      if (imported.accountName.length > 0) {
        token.account = imported.accountName;
      }
      if (imported.sharedSecret.length > 0) {
        const bytes = new util.Base64Helper().decodeSync(imported.sharedSecret, util.Type.BASIC);
        token.secret = Base32.encode(bytes);
      }
      this.tokens = [...this.tokens];
      await this.onTokensChanged(this.tokens);
      this.steamJsonText = '';
      this.metadataRepairMode = false;
      this.loadMetadata();
      this.showToast('Steam 数据已导入并绑定', 2000);
    } catch (error) {
      this.showToast((error as Error).message, 3200);
    }
  }

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
          if ((this.currentToken()?.steam?.guardData?.length ?? 0) > 0) {
            Text('登录信任凭据（Guard Data）有效期')
              .fontSize(14).fontWeight(FontWeight.Medium).width('100%')
            Text(SteamGuardService.tokenStatus(this.currentToken()?.steam?.guardData ?? ''))
              .fontSize(13).fontColor($r('app.color.text_secondary')).width('100%')
            Text('Steam 登录后返回，用于减少后续重复验证；它不是 Device ID，也不能生成验证码。')
              .fontSize(12).fontColor($r('app.color.text_tertiary')).lineHeight(18).width('100%')
          }
          Button(this.steamSessionLoading ? '正在更新…' : '更新 Access Token')
            .width('100%').enabled(!this.steamSessionLoading && this.currentRefreshToken().length > 0)
            .backgroundColor($r('app.color.brand_surface_alt')).fontColor($r('app.color.brand_strong'))
            .onClick(() => this.refreshSteamSession())
        }.width('100%').padding(16).alignItems(HorizontalAlign.Start)
          .backgroundColor($r('app.color.surface')).borderRadius(18)

        Column({ space: 9 }) {
          Text('重新认证').fontSize(17).fontWeight(FontWeight.Bold).width('100%')
          Text('密码只用于本次登录，不会保存；Steam Guard 验证码由当前 Token 自动提交。登录成功后会保存 Steam 返回的登录信任凭据，减少后续重复验证。')
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
            Text(`登录信任凭据（Guard Data）：${this.configuredStatus(
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

  build() {
    Column() {
      Row({ space: 10 }) {
        Button() {
          SymbolGlyph($r('sys.symbol.chevron_left')).fontSize(22)
            .fontColor([$r('app.color.text_secondary')])
        }.type(ButtonType.Circle).width(38).height(38)
          .backgroundColor($r('app.color.surface_muted')).onClick(() => this.onClose())
        Column({ space: 3 }) {
          Text('Steam 管理').fontSize(26).fontWeight(FontWeight.Bold)
          Text(this.currentToken()?.steam?.accountName || this.currentToken()?.account || 'Steam Token')
            .fontSize(13).fontColor($r('app.color.text_tertiary'))
        }.alignItems(HorizontalAlign.Start).layoutWeight(1)
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
