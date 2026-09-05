import { common } from '@kit.AbilityKit';
import { util } from '@kit.ArkTS';
import { BusinessError } from '@kit.BasicServicesKit';
import { scanBarcode, scanCore } from '@kit.ScanKit';
import { StoredToken, TokenAlgorithm, TokenKind } from '../domain/Token';
import { Base32 } from '../core/Base32';
import { TokenDuplicateGuard } from '../core/TokenDuplicateGuard';
import { OtpUriParser } from '../core/OtpUriParser';
import { OtpEngine } from '../core/OtpEngine';
import { SteamLoginCancellation, SteamLoginService } from '../services/SteamLoginService';
import { SteamAuthenticatorEnrollment, SteamAuthenticatorService } from '../services/SteamAuthenticatorService';
import { SteamAllowedConfirmation, SteamAuthSession, SteamGuardType, SteamSessionTokens } from '../services/SteamProtocol';
import { DiagnosticLogService } from '../services/DiagnosticLogService';
import { APP_TOKENS_KEY, AppStore } from '../data/AppStore';
import { AppRoute, AppRouter } from '../navigation/AppRouter';
import { SteamVerificationStep } from '../components/SteamVerificationStep';
import { PasswordAutoFillService } from '../services/PasswordAutoFillService';
import { Localization } from '../core/Localization';
import { AppError } from '../core/AppError';

/** 系统路由表入口；页面依赖由共享 Store 和应用路由控制器提供。 */
@Builder
export function AddTokenPageBuilder(_name: string, _param: ESObject) {
  NavDestination() {
    AddTokenPage({
      onTokensChanged: (tokens: StoredToken[]): Promise<void> => AppStore.updateTokens(tokens),
      onClose: (): void => AppRouter.pop()
    })
  }.hideTitleBar(true).onShown(() => AppRouter.markCurrent(AppRoute.ADD))
}

/** Token 添加页。表单、Steam 密码与登录会话只在该 NavDestination 存活期间保留。 */
@Component
export struct AddTokenPage {
  @StorageLink(APP_TOKENS_KEY) tokens: StoredToken[] = [];
  onTokensChanged: (tokens: StoredToken[]) => Promise<void> = async (_tokens: StoredToken[]): Promise<void> => {};
  onClose: () => void = (): void => {};

  @State private issuer: string = '';
  @State private account: string = '';
  @State private secret: string = '';
  @State private uriValue: string = '';
  @State private digits: number = 6;
  @State private algorithm: TokenAlgorithm = TokenAlgorithm.SHA1;
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

  /** 页面离开时取消轮询，并主动丢弃仍停留在内存中的密码、验证码和临时密钥。 */
  aboutToDisappear(): void {
    this.steamLoginCancellation?.cancel();
    this.steamAddPassword = '';
    this.steamAddCode = '';
    this.steamAddActivationCode = '';
    this.steamAddSession = undefined;
    this.steamAddTokens = undefined;
    this.steamAddEnrollment = undefined;
  }

  /** 显示轻量操作结果；Toast 失败只写日志，不中断添加流程。 */
  private showToast(message: string, duration: number = 2000): void {
    try {
      this.getUIContext().getPromptAction().showToast({ message: message, duration: duration });
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('AddToken', `Failed to show toast: ${detail.message ?? message}`);
    }
  }

  /** 为登录状态、校验错误等必须保存为 string 的内容读取当前语言资源。 */
  private localized(resource: Resource, ...args: Array<string | number>): string {
    const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
    return Localization.text(context, resource, args);
  }

  /** 在 UI 边界翻译结构化错误，未知底层异常不直接暴露给用户。 */
  private localizedError(error: Object, fallback: Resource): string {
    const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
    return Localization.error(context, error, fallback);
  }
  /** 清空所有普通和 Steam 添加表单，供成功提交后复用。 */
  private resetForm(): void {
    this.issuer = '';
    this.account = '';
    this.secret = '';
    this.uriValue = '';
    this.digits = 6;
    this.algorithm = TokenAlgorithm.SHA1;
    this.periodValue = '30';
    this.errorMessage = '';
    this.resetSteamAddFlow();
  }

