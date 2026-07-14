import { common } from '@kit.AbilityKit';
import { util } from '@kit.ArkTS';
import { BusinessError } from '@kit.BasicServicesKit';
import { scanBarcode, scanCore } from '@kit.ScanKit';
import { StoredToken, TokenKind } from '../domain/Token';
import { Base32 } from '../core/Base32';
import { TokenDuplicateGuard } from '../core/TokenDuplicateGuard';
import { OtpUriParser } from '../core/OtpUriParser';
import { OtpEngine } from '../core/OtpEngine';
import { SteamLoginCancellation, SteamLoginService } from '../services/SteamLoginService';
import { SteamAuthenticatorEnrollment, SteamAuthenticatorService } from '../services/SteamAuthenticatorService';
import { SteamAllowedConfirmation, SteamAuthSession, SteamGuardType, SteamSessionTokens } from '../services/SteamProto';
import { DiagnosticLogService } from '../services/DiagnosticLogService';

/** Token 添加页。表单、Steam 密码与登录会话只在该 NavDestination 存活期间保留。 */
@Component
export struct AddTokenPage {
  @Prop tokens: StoredToken[] = [];
  onTokensChanged: (tokens: StoredToken[]) => Promise<void> = async (_tokens: StoredToken[]): Promise<void> => {};
  onClose: () => void = (): void => {};

  @State private issuer: string = '';
  @State private account: string = '';
  @State private secret: string = '';
  @State private uriValue: string = '';
  @State private digits: number = 6;
  @State private periodValue: string = '30';
  @State private addTabIndex: number = 0;
  @State private errorMessage: string = '';
  @State private steamAddStep: number = 0;
  @State private steamAddAccount: string = '';
  @State private steamAddPassword: string = '';
  @State private steamAddCode: string = '';
  @State private steamAddActivationCode: string = '';
  @State private steamAddConfirmationType: number = SteamGuardType.UNKNOWN;
  @State private steamAddStatus: string = '';
  @State private steamAddBusy: boolean = false;
  private steamAddSession?: SteamAuthSession;
  private steamAddTokens?: SteamSessionTokens;
  private steamAddEnrollment?: SteamAuthenticatorEnrollment;
  private steamAddDeviceId: string = '';
  private steamAddTimeOffset: number = 0;
  private steamLoginCancellation?: SteamLoginCancellation;

  aboutToDisappear(): void {
    this.steamLoginCancellation?.cancel();
  }

  private showToast(message: string, duration: number = 2000): void {
    try {
      this.getUIContext().getPromptAction().showToast({ message: message, duration: duration });
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('AddToken', `Failed to show toast: ${detail.message ?? message}`);
    }
  }
  private resetForm(): void {
    this.issuer = '';
    this.account = '';
    this.secret = '';
    this.uriValue = '';
    this.digits = 6;
    this.periodValue = '30';
    this.errorMessage = '';
    this.resetSteamAddFlow();
  }

  /** 所有新增入口统一经过配置去重；随机 UUID 仍只作为记录主键。 */
  private async commitNewToken(token: StoredToken): Promise<void> {
    TokenDuplicateGuard.assertCanAdd(this.tokens, token);
    token.iconPath = '';
    token.iconManual = false;
    this.tokens = [...this.tokens, token];
    await this.onTokensChanged(this.tokens);
    this.resetForm();
    this.onClose();
  }

