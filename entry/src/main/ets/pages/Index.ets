import { common } from '@kit.AbilityKit';
import { pasteboard } from '@kit.BasicServicesKit';
import { SteamGuardMetadata, StoredToken, TokenCode, TokenKind } from '../domain/Token';
import { TokenRepository } from '../data/TokenRepository';
import { OtpEngine } from '../core/OtpEngine';
import { OtpUriParser } from '../core/OtpUriParser';
import { Base32 } from '../core/Base32';
import { IconPack, IconPackService } from '../services/IconPackService';
import { SteamConfirmation, SteamGuardService } from '../services/SteamGuardService';
import { SteamImportResult, SteamImportService } from '../services/SteamImportService';
import { SteamLoginService } from '../services/SteamLoginService';
import { SteamAuthenticatorEnrollment, SteamAuthenticatorService } from '../services/SteamAuthenticatorService';
import { SteamAllowedConfirmation, SteamAuthSession, SteamGuardType, SteamSessionTokens } from '../services/SteamProto';
import { util } from '@kit.ArkTS';
import { scanBarcode, scanCore } from '@kit.ScanKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { BackupMergeResult, BackupService } from '../services/BackupService';
import { TokenIconPicker } from '../components/TokenIconPicker';
import { hilog } from '@kit.PerformanceAnalysisKit';

const LOG_DOMAIN: number = 0xD003;
const LOG_TAG: string = 'Index';

/** 根组件内部的页面状态机，避免为少量页面额外引入路由层。 */
enum AppView {
  TOKENS,
  ADD,
  SETTINGS,
  STEAM,
  DETAIL,
  ICON_PICKER
}

/**
 * 应用主界面，同时协调 Token 持久化、验证码刷新、Steam 操作和图标包设置。
 * 加密、OTP、网络协议等具体规则下沉到 core/service，页面只维护交互状态和调用顺序。
 */
@Entry
@Component
struct Index {
  // Token 与添加表单状态。
  @State private view: AppView = AppView.TOKENS;
  @State private tokens: StoredToken[] = [];
  @State private codes: TokenCode[] = [];
  @State private issuer: string = '';
  @State private account: string = '';
  @State private secret: string = '';
  @State private uriValue: string = '';
  @State private digits: number = 6;
  @State private periodValue: string = '30';
  @State private addTabIndex: number = 0;
  @State private errorMessage: string = '';
  // 图标包及手动图标选择状态。
  @State private iconPacks: IconPack[] = [];
  @State private activeIconPackKey: string = IconPackService.defaultPackKey();
  @State private iconPackManagementExpanded: boolean = false;
  @State private iconPickerIndex: number = -1;
  @State private reorderMode: boolean = false;
  @State private now: number = Date.now();
  // Steam 数据始终与 selectedSteamIndex 指向的 Token 绑定，这些字段只是页面编辑副本。
  @State private steamId: string = '';
  @State private steamAccessToken: string = '';
  @State private steamIdentitySecret: string = '';
  @State private steamDeviceId: string = '';
  @State private steamConfirmations: SteamConfirmation[] = [];
  @State private steamLoading: boolean = false;
  @State private selectedSteamIndex: number = -1;
  @State private steamJsonText: string = '';
  @State private steamImportExpanded: boolean = false;
  @State private steamHasLoaded: boolean = false;
  @State private steamLastRefresh: string = '';
  @State private steamRefreshingSession: boolean = false;
  @State private steamLoginPassword: string = '';
  @State private showSteamTokenHelp: boolean = false;
  @State private steamQrLoading: boolean = false;
  @State private steamAddStep: number = 0;
  @State private steamAddAccount: string = '';
  @State private steamAddPassword: string = '';
  @State private steamAddCode: string = '';
  @State private steamAddActivationCode: string = '';
  @State private steamAddConfirmationType: number = SteamGuardType.UNKNOWN;
  @State private steamAddStatus: string = '';
  @State private steamAddBusy: boolean = false;
  // 加密备份弹层状态；密码仅在当前页面生命周期内保留。
  @State private backupMode: number = 0;
  @State private backupPassword: string = '';
  @State private backupConfirmPassword: string = '';
  @State private backupImportContent: string = '';
  @State private backupBusy: boolean = false;
  private steamReturnView: AppView = AppView.TOKENS;
  private steamAddSession?: SteamAuthSession;
  private steamAddTokens?: SteamSessionTokens;
  private steamAddEnrollment?: SteamAuthenticatorEnrollment;
  private steamAddDeviceId: string = '';