  /** 所有新增入口统一经过配置去重；随机 UUID 仍只作为记录主键。 */
  private async commitNewToken(token: StoredToken): Promise<void> {
    TokenDuplicateGuard.assertCanAdd(this.tokens, token);
    token.iconPath = '';
    token.iconManual = false;
    const next = [...this.tokens, token];
    await this.onTokensChanged(next);
    this.tokens = next;
    this.resetForm();
    this.onClose();
  }

  /** 校验手动输入并根据 issuer 自动创建 TOTP 或 Steam Token。 */
  private async addManual(): Promise<void> {
    try {
      const normalized = Base32.normalize(this.secret);
      Base32.decode(normalized);
      if (this.issuer.trim().length === 0 || this.account.trim().length === 0) {
        throw new Error(this.localized($r('app.string.error_issuer_account_required')));
      }
      const isSteam = this.issuer.trim().toLowerCase() === 'steam';
      const parsedPeriod = Number.parseInt(this.periodValue);
      if (!isSteam && (Number.isNaN(parsedPeriod) || parsedPeriod < 1 || parsedPeriod > 300)) {
        throw new Error(this.localized($r('app.string.error_period')));
      }
      const token: StoredToken = {
        id: OtpUriParser.createId(),
        issuer: this.issuer.trim(),
        account: this.account.trim(),
        secret: normalized,
        digits: isSteam ? 5 : this.digits,
        period: isSteam ? 30 : parsedPeriod,
        kind: isSteam ? TokenKind.STEAM : TokenKind.TOTP,
        algorithm: isSteam ? TokenAlgorithm.SHA1 : this.algorithm,
        iconPath: '',
        iconManual: false,
        createdAt: Date.now()
      };
      await this.commitNewToken(token);
    } catch (error) {
      this.errorMessage = this.localizedError(error as Object, $r('app.string.error_token_save_failed'));
    }
  }

  /** 取消登录并清空 Steam 添加流程的临时密码、会话和密钥。 */
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

  /** 取消旧轮询并为新的 Steam 登录创建独立取消令牌。 */
  private newSteamLoginCancellation(): SteamLoginCancellation {
    this.steamLoginCancellation?.cancel();
    const cancellation = new SteamLoginCancellation();
    this.steamLoginCancellation = cancellation;
    return cancellation;
  }

  /** 响应用户取消按钮，在下一个安全检查点停止登录。 */
  private cancelSteamLogin(): void {
    this.steamLoginCancellation?.cancel();
    this.steamAddStatus = this.localized($r('app.string.steam_login_canceling'));
  }

  /** 从服务端允许列表中选择当前 UI 能处理的第一种验证方式。 */
  private supportedSteamConfirmation(session: SteamAuthSession): SteamAllowedConfirmation | undefined {
    return SteamLoginService.preferredConfirmation(session);
  }

  /** 为当前 Steam 验证方式生成明确的用户操作提示。 */
  private steamConfirmationPrompt(): string {
    switch (this.steamAddConfirmationType) {
      case SteamGuardType.EMAIL_CODE:
        return this.localized($r('app.string.steam_prompt_email'));
      case SteamGuardType.DEVICE_CODE:
        return this.localized($r('app.string.steam_prompt_device_code'));
      case SteamGuardType.DEVICE_CONFIRMATION:
        return this.localized($r('app.string.steam_prompt_device_confirmation'));
      case SteamGuardType.EMAIL_CONFIRMATION:
        return this.localized($r('app.string.steam_prompt_email_confirmation'));
      default:
        return this.localized($r('app.string.steam_prompt_other'));
    }
  }

