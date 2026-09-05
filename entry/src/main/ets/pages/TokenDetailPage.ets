import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { scanBarcode, scanCore } from '@kit.ScanKit';
import { SteamGuardMetadata, StoredToken, TokenAlgorithm, TokenKind } from '../domain/Token';
import { Base32 } from '../core/Base32';
import { SteamGuardService, SteamQrLoginInfo } from '../services/SteamGuardService';
import { DiagnosticLogService } from '../services/DiagnosticLogService';
import { IconPack, IconPackService } from '../services/IconPackService';
import { APP_ACTIVE_ICON_PACK_KEY, APP_ICON_PACKS_KEY, APP_TOKENS_KEY, AppStore } from '../data/AppStore';
import { AppRoute, AppRouter } from '../navigation/AppRouter';
import { SteamConfirmationHistoryRepository } from '../services/SteamConfirmationHistoryRepository';

/** 使用系统路由参数构建 Token 详情页，并在页面内部继续发起 Steam 子路由。 */
@Builder
export function TokenDetailPageBuilder(_name: string, param: ESObject) {
  NavDestination() {
    TokenDetailPage({
      tokenId: AppRouter.tokenId(param),
      onTokensChanged: (tokens: StoredToken[]): Promise<void> => AppStore.updateTokens(tokens),
      onClose: (): void => AppRouter.pop(),
      onOpenIconPicker: (issuer: string): void =>
        AppRouter.pushToken(AppRoute.ICON_PICKER, AppRouter.tokenId(param), issuer),
      onOpenConfirm: (): void => AppRouter.pushToken(AppRoute.STEAM, AppRouter.tokenId(param)),
      onOpenSteamManagement: (): void =>
        AppRouter.pushToken(AppRoute.STEAM_MANAGEMENT, AppRouter.tokenId(param))
    })
  }.hideTitleBar(true).onShown(() => AppRouter.markCurrent(AppRoute.DETAIL))
}

/** Token 基础信息页。Steam 高级设置已拆分到独立管理页。 */
@Component
export struct TokenDetailPage {
  @StorageLink(APP_TOKENS_KEY) tokens: StoredToken[] = [];
  @StorageLink(APP_ICON_PACKS_KEY) iconPacks: IconPack[] = [];
  @StorageLink(APP_ACTIVE_ICON_PACK_KEY) activeIconPackKey: string = IconPackService.noPackKey();
  tokenId: string = '';
  onTokensChanged: (tokens: StoredToken[]) => Promise<void> = async (_tokens: StoredToken[]): Promise<void> => {};
  onClose: () => void = (): void => {};
  onOpenIconPicker: (issuer: string) => void = (_issuer: string): void => {};
  onOpenConfirm: () => void = (): void => {};
  onOpenSteamManagement: () => void = (): void => {};

  @State private issuer: string = '';
  @State private account: string = '';
  @State private secret: string = '';
  @State private digits: number = 6;
  @State private algorithm: TokenAlgorithm = TokenAlgorithm.SHA1;
  @State private periodValue: string = '30';
  @State private errorMessage: string = '';
  @State private steamQrLoading: boolean = false;

  /** 页面显示时把当前 Token 字段复制到可编辑状态。 */
  aboutToAppear(): void {
    this.loadToken();
  }

  /** 从父页面数组读取目标 Token，并初始化表单和错误状态。 */
  private loadToken(): void {
    const token = this.currentToken();
    if (!token) return;
    this.issuer = token.issuer;
    this.account = token.account;
    this.secret = token.secret;
    this.digits = token.digits === 8 ? 8 : 6;
    this.algorithm = token.algorithm ?? TokenAlgorithm.SHA1;
    this.periodValue = `${token.period}`;
  }

  /** 按稳定 UUID 返回当前 Token，排序、插入或删除其他条目均不会改变目标。 */
  private currentToken(): StoredToken | null {
    return this.tokens.find((token: StoredToken): boolean => token.id === this.tokenId) ?? null;
  }

  /** 详情页与首页使用完全相同的解析顺序：手动图标优先，否则从当前图标包自动匹配。 */
  private currentIconPath(): string {
    const token = this.currentToken();
    if (!token) {
      return '';
    }
    const previewIssuer = this.issuer.trim().length > 0 ? this.issuer.trim() : token.issuer;
    return IconPackService.resolveIcon(previewIssuer, token.iconPath, token.iconManual === true,
      this.iconPacks, this.activeIconPackKey);
  }