  private async addManual(): Promise<void> {
    try {
      const normalized = Base32.normalize(this.secret);
      Base32.decode(normalized);
      if (this.issuer.trim().length === 0 || this.account.trim().length === 0) {
        throw new Error('请填写服务名称和账户');
      }
      const isSteam = this.issuer.trim().toLowerCase() === 'steam';
      const parsedPeriod = Number.parseInt(this.periodValue);
      if (!isSteam && (Number.isNaN(parsedPeriod) || parsedPeriod < 1 || parsedPeriod > 300)) {
        throw new Error('刷新周期必须是 1 到 300 秒之间的整数');
      }
      const token: StoredToken = {
        id: OtpUriParser.createId(),
        issuer: this.issuer.trim(),
        account: this.account.trim(),
        secret: normalized,
        digits: isSteam ? 5 : this.digits,
        period: isSteam ? 30 : parsedPeriod,
        kind: isSteam ? TokenKind.STEAM : TokenKind.TOTP,
        iconPath: '',
        iconManual: false,
        createdAt: Date.now()
      };
      await this.commitNewToken(token);
    } catch (error) {
      this.errorMessage = (error as Error).message;
    }
  }

  private resetSteamAddFlow(): void {
    this.steamLoginCancellation?.cancel();
    this.steamLoginCancellation = undefined;
    this.steamAddStep = 0;
    this.steamAddAccount = '';
    this.steamAddPassword = '';
    this.steamAddCode = '';
    this.steamAddActivationCode = '';
    this.steamAddConfirmationType = SteamGuardType.UNKNOWN;
    this.steamAddStatus = '';
    this.steamAddBusy = false;
    this.steamAddSession = undefined;
    this.steamAddTokens = undefined;
    this.steamAddEnrollment = undefined;
    this.steamAddDeviceId = '';
    this.steamAddTimeOffset = 0;
  }

  private newSteamLoginCancellation(): SteamLoginCancellation {
    this.steamLoginCancellation?.cancel();
    const cancellation = new SteamLoginCancellation();
    this.steamLoginCancellation = cancellation;
    return cancellation;
  }

  private cancelSteamLogin(): void {
    this.steamLoginCancellation?.cancel();
    this.steamAddStatus = '正在取消 Steam 登录…';
  }

  private supportedSteamConfirmation(session: SteamAuthSession): SteamAllowedConfirmation | undefined {
    // 与上游 kdada/Authenticator 一致：遵循 Steam 返回的验证方式顺序，不由客户端重排优先级。
    for (const confirmation of session.confirmations) {
      if (confirmation.type === SteamGuardType.EMAIL_CODE || confirmation.type === SteamGuardType.DEVICE_CODE ||
        confirmation.type === SteamGuardType.DEVICE_CONFIRMATION ||
        confirmation.type === SteamGuardType.EMAIL_CONFIRMATION) {
        return confirmation;
      }
    }
    return undefined;
  }

  private steamConfirmationPrompt(): string {
    switch (this.steamAddConfirmationType) {
      case SteamGuardType.EMAIL_CODE:
        return '请输入 Steam 发送到邮箱的验证码';
      case SteamGuardType.DEVICE_CODE:
        return '请输入当前 Steam Guard 生成的五位验证码';
      case SteamGuardType.DEVICE_CONFIRMATION:
        return '请先在当前 Steam 手机应用中批准登录，然后返回继续';
      case SteamGuardType.EMAIL_CONFIRMATION:
        return '请先点击 Steam 邮件中的确认链接，然后返回继续';
      default:
        return '完成 Steam 要求的身份验证后继续';
    }
  }

  private async startSteamAddLogin(): Promise<void> {
    if (!this.steamAddAccount.trim() || !this.steamAddPassword) {
      this.steamAddStatus = '请输入 Steam 账户名和密码';
      return;
    }
    this.steamAddBusy = true;
    this.steamAddStatus = '正在创建 Steam 登录会话…';
    const cancellation = this.newSteamLoginCancellation();
    try {
      const service = new SteamLoginService();
      const session = await service.beginSession(this.steamAddAccount.trim(), this.steamAddPassword);
      cancellation.throwIfCancelled();
      this.steamAddPassword = '';
      this.steamAddSession = session;
      const confirmation = this.supportedSteamConfirmation(session);
      if (confirmation) {
        this.steamAddConfirmationType = confirmation.type;
        this.steamAddStep = 1;
        this.steamAddStatus = confirmation.message || this.steamConfirmationPrompt();
        if (confirmation.type === SteamGuardType.DEVICE_CONFIRMATION ||
          confirmation.type === SteamGuardType.EMAIL_CONFIRMATION) {
          const tokens = await service.pollUntilComplete(session, cancellation);
          await this.startSteamAuthenticator(session, tokens);
        }
      } else {
        const tokens = await service.pollUntilComplete(session, cancellation);
        await this.startSteamAuthenticator(session, tokens);
      }
    } catch (error) {
      this.steamAddStatus = (error as Error).message;
    } finally {
      this.steamAddBusy = false;
    }
  }