  /** 使用账号密码创建 Steam 会话，并进入代码输入或自动轮询步骤。 */
  private async startSteamAddLogin(): Promise<void> {
    if (!this.steamAddAccount.trim() || !this.steamAddPassword) {
      this.steamAddStatus = this.localized($r('app.string.steam_enter_credentials'));
      return;
    }
    this.steamAddBusy = true;
    this.steamAddStatus = this.localized($r('app.string.steam_creating_session'));
    const cancellation = this.newSteamLoginCancellation();
    try {
      const service = new SteamLoginService();
      const session = await service.beginSession(this.steamAddAccount.trim(), this.steamAddPassword);
      cancellation.throwIfCancelled();
      // Steam 已接受账号密码；当前输入框尚在组件树中，主动触发保存以适配后续验证码分步页面。
      PasswordAutoFillService.requestSave(this.getUIContext(), 'Steam add login');
      this.steamAddPassword = '';
      this.steamAddSession = session;
      const confirmation = this.supportedSteamConfirmation(session);
      if (confirmation) {
        if (confirmation.type === SteamGuardType.NONE) {
          const tokens = await service.pollUntilComplete(session, cancellation);
          await this.startSteamAuthenticator(session, tokens);
          return;
        }
        this.steamAddConfirmationType = confirmation.type;
        this.steamAddStep = 1;
        this.steamAddStatus = confirmation.message || this.steamConfirmationPrompt();
        if (confirmation.type === SteamGuardType.DEVICE_CONFIRMATION ||
          confirmation.type === SteamGuardType.EMAIL_CONFIRMATION) {
          const tokens = await service.pollUntilComplete(session, cancellation, 90000, true);
          await this.startSteamAuthenticator(session, tokens);
        }
      } else {
        const tokens = await service.pollUntilComplete(session, cancellation);
        await this.startSteamAuthenticator(session, tokens);
      }
    } catch (error) {
      this.steamAddStatus = this.localizedError(error as Object, $r('app.string.error_steam_operation_failed'));
    } finally {
      this.steamAddBusy = false;
    }
  }

