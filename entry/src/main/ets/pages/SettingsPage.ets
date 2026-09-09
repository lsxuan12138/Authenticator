import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { StoredToken } from '../domain/Token';
import { IconPack, IconPackService } from '../services/IconPackService';
import { BackupMergeResult, BackupService } from '../services/BackupService';
import { DiagnosticLogService, DiagnosticLogStats } from '../services/DiagnosticLogService';
import { AppSettingsService } from '../services/AppSettingsService';
import { APP_ACTIVE_ICON_PACK_KEY, APP_ICON_PACKS_KEY, APP_TOKENS_KEY, AppStore } from '../data/AppStore';
import { Localization } from '../core/Localization';

/** 设置页作为根 HdsTabs 的一级页签，只接收跨页面共享的数据。 */
@Component
export struct SettingsPage {
  @StorageLink(APP_TOKENS_KEY) tokens: StoredToken[] = [];
  @StorageLink(APP_ICON_PACKS_KEY) iconPacks: IconPack[] = [];
  @StorageLink(APP_ACTIVE_ICON_PACK_KEY) activeIconPackKey: string = IconPackService.noPackKey();
  onTokensChanged: (tokens: StoredToken[]) => Promise<void> = async (_tokens: StoredToken[]): Promise<void> => {};
  onIconPacksChanged: (packs: IconPack[]) => void = (_packs: IconPack[]): void => {};
  onActiveIconPackChanged: (key: string) => void = (_key: string): void => {};

  @State private iconPackManagementExpanded: boolean = false;
  @State private backupMode: number = 0;
  @State private backupPassword: string = '';
  @State private backupConfirmPassword: string = '';
  @State private backupImportContent: string = '';
  @State private backupBusy: boolean = false;
  @State private diagnosticLogBytes: number = 0;
  @State private diagnosticLogFiles: number = 0;
  @State private diagnosticLogBusy: boolean = false;
  @State private screenshotProtectionEnabled: boolean = false;
  @State private screenshotProtectionBusy: boolean = false;

  /** 设置页出现时刷新图标包、备份面板、安全开关和日志统计。 */
  aboutToAppear(): void {
    this.refreshDiagnosticLogStats();
    this.loadScreenshotProtection();
  }

  /** 显示设置操作结果，UIContext 异常时记录诊断日志。 */
  private showToast(message: string, duration: number = 2000): void {
    try {
      this.getUIContext().getPromptAction().showToast({ message: message, duration: duration });
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('Settings', `Failed to show toast: ${detail.message ?? message}`);
    }
  }

  /** 读取命令式对话框和 Toast 使用的当前语言文本。 */
  private localized(resource: Resource, ...args: Array<string | number>): string {
    const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
    return Localization.text(context, resource, args);
  }

  /** 把结构化服务错误转换成当前语言，未知异常使用当前操作的通用提示。 */
  private localizedError(error: Object, fallback: Resource): string {
    const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
    return Localization.error(context, error, fallback);
  }

  /** 根据活动键解析当前图标包名称，默认模式返回明确标签。 */
  private currentIconPackName(): string {
    if (this.activeIconPackKey === IconPackService.noPackKey()) {
      return this.localized($r('app.string.settings_default_icons'));
    }
    return this.iconPacks.find((pack: IconPack) => IconPackService.packKey(pack) === this.activeIconPackKey)?.name ??
      this.localized($r('app.string.settings_default_icons'));
  }