  private async completeSteamAddLogin(): Promise<void> {
    if (!this.steamAddSession) {
      return;
    }
    this.steamAddBusy = true;
    this.steamAddStatus = '正在完成 Steam 登录…';
    const cancellation = this.steamLoginCancellation ?? this.newSteamLoginCancellation();
    try {
      const service = new SteamLoginService();
      if (this.steamAddConfirmationType === SteamGuardType.EMAIL_CODE ||
        this.steamAddConfirmationType === SteamGuardType.DEVICE_CODE) {
        await service.submitGuardCode(this.steamAddSession,
          this.steamAddConfirmationType, this.steamAddCode.trim());
      }
      const tokens = await service.pollUntilComplete(this.steamAddSession, cancellation);
      this.steamAddCode = '';
      await this.startSteamAuthenticator(this.steamAddSession, tokens);
    } catch (error) {
      this.steamAddStatus = (error as Error).message;
    } finally {
      this.steamAddBusy = false;
    }
  }

  private async startSteamAuthenticator(session: SteamAuthSession, tokens: SteamSessionTokens): Promise<void> {
    this.steamAddTokens = tokens;
    this.steamAddDeviceId = `android:${util.generateRandomUUID()}`;
    this.steamAddStatus = '登录成功，正在请求添加 Steam Guard…';
    let enrollment: SteamAuthenticatorEnrollment;
    try {
      enrollment = await new SteamAuthenticatorService().addAuthenticator(
        session.steamId.toString(), tokens.refreshToken, this.steamAddDeviceId);
    } catch (error) {
      if ((error as Error).message === 'STEAM_GUARD_ALREADY_EXISTS') {
        this.steamAddStep = 3;
        this.steamAddStatus = '该账户已经绑定移动 Steam Guard。继续转移会使原验证器失效，并通过短信验证身份。';
        return;
      }
      throw new Error((error as Error).message);
    }
    this.steamAddEnrollment = enrollment;
    this.steamAddTimeOffset = enrollment.serverTime > 0 ? enrollment.serverTime * 1000 - Date.now() : 0;
    this.steamAddStep = 2;
    const channel = enrollment.confirmType === 1 ? '短信' : enrollment.confirmType === 3 ? '邮件' : 'Steam';
    const hint = enrollment.phoneNumberHint ? `（${enrollment.phoneNumberHint}）` : '';
    this.steamAddStatus = `请输入通过${channel}收到的激活码${hint}`;
  }

  private async finalizeSteamAuthenticator(): Promise<void> {
    if (!this.steamAddSession || !this.steamAddTokens || !this.steamAddEnrollment) {
      return;
    }
    if (!this.steamAddActivationCode.trim()) {
      this.steamAddStatus = '请输入 Steam Guard 激活码';
      return;
    }
    this.steamAddBusy = true;
    this.steamAddStatus = '正在激活 Steam Guard…';
    try {
      const enrollment = this.steamAddEnrollment;
      const now = Date.now() + this.steamAddTimeOffset;
      const seconds = Math.floor(now / 1000);
      const secret = Base32.encode(enrollment.sharedSecret);
      const temporary: StoredToken = {
        id: OtpUriParser.createId(),
        issuer: 'Steam',
        account: this.steamAddTokens.accountName,
        secret: secret,
        digits: 5,
        period: 30,
        kind: TokenKind.STEAM,
        iconPath: '',
        iconManual: false,
        createdAt: Date.now()
      };
      const authenticatorCode = OtpEngine.generate(temporary, now).value;
      const finalized = await new SteamAuthenticatorService().finalizeAuthenticator(
        this.steamAddSession.steamId.toString(), this.steamAddTokens.refreshToken,
        authenticatorCode, seconds, this.steamAddActivationCode.trim());
      if (finalized.wantMore) {
        throw new Error('Steam 验证码时间不匹配，请稍后重新提交激活码');
      }
      if (!finalized.success) {
        throw new Error(`Steam Guard 激活失败（status ${finalized.status}）`);
      }
      await this.saveSteamEnrollment(enrollment, 'Steam Guard 已添加');
    } catch (error) {
      this.steamAddStatus = (error as Error).message;
    } finally {
      this.steamAddBusy = false;
    }
  }

