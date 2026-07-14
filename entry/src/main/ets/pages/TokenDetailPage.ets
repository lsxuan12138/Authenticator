import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { scanBarcode, scanCore } from '@kit.ScanKit';
import { SteamGuardMetadata, StoredToken, TokenKind } from '../domain/Token';
import { Base32 } from '../core/Base32';
import { SteamGuardService } from '../services/SteamGuardService';
import { DiagnosticLogService } from '../services/DiagnosticLogService';
import { IconPack, IconPackService } from '../services/IconPackService';

/** Token 基础信息页。Steam 高级设置已拆分到独立管理页。 */
@Component
export struct TokenDetailPage {
  @Prop tokens: StoredToken[] = [];
  @Prop iconPacks: IconPack[] = [];
  @Prop activeIconPackKey: string = IconPackService.defaultPackKey();
  tokenIndex: number = -1;
  onTokensChanged: (tokens: StoredToken[]) => Promise<void> = async (_tokens: StoredToken[]): Promise<void> => {};
  onClose: () => void = (): void => {};
  onOpenIconPicker: (issuer: string) => void = (_issuer: string): void => {};
  onOpenConfirm: () => void = (): void => {};
  onOpenSteamManagement: () => void = (): void => {};

  @State private issuer: string = '';
  @State private account: string = '';
  @State private secret: string = '';
  @State private digits: number = 6;
  @State private periodValue: string = '30';
  @State private errorMessage: string = '';
  @State private steamQrLoading: boolean = false;

  aboutToAppear(): void {
    this.loadToken();
  }

  private loadToken(): void {
    if (this.tokenIndex < 0 || this.tokenIndex >= this.tokens.length) {
      return;
    }
    const token = this.tokens[this.tokenIndex];
    this.issuer = token.issuer;
    this.account = token.account;
    this.secret = token.secret;
    this.digits = token.digits === 8 ? 8 : 6;
    this.periodValue = `${token.period}`;
  }

  private currentToken(): StoredToken | null {
    if (this.tokenIndex < 0 || this.tokenIndex >= this.tokens.length) {
      return null;
    }
    return this.tokens[this.tokenIndex];
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

  private fallbackIconText(): string {
    const name = this.issuer.trim() || this.currentToken()?.issuer || '?';
    return name.substring(0, 1).toUpperCase();
  }

  private showToast(message: string, duration: number = 2000): void {
    try {
      this.getUIContext().getPromptAction().showToast({ message: message, duration: duration });
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('TokenDetail', `Failed to show toast: ${detail.message ?? message}`);
    }
  }

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
      token.issuer = this.issuer.trim();
      token.account = this.account.trim();
      token.secret = normalizedSecret;
      token.kind = isSteam ? TokenKind.STEAM : TokenKind.TOTP;
      token.digits = isSteam ? 5 : this.digits;
      token.period = isSteam ? 30 : parsedPeriod;
      if (isSteam) {
        if (token.steam) {
          token.steam.accountName = token.account;
        } else {
          const metadata: SteamGuardMetadata = {
            steamId: '', accountName: token.account, identitySecret: '', deviceId: '',
            accessToken: '', refreshToken: '', guardData: '', revocationCode: ''
          };
          token.steam = metadata;
        }
      } else {
        token.steam = undefined;
      }
      this.tokens = [...this.tokens];
      await this.onTokensChanged(this.tokens);
      this.onClose();
    } catch (error) {
      this.errorMessage = (error as Error).message;
    }
  }

  private async scanSteamQrLogin(): Promise<void> {
    const token = this.currentToken();
    if (!token?.steam?.steamId || !token.steam.refreshToken || !token.secret) {
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
      const dialog = await this.getUIContext().getPromptAction().showDialog({
        title: '批准 Steam 登录？',
        message: `将使用账户“${token.steam.accountName || token.account}”批准这次登录。` +
          '仅当二维码来自你刚刚打开的 Steam 登录页面时继续。',
        alignment: DialogAlignment.Bottom,
        buttons: [
          { text: '取消', color: $r('app.color.text_tertiary') },
          { text: '批准登录', color: $r('app.color.brand_strong') }
        ]
      });
      if (dialog.index !== 1) {
        return;
      }
      this.steamQrLoading = true;
      await new SteamGuardService().approveQrLogin(token.steam.steamId, token.steam.refreshToken,
        Base32.decode(token.secret), challenge, false);
      this.showToast('Steam 登录已批准', 2200);
    } catch (error) {
      const detail = error as BusinessError;
      if (detail.code === 10010012 || detail.code === 10010013) {
        return;
      }
      this.showToast(detail.message ?? `${error}`, 3500);
    } finally {
      this.steamQrLoading = false;
    }
  }

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
                $r('app.color.icon_surface') : '#4668E8')
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
            Button('管理 Steam 信息').width('100%')
              .backgroundColor($r('app.color.brand_surface_alt')).fontColor($r('app.color.brand_strong'))
              .onClick(() => this.onOpenSteamManagement())
          }.padding(18).margin({ left: 16, right: 16 })
            .backgroundColor($r('app.color.surface')).borderRadius(18)
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