  /** 提交邮箱/设备验证码并轮询直到 Steam 返回持久会话令牌。 */
  private async completeSteamAddLogin(): Promise<void> {
    if (!this.steamAddSession) {
      return;
    }
    this.steamAddBusy = true;
    this.steamAddStatus = this.localized($r('app.string.steam_finishing_login'));
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
      this.steamAddStatus = this.localizedError(error as Object, $r('app.string.error_steam_operation_failed'));
    } finally {
      this.steamAddBusy = false;
    }
  }

  /** 登录成功后申请新验证器；已绑定账户则转入显式转移流程。 */
  private async startSteamAuthenticator(session: SteamAuthSession, tokens: SteamSessionTokens): Promise<void> {
    this.steamAddTokens = tokens;
    this.steamAddDeviceId = `android:${util.generateRandomUUID()}`;
    this.steamAddStatus = this.localized($r('app.string.steam_requesting_guard'));
    let enrollment: SteamAuthenticatorEnrollment;
    try {
      enrollment = await new SteamAuthenticatorService().addAuthenticator(
        session.steamId.toString(), tokens.refreshToken, this.steamAddDeviceId);
    } catch (error) {
      if (error instanceof AppError) {
        if (error.resourceName === 'steam_guard_already_exists') {
          this.steamAddStep = 3;
          this.steamAddStatus = this.localized($r('app.string.steam_existing_guard_status'));
          return;
        }
        throw error;
      }
      throw new Error((error as Error).message);
    }
    this.steamAddEnrollment = enrollment;
    this.steamAddTimeOffset = enrollment.serverTime > 0 ? enrollment.serverTime * 1000 - Date.now() : 0;
    this.steamAddStep = 2;
    const channel = enrollment.confirmType === 1 ? this.localized($r('app.string.steam_channel_sms')) :
      enrollment.confirmType === 3 ? this.localized($r('app.string.steam_channel_email')) : 'Steam';
    const hint = enrollment.phoneNumberHint ? `（${enrollment.phoneNumberHint}）` : '';
    this.steamAddStatus = this.localized($r('app.string.steam_activation_prompt'), channel, hint);
  }

  /** 用激活码和服务器时间校正后的验证码完成新 Steam Guard 激活。 */
  private async finalizeSteamAuthenticator(): Promise<void> {
    if (!this.steamAddSession || !this.steamAddTokens || !this.steamAddEnrollment) {
      return;
    }
    if (!this.steamAddActivationCode.trim()) {
      this.steamAddStatus = this.localized($r('app.string.steam_enter_activation'));
      return;
    }
    this.steamAddBusy = true;
    this.steamAddStatus = this.localized($r('app.string.steam_activating_guard'));
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
      if (!finalized.success) {
        throw new AppError('steam_error_activation_status',
          `Steam Guard activation failed (status ${finalized.status})`, [finalized.status]);
      }
      await this.saveSteamEnrollment(enrollment, this.localized($r('app.string.steam_guard_added')));
    } catch (error) {
      this.steamAddStatus = this.localizedError(error as Object, $r('app.string.error_steam_operation_failed'));
    } finally {
      this.steamAddBusy = false;
    }
  }

  /** 请求转移已有 Steam Guard，并触发 Steam 发送短信验证码。 */
  private async beginSteamTransfer(): Promise<void> {
    if (!this.steamAddSession || !this.steamAddTokens) {
      return;
    }
    this.steamAddBusy = true;
    this.steamAddStatus = this.localized($r('app.string.steam_requesting_transfer'));
    try {
      await new SteamAuthenticatorService().beginTransfer(
        this.steamAddSession.steamId.toString(), this.steamAddTokens.refreshToken);
      this.steamAddActivationCode = '';
      this.steamAddStep = 4;
      this.steamAddStatus = this.localized($r('app.string.steam_transfer_started'));
    } catch (error) {
      const message = (error as Error).message;
      DiagnosticLogService.warn('SteamTransfer', `Transfer challenge start failed: ${message}`);
      this.steamAddStatus = this.localizedError(error as Object, $r('app.string.error_steam_operation_failed'));
    } finally {
      this.steamAddBusy = false;
    }
  }

  /** 提交短信验证码并接收转移后的完整验证器密钥。 */
  private async completeSteamTransfer(): Promise<void> {
    if (!this.steamAddSession || !this.steamAddTokens) {
      return;
    }
    if (!this.steamAddActivationCode.trim()) {
      this.steamAddStatus = this.localized($r('app.string.steam_enter_sms'));
      return;
    }
    this.steamAddBusy = true;
    this.steamAddStatus = this.localized($r('app.string.steam_transferring_guard'));
    try {
      const service = new SteamAuthenticatorService();
      const enrollment = await service.completeTransfer(
        this.steamAddSession.steamId.toString(), this.steamAddTokens.refreshToken,
        this.steamAddActivationCode.trim());
      // 迁移协议没有上传或返回 Device ID；以迁移后的服务端状态为准，查询失败时才退回本地 UUID。
      const deviceId = await this.transferredDeviceId(service);
      await this.saveSteamEnrollment(enrollment, this.localized($r('app.string.steam_guard_transferred')), deviceId);
    } catch (error) {
      this.steamAddStatus = this.localizedError(error as Object, $r('app.string.error_steam_operation_failed'));
    } finally {
      this.steamAddBusy = false;
    }
  }

  /**
   * 查询迁移后 Steam 实际登记的 Device ID。
   * QueryStatus 不是迁移是否成功的判据，因此异常只写日志，并安全退回流程开始时生成的本地 UUID。
   */
  private async transferredDeviceId(service: SteamAuthenticatorService): Promise<string> {
    if (!this.steamAddSession || !this.steamAddTokens) {
      return this.steamAddDeviceId;
    }
    try {
      const status = await service.queryAuthenticatorStatus(
        this.steamAddSession.steamId.toString(), this.steamAddTokens.refreshToken);
      const serverDeviceId = status.deviceIdentifier.trim();
      if (serverDeviceId.length > 0) {
        DiagnosticLogService.info('SteamTransfer', 'Using Device ID returned by post-transfer QueryStatus');
        return serverDeviceId;
      }
      DiagnosticLogService.warn('SteamTransfer',
        'Post-transfer QueryStatus returned an empty Device ID; using the locally generated fallback');
    } catch (error) {
      // 密钥已经由转移接口下发，不能因为辅助状态查询失败而把远端成功显示为迁移失败。
      DiagnosticLogService.warn('SteamTransfer',
        `Post-transfer Device ID lookup failed; using local fallback: ${(error as Error).message}`);
    }
    return this.steamAddDeviceId;
  }

  /** 将已激活/转移的密钥与会话元信息组装为 Token，再走统一去重提交。 */
  private async saveSteamEnrollment(enrollment: SteamAuthenticatorEnrollment, message: string,
    deviceId: string = this.steamAddDeviceId): Promise<void> {
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
        deviceId: deviceId,
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

  /** 规范化并解析粘贴的 otpauth URI，然后提交到 Token 仓库。 */
  private async addUri(): Promise<void> {
    try {
      this.uriValue = this.normalizeOtpPayload(this.uriValue);
      const token = OtpUriParser.parse(this.uriValue);
      await this.commitNewToken(token);
    } catch (error) {
      this.errorMessage = this.localizedError(error as Object, $r('app.string.error_token_save_failed'));
    }
  }

  /** 容忍二维码和剪贴板常见包装格式，提取可解析的 otpauth URI。 */
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

  /** 调用 Scan Kit 扫描 OTP 二维码，成功后直接去重并添加。 */
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
        this.errorMessage = this.localized($r('app.string.error_qr_otp_invalid'),
          this.localizedError(parseError as Object, $r('app.string.error_token_save_failed')));
      }
    } catch (error) {
      const detail = error as BusinessError;
      // Scan Kit 将用户主动关闭扫码页作为异常返回；这是正常取消，不应显示英文系统错误。
      if (detail.code === 1000500002) {
        return;
      }
      this.showToast(this.localized($r('app.string.error_scan_failed'),
        `${detail.code ?? 'unknown'}`, detail.message ?? `${error}`), 3000);
    }
  }

  /** 构建以扫码为主的快捷添加页。 */
  @Builder
  private scanAddTab() {
    Scroll() {
      Column({ space: 18 }) {
        Column({ space: 12 }) {
          Stack() {
            Row().width(76).height(76).borderRadius(38).backgroundColor($r('app.color.empty_icon_surface'))
            SymbolGlyph($r('sys.symbol.qrcode')).fontSize(38).fontColor(['#4668E8'])
          }.margin({ top: 10, bottom: 4 })

          Text($r('app.string.add_scan_title')).fontSize(20).fontWeight(FontWeight.Bold)
          Text($r('app.string.add_scan_description'))
            .fontSize(14).fontColor($r('app.color.text_muted')).lineHeight(21).textAlign(TextAlign.Center)
          Button($r('app.string.add_scan_open')).width('100%').height(50).backgroundColor('#4668E8')
            .onClick(() => this.scanToken())
        }.width('100%').alignItems(HorizontalAlign.Center)

        Text($r('app.string.add_scan_hint'))
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

  /** 构建 URI 粘贴与解析页。 */
  @Builder
  private uriAddTab() {
    Scroll() {
      Column({ space: 14 }) {
        Column({ space: 12 }) {
          Text($r('app.string.add_uri_title')).fontSize(19).fontWeight(FontWeight.Bold).width('100%')
          Text($r('app.string.add_uri_description'))
            .fontSize(13).fontColor($r('app.color.text_muted')).lineHeight(19).width('100%')
          TextArea({ placeholder: $r('app.string.add_uri_placeholder'), text: this.uriValue }).height(150)
            .onChange((value: string) => this.uriValue = value)
          Button($r('app.string.add_uri_parse'))
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

  /** 构建包含周期和位数选项的手动添加表单。 */
  @Builder
  private manualAddTab() {
    Scroll() {
      Column({ space: 14 }) {
        Column({ space: 12 }) {
          Text($r('app.string.add_manual_title')).fontSize(18).fontWeight(FontWeight.Bold).width('100%')
          TextInput({ placeholder: $r('app.string.add_issuer_placeholder'), text: this.issuer })
            .onChange((value: string) => this.issuer = value)
          TextInput({ placeholder: $r('app.string.add_account_placeholder'), text: this.account })
            .onChange((value: string) => this.account = value)
          TextInput({ placeholder: $r('app.string.detail_secret_placeholder'), text: this.secret })
            .onChange((value: string) => this.secret = value)
          if (this.issuer.trim().toLowerCase() === 'steam') {
            Text($r('app.string.add_steam_detected'))
              .fontSize(12).fontColor('#4668E8').lineHeight(18).width('100%')
          } else {
            Column({ space: 8 }) {
              Text($r('app.string.detail_algorithm')).fontSize(15).fontWeight(FontWeight.Medium).width('100%')
              Row({ space: 8 }) {
                Button('SHA-1').layoutWeight(1)
                  .backgroundColor(this.algorithm === TokenAlgorithm.SHA1 ? '#4668E8' :
                    $r('app.color.surface_control'))
                  .fontColor(this.algorithm === TokenAlgorithm.SHA1 ? Color.White :
                    $r('app.color.text_secondary'))
                  .onClick(() => this.algorithm = TokenAlgorithm.SHA1)
                Button('SHA-256').layoutWeight(1)
                  .backgroundColor(this.algorithm === TokenAlgorithm.SHA256 ? '#4668E8' :
                    $r('app.color.surface_control'))
                  .fontColor(this.algorithm === TokenAlgorithm.SHA256 ? Color.White :
                    $r('app.color.text_secondary'))
                  .onClick(() => this.algorithm = TokenAlgorithm.SHA256)
                Button('SHA-512').layoutWeight(1)
                  .backgroundColor(this.algorithm === TokenAlgorithm.SHA512 ? '#4668E8' :
                    $r('app.color.surface_control'))
                  .fontColor(this.algorithm === TokenAlgorithm.SHA512 ? Color.White :
                    $r('app.color.text_secondary'))
                  .onClick(() => this.algorithm = TokenAlgorithm.SHA512)
              }.width('100%')
            }.width('100%')

            Column({ space: 8 }) {
              Text($r('app.string.add_digits')).fontSize(15).fontWeight(FontWeight.Medium).width('100%')
              Row({ space: 10 }) {
                Button($r('app.string.detail_digits_6'))
                  .layoutWeight(1)
                  .backgroundColor(this.digits === 6 ? '#4668E8' : $r('app.color.surface_control'))
                  .fontColor(this.digits === 6 ? Color.White : $r('app.color.text_secondary'))
                  .onClick(() => this.digits = 6)
                Button($r('app.string.detail_digits_8'))
                  .layoutWeight(1)
                  .backgroundColor(this.digits === 8 ? '#4668E8' : $r('app.color.surface_control'))
                  .fontColor(this.digits === 8 ? Color.White : $r('app.color.text_secondary'))
                  .onClick(() => this.digits = 8)
              }.width('100%')
            }.width('100%')

            Column({ space: 6 }) {
              Text($r('app.string.add_period')).fontSize(15).fontWeight(FontWeight.Medium).width('100%')
              Row({ space: 8 }) {
                Button($r('app.string.detail_seconds_30')).layoutWeight(1)
                  .backgroundColor(this.periodValue === '30' ? '#4668E8' : $r('app.color.surface_control'))
                  .fontColor(this.periodValue === '30' ? Color.White : $r('app.color.text_secondary'))
                  .onClick(() => this.periodValue = '30')
                Button($r('app.string.detail_seconds_60')).layoutWeight(1)
                  .backgroundColor(this.periodValue === '60' ? '#4668E8' : $r('app.color.surface_control'))
                  .fontColor(this.periodValue === '60' ? Color.White : $r('app.color.text_secondary'))
                  .onClick(() => this.periodValue = '60')
              }.width('100%')
              TextInput({ placeholder: $r('app.string.add_period_usual'), text: this.periodValue })
                .type(InputType.Number)
                .onChange((value: string) => this.periodValue = value)
              Text($r('app.string.add_period_hint'))
                .fontSize(12)
                .fontColor($r('app.color.text_muted'))
                .width('100%')
            }.width('100%')
          }
          Button($r('app.string.add_save')).width('100%').backgroundColor('#4668E8')
            .onClick(() => this.addManual())
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

  /** 构建 Steam 登录、激活和转移的分步表单。 */
  @Builder
  private steamAddTab() {
    Scroll() {
      Column({ space: 14 }) {
        Column({ space: 12 }) {
          Text($r('app.string.add_steam_title')).fontSize(18).fontWeight(FontWeight.Bold).width('100%')
          Text($r('app.string.add_steam_description'))
            .fontSize(13).fontColor($r('app.color.text_muted')).lineHeight(19).width('100%')
          Text($r('app.string.add_steam_existing_hint'))
            .fontSize(12)
            .fontColor($r('app.color.warning'))
            .lineHeight(18)
            .padding(12)
            .backgroundColor($r('app.color.warning_surface'))
            .borderRadius(12)
            .width('100%')
          if (this.steamAddStatus.length > 0 && this.steamAddStep !== 1 && this.steamAddStep !== 2) {
            Text(this.steamAddStatus)
              .fontSize(13)
              .fontColor($r('app.color.text_secondary'))
              .lineHeight(19)
              .padding(12)
              .backgroundColor($r('app.color.status_surface'))
              .borderRadius(12)
              .width('100%')
          }
          if (this.steamAddStep === 0) {
            TextInput({ placeholder: $r('app.string.steam_account_placeholder'), text: this.steamAddAccount })
              // USER_NAME + Password 必须同时存在，密码保险箱才能把这组输入框识别为登录表单。
              .type(InputType.USER_NAME)
              .contentType(ContentType.USER_NAME)
              .enableAutoFill(true)
              .onChange((value: string) => this.steamAddAccount = value.trim())
            TextInput({ placeholder: $r('app.string.add_steam_password'), text: this.steamAddPassword })
              .type(InputType.Password)
              .contentType(ContentType.PASSWORD)
              .enableAutoFill(true)
              .onChange((value: string) => this.steamAddPassword = value)
            Button(this.steamAddBusy ? $r('app.string.steam_logging_in') : $r('app.string.add_steam_login'))
              .width('100%')
              .height(48)
              .backgroundColor($r('app.color.brand_strong'))
              .enabled(!this.steamAddBusy)
              .onClick(() => this.startSteamAddLogin())
          } else if (this.steamAddStep === 1) {
            SteamVerificationStep({
              statusMessage: this.steamAddStatus,
              prompt: this.steamConfirmationPrompt(),
              placeholder: $r('app.string.steam_code_placeholder'),
              code: this.steamAddCode,
              showCodeInput: this.steamAddConfirmationType === SteamGuardType.EMAIL_CODE ||
                this.steamAddConfirmationType === SteamGuardType.DEVICE_CODE,
              onCodeChange: (value: string): void => {
                this.steamAddCode = value;
              }
            })
            Button(this.steamAddBusy ? $r('app.string.add_steam_verifying') :
              $r('app.string.add_steam_continue'))
              .width('100%')
              .height(48)
              .backgroundColor($r('app.color.brand_strong'))
              .enabled(!this.steamAddBusy)
              .onClick(() => this.completeSteamAddLogin())
            if (this.steamAddBusy) {
              Button($r('app.string.add_steam_cancel_wait'))
                .width('100%')
                .height(42)
                .backgroundColor($r('app.color.surface_control'))
                .fontColor($r('app.color.text_secondary'))
                .onClick(() => this.cancelSteamLogin())
            } else {
              Button($r('app.string.add_steam_login_again'))
                .width('100%')
                .height(42)
                .backgroundColor($r('app.color.surface_control'))
                .fontColor($r('app.color.text_secondary'))
                .onClick(() => this.resetSteamAddFlow())
            }
          } else if (this.steamAddStep === 2) {
            SteamVerificationStep({
              statusMessage: this.steamAddStatus,
              prompt: $r('app.string.add_steam_activation_prompt'),
              placeholder: $r('app.string.add_steam_activation_code'),
              code: this.steamAddActivationCode,
              onCodeChange: (value: string): void => {
                this.steamAddActivationCode = value;
              }
            })
            Button(this.steamAddBusy ? $r('app.string.add_steam_activating') :
              $r('app.string.add_steam_activate'))
              .width('100%')
              .height(48)
              .backgroundColor($r('app.color.success'))
              .enabled(!this.steamAddBusy)
              .onClick(() => this.finalizeSteamAuthenticator())
          } else if (this.steamAddStep === 3) {
            Text($r('app.string.add_steam_exists')).fontSize(16).fontWeight(FontWeight.Bold)
              .fontColor($r('app.color.danger'))
              .width('100%')
            Text($r('app.string.add_steam_transfer_warning'))
              .fontSize(13).fontColor($r('app.color.text_secondary')).lineHeight(20).width('100%')
            Button(this.steamAddBusy ? $r('app.string.add_steam_requesting') :
              $r('app.string.add_steam_transfer'))
              .width('100%')
              .height(48)
              .backgroundColor($r('app.color.danger'))
              .enabled(!this.steamAddBusy)
              .onClick(() => this.beginSteamTransfer())
            Button($r('app.string.add_steam_have_sms'))
              .width('100%')
              .height(42)
              .backgroundColor($r('app.color.surface_control'))
              .fontColor($r('app.color.text_secondary'))
              .enabled(!this.steamAddBusy)
              .onClick(() => {
                // 允许应用重启后继续服务端已开始的迁移，避免重复发送恢复请求并触发限流。
                this.steamAddActivationCode = '';
                this.steamAddStep = 4;
                this.steamAddStatus = this.localized($r('app.string.steam_enter_previous_sms'));
              })
            Button($r('app.string.add_steam_cancel_relogin'))
              .width('100%')
              .height(42)
              .backgroundColor($r('app.color.surface_control'))
              .fontColor($r('app.color.text_secondary'))
              .enabled(!this.steamAddBusy)
              .onClick(() => this.resetSteamAddFlow())
          } else {
            Text($r('app.string.add_steam_sms_title')).fontSize(15).fontWeight(FontWeight.Medium).width('100%')
            TextInput({ placeholder: $r('app.string.add_steam_sms_code'), text: this.steamAddActivationCode })
              .onChange((value: string) => this.steamAddActivationCode = value.trim())
            Button(this.steamAddBusy ? $r('app.string.add_steam_transferring') :
              $r('app.string.add_steam_finish_transfer'))
              .width('100%')
              .height(48)
              .backgroundColor($r('app.color.danger'))
              .enabled(!this.steamAddBusy)
              .onClick(() => this.completeSteamTransfer())
          }
          Text($r('app.string.add_password_note'))
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

  /** 组合添加页标题和四种添加方式的 Tabs。 */
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
          Text($r('app.string.add_title')).fontSize(26).fontWeight(FontWeight.Bold)
          Text($r('app.string.add_subtitle')).fontSize(13).fontColor($r('app.color.text_tertiary'))
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
        }.tabBar($r('app.string.add_tab_scan')).align(Alignment.TopStart)

        TabContent() {
          this.uriAddTab()
        }.tabBar('URI').align(Alignment.TopStart)

        TabContent() {
          this.manualAddTab()
        }.tabBar($r('app.string.add_tab_manual')).align(Alignment.TopStart)

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
      .backgroundColor($r('app.color.page_background'))
      .onChange((index: number) => {
        this.addTabIndex = index;
        this.errorMessage = '';
      })
    }.height('100%').width('100%').backgroundColor($r('app.color.page_background'))
  }

}