  private async beginSteamTransfer(): Promise<void> {
    if (!this.steamAddSession || !this.steamAddTokens) {
      return;
    }
    this.steamAddBusy = true;
    this.steamAddStatus = '正在请求转移现有 Steam Guard…';
    try {
      await new SteamAuthenticatorService().beginTransfer(
        this.steamAddSession.steamId.toString(), this.steamAddTokens.refreshToken);
      this.steamAddActivationCode = '';
      this.steamAddStep = 4;
      this.steamAddStatus = 'Steam 已向账户绑定的手机号发送验证码，请输入短信验证码完成转移';
    } catch (error) {
      this.steamAddStatus = (error as Error).message;
    } finally {
      this.steamAddBusy = false;
    }
  }

  private async completeSteamTransfer(): Promise<void> {
    if (!this.steamAddSession || !this.steamAddTokens) {
      return;
    }
    if (!this.steamAddActivationCode.trim()) {
      this.steamAddStatus = '请输入短信验证码';
      return;
    }
    this.steamAddBusy = true;
    this.steamAddStatus = '正在转移 Steam Guard…';
    try {
      const enrollment = await new SteamAuthenticatorService().completeTransfer(
        this.steamAddSession.steamId.toString(), this.steamAddTokens.refreshToken,
        this.steamAddActivationCode.trim());
      // 转移前已为本次安装生成 android:<UUID>；继续沿用该值，避免多个账户共享固定 Device ID。
      await this.saveSteamEnrollment(enrollment, 'Steam Guard 已转移并添加');
    } catch (error) {
      this.steamAddStatus = (error as Error).message;
    } finally {
      this.steamAddBusy = false;
    }
  }

  private async saveSteamEnrollment(enrollment: SteamAuthenticatorEnrollment, message: string): Promise<void> {
    if (!this.steamAddSession || !this.steamAddTokens) {
      return;
    }
    const base64 = new util.Base64Helper();
    const accountName = enrollment.accountName || this.steamAddTokens.accountName || this.steamAddAccount;
    const token: StoredToken = {
      id: OtpUriParser.createId(),
      issuer: 'Steam',
      account: accountName,
      secret: Base32.encode(enrollment.sharedSecret),
      digits: 5,
      period: 30,
      kind: TokenKind.STEAM,
      iconPath: '',
      iconManual: false,
      createdAt: Date.now(),
      steam: {
        steamId: this.steamAddSession.steamId.toString(),
        accountName: accountName,
        identitySecret: base64.encodeToStringSync(enrollment.identitySecret, util.Type.BASIC),
        deviceId: this.steamAddDeviceId,
        accessToken: this.steamAddTokens.accessToken,
        refreshToken: this.steamAddTokens.refreshToken,
        guardData: this.steamAddTokens.guardData,
        revocationCode: enrollment.revocationCode,
        serialNumber: enrollment.serialNumber,
        tokenGid: enrollment.tokenGid,
        uri: enrollment.uri,
        secret1: base64.encodeToStringSync(enrollment.secret1, util.Type.BASIC)
      }
    };
    await this.commitNewToken(token);
    this.showToast(message, 2200);
  }