  /** 生成无图片图标时显示的 issuer/account 首字符。 */
  private fallbackIconText(): string {
    const name = this.issuer.trim() || this.currentToken()?.issuer || '?';
    return name.substring(0, 1).toUpperCase();
  }

  /** 显示详情页操作反馈，UIContext 不可用时仅记录日志。 */
  private showToast(message: string, duration: number = 2000): void {
    try {
      this.getUIContext().getPromptAction().showToast({ message: message, duration: duration });
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('TokenDetail', `Failed to show toast: ${detail.message ?? message}`);
    }
  }

  /** 汇总 Steam 联网字段完整度，提示确认和扫码功能是否可用。 */
  private steamMetadataSummary(): string {
    const metadata = this.currentToken()?.steam;
    if (!metadata) {
      return '尚未配置 Steam 联网信息';
    }
    const fields: boolean[] = [metadata.steamId.length > 0, metadata.identitySecret.length > 0,
      metadata.deviceId.length > 0, metadata.refreshToken.length > 0];
    const complete = fields.filter((value: boolean) => value).length;
    return complete === fields.length ? '联网信息完整，可使用确认和扫码登录' :
      `联网信息 ${complete}/${fields.length}，进入管理页继续配置`;
  }

  /** 校验基础字段、不可变地替换目标 Token，并持久化编辑结果。 */
  private async saveTokenDetail(): Promise<void> {
    try {
      const token = this.currentToken();
      if (!token) {
        return;
      }
      const normalizedSecret = Base32.normalize(this.secret);
      Base32.decode(normalizedSecret);
      const parsedPeriod = Number.parseInt(this.periodValue);
      if (!this.issuer.trim() || !this.account.trim()) {
        throw new Error('Issuer 和账户不能为空');
      }
      if (Number.isNaN(parsedPeriod) || parsedPeriod < 1 || parsedPeriod > 300) {
        throw new Error('刷新周期必须是 1 到 300 秒之间的整数');
      }
      const isSteam = this.issuer.trim().toLowerCase() === 'steam';
      const normalizedIssuer = this.issuer.trim();
      const normalizedAccount = this.account.trim();
      let steam: SteamGuardMetadata | undefined;
      if (isSteam) {
        if (token.steam) {
          steam = {
            steamId: token.steam.steamId,
            accountName: normalizedAccount,
            identitySecret: token.steam.identitySecret,
            deviceId: token.steam.deviceId,
            accessToken: token.steam.accessToken,
            refreshToken: token.steam.refreshToken,
            guardData: token.steam.guardData,
            revocationCode: token.steam.revocationCode,
            serialNumber: token.steam.serialNumber,
            tokenGid: token.steam.tokenGid,
            uri: token.steam.uri,
            secret1: token.steam.secret1
          };
        } else {
          steam = {
            steamId: '', accountName: normalizedAccount, identitySecret: '', deviceId: '',
            accessToken: '', refreshToken: '', guardData: '', revocationCode: ''
          };
        }
      }
      // 不修改 @StorageLink 数组中的旧对象；新引用能让首页正确感知同 UUID 条目的字段变化。
      const updated: StoredToken = {
        id: token.id,
        issuer: normalizedIssuer,
        account: normalizedAccount,
        secret: normalizedSecret,
        kind: isSteam ? TokenKind.STEAM : TokenKind.TOTP,
        algorithm: isSteam ? TokenAlgorithm.SHA1 : this.algorithm,
        digits: isSteam ? 5 : this.digits,
        period: isSteam ? 30 : parsedPeriod,
        iconPath: token.iconPath,
        iconManual: token.iconManual,
        createdAt: token.createdAt,
        steam: steam
      };
      const next = this.tokens.map((item: StoredToken): StoredToken =>
        item.id === token.id ? updated : item);
      await this.onTokensChanged(next);
      this.tokens = next;
      this.onClose();
    } catch (error) {
      this.errorMessage = (error as Error).message;
    }
  }