  /** Toast 失败不应中断用户操作，但需要留下可定位的日志。 */
  private showToast(message: string, duration: number = 2000): void {
    try {
      this.getUIContext().getPromptAction().showToast({ message: message, duration: duration });
    } catch (error) {
      const detail = error as BusinessError;
      hilog.error(LOG_DOMAIN, LOG_TAG, 'Failed to show toast: %{public}s', detail.message ?? message);
    }
  }
  private steamAddTimeOffset: number = 0;
  private repository: TokenRepository = new TokenRepository();
  private timer: number = -1;

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
    if (this.timer >= 0) clearInterval(this.timer);
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
      if (iconsChanged) await this.repository.save(this.tokens);
      this.refreshCodes();
    } catch (error) {
      const detail = error as BusinessError;
      hilog.error(LOG_DOMAIN, LOG_TAG, 'Application initialization failed: %{public}s',
        detail.message ?? 'unknown');
      this.showToast(`应用数据初始化失败：${detail.message ?? '未知错误'}`, 3500);
    }
  }

  private refreshCodes(): void {
    this.codes = this.tokens.map((token: StoredToken): TokenCode => {
      try {
        return OtpEngine.generate(token, this.now);
      } catch (error) {
        const detail = error as BusinessError;
        hilog.error(LOG_DOMAIN, LOG_TAG, 'Failed to generate code for %{public}s: %{public}s',
          token.issuer, detail.message ?? 'unknown');
        return { value: token.kind === TokenKind.STEAM ? '-----' : '------', remainingSeconds: 0, progress: 0 };
      }
    });
  }

  private currentSteamRefreshToken(): string {
    if (this.selectedSteamIndex < 0 || this.selectedSteamIndex >= this.tokens.length) return '';
    return this.tokens[this.selectedSteamIndex].steam?.refreshToken ?? '';
  }

  private async persist(): Promise<void> {
    await this.repository.save(this.tokens);
    this.refreshCodes();
  }

  // ===== Token 添加、编辑与排序 =====

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
      const token: StoredToken = { id: OtpUriParser.createId(), issuer: this.issuer.trim(),
        account: this.account.trim(), secret: normalized, digits: isSteam ? 5 : this.digits,
        period: isSteam ? 30 : parsedPeriod,
        kind: isSteam ? TokenKind.STEAM : TokenKind.TOTP,
        iconPath: '', iconManual: false, createdAt: Date.now() };
      this.tokens = [...this.tokens, token];
      await this.persist();
      this.resetForm();
      this.view = AppView.TOKENS;
    } catch (error) {
      this.errorMessage = (error as Error).message;
    }
  }

  private resetSteamAddFlow(): void {
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
    try {
      const service = new SteamLoginService();
      const session = await service.beginSession(this.steamAddAccount.trim(), this.steamAddPassword);
      this.steamAddPassword = '';
      this.steamAddSession = session;
      const confirmation = this.supportedSteamConfirmation(session);
      if (confirmation) {
        this.steamAddConfirmationType = confirmation.type;
        this.steamAddStep = 1;
        this.steamAddStatus = confirmation.message || this.steamConfirmationPrompt();
      } else {
        const tokens = await service.pollSession(session);
        await this.startSteamAuthenticator(session, tokens);
      }
    } catch (error) {
      this.steamAddStatus = (error as Error).message;
    } finally {
      this.steamAddBusy = false;
    }
  }

  private async completeSteamAddLogin(): Promise<void> {
    if (!this.steamAddSession) return;
    this.steamAddBusy = true;
    this.steamAddStatus = '正在完成 Steam 登录…';
    try {
      const service = new SteamLoginService();
      if (this.steamAddConfirmationType === SteamGuardType.EMAIL_CODE ||
        this.steamAddConfirmationType === SteamGuardType.DEVICE_CODE) {
        await service.submitGuardCode(this.steamAddSession,
          this.steamAddConfirmationType, this.steamAddCode.trim());
      }
      const tokens = await service.pollSession(this.steamAddSession);
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
    if (!this.steamAddSession || !this.steamAddTokens || !this.steamAddEnrollment) return;
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
        id: OtpUriParser.createId(), issuer: 'Steam', account: this.steamAddTokens.accountName,
        secret: secret, digits: 5, period: 30, kind: TokenKind.STEAM,
        iconPath: '', iconManual: false, createdAt: Date.now()
      };
      const authenticatorCode = OtpEngine.generate(temporary, now).value;
      const finalized = await new SteamAuthenticatorService().finalizeAuthenticator(
        this.steamAddSession.steamId.toString(), this.steamAddTokens.refreshToken,
        authenticatorCode, seconds, this.steamAddActivationCode.trim());
      if (finalized.wantMore) throw new Error('Steam 验证码时间不匹配，请稍后重新提交激活码');
      if (!finalized.success) throw new Error(`Steam Guard 激活失败（status ${finalized.status}）`);
      await this.saveSteamEnrollment(enrollment, 'Steam Guard 已添加');
    } catch (error) {
      this.steamAddStatus = (error as Error).message;
    } finally {
      this.steamAddBusy = false;
    }
  }

  private async beginSteamTransfer(): Promise<void> {
    if (!this.steamAddSession || !this.steamAddTokens) return;
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
    if (!this.steamAddSession || !this.steamAddTokens) return;
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
      this.steamAddDeviceId = 'android:transfer';
      await this.saveSteamEnrollment(enrollment, 'Steam Guard 已转移并添加');
    } catch (error) {
      this.steamAddStatus = (error as Error).message;
    } finally {
      this.steamAddBusy = false;
    }
  }

  private async saveSteamEnrollment(enrollment: SteamAuthenticatorEnrollment, message: string): Promise<void> {
    if (!this.steamAddSession || !this.steamAddTokens) return;
    const base64 = new util.Base64Helper();
    const accountName = enrollment.accountName || this.steamAddTokens.accountName || this.steamAddAccount;
    const token: StoredToken = {
      id: OtpUriParser.createId(), issuer: 'Steam', account: accountName,
      secret: Base32.encode(enrollment.sharedSecret), digits: 5, period: 30, kind: TokenKind.STEAM,
      iconPath: '', iconManual: false, createdAt: Date.now(),
      steam: {
        steamId: this.steamAddSession.steamId.toString(), accountName: accountName,
        identitySecret: base64.encodeToStringSync(enrollment.identitySecret, util.Type.BASIC),
        deviceId: this.steamAddDeviceId,
        accessToken: this.steamAddTokens.accessToken,
        refreshToken: this.steamAddTokens.refreshToken,
        revocationCode: enrollment.revocationCode,
        serialNumber: enrollment.serialNumber,
        tokenGid: enrollment.tokenGid,
        uri: enrollment.uri,
        secret1: base64.encodeToStringSync(enrollment.secret1, util.Type.BASIC)
      }
    };
    this.tokens = [...this.tokens, token];
    await this.persist();
    this.resetForm();
    this.view = AppView.TOKENS;
    this.showToast(message, 2200);
  }

  private async addUri(): Promise<void> {
    try {
      this.uriValue = this.normalizeOtpPayload(this.uriValue);
      const token = OtpUriParser.parse(this.uriValue);
      token.iconPath = '';
      token.iconManual = false;
      this.tokens = [...this.tokens, token];
      await this.persist();
      this.resetForm();
      this.view = AppView.TOKENS;
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
      try { value = decodeURIComponent(value); } catch (_) {}
    }
    const lower = value.toLowerCase();
    const start = lower.indexOf('otpauth://');
    if (start >= 0) {
      value = value.substring(start);
      const whitespace = value.search(/\s/);
      if (whitespace > 0) value = value.substring(0, whitespace);
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
        OtpUriParser.parse(this.uriValue);
        await this.addUri();
      } catch (parseError) {
        this.addTabIndex = 1;
        this.errorMessage = `二维码不是可识别的 OTP 配置：${(parseError as Error).message}`;
      }
    } catch (error) {
      const detail = error as BusinessError;
      if (detail.code === 10010012 || detail.code === 10010013) return;
      this.showToast(`扫码失败（${detail.code ?? 'unknown'}）：${detail.message ?? error}`, 3000);
    }
  }

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
    if (from === to || from < 0 || to < 0 || from >= this.tokens.length || to >= this.tokens.length) return;
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
    const token = this.tokens[index];
    this.steamLoginPassword = '';
    this.showSteamTokenHelp = false;
    this.selectedSteamIndex = index;
    this.issuer = token.issuer;
    this.account = token.account;
    this.secret = token.secret;
    this.digits = token.digits === 8 ? 8 : 6;
    this.periodValue = `${token.period}`;
    this.steamId = token.steam?.steamId ?? '';
    this.steamAccessToken = token.steam?.accessToken ?? '';
    this.steamIdentitySecret = token.steam?.identitySecret ?? '';
    this.steamDeviceId = token.steam?.deviceId ?? '';
    this.steamImportExpanded = false;
    this.errorMessage = '';
    this.view = AppView.DETAIL;
  }

  private async saveTokenDetail(): Promise<void> {
    try {
      if (this.selectedSteamIndex < 0 || this.selectedSteamIndex >= this.tokens.length) return;
      const normalizedSecret = Base32.normalize(this.secret);
      Base32.decode(normalizedSecret);
      const parsedPeriod = Number.parseInt(this.periodValue);
      if (!this.issuer.trim() || !this.account.trim()) throw new Error('Issuer 和账户不能为空');
      if (Number.isNaN(parsedPeriod) || parsedPeriod < 1 || parsedPeriod > 300) {
        throw new Error('刷新周期必须是 1 到 300 秒之间的整数');
      }
      const token = this.tokens[this.selectedSteamIndex];
      const isSteam = this.issuer.trim().toLowerCase() === 'steam';
      token.issuer = this.issuer.trim();
      token.account = this.account.trim();
      token.secret = normalizedSecret;
      token.kind = isSteam ? TokenKind.STEAM : TokenKind.TOTP;
      token.digits = isSteam ? 5 : this.digits;
      token.period = isSteam ? 30 : parsedPeriod;
      if (isSteam) {
        const metadata: SteamGuardMetadata = {
          steamId: this.steamId.trim(), accountName: token.account,
          identitySecret: this.steamIdentitySecret.trim(), deviceId: this.steamDeviceId.trim(),
          accessToken: this.steamAccessToken.trim(), refreshToken: token.steam?.refreshToken ?? '',
          revocationCode: token.steam?.revocationCode ?? '',
          serialNumber: token.steam?.serialNumber,
          tokenGid: token.steam?.tokenGid,
          uri: token.steam?.uri,
          secret1: token.steam?.secret1
        };
        token.steam = metadata;
      } else {
        token.steam = undefined;
      }
      this.tokens = [...this.tokens];
      await this.persist();
      this.view = AppView.TOKENS;
    } catch (error) {
      this.errorMessage = (error as Error).message;
    }
  }

  // ===== 图标解析与图标包管理 =====

  private resolvedIcon(token: StoredToken): string {
    return IconPackService.resolveIcon(token.issuer, token.iconPath, token.iconManual === true,
      this.iconPacks, this.activeIconPackKey);
  }

  private fallbackIconColor(issuer: string): string {
    let hash = 0;
    for (let index = 0; index < issuer.length; index++) hash = issuer.charCodeAt(index) + ((hash << 5) - hash);
    const colors: string[] = ['#4668E8', '#287A52', '#A65B25', '#7A4DA3', '#176C82', '#A33143'];
    return colors[Math.abs(hash) % colors.length];
  }

  private openIconPicker(index: number): void {
    this.iconPickerIndex = index;
    this.view = AppView.ICON_PICKER;
  }

  private async applyManualIcon(path: string): Promise<void> {
    if (this.iconPickerIndex < 0 || this.iconPickerIndex >= this.tokens.length) return;
    const token = this.tokens[this.iconPickerIndex];
    const previousPath = token.iconPath;
    const previousManual = token.iconManual;
    try {
    token.iconPath = path;
    token.iconManual = path.length > 0;
    this.tokens = [...this.tokens];
    await this.persist();
    this.view = AppView.TOKENS;
    } catch (error) {
      token.iconPath = previousPath;
      token.iconManual = previousManual;
      this.tokens = [...this.tokens];
      this.refreshCodes();
      this.showToast(`保存图标选择失败：${(error as Error).message}`, 3000);
    }
  }

  private currentIconPackName(): string {
    if (this.activeIconPackKey === IconPackService.defaultPackKey()) return '内置字母图标';
    return this.iconPacks.find((pack: IconPack) => IconPackService.packKey(pack) === this.activeIconPackKey)?.name ??
      '内置字母图标';
  }

  private async selectIconPack(key: string): Promise<void> {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      await IconPackService.selectPack(context, key);
      this.activeIconPackKey = key;
    } catch (error) {
      this.showToast((error as Error).message, 3000);
    }
  }

  private async removeIconPack(pack: IconPack): Promise<void> {
    try {
      await IconPackService.remove(pack);
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      if (this.activeIconPackKey === IconPackService.packKey(pack)) {
        await IconPackService.selectPack(context, IconPackService.defaultPackKey());
        this.activeIconPackKey = IconPackService.defaultPackKey();
      }
      this.tokens.forEach((token: StoredToken) => {
        if (token.iconManual === true && token.iconPath.startsWith(`file://${pack.directory}/`)) {
          token.iconPath = '';
          token.iconManual = false;
        }
      });
      await this.persist();
      this.iconPacks = await IconPackService.list(context);
      this.showToast('图标包已删除', 1800);
    } catch (error) {
      this.showToast((error as Error).message, 3000);
    }
  }

  // ===== Steam 会话、移动确认与扫码登录 =====

  private async requestSteamConfirmations(): Promise<void> {
    if (!this.steamId || !this.steamAccessToken || !this.steamIdentitySecret || !this.steamDeviceId) {
      this.showToast('请填写全部 Steam 会话参数', 2000);
      return;
    }
    this.steamLoading = true;
    try {
      await this.saveSteamBinding(false);
      const refreshToken = this.selectedSteamIndex >= 0 ? this.tokens[this.selectedSteamIndex].steam?.refreshToken ?? '' : '';
      this.steamConfirmations = await new SteamGuardService().getConfirmations(this.steamId,
        this.steamAccessToken, refreshToken, this.steamIdentitySecret, this.steamDeviceId);
      this.steamHasLoaded = true;
      this.steamLastRefresh = new Date().toLocaleTimeString();
      if (this.steamConfirmations.length === 0) {
        this.showToast('当前没有待确认操作', 1800);
      }
    } catch (error) {
      this.showToast((error as Error).message, 3000);
    } finally {
      this.steamLoading = false;
    }
  }

  private async respondToSteamConfirmation(confirmation: SteamConfirmation, approve: boolean): Promise<void> {
    if (this.selectedSteamIndex < 0) return;
    const metadata = this.tokens[this.selectedSteamIndex].steam;
    if (!metadata) return;
    try {
      await new SteamGuardService().respondToConfirmation(metadata.steamId, metadata.accessToken,
        metadata.refreshToken, metadata.identitySecret, metadata.deviceId, confirmation, approve);
      this.steamConfirmations = this.steamConfirmations.filter((item: SteamConfirmation) => item.id !== confirmation.id);
      this.showToast(approve ? '已批准 Steam 确认' : '已拒绝 Steam 确认', 1800);
    } catch (error) {
      this.showToast((error as Error).message, 3000);
    }
  }

  private async refreshSteamSession(): Promise<void> {
    if (this.selectedSteamIndex < 0) return;
    const token = this.tokens[this.selectedSteamIndex];
    if (!token.steam) return;
    this.steamRefreshingSession = true;
    try {
      const accessToken = await new SteamGuardService().refreshAccessToken(token.steam.steamId,
        token.steam.refreshToken);
      token.steam.accessToken = accessToken;
      this.steamAccessToken = accessToken;
      this.tokens = [...this.tokens];
      await this.persist();
      this.showToast('Steam Access Token 已更新', 1800);
    } catch (error) {
      this.showToast((error as Error).message, 3000);
    } finally {
      this.steamRefreshingSession = false;
    }
  }

  private async reauthenticateSteam(): Promise<void> {
    if (this.selectedSteamIndex < 0 || !this.steamLoginPassword) return;
    const token = this.tokens[this.selectedSteamIndex];
    this.steamRefreshingSession = true;
    try {
      // 使用当前 Token 生成 Guard Code；密码只传给登录服务，不写入 token.steam。
      const code = OtpEngine.generate(token).value;
      const loginAccount = token.steam?.accountName || token.account;
      const tokens = await new SteamLoginService().refreshSession(loginAccount, this.steamLoginPassword, code);
      if (!token.steam) throw new Error('Steam 元信息尚未初始化');
      token.steam.accessToken = tokens.accessToken;
      token.steam.refreshToken = tokens.refreshToken;
      token.steam.accountName = tokens.accountName || token.account;
      this.steamAccessToken = tokens.accessToken;
      this.steamLoginPassword = '';
      this.tokens = [...this.tokens];
      await this.persist();
      this.showToast('Steam 会话已重新认证并更新', 2000);
    } catch (error) {
      this.showToast((error as Error).message, 3500);
    } finally { this.steamRefreshingSession = false; }
  }

  private async scanSteamQrLogin(): Promise<void> {
    if (this.selectedSteamIndex < 0 || this.selectedSteamIndex >= this.tokens.length) return;
    const token = this.tokens[this.selectedSteamIndex];
    if (!token.steam?.steamId || !token.steam.refreshToken || !token.secret) {
      this.showToast('请先为此 Steam Token 导入完整会话信息', 2200);
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
      if (!SteamGuardService.isQrLoginChallenge(challenge)) throw new Error('这不是有效的 Steam 登录二维码');
      // 扫码批准相当于授权一次登录，必须在发送签名前让用户明确确认账号与来源。
      const dialog = await this.getUIContext().getPromptAction().showDialog({
        title: '批准 Steam 登录？',
        message: `将使用账户“${token.steam.accountName || token.account}”批准这次登录。` +
          '仅当二维码来自你刚刚打开的 Steam 登录页面时继续。',
        alignment: DialogAlignment.Bottom,
        buttons: [
          { text: '取消', color: '#687383' },
          { text: '批准登录', color: '#183C63' }
        ]
      });
      if (dialog.index !== 1) return;
      this.steamQrLoading = true;
      await new SteamGuardService().approveQrLogin(token.steam.steamId, token.steam.refreshToken,
        Base32.decode(token.secret), challenge, false);
      this.showToast('Steam 登录已批准', 2200);
    } catch (error) {
      const detail = error as BusinessError;
      if (detail.code === 10010012 || detail.code === 10010013) return;
      this.showToast(detail.message ?? `${error}`, 3500);
    } finally {
      this.steamQrLoading = false;
    }
  }

  private openSteamToken(index: number, returnView: AppView = AppView.TOKENS): void {
    const token = this.tokens[index];
    this.steamReturnView = returnView;
    this.selectedSteamIndex = index;
    this.steamId = token.steam?.steamId ?? '';
    this.steamAccessToken = token.steam?.accessToken ?? '';
    this.steamIdentitySecret = token.steam?.identitySecret ?? '';
    this.steamDeviceId = token.steam?.deviceId ?? '';
    this.steamConfirmations = [];
    this.steamHasLoaded = false;
    this.steamLastRefresh = '';
    this.steamImportExpanded = false;
    this.view = AppView.STEAM;
    if (this.steamId.length > 0 && this.steamIdentitySecret.length > 0 && this.steamDeviceId.length > 0 &&
      (this.steamAccessToken.length > 0 || (token.steam?.refreshToken ?? '').length > 0)) {
      this.requestSteamConfirmations();
    }
  }

  private async saveSteamBinding(showMessage: boolean = true): Promise<void> {
    if (this.selectedSteamIndex < 0 || this.selectedSteamIndex >= this.tokens.length) return;
    const token = this.tokens[this.selectedSteamIndex];
    const metadata: SteamGuardMetadata = {
      steamId: this.steamId.trim(),
      accountName: token.account,
      identitySecret: this.steamIdentitySecret.trim(),
      deviceId: this.steamDeviceId.trim(),
      refreshToken: token.steam?.refreshToken ?? '',
      accessToken: this.steamAccessToken.trim(),
      revocationCode: token.steam?.revocationCode ?? '',
      serialNumber: token.steam?.serialNumber,
      tokenGid: token.steam?.tokenGid,
      uri: token.steam?.uri,
      secret1: token.steam?.secret1
    };
    token.steam = metadata;
    this.tokens = [...this.tokens];
    await this.persist();
    if (showMessage) {
      this.showToast('Steam 会话已绑定到此 Token', 1800);
    }
  }

  private async importSteamText(text: string): Promise<void> {
    try {
      const imported: SteamImportResult = SteamImportService.parse(text);
      this.steamId = imported.metadata.steamId;
      this.steamAccessToken = imported.metadata.accessToken;
      this.steamIdentitySecret = imported.metadata.identitySecret;
      this.steamDeviceId = imported.metadata.deviceId;
      if (this.selectedSteamIndex >= 0) {
        const token = this.tokens[this.selectedSteamIndex];
        token.steam = imported.metadata;
        if (imported.accountName.length > 0) token.account = imported.accountName;
        if (imported.sharedSecret.length > 0) {
          const bytes = new util.Base64Helper().decodeSync(imported.sharedSecret, util.Type.BASIC);
          token.secret = Base32.encode(bytes);
        }
        this.tokens = [...this.tokens];
        await this.persist();
      }
      this.steamJsonText = '';
      this.showToast('Steam 数据已导入并绑定', 2000);
    } catch (error) {
      this.showToast((error as Error).message, 3000);
    }
  }

  private async pickSteamFile(): Promise<void> {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      const content = await SteamImportService.pickAndRead(context);
      if (content.length > 0) await this.importSteamText(content);
    } catch (error) {
      this.showToast((error as Error).message, 3000);
    }
  }

  // ===== 加密备份与 UUID 合并恢复 =====

  private resetBackupPanel(): void {
    this.backupMode = 0;
    this.backupPassword = '';
    this.backupConfirmPassword = '';
    this.backupImportContent = '';
    this.backupBusy = false;
  }

  private openBackupExport(): void {
    this.resetBackupPanel();
    this.backupMode = 1;
  }

  private async chooseBackupImport(): Promise<void> {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      const content = await BackupService.pickFile(context);
      if (!content) return;
      this.resetBackupPanel();
      this.backupImportContent = content;
      this.backupMode = 2;
    } catch (error) {
      this.showToast((error as Error).message, 3000);
    }
  }

  private async exportEncryptedBackup(): Promise<void> {
    if (this.backupPassword !== this.backupConfirmPassword) {
      this.showToast('两次输入的备份密码不一致', 2200);
      return;
    }
    this.backupBusy = true;
    try {
      const content = await BackupService.create(this.tokens, this.backupPassword);
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      const saved = await BackupService.saveFile(context, content);
      if (!saved) {
        this.backupBusy = false;
        return;
      }
      this.resetBackupPanel();
      this.showToast(`已导出 ${this.tokens.length} 个 Token`, 2200);
    } catch (error) {
      this.backupBusy = false;
      this.showToast((error as Error).message, 3200);
    }
  }

  private async importEncryptedBackup(): Promise<void> {
    if (!this.backupImportContent) return;
    this.backupBusy = true;
    try {
      const incoming = await BackupService.decrypt(this.backupImportContent, this.backupPassword);
      incoming.forEach((token: StoredToken) => {
        token.iconPath = '';
        token.iconManual = false;
      });
      const result: BackupMergeResult = BackupService.merge(this.tokens, incoming);
      this.tokens = result.tokens;
      await this.persist();
      this.resetBackupPanel();
      this.showToast(`恢复完成：新增 ${result.added} 个，更新 ${result.updated} 个`, 2800);
    } catch (error) {
      this.backupBusy = false;
      this.showToast((error as Error).message, 3500);
    }
  }

  // ===== 可复用 UI Builder =====

  @Builder
  private swipeActions(index: number) {
    Row() {
      Button() {
        Text('✎').fontSize(23).fontColor(Color.White)
      }.width(54).height('100%').borderRadius(0).backgroundColor('#4668E8')
        .onClick(() => this.openTokenDetail(index))
      Button() {
        SymbolGlyph($r('sys.symbol.trash')).fontSize(23).fontColor([Color.White])
      }.width(54).height('100%').borderRadius(0).backgroundColor('#B42335')
        .onClick(() => this.removeToken(index))
    }.width(108).height('100%').borderRadius(18).clip(true)
  }

  @Builder
  private header(title: string, subtitle: string) {
    Column({ space: 4 }) {
      Text(title).fontSize(30).fontWeight(FontWeight.Bold).fontColor('#18202A')
      Text(subtitle).fontSize(14).fontColor('#687383')
    }.alignItems(HorizontalAlign.Start).width('100%').padding({ left: 22, right: 22, top: 18, bottom: 14 })
  }

  @Builder
  private steamTokenHelpSheet() {
    Column({ space: 14 }) {
      Text('可以把它们理解成一张短期通行证和一张续期凭证。')
        .fontSize(14).fontColor('#4C5868').lineHeight(21).width('100%')
      Column({ space: 6 }) {
        Text('Access Token · 临时通行证').fontSize(16).fontWeight(FontWeight.Medium).fontColor('#183C63')
          .width('100%')
        Text('应用访问 Steam 确认等联网服务时使用。有效期较短，但过期通常不需要重新登录。')
          .fontSize(13).fontColor('#4C5868').lineHeight(20).width('100%')
      }.width('100%').padding(14).backgroundColor('#EFF5FA').borderRadius(14)
      Column({ space: 6 }) {
        Text('Refresh Token · 续期凭证').fontSize(16).fontWeight(FontWeight.Medium).fontColor('#31445A')
          .width('100%')
        Text('用于获取新的 Access Token。它的有效期代表这套 Steam 登录会话大致还能维持多久。')
          .fontSize(13).fontColor('#4C5868').lineHeight(20).width('100%')
      }.width('100%').padding(14).backgroundColor('#F3F4F7').borderRadius(14)
      Text('什么时候需要重新登录？').fontSize(15).fontWeight(FontWeight.Medium).width('100%')
      Text('Refresh Token 过期、被 Steam 撤销，或账户安全状态发生变化时。仅 Access Token 过期时，点击“更新 Access Token”即可。')
        .fontSize(13).fontColor('#4C5868').lineHeight(20).width('100%')
      Button('知道了').width('100%').backgroundColor('#183C63')
        .onClick(() => this.showSteamTokenHelp = false)
    }.width('100%').padding({ left: 20, right: 20, bottom: 20 })
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
    }.width(46).height(46).padding(2).borderRadius(14)
      .backgroundColor(this.resolvedIcon(token).length > 0 ? '#F0F2F6' : this.fallbackIconColor(token.issuer))
      .gesture(LongPressGesture({ repeat: false, duration: 500 })
        .onAction(() => this.openIconPicker(index)))
  }

  @Builder
  private tokenRow(token: StoredToken, index: number, showHandle: boolean) {
    Row({ space: 14 }) {
      this.tokenIcon(token, index)
      Column({ space: 4 }) {
        Text(token.issuer).fontSize(16).fontWeight(FontWeight.Medium).maxLines(1)
        Text(token.account).fontSize(13).fontColor('#778191').maxLines(1)
      }.alignItems(HorizontalAlign.Start).layoutWeight(1)
      Column({ space: 5 }) {
        Text(this.codes[index]?.value ?? '------').fontSize(25).fontWeight(FontWeight.Bold)
          .fontColor('#18202A').letterSpacing(1.5)
        Text(`${this.codes[index]?.remainingSeconds ?? 30}s`).fontSize(12).fontColor('#687383')
      }.gesture(LongPressGesture({ repeat: false, duration: 500 })
        .onAction(() => { if (!this.reorderMode) this.copyCode(this.codes[index]?.value ?? ''); }))
      if (showHandle) {
        Text('☰').fontSize(22).fontColor('#778191').width(28).textAlign(TextAlign.Center)
      }
    }.width('100%').padding(16).backgroundColor(Color.White).borderRadius(18)
  }

  @Builder
  private tokenList() {
    Column() {
      Row() {
        Column({ space: 4 }) {
          Text('验证码').fontSize(30).fontWeight(FontWeight.Bold).fontColor('#18202A')
          Text(this.reorderMode ? '长按右侧手柄并上下拖动' :
            (this.tokens.length === 0 ? '添加你的第一个双重验证账户' : `${this.tokens.length} 个账户安全保存在本机`))
            .fontSize(14).fontColor('#687383')
        }.alignItems(HorizontalAlign.Start).layoutWeight(1)
        if (this.reorderMode) {
          Button('完成').backgroundColor('#4668E8').onClick(() => this.reorderMode = false)
        } else {
          if (this.tokens.length > 1) {
            Button('排序').backgroundColor('#E9EDF3').fontColor('#243148')
              .onClick(() => this.reorderMode = true)
          }
          Button('＋').type(ButtonType.Circle).width(42).height(42).fontSize(24)
            .backgroundColor('#4668E8').fontColor(Color.White).onClick(() => {
              this.addTabIndex = 0;
              this.view = AppView.ADD;
            })
        }
      }.width('100%').padding({ left: 22, right: 22, top: 18, bottom: 14 })
      if (this.tokens.length === 0) {
        Column({ space: 14 }) {
          Text('✦').fontSize(42).fontColor('#4668E8')
          Text('这里还没有验证码').fontSize(19).fontWeight(FontWeight.Medium)
          Text('支持标准 TOTP 与 Steam Guard').fontSize(14).fontColor('#778191')
          Button('添加账户').onClick(() => { this.view = AppView.ADD; }).backgroundColor('#4668E8')
        }.layoutWeight(1).justifyContent(FlexAlign.Center).width('100%')
      } else {
        List({ space: 12 }) {
          if (this.reorderMode) {
            ForEach(this.tokens, (token: StoredToken, index: number) => {
              ListItem() { this.tokenRow(token, index, true) }
            }, (item: StoredToken) => item.id)
              .onMove((from: number, to: number) => this.moveToken(from, to))
          } else {
            ForEach(this.tokens, (token: StoredToken, index: number) => {
              ListItem() { this.tokenRow(token, index, false) }
                .swipeAction({
                  edgeEffect: SwipeEdgeEffect.None,
                  end: { builder: () => { this.swipeActions(index) } }
                })
            }, (item: StoredToken) => item.id)
          }
        }.layoutWeight(1).width('100%').height('100%').padding({ left: 16, right: 16, bottom: 8 })
      }
    }.width('100%').height('100%').align(Alignment.TopStart)
  }

  @Builder
  private scanAddTab() {
    Scroll() {
      Column({ space: 18 }) {
        Column({ space: 12 }) {
          Stack() {
            Circle().width(76).height(76).fill('#E8EDFF')
            Text('▦').fontSize(38).fontColor('#4668E8')
          }.margin({ top: 10, bottom: 4 })
          Text('扫描身份验证二维码').fontSize(20).fontWeight(FontWeight.Bold)
          Text('扫描网站展示的身份验证二维码，也可以从相册选择二维码图片。')
            .fontSize(14).fontColor('#778191').lineHeight(21).textAlign(TextAlign.Center)
          Button('打开相机或相册').width('100%').height(50).backgroundColor('#4668E8')
            .onClick(() => this.scanToken())
        }.width('100%').alignItems(HorizontalAlign.Center)
        Text('支持标准 TOTP 与 Steam Guard 二维码。扫描内容异常时会保留到 URI 页供你检查。')
          .fontSize(12).fontColor('#87909E').lineHeight(18).textAlign(TextAlign.Center)
      }.width('100%').padding({ left: 24, right: 24, top: 28, bottom: 24 })
        .justifyContent(FlexAlign.Start).alignItems(HorizontalAlign.Center)
    }.width('100%').height('100%').align(Alignment.TopStart)
  }

  @Builder
  private uriAddTab() {
    Scroll() {
      Column({ space: 14 }) {
        Column({ space: 12 }) {
          Text('粘贴 OTP URI').fontSize(19).fontWeight(FontWeight.Bold).width('100%')
          Text('可粘贴 otpauth:// 链接；会自动清理常见的转义、引号和说明文字。')
            .fontSize(13).fontColor('#778191').lineHeight(19).width('100%')
          TextArea({ placeholder: 'otpauth://totp/服务:账户?secret=...', text: this.uriValue }).height(150)
            .onChange((value: string) => this.uriValue = value)
          Button('解析并添加').width('100%').height(48).backgroundColor('#243148').onClick(() => this.addUri())
        }.width('100%')
        if (this.errorMessage.length > 0) {
          Text(this.errorMessage).fontSize(13).fontColor('#B42335').padding(14)
            .backgroundColor('#FDECEF').borderRadius(12).width('100%')
        }
      }.width('100%').padding({ left: 22, right: 22, top: 24, bottom: 24 })
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
                Button('6 位').layoutWeight(1).backgroundColor(this.digits === 6 ? '#4668E8' : '#EEF1F6')
                  .fontColor(this.digits === 6 ? Color.White : '#4C5868').onClick(() => this.digits = 6)
                Button('8 位').layoutWeight(1).backgroundColor(this.digits === 8 ? '#4668E8' : '#EEF1F6')
                  .fontColor(this.digits === 8 ? Color.White : '#4C5868').onClick(() => this.digits = 8)
              }.width('100%')
            }.width('100%')
            Column({ space: 6 }) {
              Text('刷新周期（秒）').fontSize(15).fontWeight(FontWeight.Medium).width('100%')
              TextInput({ placeholder: '通常为 30', text: this.periodValue }).type(InputType.Number)
                .onChange((value: string) => this.periodValue = value)
              Text('允许 1–300 秒；应与服务端提供的 period 保持一致。').fontSize(12).fontColor('#778191').width('100%')
            }.width('100%')
          }
          Button('保存账户').width('100%').backgroundColor('#4668E8').onClick(() => this.addManual())
        }.width('100%')
        if (this.errorMessage.length > 0) {
          Text(this.errorMessage).fontSize(13).fontColor('#B42335').padding(14)
            .backgroundColor('#FDECEF').borderRadius(12).width('100%')
        }
      }.width('100%').padding({ left: 22, right: 22, top: 24, bottom: 24 })
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
            .fontSize(13).fontColor('#778191').lineHeight(19).width('100%')
          Text('如果账户已经绑定移动 Steam Guard，Steam 可能要求先转移验证器；此操作不会读取服务器上已有的密钥。')
            .fontSize(12).fontColor('#A65B25').lineHeight(18).padding(12)
            .backgroundColor('#FFF4E8').borderRadius(12).width('100%')
          if (this.steamAddStep === 0) {
            TextInput({ placeholder: 'Steam 账户名', text: this.steamAddAccount })
              .onChange((value: string) => this.steamAddAccount = value.trim())
            TextInput({ placeholder: 'Steam 密码', text: this.steamAddPassword }).type(InputType.Password)
              .onChange((value: string) => this.steamAddPassword = value)
            Button(this.steamAddBusy ? '正在登录…' : '登录 Steam').width('100%').height(48)
              .backgroundColor('#183C63').enabled(!this.steamAddBusy)
              .onClick(() => this.startSteamAddLogin())
          } else if (this.steamAddStep === 1) {
            Text(this.steamConfirmationPrompt()).fontSize(14).fontWeight(FontWeight.Medium)
              .fontColor('#243148').lineHeight(20).width('100%')
            if (this.steamAddConfirmationType === SteamGuardType.EMAIL_CODE ||
              this.steamAddConfirmationType === SteamGuardType.DEVICE_CODE) {
              TextInput({ placeholder: 'Steam 验证码', text: this.steamAddCode })
                .onChange((value: string) => this.steamAddCode = value.trim())
            }
            Button(this.steamAddBusy ? '正在验证…' : '我已完成验证，继续').width('100%').height(48)
              .backgroundColor('#183C63').enabled(!this.steamAddBusy)
              .onClick(() => this.completeSteamAddLogin())
            Button('重新登录').width('100%').height(42).backgroundColor('#EEF1F6').fontColor('#4C5868')
              .enabled(!this.steamAddBusy).onClick(() => this.resetSteamAddFlow())
          } else if (this.steamAddStep === 2) {
            Text('Steam 登录已经完成，最后需要验证新增的移动验证器。')
              .fontSize(14).fontWeight(FontWeight.Medium).fontColor('#243148').lineHeight(20).width('100%')
            TextInput({ placeholder: '短信或邮件激活码', text: this.steamAddActivationCode })
              .onChange((value: string) => this.steamAddActivationCode = value.trim())
            Button(this.steamAddBusy ? '正在激活…' : '激活并保存 Steam Guard').width('100%').height(48)
              .backgroundColor('#287A52').enabled(!this.steamAddBusy)
              .onClick(() => this.finalizeSteamAuthenticator())
          } else if (this.steamAddStep === 3) {
            Text('账户已有 Steam Guard').fontSize(16).fontWeight(FontWeight.Bold).fontColor('#A33143')
              .width('100%')
            Text('继续操作会生成一套新的密钥，原手机或验证器中的 Steam Guard 将失效。请确认你能够接收账户绑定手机号的短信。')
              .fontSize(13).fontColor('#4C5868').lineHeight(20).width('100%')
            Button(this.steamAddBusy ? '正在请求…' : '我了解风险，转移验证器').width('100%').height(48)
              .backgroundColor('#A33143').enabled(!this.steamAddBusy)
              .onClick(() => this.beginSteamTransfer())
            Button('取消并重新登录').width('100%').height(42).backgroundColor('#EEF1F6').fontColor('#4C5868')
              .enabled(!this.steamAddBusy).onClick(() => this.resetSteamAddFlow())
          } else {
            Text('输入短信验证码完成转移').fontSize(15).fontWeight(FontWeight.Medium).width('100%')
            TextInput({ placeholder: '短信验证码', text: this.steamAddActivationCode })
              .onChange((value: string) => this.steamAddActivationCode = value.trim())
            Button(this.steamAddBusy ? '正在转移…' : '完成转移并保存').width('100%').height(48)
              .backgroundColor('#A33143').enabled(!this.steamAddBusy)
              .onClick(() => this.completeSteamTransfer())
          }
          if (this.steamAddStatus.length > 0) {
            Text(this.steamAddStatus).fontSize(13).fontColor('#4C5868').lineHeight(19).padding(12)
              .backgroundColor('#F1F4F8').borderRadius(12).width('100%')
          }
          Text('密码仅用于本次 RSA 加密登录，不会写入 Token、备份或本地存储。')
            .fontSize(11).fontColor('#87909E').lineHeight(17).width('100%')
        }.width('100%')
      }.width('100%').padding({ left: 22, right: 22, top: 24, bottom: 30 })
        .justifyContent(FlexAlign.Start)
    }.width('100%').height('100%').align(Alignment.TopStart)
  }

  @Builder
  private addView() {
    Column() {
      Row({ space: 10 }) {
        Button('‹').type(ButtonType.Circle).width(38).height(38).fontSize(24).backgroundColor('#E9EDF3')
          .fontColor('#243148').onClick(() => { this.resetForm(); this.view = AppView.TOKENS; })
        Column({ space: 3 }) {
          Text('添加账户').fontSize(26).fontWeight(FontWeight.Bold)
          Text('选择最适合你的添加方式').fontSize(13).fontColor('#687383')
        }.alignItems(HorizontalAlign.Start)
      }.width('100%').padding({ left: 18, right: 18, top: 18, bottom: 8 })
      Tabs({ barPosition: BarPosition.Start, index: this.addTabIndex }) {
        TabContent() { this.scanAddTab() }.tabBar('扫码').align(Alignment.TopStart)
        TabContent() { this.uriAddTab() }.tabBar('URI').align(Alignment.TopStart)
        TabContent() { this.manualAddTab() }.tabBar('手动').align(Alignment.TopStart)
        TabContent() { this.steamAddTab() }.tabBar('Steam').align(Alignment.TopStart)
      }.vertical(false).barMode(BarMode.Fixed).barHeight(50).barBackgroundColor(Color.White)
        .divider({ strokeWidth: 1, color: '#E5E8EE' }).layoutWeight(1).width('100%')
        .backgroundColor(Color.White)
        .onChange((index: number) => { this.addTabIndex = index; this.errorMessage = ''; })
    }.height('100%').width('100%').backgroundColor(Color.White)
  }

  @Builder
  private settingsView() {
    Scroll() {
      Column({ space: 14 }) {
        this.header('设置', '图标包、安全存储与备份')
        Column({ space: 14 }) {
          Row() {
            Column({ space: 3 }) {
              Text('当前图标风格').fontSize(13).fontColor('#778191')
              Text(this.currentIconPackName()).fontSize(17).fontWeight(FontWeight.Medium)
            }.alignItems(HorizontalAlign.Start).layoutWeight(1)
            Button(this.iconPackManagementExpanded ? '收起' : '管理')
              .backgroundColor('#E9EDF3').fontColor('#243148')
              .onClick(() => this.iconPackManagementExpanded = !this.iconPackManagementExpanded)
          }.width('100%')
          Text('自动匹配只使用当前图标包；长按首页图标可以手动选择任意已安装图标。')
            .fontSize(12).fontColor('#687383').lineHeight(18).width('100%')
          if (this.iconPackManagementExpanded) {
            Divider().color('#E5E8EE')
            Text('选择使用的图标包').fontSize(14).fontWeight(FontWeight.Medium).width('100%')
            Row({ space: 10 }) {
              Radio({ value: IconPackService.defaultPackKey(), group: 'active-icon-pack' })
                .checked(this.activeIconPackKey === IconPackService.defaultPackKey())
                .onChange((checked: boolean) => { if (checked) this.selectIconPack(IconPackService.defaultPackKey()); })
              Column({ space: 2 }) {
                Text('内置字母图标').fontSize(15).fontWeight(FontWeight.Medium)
                Text('没有匹配图片时始终可用').fontSize(12).fontColor('#778191')
              }.alignItems(HorizontalAlign.Start).layoutWeight(1)
            }.width('100%').padding(12).backgroundColor('#F5F7FA').borderRadius(12)
            ForEach(this.iconPacks, (pack: IconPack) => {
              Row({ space: 10 }) {
                Radio({ value: IconPackService.packKey(pack), group: 'active-icon-pack' })
                  .checked(this.activeIconPackKey === IconPackService.packKey(pack))
                  .onChange((checked: boolean) => { if (checked) this.selectIconPack(IconPackService.packKey(pack)); })
                Column({ space: 3 }) {
                  Text(pack.name).fontSize(15).fontWeight(FontWeight.Medium)
                  Text(`${pack.icons.length} 个图标 · v${pack.version}`).fontSize(12).fontColor('#778191')
                }.alignItems(HorizontalAlign.Start).layoutWeight(1)
              }.width('100%').padding(12).backgroundColor('#F5F7FA').borderRadius(12)
            }, (pack: IconPack) => pack.directory)
            Divider().color('#E5E8EE')
            Row() {
              Column({ space: 2 }) {
                Text('已安装图标包').fontSize(14).fontWeight(FontWeight.Medium)
                Text(`${this.iconPacks.length} 个`).fontSize(12).fontColor('#778191')
              }.alignItems(HorizontalAlign.Start).layoutWeight(1)
              Button('安装 ZIP').backgroundColor('#4668E8').onClick(async () => {
                try {
                  const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
                  const count = await IconPackService.chooseAndImport(context);
                  this.iconPacks = await IconPackService.list(context);
                  if (count > 0) this.showToast(`已安装 ${count} 个图标包`, 2000);
                } catch (error) {
                  this.showToast((error as Error).message, 3000);
                }
              })
            }.width('100%')
            ForEach(this.iconPacks, (pack: IconPack) => {
              Row({ space: 10 }) {
                Text(pack.name).fontSize(14).layoutWeight(1)
                Button('删除').backgroundColor('#FBECEF').fontColor('#A33143')
                  .onClick(() => this.removeIconPack(pack))
              }.width('100%')
            }, (pack: IconPack) => pack.directory)
          }
        }.alignItems(HorizontalAlign.Start).width('calc(100% - 32vp)')
          .padding(18).margin({ left: 16, right: 16 }).backgroundColor(Color.White).borderRadius(18)

        Column({ space: 14 }) {
          Column({ space: 4 }) {
            Text('加密备份').fontSize(17).fontWeight(FontWeight.Medium).width('100%')
            Text('备份包含 OTP 密钥及 Steam 会话信息，只能使用设定的密码解密。')
              .fontSize(13).fontColor('#687383').lineHeight(20).width('100%')
          }.alignItems(HorizontalAlign.Start).width('100%')
          Row({ space: 10 }) {
            Button('导出备份').layoutWeight(1).backgroundColor('#4668E8')
              .onClick(() => this.openBackupExport())
            Button('导入备份').layoutWeight(1).backgroundColor('#E9EDF3').fontColor('#243148')
              .onClick(() => this.chooseBackupImport())
          }.width('100%')
          if (this.backupMode === 1) {
            Divider().color('#E5E8EE')
            Text('设置备份密码').fontSize(15).fontWeight(FontWeight.Medium).width('100%')
            TextInput({ placeholder: '至少 8 个字符', text: this.backupPassword })
              .type(InputType.Password).onChange((value: string) => this.backupPassword = value)
            TextInput({ placeholder: '再次输入密码', text: this.backupConfirmPassword })
              .type(InputType.Password).onChange((value: string) => this.backupConfirmPassword = value)
            Row({ space: 10 }) {
              Button('取消').layoutWeight(1).backgroundColor('#E9EDF3').fontColor('#243148')
                .onClick(() => this.resetBackupPanel())
              Button(this.backupBusy ? '正在加密…' : '选择位置并导出').layoutWeight(1)
                .backgroundColor('#243148').enabled(!this.backupBusy)
                .onClick(() => this.exportEncryptedBackup())
            }.width('100%')
          } else if (this.backupMode === 2) {
            Divider().color('#E5E8EE')
            Text('已选择加密备份文件').fontSize(14).fontColor('#287A52').width('100%')
            TextInput({ placeholder: '输入备份密码', text: this.backupPassword })
              .type(InputType.Password).onChange((value: string) => this.backupPassword = value)
            Text('相同 UUID 的 Token 会更新，不同 UUID 的 Token 会追加。')
              .fontSize(12).fontColor('#778191').lineHeight(18).width('100%')
            Row({ space: 10 }) {
              Button('取消').layoutWeight(1).backgroundColor('#E9EDF3').fontColor('#243148')
                .onClick(() => this.resetBackupPanel())
              Button(this.backupBusy ? '正在解密…' : '解密并恢复').layoutWeight(1)
                .backgroundColor('#243148').enabled(!this.backupBusy)
                .onClick(() => this.importEncryptedBackup())
            }.width('100%')
          }
        }.alignItems(HorizontalAlign.Start).width('calc(100% - 32vp)')
          .padding(18).margin({ left: 16, right: 16 }).backgroundColor(Color.White).borderRadius(18)

        Column({ space: 6 }) {
          Text('本机数据保护').fontSize(15).fontWeight(FontWeight.Medium).width('100%')
          Text('Token 数据使用系统安全主密钥和 AES-256-GCM 加密保存。应用不会启用系统自动备份。')
            .fontSize(13).fontColor('#687383').lineHeight(20).width('100%')
        }.alignItems(HorizontalAlign.Start).width('calc(100% - 32vp)')
          .padding(18).margin({ left: 16, right: 16, bottom: 18 })
          .backgroundColor('#EFF5FA').borderRadius(18)
      }.width('100%').alignItems(HorizontalAlign.Start).justifyContent(FlexAlign.Start)
    }.height('100%').width('100%').align(Alignment.TopStart).scrollBar(BarState.Off)
  }

  @Builder
  private detailView() {
    Scroll() {
      Column({ space: 14 }) {
        Row({ space: 10 }) {
          Button('‹').type(ButtonType.Circle).width(38).height(38).fontSize(24).backgroundColor('#E9EDF3')
            .fontColor('#243148').onClick(() => this.view = AppView.TOKENS)
          Column({ space: 3 }) {
            Text('Token 详情').fontSize(26).fontWeight(FontWeight.Bold)
            Text('编辑账户与验证参数').fontSize(13).fontColor('#687383')
          }.alignItems(HorizontalAlign.Start).layoutWeight(1)
          if (this.issuer.trim().toLowerCase() === 'steam') {
            Button('⋮').type(ButtonType.Circle).width(40).height(40).fontSize(23)
              .backgroundColor('#E9EDF3').fontColor('#243148')
              .bindMenu([
                {
                  value: this.steamQrLoading ? '正在处理扫码登录…' : '扫码登录',
                  enabled: !this.steamQrLoading,
                  action: () => this.scanSteamQrLogin()
                },
                {
                  value: '确认列表',
                  action: () => this.openSteamToken(this.selectedSteamIndex, AppView.DETAIL)
                }
              ], { placement: Placement.BottomRight })
          }
        }.width('100%').padding({ left: 18, right: 18, top: 18, bottom: 6 })
        Column({ space: 12 }) {
          Text('通用信息').fontSize(17).fontWeight(FontWeight.Bold).width('100%')
          TextInput({ placeholder: 'Issuer', text: this.issuer }).onChange((value: string) => this.issuer = value)
          TextInput({ placeholder: '账户', text: this.account }).onChange((value: string) => this.account = value)
          TextInput({ placeholder: 'Base32 密钥', text: this.secret }).type(InputType.Password)
            .onChange((value: string) => this.secret = value)
          if (this.issuer.trim().toLowerCase() !== 'steam') {
            Row({ space: 10 }) {
              Button('6 位').layoutWeight(1).backgroundColor(this.digits === 6 ? '#4668E8' : '#EEF1F6')
                .fontColor(this.digits === 6 ? Color.White : '#4C5868').onClick(() => this.digits = 6)
              Button('8 位').layoutWeight(1).backgroundColor(this.digits === 8 ? '#4668E8' : '#EEF1F6')
                .fontColor(this.digits === 8 ? Color.White : '#4C5868').onClick(() => this.digits = 8)
            }.width('100%')
            TextInput({ placeholder: '刷新周期（秒）', text: this.periodValue }).type(InputType.Number)
              .onChange((value: string) => this.periodValue = value)
          }
        }.padding(18).margin({ left: 16, right: 16 }).backgroundColor(Color.White).borderRadius(18)
        if (this.issuer.trim().toLowerCase() === 'steam') {
          Column({ space: 12 }) {
            Text('Steam 元信息').fontSize(17).fontWeight(FontWeight.Bold).width('100%')
            TextInput({ placeholder: 'Steam ID', text: this.steamId }).onChange((value: string) => this.steamId = value)
            TextInput({ placeholder: 'Access Token', text: this.steamAccessToken }).type(InputType.Password)
              .onChange((value: string) => this.steamAccessToken = value)
            TextInput({ placeholder: 'Identity Secret', text: this.steamIdentitySecret }).type(InputType.Password)
              .onChange((value: string) => this.steamIdentitySecret = value)
            TextInput({ placeholder: 'Device ID', text: this.steamDeviceId })
              .onChange((value: string) => this.steamDeviceId = value)
            Column({ space: 8 }) {
              Row() {
                Text('Token 有效期').fontSize(15).fontWeight(FontWeight.Medium).layoutWeight(1)
                Button('?').type(ButtonType.Circle).width(30).height(30).fontSize(15)
                  .backgroundColor('#DDE8F2').fontColor('#183C63')
                  .onClick(() => this.showSteamTokenHelp = true)
                  .bindSheet(this.showSteamTokenHelp, this.steamTokenHelpSheet(), {
                    height: 440,
                    preferType: SheetType.BOTTOM,
                    dragBar: true,
                    title: { title: 'Steam Token 是什么？' },
                    // 显式同步系统手势关闭后的状态，避免依赖 IDE 无法识别的 $$ 双向绑定宏。
                    onDisappear: () => this.showSteamTokenHelp = false
                  })
              }.width('100%').alignItems(VerticalAlign.Center)
              Text('Steam 会话有效期').fontSize(14).fontWeight(FontWeight.Medium).width('100%')
              Text(SteamGuardService.tokenStatus(this.currentSteamRefreshToken()))
                .fontSize(12).fontColor('#31445A').width('100%')
              Text('由 Refresh Token 决定，与上游 Authenticator 的显示规则一致；到期后通常需要重新登录。')
                .fontSize(11).fontColor('#687383').lineHeight(17).width('100%')
              Divider().color('#DDE4EC')
              Text('Access Token 有效期').fontSize(13).fontWeight(FontWeight.Medium).width('100%')
              Text(SteamGuardService.tokenStatus(this.steamAccessToken))
                .fontSize(12).fontColor('#687383').width('100%')
              Text('这是短期访问凭据，过期后可由仍然有效的 Refresh Token 自动更新。')
                .fontSize(11).fontColor('#687383').lineHeight(17).width('100%')
              if (this.currentSteamRefreshToken().length > 0) {
                Button(this.steamRefreshingSession ? '正在更新…' : '更新 Access Token')
                  .enabled(!this.steamRefreshingSession).backgroundColor('#E9F0F7').fontColor('#183C63')
                  .width('100%').onClick(() => this.refreshSteamSession())
              } else {
                Text('没有 Refresh Token，无法自动更新。请重新导入会话或登录。')
                  .fontSize(12).fontColor('#A36A24').width('100%')
              }
            }.width('100%').padding(12).backgroundColor('#F4F7FA').borderRadius(12)
            Column({ space: 8 }) {
              Text('重新认证整套会话').fontSize(14).fontWeight(FontWeight.Medium).width('100%')
              Text('密码只用于本次登录，不会保存；Steam Guard 验证码由当前 Token 自动提交。')
                .fontSize(12).fontColor('#687383').lineHeight(18).width('100%')
              TextInput({ placeholder: 'Steam 账户密码', text: this.steamLoginPassword }).type(InputType.Password)
                .onChange((value: string) => this.steamLoginPassword = value)
              Button(this.steamRefreshingSession ? '正在登录…' : '重新登录并更新元信息').width('100%')
                .enabled(!this.steamRefreshingSession && this.steamLoginPassword.length > 0)
                .backgroundColor('#183C63').onClick(() => this.reauthenticateSteam())
            }.width('100%').padding(12).backgroundColor('#F4F7FA').borderRadius(12)
            Row() {
              Text('从 maFile / JSON 导入').fontSize(15).fontWeight(FontWeight.Medium).layoutWeight(1)
              Text(this.steamImportExpanded ? '⌃' : '⌄').fontSize(22).fontColor('#687383')
            }.width('100%').onClick(() => this.steamImportExpanded = !this.steamImportExpanded)
            if (this.steamImportExpanded) {
              TextArea({ placeholder: '粘贴 maFile 或 JSON 文本', text: this.steamJsonText }).height(110)
                .onChange((value: string) => this.steamJsonText = value)
              Row({ space: 10 }) {
                Button('选择文件').layoutWeight(1).backgroundColor('#E9F0F7').fontColor('#183C63')
                  .onClick(() => this.pickSteamFile())
                Button('导入文本').layoutWeight(1).backgroundColor('#4668E8')
                  .enabled(this.steamJsonText.trim().length > 0).onClick(() => this.importSteamText(this.steamJsonText))
              }.width('100%')
            }
          }.padding(18).margin({ left: 16, right: 16 }).backgroundColor(Color.White).borderRadius(18)
        }
        if (this.errorMessage.length > 0) {
          Text(this.errorMessage).fontSize(13).fontColor('#B42335').margin({ left: 18, right: 18 }).width('100%')
        }
        Button('保存修改').margin({ left: 16, right: 16 }).width('calc(100% - 32vp)').backgroundColor('#4668E8')
          .onClick(() => this.saveTokenDetail())
      }.width('100%').padding({ bottom: 24 }).justifyContent(FlexAlign.Start)
    }.width('100%').height('100%').align(Alignment.TopStart)
  }

  @Builder
  private steamView() {
    Scroll() {
      Column({ space: 14 }) {
        Row({ space: 10 }) {
          Button('‹').type(ButtonType.Circle).width(38).height(38).fontSize(24).backgroundColor('#E9EDF3')
            .fontColor('#243148').onClick(() => this.view = this.steamReturnView)
          Column({ space: 3 }) {
            Text('Steam 移动确认').fontSize(26).fontWeight(FontWeight.Bold)
            Text(this.selectedSteamIndex >= 0 ? this.tokens[this.selectedSteamIndex].account : '')
              .fontSize(13).fontColor('#687383')
          }.alignItems(HorizontalAlign.Start).layoutWeight(1)
          Button() {
            SymbolGlyph($r('sys.symbol.arrow_clockwise')).fontSize(22).fontColor([Color.White])
          }.type(ButtonType.Circle).width(40).height(40).backgroundColor('#183C63')
            .enabled(!this.steamLoading).onClick(() => this.requestSteamConfirmations())
        }.width('100%').padding({ left: 18, right: 18, top: 18, bottom: 6 })
        if (this.steamLoading) {
          Column({ space: 10 }) {
            LoadingProgress().width(36).height(36).color('#4668E8')
            Text('正在获取待确认操作…').fontSize(14).fontColor('#687383')
          }.width('100%').padding(30)
        }
        if (!this.steamLoading && this.steamHasLoaded && this.steamConfirmations.length === 0) {
          Column({ space: 8 }) {
            Text('✓').fontSize(34).fontColor('#3C8C68')
            Text('没有待确认操作').fontSize(17).fontWeight(FontWeight.Medium)
            Text(`Steam 已成功响应${this.steamLastRefresh.length > 0 ? ` · ${this.steamLastRefresh}` : ''}`)
              .fontSize(12).fontColor('#778191')
          }.width('100%').padding(24)
        }
        ForEach(this.steamConfirmations, (confirmation: SteamConfirmation) => {
          Column({ space: 6 }) {
            Text(confirmation.headline || confirmation.typeName || 'Steam 确认')
              .fontSize(16).fontWeight(FontWeight.Medium).width('100%')
            Text(confirmation.summary.join(', ')).fontSize(13).fontColor('#687383').width('100%')
            if (confirmation.creationTime > 0) {
              Text(new Date(confirmation.creationTime * 1000).toLocaleString()).fontSize(11).fontColor('#929BA8')
            }
            Row({ space: 10 }) {
              Button('拒绝').layoutWeight(1).backgroundColor('#FBECEF').fontColor('#A33143')
                .onClick(() => this.respondToSteamConfirmation(confirmation, false))
              Button('批准').layoutWeight(1).backgroundColor('#183C63')
                .onClick(() => this.respondToSteamConfirmation(confirmation, true))
            }.width('100%').margin({ top: 6 })
          }.alignItems(HorizontalAlign.Start).padding(16).margin({ left: 16, right: 16 })
            .backgroundColor(Color.White).borderRadius(16)
        }, (confirmation: SteamConfirmation) => confirmation.id)
      }.width('100%').padding({ bottom: 24 }).justifyContent(FlexAlign.Start)
    }.width('100%').height('100%').align(Alignment.TopStart)
  }

  @Builder
  private bottomBar() {
    Row() {
      Button('验证码').layoutWeight(1).backgroundColor(Color.Transparent)
        .fontColor(this.view === AppView.TOKENS || this.view === AppView.STEAM ? '#4668E8' : '#687383')
        .onClick(() => this.view = AppView.TOKENS)
      Button('设置').layoutWeight(1).backgroundColor(Color.Transparent)
        .fontColor(this.view === AppView.SETTINGS ? '#4668E8' : '#687383')
        .onClick(() => this.view = AppView.SETTINGS)
    }.height(62).padding({ left: 10, right: 10 }).backgroundColor(Color.White)
      .border({ width: { top: 1 }, color: '#E7EAF0' })
  }

  build() {
    Column() {
      Stack() {
        if (this.view === AppView.TOKENS) this.tokenList()
        if (this.view === AppView.ADD) this.addView()
        if (this.view === AppView.SETTINGS) this.settingsView()
        if (this.view === AppView.STEAM) this.steamView()
        if (this.view === AppView.DETAIL) this.detailView()
        if (this.view === AppView.ICON_PICKER && this.iconPickerIndex >= 0 &&
          this.iconPickerIndex < this.tokens.length) {
          TokenIconPicker({
            issuer: this.tokens[this.iconPickerIndex].issuer,
            currentPath: this.tokens[this.iconPickerIndex].iconManual === true ?
              this.tokens[this.iconPickerIndex].iconPath : '',
            packs: this.iconPacks,
            onConfirm: (path: string): void => { this.applyManualIcon(path); },
            onClose: (): void => { this.view = AppView.TOKENS; }
          })
        }
      }.layoutWeight(1).width('100%')
      if (this.view === AppView.TOKENS || this.view === AppView.SETTINGS) this.bottomBar()
    }.width('100%').height('100%').backgroundColor('#F5F7FA')
  }
}