  /** 保存活动图标包并通知首页重新计算自动图标。 */
  private async selectIconPack(key: string): Promise<void> {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      await IconPackService.selectPack(context, key);
      this.activeIconPackKey = key;
      this.onActiveIconPackChanged(key);
    } catch (error) {
      this.showToast(this.localizedError(error as Object, $r('app.string.error_icon_pack_operation_failed')), 3000);
    }
  }

  /** 选择并安装 ZIP 图标包，完成后刷新管理列表。 */
  private async installIconPack(): Promise<void> {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      const count = await IconPackService.chooseAndImport(context);
      this.iconPacks = await IconPackService.list(context);
      this.onIconPacksChanged(this.iconPacks);
      if (count > 0) {
        this.showToast(this.localized($r('app.string.settings_icon_packs_installed'), count), 2000);
      }
    } catch (error) {
      this.showToast(this.localizedError(error as Object, $r('app.string.error_icon_pack_operation_failed')), 3000);
    }
  }

  /** 卸载图标包，并清理引用该目录的手动图标与活动选择。 */
  private async removeIconPack(pack: IconPack): Promise<void> {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      const nextTokens = this.tokens.map((token: StoredToken): StoredToken => {
        if (token.iconManual === true && token.iconPath.startsWith(`file://${pack.directory}/`)) {
          return {
            id: token.id, issuer: token.issuer, account: token.account, secret: token.secret,
            digits: token.digits, period: token.period, kind: token.kind, algorithm: token.algorithm,
            iconPath: '', iconManual: false, createdAt: token.createdAt, steam: token.steam
          };
        }
        return token;
      });
      // 先清除 Token 对包内文件的引用，再删除目录；失败时不会留下指向已删除文件的持久化路径。
      await this.onTokensChanged(nextTokens);
      this.tokens = nextTokens;
      if (this.activeIconPackKey === IconPackService.packKey(pack)) {
        await IconPackService.selectPack(context, IconPackService.noPackKey());
        this.activeIconPackKey = IconPackService.noPackKey();
        this.onActiveIconPackChanged(this.activeIconPackKey);
      }
      await IconPackService.remove(context, pack);
      this.iconPacks = await IconPackService.list(context);
      this.onIconPacksChanged(this.iconPacks);
      this.showToast(this.localized($r('app.string.settings_icon_deleted')), 1800);
    } catch (error) {
      this.showToast(this.localizedError(error as Object, $r('app.string.error_icon_pack_operation_failed')), 3000);
    }
  }

  /** 关闭备份操作并清空密码、确认密码和待导入内容。 */
  private resetBackupPanel(): void {
    this.backupMode = 0;
    this.backupPassword = '';
    this.backupConfirmPassword = '';
    this.backupImportContent = '';
    this.backupBusy = false;
  }

  /** 选择加密备份文件并切换到密码输入恢复模式。 */
  private async chooseBackupImport(): Promise<void> {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      const content = await BackupService.pickFile(context);
      if (!content) return;
      this.resetBackupPanel();
      this.backupImportContent = content;
      this.backupMode = 2;
    } catch (error) {
      DiagnosticLogService.error('Backup', `Select import file failed: ${(error as Error).message}`);
      this.showToast(this.localizedError(error as Object, $r('app.string.error_backup_operation_failed')), 3000);
    }
  }

  /** 校验两次密码后创建并保存应用加密备份。 */
  private async exportEncryptedBackup(): Promise<void> {
    if (this.backupPassword !== this.backupConfirmPassword) {
      this.showToast(this.localized($r('app.string.settings_password_mismatch')), 2200);
      return;
    }
    this.backupBusy = true;
    try {
      const content = await BackupService.create(this.tokens, this.backupPassword);
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      const saved = await BackupService.saveFile(context, content);
      if (!saved) return;
      const count = this.tokens.length;
      this.resetBackupPanel();
      DiagnosticLogService.info('Backup', `Encrypted backup exported, count=${count}`);
      this.showToast(this.localized($r('app.string.settings_tokens_exported'), count), 2200);
    } catch (error) {
      this.backupBusy = false;
      DiagnosticLogService.error('Backup', `Export failed: ${(error as Error).message}`);
      this.showToast(this.localizedError(error as Object, $r('app.string.error_backup_operation_failed')), 3200);
    }
  }

  /** 解密备份、按 UUID/配置去重合并，并提交新的 Token 数组。 */
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
      await this.onTokensChanged(result.tokens);
      this.tokens = result.tokens;
      this.resetBackupPanel();
      DiagnosticLogService.info('Backup',
        `Encrypted backup restored, added=${result.added}, updated=${result.updated}, skipped=${result.skipped}`);
      this.showToast(this.localized($r('app.string.settings_restore_complete'),
        result.added, result.updated, result.skipped), 3000);
    } catch (error) {
      this.backupBusy = false;
      DiagnosticLogService.error('Backup', `Restore failed: ${(error as Error).message}`);
      this.showToast(this.localizedError(error as Object, $r('app.string.error_backup_operation_failed')), 3500);
    }
  }

  /** 从设置服务读取当前防截屏开关用于初始化 UI。 */
  private async loadScreenshotProtection(): Promise<void> {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      this.screenshotProtectionEnabled = await AppSettingsService.getScreenshotProtectionEnabled(context);
    } catch (error) {
      DiagnosticLogService.error('Privacy', `Failed to load app settings: ${(error as Error).message}`);
    }
  }

  /** 同时更新当前窗口和持久化设置，失败时恢复原开关状态。 */
  private async updateScreenshotProtection(enabled: boolean): Promise<void> {
    // 进入页面恢复持久化状态时，Toggle 也可能触发 onChange；相同值不是用户修改，无需重复应用或提示。
    if (enabled === this.screenshotProtectionEnabled) return;
    if (this.screenshotProtectionBusy) return;
    const previous = this.screenshotProtectionEnabled;
    this.screenshotProtectionEnabled = enabled;
    this.screenshotProtectionBusy = true;
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      await AppSettingsService.applyToCurrentWindow(context, enabled);
      await AppSettingsService.setScreenshotProtection(context, enabled);
      DiagnosticLogService.info('Privacy', `Screenshot protection changed, enabled=${enabled}`);
      this.showToast(this.localized(enabled ? $r('app.string.settings_screenshot_on') :
        $r('app.string.settings_screenshot_off')), 1800);
    } catch (error) {
      this.screenshotProtectionEnabled = previous;
      DiagnosticLogService.error('Privacy', `Failed to change screenshot protection: ${(error as Error).message}`);
      try {
        const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        await AppSettingsService.applyToCurrentWindow(context, previous);
      } catch (rollbackError) {
        DiagnosticLogService.error('Privacy', `Failed to roll back screenshot protection: ${(rollbackError as Error).message}`);
      }
      this.showToast(this.localizedError(error as Object, $r('app.string.error_settings_operation_failed')), 3000);
    } finally {
      this.screenshotProtectionBusy = false;
    }
  }

  /** 重新读取日志文件数量和字节数，更新设置页摘要。 */
  private refreshDiagnosticLogStats(): void {
    const stats: DiagnosticLogStats = DiagnosticLogService.stats();
    this.diagnosticLogBytes = stats.bytes;
    this.diagnosticLogFiles = stats.files;
  }

  /** 将日志字节数格式化为适合界面显示的 KB/MB 文本。 */
  private diagnosticLogSize(): string {
    if (this.diagnosticLogBytes < 1024) return `${this.diagnosticLogBytes} B`;
    return `${(this.diagnosticLogBytes / 1024).toFixed(1)} KB`;
  }

  /** 经隐私提示确认后导出脱敏诊断日志。 */
  private async exportDiagnosticLogs(): Promise<void> {
    this.diagnosticLogBusy = true;
    try {
      const dialog = await this.getUIContext().getPromptAction().showDialog({
        title: this.localized($r('app.string.settings_export_logs_title')),
        message: this.localized($r('app.string.settings_export_logs_message')),
        alignment: DialogAlignment.Bottom,
        buttons: [
          { text: this.localized($r('app.string.common_cancel')), color: $r('app.color.text_tertiary') },
          { text: this.localized($r('app.string.settings_choose_export_location')),
            color: $r('app.color.brand_strong') }
        ]
      });
      if (dialog.index !== 1) return;
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      const exported = await DiagnosticLogService.export(context);
      this.refreshDiagnosticLogStats();
      if (exported) this.showToast(this.localized($r('app.string.settings_logs_exported')), 2000);
    } catch (error) {
      DiagnosticLogService.error('Diagnostics', `Export failed: ${(error as Error).message}`);
      this.showToast(this.localizedError(error as Object, $r('app.string.error_log_operation_failed')), 3000);
    } finally {
      this.diagnosticLogBusy = false;
    }
  }

  /** 二次确认后清除应用沙箱内的诊断日志分片。 */
  private async clearDiagnosticLogs(): Promise<void> {
    this.diagnosticLogBusy = true;
    try {
      const dialog = await this.getUIContext().getPromptAction().showDialog({
        title: this.localized($r('app.string.settings_clear_logs_title')),
        message: this.localized($r('app.string.settings_clear_logs_message')),
        alignment: DialogAlignment.Bottom,
        buttons: [
          { text: this.localized($r('app.string.common_cancel')), color: $r('app.color.text_tertiary') },
          { text: this.localized($r('app.string.common_clear')), color: $r('app.color.danger') }
        ]
      });
      if (dialog.index !== 1) return;
      DiagnosticLogService.clear();
      this.refreshDiagnosticLogStats();
      this.showToast(this.localized($r('app.string.settings_logs_cleared')), 1800);
    } catch (error) {
      DiagnosticLogService.error('Diagnostics', `Clear failed: ${(error as Error).message}`);
      this.showToast(this.localizedError(error as Object, $r('app.string.error_log_operation_failed')), 3000);
    } finally {
      this.diagnosticLogBusy = false;
    }
  }

  /** 构建设置页标题和用途说明。 */
  @Builder
  private header() {
    Column({ space: 4 }) {
      Text($r('app.string.settings_title')).fontSize(30).fontWeight(FontWeight.Bold)
        .fontColor($r('app.color.text_primary'))
      Text($r('app.string.settings_subtitle')).fontSize(14).fontColor($r('app.color.text_tertiary'))
    }.alignItems(HorizontalAlign.Start).width('100%').padding({ left: 18, right: 18, top: 20, bottom: 8 })
  }

  /** 渲染单个已安装图标包的选择和删除操作。 */
  @Builder
  private installedIconPackRow(pack: IconPack) {
    Row({ space: 10 }) {
      Radio({ value: IconPackService.packKey(pack), group: 'active-icon-pack' })
        .checked(this.activeIconPackKey === IconPackService.packKey(pack))
        .onChange((checked: boolean) => {
          if (checked) this.selectIconPack(IconPackService.packKey(pack));
        })
      Column({ space: 3 }) {
        Row({ space: 8 }) {
          Text(pack.name).fontSize(15).fontWeight(FontWeight.Medium).maxLines(1)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
          if (this.activeIconPackKey === IconPackService.packKey(pack)) {
            Text($r('app.string.settings_in_use')).fontSize(11).fontColor($r('app.color.brand_strong'))
              .padding({ left: 7, right: 7, top: 3, bottom: 3 })
              .backgroundColor($r('app.color.brand_surface_alt')).borderRadius(8)
          }
        }.width('100%')
        Text($r('app.string.settings_icon_pack_summary', pack.icons.length, pack.version)).fontSize(12)
          .fontColor($r('app.color.text_muted'))
      }.alignItems(HorizontalAlign.Start).layoutWeight(1)
      Button() {
        SymbolGlyph($r('sys.symbol.trash')).fontSize(19).fontColor([$r('app.color.danger')])
      }
      .width(40)
      .height(40)
      .borderRadius(20)
      .backgroundColor($r('app.color.danger_surface'))
      .accessibilityText($r('app.string.settings_delete_icon_pack_accessibility', pack.name))
      .onClick(() => this.removeIconPack(pack))
    }
    .width('100%')
    .padding(12)
    .backgroundColor(this.activeIconPackKey === IconPackService.packKey(pack) ?
      $r('app.color.brand_surface') : $r('app.color.surface_subtle'))
    .borderRadius(12)
  }

  /** 构建可折叠的图标包安装、选择与管理卡片。 */
  @Builder
  private iconPackCard() {
    Column({ space: 14 }) {
      Row() {
        Column({ space: 3 }) {
          Text($r('app.string.settings_icon_style')).fontSize(13).fontColor($r('app.color.text_muted'))
          Text(this.currentIconPackName()).fontSize(17).fontWeight(FontWeight.Medium)
        }.alignItems(HorizontalAlign.Start).layoutWeight(1)
        Button(this.iconPackManagementExpanded ? $r('app.string.common_collapse') : $r('app.string.common_manage'))
          .backgroundColor($r('app.color.surface_muted')).fontColor($r('app.color.text_secondary'))
          .onClick(() => this.iconPackManagementExpanded = !this.iconPackManagementExpanded)
      }.width('100%')
      Text($r('app.string.settings_icon_hint'))
        .fontSize(12).fontColor($r('app.color.text_tertiary')).lineHeight(18).width('100%')
      if (this.iconPackManagementExpanded) {
        Divider().color($r('app.color.divider'))
        Row() {
          Text($r('app.string.settings_installed_icon_packs', this.iconPacks.length))
            .fontSize(14).layoutWeight(1)
          Button($r('app.string.settings_install_zip')).backgroundColor('#4668E8')
            .onClick(() => this.installIconPack())
        }.width('100%')
        Row({ space: 10 }) {
          Radio({ value: IconPackService.noPackKey(), group: 'active-icon-pack' })
            .checked(this.activeIconPackKey === IconPackService.noPackKey())
            .onChange((checked: boolean) => {
              if (checked) this.selectIconPack(IconPackService.noPackKey());
            })
          Column({ space: 2 }) {
            Row({ space: 8 }) {
              Text($r('app.string.settings_default_icons')).fontSize(15).fontWeight(FontWeight.Medium)
              if (this.activeIconPackKey === IconPackService.noPackKey()) {
                Text($r('app.string.settings_in_use')).fontSize(11).fontColor($r('app.color.brand_strong'))
                  .padding({ left: 7, right: 7, top: 3, bottom: 3 })
                  .backgroundColor($r('app.color.brand_surface_alt')).borderRadius(8)
              }
            }.width('100%')
            Text($r('app.string.settings_default_icon_hint')).fontSize(12).fontColor($r('app.color.text_muted'))
          }.alignItems(HorizontalAlign.Start).layoutWeight(1)
        }
        .width('100%')
        .padding(12)
        .backgroundColor(this.activeIconPackKey === IconPackService.noPackKey() ?
          $r('app.color.brand_surface') : $r('app.color.surface_subtle'))
        .borderRadius(12)
        ForEach(this.iconPacks, (pack: IconPack) => {
          this.installedIconPackRow(pack)
        }, (pack: IconPack) => pack.directory)
      }
    }.alignItems(HorizontalAlign.Start).width('calc(100% - 32vp)').padding(18)
      .margin({ left: 16, right: 16 }).backgroundColor($r('app.color.surface')).borderRadius(18)
      .border({ width: 1, color: $r('app.color.border') })
  }

  /** 构建加密导出/恢复模式及密码输入区域。 */
  @Builder
  private backupCard() {
    Column({ space: 14 }) {
      Text($r('app.string.settings_encrypted_backup')).fontSize(17).fontWeight(FontWeight.Medium).width('100%')
      Text($r('app.string.settings_backup_hint'))
        .fontSize(13).fontColor($r('app.color.text_tertiary')).lineHeight(20).width('100%')
      Row({ space: 10 }) {
        Button($r('app.string.settings_export_backup')).layoutWeight(1).backgroundColor('#4668E8').onClick(() => {
          this.resetBackupPanel();
          this.backupMode = 1;
        })
        Button($r('app.string.settings_import_backup')).layoutWeight(1)
          .backgroundColor($r('app.color.surface_muted'))
          .fontColor($r('app.color.text_secondary')).onClick(() => this.chooseBackupImport())
      }.width('100%')
      if (this.backupMode === 1) {
        Divider().color($r('app.color.divider'))
        TextInput({ placeholder: $r('app.string.settings_password_min'), text: this.backupPassword })
          .type(InputType.Password).onChange((value: string) => this.backupPassword = value)
        TextInput({ placeholder: $r('app.string.settings_password_again'), text: this.backupConfirmPassword })
          .type(InputType.Password).onChange((value: string) => this.backupConfirmPassword = value)
        Row({ space: 10 }) {
          Button($r('app.string.common_cancel')).layoutWeight(1).backgroundColor($r('app.color.surface_muted'))
            .fontColor($r('app.color.text_secondary')).onClick(() => this.resetBackupPanel())
          Button(this.backupBusy ? $r('app.string.settings_encrypting') :
            $r('app.string.settings_choose_export')).layoutWeight(1)
            .backgroundColor($r('app.color.text_secondary')).enabled(!this.backupBusy)
            .onClick(() => this.exportEncryptedBackup())
        }.width('100%')
      } else if (this.backupMode === 2) {
        Divider().color($r('app.color.divider'))
        Text($r('app.string.settings_backup_selected')).fontSize(14)
          .fontColor($r('app.color.success')).width('100%')
        TextInput({ placeholder: $r('app.string.settings_backup_password'), text: this.backupPassword })
          .type(InputType.Password).onChange((value: string) => this.backupPassword = value)
        Text($r('app.string.settings_restore_rule'))
          .fontSize(12).fontColor($r('app.color.text_muted')).width('100%')
        Row({ space: 10 }) {
          Button($r('app.string.common_cancel')).layoutWeight(1).backgroundColor($r('app.color.surface_muted'))
            .fontColor($r('app.color.text_secondary')).onClick(() => this.resetBackupPanel())
          Button(this.backupBusy ? $r('app.string.settings_decrypting') :
            $r('app.string.settings_restore')).layoutWeight(1)
            .backgroundColor($r('app.color.text_secondary')).enabled(!this.backupBusy)
            .onClick(() => this.importEncryptedBackup())
        }.width('100%')
      }
    }.alignItems(HorizontalAlign.Start).width('calc(100% - 32vp)').padding(18)
      .margin({ left: 16, right: 16 }).backgroundColor($r('app.color.surface')).borderRadius(18)
      .border({ width: 1, color: $r('app.color.border') })
  }

  /** 组合图标包、备份、安全和诊断日志设置。 */
  build() {
    Scroll() {
      Column({ space: 14 }) {
        this.header()
        this.iconPackCard()
        this.backupCard()
        Column({ space: 10 }) {
          Row({ space: 12 }) {
            Column({ space: 4 }) {
              Text($r('app.string.settings_screenshot')).fontSize(17).fontWeight(FontWeight.Medium).width('100%')
              Text(this.screenshotProtectionEnabled ? $r('app.string.settings_enabled') :
                $r('app.string.settings_disabled')).fontSize(13)
                .fontColor($r('app.color.text_tertiary')).width('100%')
            }.alignItems(HorizontalAlign.Start).layoutWeight(1)
            Toggle({ type: ToggleType.Switch, isOn: this.screenshotProtectionEnabled })
              .selectedColor('#4668E8').enabled(!this.screenshotProtectionBusy)
              .onChange((isOn: boolean) => this.updateScreenshotProtection(isOn))
          }.width('100%')
          Text($r('app.string.settings_screenshot_hint'))
            .fontSize(12).fontColor($r('app.color.text_tertiary')).lineHeight(18).width('100%')
        }.alignItems(HorizontalAlign.Start).width('calc(100% - 32vp)').padding(18)
          .margin({ left: 16, right: 16 }).backgroundColor($r('app.color.surface')).borderRadius(18)
          .border({ width: 1, color: $r('app.color.border') })
        Column({ space: 12 }) {
          Text($r('app.string.settings_logs')).fontSize(17).fontWeight(FontWeight.Medium).width('100%')
          Text($r('app.string.settings_logs_summary', this.diagnosticLogFiles, this.diagnosticLogSize()))
            .fontSize(13).fontColor($r('app.color.text_tertiary')).width('100%')
          Text($r('app.string.settings_logs_hint'))
            .fontSize(12).fontColor($r('app.color.text_tertiary')).lineHeight(18).width('100%')
          Row({ space: 10 }) {
            Button(this.diagnosticLogBusy ? $r('app.string.common_processing') :
              $r('app.string.settings_export_logs')).layoutWeight(1)
              .backgroundColor('#4668E8').enabled(!this.diagnosticLogBusy)
              .onClick(() => this.exportDiagnosticLogs())
            Button($r('app.string.common_clear')).layoutWeight(1)
              .backgroundColor($r('app.color.danger_surface'))
              .fontColor($r('app.color.danger')).enabled(!this.diagnosticLogBusy && this.diagnosticLogBytes > 0)
              .onClick(() => this.clearDiagnosticLogs())
          }.width('100%')
        }.alignItems(HorizontalAlign.Start).width('calc(100% - 32vp)').padding(18)
          .margin({ left: 16, right: 16 }).backgroundColor($r('app.color.surface')).borderRadius(18)
          .border({ width: 1, color: $r('app.color.border') })
        Column({ space: 6 }) {
          Text($r('app.string.settings_local_protection')).fontSize(15)
            .fontWeight(FontWeight.Medium).width('100%')
          Text($r('app.string.settings_local_protection_hint'))
            .fontSize(13).fontColor($r('app.color.text_tertiary')).lineHeight(20).width('100%')
        }.alignItems(HorizontalAlign.Start).width('calc(100% - 32vp)').padding(18)
          .margin({ left: 16, right: 16 }).backgroundColor($r('app.color.brand_surface')).borderRadius(18)
      // 悬浮页签栏会覆盖滚动内容，为最后一张卡片保留完整的可滚动空间。
      }.width('100%').alignItems(HorizontalAlign.Start).padding({ bottom: 84 })
    }.height('100%').width('100%').align(Alignment.TopStart).scrollBar(BarState.Off)
      .backgroundColor($r('app.color.page_background'))
  }
}