  /** 扫描另一设备的 Steam 登录挑战，展示来源详情后允许明确批准或拒绝。 */
  private async scanSteamQrLogin(): Promise<void> {
    const token = this.currentToken();
    if (!token?.steam?.steamId || (!token.steam.accessToken && !token.steam.refreshToken) || !token.secret) {
      this.showToast('请先在 Steam 管理页配置完整会话信息', 2400);
      return;
    }
    try {
      const options: scanBarcode.ScanOptions = {
        scanTypes: [scanCore.ScanType.QR_CODE], enableMultiMode: false, enableAlbum: true
      };
      const context = this.getUIContext().getHostContext() as common.Context;
      const result = await scanBarcode.startScanForResult(context, options);
      let challenge = result.originalValue.trim().replaceAll('&amp;', '&');
      if ((challenge.startsWith('"') && challenge.endsWith('"')) ||
        (challenge.startsWith("'") && challenge.endsWith("'"))) {
        challenge = challenge.substring(1, challenge.length - 1).trim();
      }
      if (!SteamGuardService.isQrLoginChallenge(challenge)) {
        throw new Error('这不是有效的 Steam 登录二维码');
      }
      this.steamQrLoading = true;
      const service = new SteamGuardService();
      let info: SteamQrLoginInfo;
      let detailsAvailable = true;
      try {
        info = await service.getQrLoginInfo(token.steam.steamId, token.steam.accessToken,
          token.steam.refreshToken, challenge);
      } catch (error) {
        detailsAvailable = false;
        info = {
          ip: '', location: '', deviceName: '', persistent: false,
          locationMismatch: false, highUsage: false, deviceTrust: 0
        };
        const detail = error as BusinessError;
        DiagnosticLogService.warn('SteamQrLogin',
          `Failed to load QR request details: ${detail.message ?? 'unknown'}`);
      }
      const message = this.qrLoginMessage(token.steam.accountName || token.account, info, detailsAvailable);
      const dialog = await this.getUIContext().getPromptAction().showDialog({
        title: 'Steam 登录请求',
        message: message,
        alignment: DialogAlignment.Bottom,
        buttons: [
          { text: '拒绝登录', color: $r('app.color.danger_strong') },
          { text: '批准登录', color: $r('app.color.brand_strong') }
        ]
      });
      if (dialog.index !== 0 && dialog.index !== 1) {
        return;
      }
      const approve = dialog.index === 1;
      await service.respondQrLogin(token.steam.steamId, token.steam.accessToken, token.steam.refreshToken,
        Base32.decode(token.secret), challenge, approve, info.persistent);
      const historyContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
      let historySaved = true;
      try {
        await new SteamConfirmationHistoryRepository().append(historyContext, [
          SteamConfirmationHistoryRepository.create(token.id, 'login', info.deviceName || '扫码登录请求',
            `${info.location}${info.ip ? ` · ${info.ip}` : ''}`, 0, approve)
        ]);
      } catch (historyError) {
        historySaved = false;
        DiagnosticLogService.warn('SteamQrLogin',
          `QR response succeeded but history save failed: ${(historyError as Error).message}`);
      }
      this.showToast(historySaved ? (approve ? 'Steam 登录已批准' : 'Steam 登录已拒绝') :
        `${approve ? 'Steam 登录已批准' : 'Steam 登录已拒绝'}，但历史保存失败`, 2800);
    } catch (error) {
      const detail = error as BusinessError;
      // Scan Kit 将用户主动关闭扫码页作为异常返回；这是正常取消，不应显示英文系统错误。
      if (detail.code === 1000500002) {
        return;
      }
      this.showToast(detail.message ?? `${error}`, 3500);
    } finally {
      this.steamQrLoading = false;
    }
  }

  /** 将扫码登录请求详情整理成紧凑、可核对的安全确认文案。 */
  private qrLoginMessage(account: string, info: SteamQrLoginInfo, detailsAvailable: boolean): string {
    const lines: string[] = [`账户：${account}`];
    if (detailsAvailable) {
      lines.push(`设备：${info.deviceName || 'Steam 未提供'}`);
      lines.push(`位置：${info.location || 'Steam 未提供'}`);
      lines.push(`IP：${info.ip || 'Steam 未提供'}`);
      lines.push(`会话：${info.persistent ? '保持登录' : '临时登录'}`);
      if (info.locationMismatch) {
        lines.push('警告：请求位置与 Steam 预期位置不一致');
      }
      if (info.highUsage) {
        lines.push('警告：Steam 将此请求标记为高频登录');
      }
    } else {
      lines.push('未能读取来源详情，请只批准你刚刚主动扫描的登录页面。');
    }
    lines.push('如果设备或位置不符合预期，请拒绝。');
    return lines.join('\n');
  }

