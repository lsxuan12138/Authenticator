import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { StoredToken } from '../domain/Token';
import { IconPack, IconPackService } from '../services/IconPackService';
import { BackupMergeResult, BackupService } from '../services/BackupService';
import { DiagnosticLogService, DiagnosticLogStats } from '../services/DiagnosticLogService';
import { AppSettingsService } from '../services/AppSettingsService';
import { APP_ACTIVE_ICON_PACK_KEY, APP_ICON_PACKS_KEY, APP_TOKENS_KEY, AppStore } from '../data/AppStore';
import { AppRoute, AppRouter } from '../navigation/AppRouter';

/** 系统路由表入口；设置结果通过 AppStorage 自动同步回首页。 */
@Builder
export function SettingsPageBuilder(_name: string, _param: ESObject) {
  NavDestination() {
    SettingsPage({
      onTokensChanged: (tokens: StoredToken[]): Promise<void> => AppStore.updateTokens(tokens),
      onIconPacksChanged: (packs: IconPack[]): void => AppStore.updateIconPacks(packs),
      onActiveIconPackChanged: (key: string): void => AppStore.updateActiveIconPack(key)
    })
  }.hideTitleBar(true).onShown(() => AppRouter.markCurrent(AppRoute.SETTINGS))
}

/** 设置页只接收跨页面共享的数据，其余交互状态均随页面创建和销毁。 */
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

  /** 根据活动键解析当前图标包名称，默认模式返回明确标签。 */
  private currentIconPackName(): string {
    if (this.activeIconPackKey === IconPackService.noPackKey()) return '默认字母图标';
    return this.iconPacks.find((pack: IconPack) => IconPackService.packKey(pack) === this.activeIconPackKey)?.name ??
      '默认字母图标';
  }

  /** 保存活动图标包并通知首页重新计算自动图标。 */
  private async selectIconPack(key: string): Promise<void> {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      await IconPackService.selectPack(context, key);
      this.activeIconPackKey = key;
      this.onActiveIconPackChanged(key);
    } catch (error) {
      this.showToast((error as Error).message, 3000);
    }
  }

  /** 选择并安装 ZIP 图标包，完成后刷新管理列表。 */
  private async installIconPack(): Promise<void> {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      const count = await IconPackService.chooseAndImport(context);
      this.iconPacks = await IconPackService.list(context);
      this.onIconPacksChanged(this.iconPacks);
      if (count > 0) this.showToast(`已安装 ${count} 个图标包`, 2000);
    } catch (error) {
      this.showToast((error as Error).message, 3000);
    }
  }

  /** 卸载图标包，并清理引用该目录的手动图标与活动选择。 */
  private async removeIconPack(pack: IconPack): Promise<void> {
    try {
      await IconPackService.remove(pack);
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      if (this.activeIconPackKey === IconPackService.packKey(pack)) {
        await IconPackService.selectPack(context, IconPackService.noPackKey());
        this.activeIconPackKey = IconPackService.noPackKey();
        this.onActiveIconPackChanged(this.activeIconPackKey);
      }
      this.tokens.forEach((token: StoredToken) => {
        if (token.iconManual === true && token.iconPath.startsWith(`file://${pack.directory}/`)) {
          token.iconPath = '';
          token.iconManual = false;
        }
      });
      this.tokens = [...this.tokens];
      await this.onTokensChanged(this.tokens);
      this.iconPacks = await IconPackService.list(context);
      this.onIconPacksChanged(this.iconPacks);
      this.showToast('图标包已删除', 1800);
    } catch (error) {
      this.showToast((error as Error).message, 3000);
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
      this.showToast((error as Error).message, 3000);
    }
  }

  /** 校验两次密码后创建并保存应用加密备份。 */
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
      if (!saved) return;
      const count = this.tokens.length;
      this.resetBackupPanel();
      DiagnosticLogService.info('Backup', `Encrypted backup exported, count=${count}`);
      this.showToast(`已导出 ${count} 个 Token`, 2200);
    } catch (error) {
      this.backupBusy = false;
      DiagnosticLogService.error('Backup', `Export failed: ${(error as Error).message}`);
      this.showToast((error as Error).message, 3200);
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
      this.tokens = result.tokens;
      await this.onTokensChanged(this.tokens);
      this.resetBackupPanel();
      DiagnosticLogService.info('Backup',
        `Encrypted backup restored, added=${result.added}, updated=${result.updated}`);
      this.showToast(`恢复完成：新增 ${result.added} 个，更新 ${result.updated} 个`, 2800);
    } catch (error) {
      this.backupBusy = false;
      DiagnosticLogService.error('Backup', `Restore failed: ${(error as Error).message}`);
      this.showToast((error as Error).message, 3500);
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
    if (this.screenshotProtectionBusy) return;
    const previous = this.screenshotProtectionEnabled;
    this.screenshotProtectionEnabled = enabled;
    this.screenshotProtectionBusy = true;
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      await AppSettingsService.applyToCurrentWindow(context, enabled);
      await AppSettingsService.setScreenshotProtection(context, enabled);
      DiagnosticLogService.info('Privacy', `Screenshot protection changed, enabled=${enabled}`);
      this.showToast(enabled ? '已禁止截屏和录屏' : '已允许截屏和录屏', 1800);
    } catch (error) {
      this.screenshotProtectionEnabled = previous;
      DiagnosticLogService.error('Privacy', `Failed to change screenshot protection: ${(error as Error).message}`);
      try {
        const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        await AppSettingsService.applyToCurrentWindow(context, previous);
      } catch (rollbackError) {
        DiagnosticLogService.error('Privacy', `Failed to roll back screenshot protection: ${(rollbackError as Error).message}`);
      }
      this.showToast((error as Error).message, 3000);
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
        title: '导出诊断日志',
        message: '日志包含应用操作、错误信息和网络状态。敏感凭据会自动脱敏，分享前仍建议检查文件内容。',
        alignment: DialogAlignment.Bottom,
        buttons: [
          { text: '取消', color: $r('app.color.text_tertiary') },
          { text: '选择导出位置', color: $r('app.color.brand_strong') }
        ]
      });
      if (dialog.index !== 1) return;
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      const exported = await DiagnosticLogService.export(context);
      this.refreshDiagnosticLogStats();
      if (exported) this.showToast('诊断日志已导出', 2000);
    } catch (error) {
      DiagnosticLogService.error('Diagnostics', `Export failed: ${(error as Error).message}`);
      this.showToast((error as Error).message, 3000);
    } finally {
      this.diagnosticLogBusy = false;
    }
  }

  /** 二次确认后清除应用沙箱内的诊断日志分片。 */
  private async clearDiagnosticLogs(): Promise<void> {
    this.diagnosticLogBusy = true;
    try {
      const dialog = await this.getUIContext().getPromptAction().showDialog({
        title: '清除诊断日志',
        message: '这只会删除应用运行日志，不会影响 Token、图标包或备份。',
        alignment: DialogAlignment.Bottom,
        buttons: [
          { text: '取消', color: $r('app.color.text_tertiary') },
          { text: '清除', color: $r('app.color.danger') }
        ]
      });
      if (dialog.index !== 1) return;
      DiagnosticLogService.clear();
      this.refreshDiagnosticLogStats();
      this.showToast('诊断日志已清除', 1800);
    } catch (error) {
      DiagnosticLogService.error('Diagnostics', `Clear failed: ${(error as Error).message}`);
      this.showToast((error as Error).message, 3000);
    } finally {
      this.diagnosticLogBusy = false;
    }
  }

  /** 构建设置页标题和用途说明。 */
  @Builder
  private header() {
    Column({ space: 4 }) {
      Text('设置').fontSize(30).fontWeight(FontWeight.Bold).fontColor($r('app.color.text_primary'))
      Text('图标包、安全存储与备份').fontSize(14).fontColor($r('app.color.text_tertiary'))
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
            Text('使用中').fontSize(11).fontColor($r('app.color.brand_strong'))
              .padding({ left: 7, right: 7, top: 3, bottom: 3 })
              .backgroundColor($r('app.color.brand_surface_alt')).borderRadius(8)
          }
        }.width('100%')
        Text(`${pack.icons.length} 个图标 · v${pack.version}`).fontSize(12)
          .fontColor($r('app.color.text_muted'))
      }.alignItems(HorizontalAlign.Start).layoutWeight(1)
      Button() {
        SymbolGlyph($r('sys.symbol.trash')).fontSize(19).fontColor([$r('app.color.danger')])
      }
      .width(40)
      .height(40)
      .borderRadius(20)
      .backgroundColor($r('app.color.danger_surface'))
      .accessibilityText(`删除图标包 ${pack.name}`)
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
          Text('当前图标风格').fontSize(13).fontColor($r('app.color.text_muted'))
          Text(this.currentIconPackName()).fontSize(17).fontWeight(FontWeight.Medium)
        }.alignItems(HorizontalAlign.Start).layoutWeight(1)
        Button(this.iconPackManagementExpanded ? '收起' : '管理')
          .backgroundColor($r('app.color.surface_muted')).fontColor($r('app.color.text_secondary'))
          .onClick(() => this.iconPackManagementExpanded = !this.iconPackManagementExpanded)
      }.width('100%')
      Text('自动匹配只使用当前图标包；长按首页图标可以手动选择任意已安装图标。')
        .fontSize(12).fontColor($r('app.color.text_tertiary')).lineHeight(18).width('100%')
      if (this.iconPackManagementExpanded) {
        Divider().color($r('app.color.divider'))
        Row() {
          Text(`图标包 · ${this.iconPacks.length} 个已安装`).fontSize(14).layoutWeight(1)
          Button('安装 ZIP').backgroundColor('#4668E8').onClick(() => this.installIconPack())
        }.width('100%')
        Row({ space: 10 }) {
          Radio({ value: IconPackService.noPackKey(), group: 'active-icon-pack' })
            .checked(this.activeIconPackKey === IconPackService.noPackKey())
            .onChange((checked: boolean) => {
              if (checked) this.selectIconPack(IconPackService.noPackKey());
            })
          Column({ space: 2 }) {
            Row({ space: 8 }) {
              Text('默认字母图标').fontSize(15).fontWeight(FontWeight.Medium)
              if (this.activeIconPackKey === IconPackService.noPackKey()) {
                Text('使用中').fontSize(11).fontColor($r('app.color.brand_strong'))
                  .padding({ left: 7, right: 7, top: 3, bottom: 3 })
                  .backgroundColor($r('app.color.brand_surface_alt')).borderRadius(8)
              }
            }.width('100%')
            Text('没有匹配图片时始终可用').fontSize(12).fontColor($r('app.color.text_muted'))
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
      Text('加密备份').fontSize(17).fontWeight(FontWeight.Medium).width('100%')
      Text('备份包含 OTP 密钥及 Steam 会话信息，只能使用设定的密码解密。')
        .fontSize(13).fontColor($r('app.color.text_tertiary')).lineHeight(20).width('100%')
      Row({ space: 10 }) {
        Button('导出备份').layoutWeight(1).backgroundColor('#4668E8').onClick(() => {
          this.resetBackupPanel();
          this.backupMode = 1;
        })
        Button('导入备份').layoutWeight(1).backgroundColor($r('app.color.surface_muted'))
          .fontColor($r('app.color.text_secondary')).onClick(() => this.chooseBackupImport())
      }.width('100%')
      if (this.backupMode === 1) {
        Divider().color($r('app.color.divider'))
        TextInput({ placeholder: '至少 8 个字符', text: this.backupPassword })
          .type(InputType.Password).onChange((value: string) => this.backupPassword = value)
        TextInput({ placeholder: '再次输入密码', text: this.backupConfirmPassword })
          .type(InputType.Password).onChange((value: string) => this.backupConfirmPassword = value)
        Row({ space: 10 }) {
          Button('取消').layoutWeight(1).backgroundColor($r('app.color.surface_muted'))
            .fontColor($r('app.color.text_secondary')).onClick(() => this.resetBackupPanel())
          Button(this.backupBusy ? '正在加密…' : '选择位置并导出').layoutWeight(1)
            .backgroundColor($r('app.color.text_secondary')).enabled(!this.backupBusy)
            .onClick(() => this.exportEncryptedBackup())
        }.width('100%')
      } else if (this.backupMode === 2) {
        Divider().color($r('app.color.divider'))
        Text('已选择加密备份文件').fontSize(14).fontColor($r('app.color.success')).width('100%')
        TextInput({ placeholder: '输入备份密码', text: this.backupPassword })
          .type(InputType.Password).onChange((value: string) => this.backupPassword = value)
        Text('相同 UUID 的 Token 会更新，不同 UUID 的 Token 会追加。')
          .fontSize(12).fontColor($r('app.color.text_muted')).width('100%')
        Row({ space: 10 }) {
          Button('取消').layoutWeight(1).backgroundColor($r('app.color.surface_muted'))
            .fontColor($r('app.color.text_secondary')).onClick(() => this.resetBackupPanel())
          Button(this.backupBusy ? '正在解密…' : '解密并恢复').layoutWeight(1)
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
              Text('禁止截屏和录屏').fontSize(17).fontWeight(FontWeight.Medium).width('100%')
              Text(this.screenshotProtectionEnabled ? '已开启' : '未开启').fontSize(13)
                .fontColor($r('app.color.text_tertiary')).width('100%')
            }.alignItems(HorizontalAlign.Start).layoutWeight(1)
            Toggle({ type: ToggleType.Switch, isOn: this.screenshotProtectionEnabled })
              .selectedColor('#4668E8').enabled(!this.screenshotProtectionBusy)
              .onChange((isOn: boolean) => this.updateScreenshotProtection(isOn))
          }.width('100%')
          Text('开启后，系统截屏、录屏和后台任务卡片将隐藏应用内容。设置会在下次启动时自动恢复。')
            .fontSize(12).fontColor($r('app.color.text_tertiary')).lineHeight(18).width('100%')
        }.alignItems(HorizontalAlign.Start).width('calc(100% - 32vp)').padding(18)
          .margin({ left: 16, right: 16 }).backgroundColor($r('app.color.surface')).borderRadius(18)
          .border({ width: 1, color: $r('app.color.border') })
        Column({ space: 12 }) {
          Text('诊断日志').fontSize(17).fontWeight(FontWeight.Medium).width('100%')
          Text(`本机环形日志 · ${this.diagnosticLogFiles} 个文件 · ${this.diagnosticLogSize()}`)
            .fontSize(13).fontColor($r('app.color.text_tertiary')).width('100%')
          Text('用于反馈 Steam、备份、图标包和持久化问题。敏感凭据会自动脱敏，最多保留约 768KB。')
            .fontSize(12).fontColor($r('app.color.text_tertiary')).lineHeight(18).width('100%')
          Row({ space: 10 }) {
            Button(this.diagnosticLogBusy ? '处理中…' : '导出日志').layoutWeight(1)
              .backgroundColor('#4668E8').enabled(!this.diagnosticLogBusy)
              .onClick(() => this.exportDiagnosticLogs())
            Button('清除').layoutWeight(1).backgroundColor($r('app.color.danger_surface'))
              .fontColor($r('app.color.danger')).enabled(!this.diagnosticLogBusy && this.diagnosticLogBytes > 0)
              .onClick(() => this.clearDiagnosticLogs())
          }.width('100%')
        }.alignItems(HorizontalAlign.Start).width('calc(100% - 32vp)').padding(18)
          .margin({ left: 16, right: 16 }).backgroundColor($r('app.color.surface')).borderRadius(18)
          .border({ width: 1, color: $r('app.color.border') })
        Column({ space: 6 }) {
          Text('本机数据保护').fontSize(15).fontWeight(FontWeight.Medium).width('100%')
          Text('Token 数据使用系统安全主密钥和 AES-256-GCM 加密保存。应用不会启用系统自动备份。')
            .fontSize(13).fontColor($r('app.color.text_tertiary')).lineHeight(20).width('100%')
        }.alignItems(HorizontalAlign.Start).width('calc(100% - 32vp)').padding(18)
          .margin({ left: 16, right: 16, bottom: 18 }).backgroundColor($r('app.color.brand_surface')).borderRadius(18)
      }.width('100%').alignItems(HorizontalAlign.Start)
    }.height('100%').width('100%').align(Alignment.TopStart).scrollBar(BarState.Off)
      .backgroundColor($r('app.color.page_background'))
  }
}