  private async addUri(): Promise<void> {
    try {
      this.uriValue = this.normalizeOtpPayload(this.uriValue);
      const token = OtpUriParser.parse(this.uriValue);
      await this.commitNewToken(token);
    } catch (error) {
      this.errorMessage = (error as Error).message;
    }
  }

  private normalizeOtpPayload(rawValue: string): string {
    // 容忍 HTML 转义、引号包裹、百分号编码及二维码中夹带说明文字等常见输入。
    let value = rawValue.trim().replaceAll('&amp;', '&');
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.substring(1, value.length - 1).trim();
    }
    if (value.toLowerCase().startsWith('otpauth%3a')) {
      try {
        value = decodeURIComponent(value);
      } catch (_) {
      }
    }
    const lower = value.toLowerCase();
    const start = lower.indexOf('otpauth://');
    if (start >= 0) {
      value = value.substring(start);
      const whitespace = value.search(/\s/);
      if (whitespace > 0) {
        value = value.substring(0, whitespace);
      }
      value = `otpauth://${value.substring('otpauth://'.length)}`;
    }
    return value.trim();
  }

  private async scanToken(): Promise<void> {
    try {
      const options: scanBarcode.ScanOptions = {
        scanTypes: [scanCore.ScanType.QR_CODE],
        enableMultiMode: false,
        enableAlbum: true
      };
      const context: common.Context = this.getUIContext().getHostContext() as common.Context;
      const result: scanBarcode.ScanResult = await scanBarcode.startScanForResult(context, options);
      this.uriValue = this.normalizeOtpPayload(result.originalValue);
      try {
        const token = OtpUriParser.parse(this.uriValue);
        await this.commitNewToken(token);
      } catch (parseError) {
        this.addTabIndex = 1;
        this.errorMessage = `二维码不是可识别的 OTP 配置：${(parseError as Error).message}`;
      }
    } catch (error) {
      const detail = error as BusinessError;
      if (detail.code === 10010012 || detail.code === 10010013) {
        return;
      }
      this.showToast(`扫码失败（${detail.code ?? 'unknown'}）：${detail.message ?? error}`, 3000);
    }
  }

  @Builder
  private scanAddTab() {
    Scroll() {
      Column({ space: 18 }) {
        Column({ space: 12 }) {
          Stack() {
            Circle().width(76).height(76).fill($r('app.color.empty_icon_surface'))
            SymbolGlyph($r('sys.symbol.qrcode')).fontSize(38).fontColor(['#4668E8'])
          }.margin({ top: 10, bottom: 4 })

          Text('扫描身份验证二维码').fontSize(20).fontWeight(FontWeight.Bold)
          Text('扫描网站展示的身份验证二维码，也可以从相册选择二维码图片。')
            .fontSize(14).fontColor($r('app.color.text_muted')).lineHeight(21).textAlign(TextAlign.Center)
          Button('打开相机或相册').width('100%').height(50).backgroundColor('#4668E8')
            .onClick(() => this.scanToken())
        }.width('100%').alignItems(HorizontalAlign.Center)

        Text('支持标准 TOTP 与 Steam Guard 二维码。扫描内容异常时会保留到 URI 页供你检查。')
          .fontSize(12).fontColor($r('app.color.text_faint')).lineHeight(18).textAlign(TextAlign.Center)
      }
      .width('100%')
      .padding({
        left: 24,
        right: 24,
        top: 28,
        bottom: 24
      })
      .justifyContent(FlexAlign.Start)
      .alignItems(HorizontalAlign.Center)
    }.width('100%').height('100%').align(Alignment.TopStart)
  }

  @Builder
  private uriAddTab() {
    Scroll() {
      Column({ space: 14 }) {
        Column({ space: 12 }) {
          Text('粘贴 OTP URI').fontSize(19).fontWeight(FontWeight.Bold).width('100%')
          Text('可粘贴 otpauth:// 链接；会自动清理常见的转义、引号和说明文字。')
            .fontSize(13).fontColor($r('app.color.text_muted')).lineHeight(19).width('100%')
          TextArea({ placeholder: 'otpauth://totp/服务:账户?secret=...', text: this.uriValue }).height(150)
            .onChange((value: string) => this.uriValue = value)
          Button('解析并添加')
            .width('100%')
            .height(48)
            .backgroundColor($r('app.color.text_secondary'))
            .onClick(() => this.addUri())
        }.width('100%')

        if (this.errorMessage.length > 0) {
          Text(this.errorMessage)
            .fontSize(13)
            .fontColor($r('app.color.danger_strong'))
            .padding(14)
            .backgroundColor($r('app.color.danger_surface_alt'))
            .borderRadius(12)
            .width('100%')
        }
      }
      .width('100%')
      .padding({
        left: 22,
        right: 22,
        top: 24,
        bottom: 24
      })
      .justifyContent(FlexAlign.Start)
    }.width('100%').height('100%').align(Alignment.TopStart)
  }

  @Builder
  private manualAddTab() {
    Scroll() {
      Column({ space: 14 }) {
        Column({ space: 12 }) {
          Text('手动添加').fontSize(18).fontWeight(FontWeight.Bold).width('100%')
          TextInput({ placeholder: '服务名称，例如 GitHub', text: this.issuer })
            .onChange((value: string) => this.issuer = value)
          TextInput({ placeholder: '账户名称', text: this.account }).onChange((value: string) => this.account = value)
          TextInput({ placeholder: 'Base32 密钥', text: this.secret }).onChange((value: string) => this.secret = value)
          if (this.issuer.trim().toLowerCase() === 'steam') {
            Text('Issuer 为 Steam，将自动使用五位 Steam Guard 验证码和 30 秒周期。')
              .fontSize(12).fontColor('#4668E8').lineHeight(18).width('100%')
          } else {
            Column({ space: 8 }) {
              Text('验证码位数').fontSize(15).fontWeight(FontWeight.Medium).width('100%')
              Row({ space: 10 }) {
                Button('6 位')
                  .layoutWeight(1)
                  .backgroundColor(this.digits === 6 ? '#4668E8' : $r('app.color.surface_control'))
                  .fontColor(this.digits === 6 ? Color.White : $r('app.color.text_secondary'))
                  .onClick(() => this.digits = 6)
                Button('8 位')
                  .layoutWeight(1)
                  .backgroundColor(this.digits === 8 ? '#4668E8' : $r('app.color.surface_control'))
                  .fontColor(this.digits === 8 ? Color.White : $r('app.color.text_secondary'))
                  .onClick(() => this.digits = 8)
              }.width('100%')
            }.width('100%')

            Column({ space: 6 }) {
              Text('刷新周期（秒）').fontSize(15).fontWeight(FontWeight.Medium).width('100%')
              TextInput({ placeholder: '通常为 30', text: this.periodValue }).type(InputType.Number)
                .onChange((value: string) => this.periodValue = value)
              Text('允许 1–300 秒；应与服务端提供的 period 保持一致。')
                .fontSize(12)
                .fontColor($r('app.color.text_muted'))
                .width('100%')
            }.width('100%')
          }
          Button('保存账户').width('100%').backgroundColor('#4668E8').onClick(() => this.addManual())
        }.width('100%')

        if (this.errorMessage.length > 0) {
          Text(this.errorMessage)
            .fontSize(13)
            .fontColor($r('app.color.danger_strong'))
            .padding(14)
            .backgroundColor($r('app.color.danger_surface_alt'))
            .borderRadius(12)
            .width('100%')
        }
      }
      .width('100%')
      .padding({
        left: 22,
        right: 22,
        top: 24,
        bottom: 24
      })
      .justifyContent(FlexAlign.Start)
    }.width('100%').height('100%').align(Alignment.TopStart)
  }

  @Builder
  private steamAddTab() {
    Scroll() {
      Column({ space: 14 }) {
        Column({ space: 12 }) {
          Text('登录并添加 Steam Guard').fontSize(18).fontWeight(FontWeight.Bold).width('100%')
          Text('该流程会为 Steam 账户创建新的移动验证器，并在验证成功后自动保存密钥和会话元信息。')
            .fontSize(13).fontColor($r('app.color.text_muted')).lineHeight(19).width('100%')
          Text('如果账户已经绑定移动 Steam Guard，Steam 可能要求先转移验证器；此操作不会读取服务器上已有的密钥。')
            .fontSize(12)
            .fontColor($r('app.color.warning'))
            .lineHeight(18)
            .padding(12)
            .backgroundColor($r('app.color.warning_surface'))
            .borderRadius(12)
            .width('100%')
          if (this.steamAddStep === 0) {
            TextInput({ placeholder: 'Steam 账户名', text: this.steamAddAccount })
              .onChange((value: string) => this.steamAddAccount = value.trim())
            TextInput({ placeholder: 'Steam 密码', text: this.steamAddPassword }).type(InputType.Password)
              .onChange((value: string) => this.steamAddPassword = value)
            Button(this.steamAddBusy ? '正在登录…' : '登录 Steam')
              .width('100%')
              .height(48)
              .backgroundColor($r('app.color.brand_strong'))
              .enabled(!this.steamAddBusy)
              .onClick(() => this.startSteamAddLogin())
          } else if (this.steamAddStep === 1) {
            Text(this.steamConfirmationPrompt())
              .fontSize(14)
              .fontWeight(FontWeight.Medium)
              .fontColor($r('app.color.text_secondary'))
              .lineHeight(20)
              .width('100%')
            if (this.steamAddConfirmationType === SteamGuardType.EMAIL_CODE ||
              this.steamAddConfirmationType === SteamGuardType.DEVICE_CODE) {
              TextInput({ placeholder: 'Steam 验证码', text: this.steamAddCode })
                .onChange((value: string) => this.steamAddCode = value.trim())
            }
            Button(this.steamAddBusy ? '正在验证…' : '我已完成验证，继续')
              .width('100%')
              .height(48)
              .backgroundColor($r('app.color.brand_strong'))
              .enabled(!this.steamAddBusy)
              .onClick(() => this.completeSteamAddLogin())
            if (this.steamAddBusy) {
              Button('取消等待')
                .width('100%')
                .height(42)
                .backgroundColor($r('app.color.surface_control'))
                .fontColor($r('app.color.text_secondary'))
                .onClick(() => this.cancelSteamLogin())
            } else {
              Button('重新登录')
                .width('100%')
                .height(42)
                .backgroundColor($r('app.color.surface_control'))
                .fontColor($r('app.color.text_secondary'))
                .onClick(() => this.resetSteamAddFlow())
            }
          } else if (this.steamAddStep === 2) {
            Text('Steam 登录已经完成，最后需要验证新增的移动验证器。')
              .fontSize(14)
              .fontWeight(FontWeight.Medium)
              .fontColor($r('app.color.text_secondary'))
              .lineHeight(20)
              .width('100%')
            TextInput({ placeholder: '短信或邮件激活码', text: this.steamAddActivationCode })
              .onChange((value: string) => this.steamAddActivationCode = value.trim())
            Button(this.steamAddBusy ? '正在激活…' : '激活并保存 Steam Guard')
              .width('100%')
              .height(48)
              .backgroundColor($r('app.color.success'))
              .enabled(!this.steamAddBusy)
              .onClick(() => this.finalizeSteamAuthenticator())
          } else if (this.steamAddStep === 3) {
            Text('账户已有 Steam Guard').fontSize(16).fontWeight(FontWeight.Bold).fontColor($r('app.color.danger'))
              .width('100%')
            Text(
              '继续操作会生成一套新的密钥，原手机或验证器中的 Steam Guard 将失效。请确认你能够接收账户绑定手机号的短信。')
              .fontSize(13).fontColor($r('app.color.text_secondary')).lineHeight(20).width('100%')
            Button(this.steamAddBusy ? '正在请求…' : '我了解风险，转移验证器')
              .width('100%')
              .height(48)
              .backgroundColor($r('app.color.danger'))
              .enabled(!this.steamAddBusy)
              .onClick(() => this.beginSteamTransfer())
            Button('取消并重新登录')
              .width('100%')
              .height(42)
              .backgroundColor($r('app.color.surface_control'))
              .fontColor($r('app.color.text_secondary'))
              .enabled(!this.steamAddBusy)
              .onClick(() => this.resetSteamAddFlow())
          } else {
            Text('输入短信验证码完成转移').fontSize(15).fontWeight(FontWeight.Medium).width('100%')
            TextInput({ placeholder: '短信验证码', text: this.steamAddActivationCode })
              .onChange((value: string) => this.steamAddActivationCode = value.trim())
            Button(this.steamAddBusy ? '正在转移…' : '完成转移并保存')
              .width('100%')
              .height(48)
              .backgroundColor($r('app.color.danger'))
              .enabled(!this.steamAddBusy)
              .onClick(() => this.completeSteamTransfer())
          }
          if (this.steamAddStatus.length > 0) {
            Text(this.steamAddStatus)
              .fontSize(13)
              .fontColor($r('app.color.text_secondary'))
              .lineHeight(19)
              .padding(12)
              .backgroundColor($r('app.color.status_surface'))
              .borderRadius(12)
              .width('100%')
          }
          Text('密码仅用于本次 RSA 加密登录，不会写入 Token、备份或本地存储。')
            .fontSize(11).fontColor($r('app.color.text_faint')).lineHeight(17).width('100%')
        }.width('100%')
      }
      .width('100%')
      .padding({
        left: 22,
        right: 22,
        top: 24,
        bottom: 30
      })
      .justifyContent(FlexAlign.Start)
    }.width('100%').height('100%').align(Alignment.TopStart)
  }

  build() {
    Column() {
      Row({ space: 10 }) {
        Button() {
          SymbolGlyph($r('sys.symbol.chevron_left'))
            .fontSize(22)
            .fontColor([$r('app.color.text_secondary')])
        }
          .type(ButtonType.Circle)
          .width(38)
          .height(38)
          .backgroundColor($r('app.color.surface_muted'))
          .onClick(() => {
            this.resetForm();
            this.onClose();
          })
        Column({ space: 3 }) {
          Text('添加账户').fontSize(26).fontWeight(FontWeight.Bold)
          Text('选择最适合你的添加方式').fontSize(13).fontColor($r('app.color.text_tertiary'))
        }.alignItems(HorizontalAlign.Start)
      }
      .width('100%')
      .padding({
        left: 18,
        right: 18,
        top: 18,
        bottom: 8
      })

      Tabs({ barPosition: BarPosition.Start, index: this.addTabIndex }) {
        TabContent() {
          this.scanAddTab()
        }.tabBar('扫码').align(Alignment.TopStart)

        TabContent() {
          this.uriAddTab()
        }.tabBar('URI').align(Alignment.TopStart)

        TabContent() {
          this.manualAddTab()
        }.tabBar('手动').align(Alignment.TopStart)

        TabContent() {
          this.steamAddTab()
        }.tabBar('Steam').align(Alignment.TopStart)
      }
      .vertical(false)
      .barMode(BarMode.Fixed)
      .barHeight(50)
      .barBackgroundColor($r('app.color.surface'))
      .divider({ strokeWidth: 1, color: $r('app.color.divider') })
      .layoutWeight(1)
      .width('100%')
      .backgroundColor($r('app.color.surface'))
      .onChange((index: number) => {
        this.addTabIndex = index;
        this.errorMessage = '';
      })
    }.height('100%').width('100%').backgroundColor($r('app.color.surface'))
  }

}