  /** 构建 Token 编辑表单、图标入口以及 Steam 专属操作。 */
  build() {
    Scroll() {
      Column({ space: 14 }) {
        Row({ space: 10 }) {
          Button() {
            SymbolGlyph($r('sys.symbol.chevron_left')).fontSize(22)
              .fontColor([$r('app.color.text_secondary')])
          }.type(ButtonType.Circle).width(38).height(38)
            .backgroundColor($r('app.color.surface_muted')).onClick(() => this.onClose())
          Column({ space: 3 }) {
            Text('Token 详情').fontSize(26).fontWeight(FontWeight.Bold)
            Text('编辑账户与验证参数').fontSize(13).fontColor($r('app.color.text_tertiary'))
          }.alignItems(HorizontalAlign.Start).layoutWeight(1)

          if (this.issuer.trim().toLowerCase() === 'steam') {
            Row({ space: 6 }) {
              Button() {
                if (this.steamQrLoading) {
                  LoadingProgress().width(20).height(20).color($r('app.color.brand_strong'))
                } else {
                  SymbolGlyph($r('sys.symbol.qrcode')).fontSize(22)
                    .fontColor([$r('app.color.brand_strong')])
                }
              }.type(ButtonType.Circle).width(40).height(40)
                .backgroundColor($r('app.color.steam_surface')).enabled(!this.steamQrLoading)
                .accessibilityText('Steam 扫码登录').onClick(() => this.scanSteamQrLogin())
              Button() {
                SymbolGlyph($r('sys.symbol.list_checkmask')).fontSize(22)
                  .fontColor([$r('app.color.text_secondary')])
              }.type(ButtonType.Circle).width(40).height(40)
                .backgroundColor($r('app.color.surface_muted')).accessibilityText('Steam 确认列表')
                .onClick(() => this.onOpenConfirm())
            }
          }
        }.width('100%').padding({ left: 18, right: 18, top: 18, bottom: 6 })

        Column({ space: 12 }) {
          Text('通用信息').fontSize(17).fontWeight(FontWeight.Bold).width('100%')
          Row({ space: 12 }) {
            Stack() {
              if (this.currentIconPath().length > 0) {
                Image(this.currentIconPath()).width(38).height(38).objectFit(ImageFit.Contain).draggable(false)
              } else {
                Text(this.fallbackIconText()).fontSize(19).fontWeight(FontWeight.Bold).fontColor(Color.White)
              }
            }.width(48).height(48).borderRadius(14)
              .backgroundColor(this.currentIconPath().length > 0 ?
                $r('app.color.icon_surface') : IconPackService.fallbackColor(this.issuer.trim()))
            Column({ space: 3 }) {
              Text('Token 图标').fontSize(15).fontWeight(FontWeight.Medium)
              Text(this.currentToken()?.iconManual === true ? '已手动选择' : '跟随当前图标包自动匹配')
                .fontSize(12).fontColor($r('app.color.text_muted'))
            }.alignItems(HorizontalAlign.Start).layoutWeight(1)
            Button('选择').backgroundColor($r('app.color.surface_muted'))
              .fontColor($r('app.color.text_secondary'))
              .onClick(() => this.onOpenIconPicker(this.issuer))
          }.width('100%').padding(12).backgroundColor($r('app.color.surface_subtle')).borderRadius(14)
          TextInput({ placeholder: 'Issuer', text: this.issuer })
            .onChange((value: string) => this.issuer = value)
          TextInput({ placeholder: '账户', text: this.account })
            .onChange((value: string) => this.account = value)
          TextInput({ placeholder: 'Base32 密钥', text: this.secret }).type(InputType.Password)
            .onChange((value: string) => this.secret = value)
          if (this.issuer.trim().toLowerCase() !== 'steam') {
            Column({ space: 8 }) {
              Text('摘要算法').fontSize(15).fontWeight(FontWeight.Medium).width('100%')
              Row({ space: 8 }) {
                Button('SHA-1').layoutWeight(1)
                  .backgroundColor(this.algorithm === TokenAlgorithm.SHA1 ? '#4668E8' :
                    $r('app.color.surface_control'))
                  .fontColor(this.algorithm === TokenAlgorithm.SHA1 ? Color.White :
                    $r('app.color.text_secondary')).onClick(() => this.algorithm = TokenAlgorithm.SHA1)
                Button('SHA-256').layoutWeight(1)
                  .backgroundColor(this.algorithm === TokenAlgorithm.SHA256 ? '#4668E8' :
                    $r('app.color.surface_control'))
                  .fontColor(this.algorithm === TokenAlgorithm.SHA256 ? Color.White :
                    $r('app.color.text_secondary')).onClick(() => this.algorithm = TokenAlgorithm.SHA256)
                Button('SHA-512').layoutWeight(1)
                  .backgroundColor(this.algorithm === TokenAlgorithm.SHA512 ? '#4668E8' :
                    $r('app.color.surface_control'))
                  .fontColor(this.algorithm === TokenAlgorithm.SHA512 ? Color.White :
                    $r('app.color.text_secondary')).onClick(() => this.algorithm = TokenAlgorithm.SHA512)
              }.width('100%')
            }.width('100%')
            Row({ space: 10 }) {
              Button('6 位').layoutWeight(1)
                .backgroundColor(this.digits === 6 ? '#4668E8' : $r('app.color.surface_control'))
                .fontColor(this.digits === 6 ? Color.White : $r('app.color.text_secondary'))
                .onClick(() => this.digits = 6)
              Button('8 位').layoutWeight(1)
                .backgroundColor(this.digits === 8 ? '#4668E8' : $r('app.color.surface_control'))
                .fontColor(this.digits === 8 ? Color.White : $r('app.color.text_secondary'))
                .onClick(() => this.digits = 8)
            }.width('100%')
            Row({ space: 8 }) {
              Button('30 秒').layoutWeight(1)
                .backgroundColor(this.periodValue === '30' ? '#4668E8' : $r('app.color.surface_control'))
                .fontColor(this.periodValue === '30' ? Color.White : $r('app.color.text_secondary'))
                .onClick(() => this.periodValue = '30')
              Button('60 秒').layoutWeight(1)
                .backgroundColor(this.periodValue === '60' ? '#4668E8' : $r('app.color.surface_control'))
                .fontColor(this.periodValue === '60' ? Color.White : $r('app.color.text_secondary'))
                .onClick(() => this.periodValue = '60')
            }.width('100%')
            TextInput({ placeholder: '刷新周期（秒）', text: this.periodValue }).type(InputType.Number)
              .onChange((value: string) => this.periodValue = value)
          }
        }.padding(18).margin({ left: 16, right: 16 })
          .backgroundColor($r('app.color.surface')).borderRadius(18)

        if (this.issuer.trim().toLowerCase() === 'steam') {
          Column({ space: 10 }) {
            Row() {
              Column({ space: 4 }) {
                Text('Steam 账户').fontSize(17).fontWeight(FontWeight.Bold).width('100%')
                Text(this.currentToken()?.steam?.accountName || this.account || '未命名账户')
                  .fontSize(14).fontColor($r('app.color.text_secondary')).width('100%')
              }.alignItems(HorizontalAlign.Start).layoutWeight(1)
              SymbolGlyph($r('sys.symbol.chevron_right')).fontSize(20)
                .fontColor([$r('app.color.text_tertiary')])
            }.width('100%')
            Text(this.steamMetadataSummary()).fontSize(13)
              .fontColor($r('app.color.text_tertiary')).lineHeight(20).width('100%')
          }.padding(18).margin({ left: 16, right: 16 })
            .backgroundColor($r('app.color.steam_surface')).borderRadius(18)
            .border({ width: 1, color: $r('app.color.steam_divider') })
            .onClick(() => this.onOpenSteamManagement())
            .accessibilityText('管理 Steam 信息')
        }

        if (this.errorMessage.length > 0) {
          Text(this.errorMessage).fontSize(13).fontColor($r('app.color.danger_strong'))
            .margin({ left: 18, right: 18 }).width('100%')
        }
        Button('保存修改').margin({ left: 16, right: 16 }).width('calc(100% - 32vp)')
          .backgroundColor('#4668E8').onClick(() => this.saveTokenDetail())
      }.width('100%').padding({ bottom: 24 }).justifyContent(FlexAlign.Start)
    }.width('100%').height('100%').align(Alignment.TopStart)
  }
}
