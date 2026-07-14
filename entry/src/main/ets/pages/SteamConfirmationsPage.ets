import { BusinessError } from '@kit.BasicServicesKit';
import { StoredToken } from '../domain/Token';
import { SteamConfirmation, SteamGuardService } from '../services/SteamGuardService';
import { DiagnosticLogService } from '../services/DiagnosticLogService';

/** Steam 移动确认页，仅在可见期间持有待确认条目和加载状态。 */
@Component
export struct SteamConfirmationsPage {
  @Prop tokens: StoredToken[] = [];
  tokenIndex: number = -1;
  onClose: () => void = (): void => {};
  @State private confirmations: SteamConfirmation[] = [];
  @State private loading: boolean = false;
  @State private submitting: boolean = false;
  @State private hasLoaded: boolean = false;
  @State private lastRefresh: string = '';

  aboutToAppear(): void {
    this.requestConfirmations();
  }

  private showToast(message: string, duration: number = 2000): void {
    try {
      this.getUIContext().getPromptAction().showToast({ message: message, duration: duration });
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('SteamConfirmations', `Failed to show toast: ${detail.message ?? message}`);
    }
  }

  private async requestConfirmations(): Promise<void> {
    if (this.tokenIndex < 0 || this.tokenIndex >= this.tokens.length) return;
    const metadata = this.tokens[this.tokenIndex].steam;
    if (!metadata?.steamId || !metadata.identitySecret || !metadata.deviceId ||
      (!metadata.accessToken && !metadata.refreshToken)) {
      this.hasLoaded = true;
      this.showToast('Steam 元信息不完整，请先在详情页补充', 2500);
      return;
    }
    this.loading = true;
    try {
      this.confirmations = await new SteamGuardService().getConfirmations(metadata.steamId,
        metadata.accessToken, metadata.refreshToken, metadata.identitySecret, metadata.deviceId);
      this.hasLoaded = true;
      this.lastRefresh = new Date().toLocaleTimeString();
      if (this.confirmations.length === 0) this.showToast('当前没有待确认操作', 1800);
    } catch (error) {
      this.hasLoaded = true;
      this.showToast((error as Error).message, 3000);
    } finally {
      this.loading = false;
    }
  }

  private async respond(confirmation: SteamConfirmation, approve: boolean): Promise<void> {
    if (this.submitting || this.tokenIndex < 0 || this.tokenIndex >= this.tokens.length) return;
    const metadata = this.tokens[this.tokenIndex].steam;
    if (!metadata) return;
    this.submitting = true;
    try {
      await new SteamGuardService().respondToConfirmation(metadata.steamId, metadata.accessToken,
        metadata.refreshToken, metadata.identitySecret, metadata.deviceId, confirmation, approve);
      this.confirmations = this.confirmations.filter((item: SteamConfirmation) => item.id !== confirmation.id);
      this.showToast(approve ? '已批准 Steam 确认' : '已拒绝 Steam 确认', 1800);
    } catch (error) {
      this.showToast((error as Error).message, 3000);
    } finally {
      this.submitting = false;
    }
  }

  private async respondAll(approve: boolean): Promise<void> {
    if (this.submitting || this.confirmations.length === 0 ||
      this.tokenIndex < 0 || this.tokenIndex >= this.tokens.length) {
      return;
    }
    const metadata = this.tokens[this.tokenIndex].steam;
    if (!metadata) return;
    const action = approve ? '批准' : '拒绝';
    try {
      const dialog = await this.getUIContext().getPromptAction().showDialog({
        title: `${action}全部 Steam 确认？`,
        message: `将${action}当前全部 ${this.confirmations.length} 个待确认操作，此操作无法撤销。`,
        alignment: DialogAlignment.Bottom,
        buttons: [
          { text: '取消', color: $r('app.color.text_tertiary') },
          { text: `全部${action}`, color: approve ?
            $r('app.color.brand_strong') : $r('app.color.danger') }
        ]
      });
      if (dialog.index !== 1) {
        return;
      }
      this.submitting = true;
      const pending = [...this.confirmations];
      await new SteamGuardService().respondToConfirmations(metadata.steamId, metadata.accessToken,
        metadata.refreshToken, metadata.identitySecret, metadata.deviceId, pending, approve);
      this.confirmations = [];
      this.showToast(`已${action}全部 Steam 确认`, 2000);
    } catch (error) {
      this.showToast((error as Error).message, 3200);
    } finally {
      this.submitting = false;
    }
  }

  build() {
    Column() {
      Row({ space: 10 }) {
        Button() {
          SymbolGlyph($r('sys.symbol.chevron_left'))
            .fontSize(22)
            .fontColor([$r('app.color.text_secondary')])
        }
          .type(ButtonType.Circle).width(38).height(38)
          .backgroundColor($r('app.color.surface_muted'))
          .onClick(() => this.onClose())
        Column({ space: 3 }) {
          Text('Steam 确认').fontSize(26).fontWeight(FontWeight.Bold)
          Text(this.lastRefresh ? `上次刷新 ${this.lastRefresh}` : '待确认操作')
            .fontSize(13).fontColor($r('app.color.text_tertiary'))
        }.alignItems(HorizontalAlign.Start).layoutWeight(1)
        Button() {
          SymbolGlyph($r('sys.symbol.arrow_clockwise')).fontSize(22).fontColor([Color.White])
        }.type(ButtonType.Circle).width(40).height(40).backgroundColor($r('app.color.brand_strong'))
          .enabled(!this.loading && !this.submitting).onClick(() => this.requestConfirmations())
      }.width('100%').padding({ left: 18, right: 18, top: 18, bottom: 10 })

      if (this.loading) {
        Column({ space: 12 }) {
          LoadingProgress().width(36).height(36).color('#4668E8')
          Text('正在获取待确认操作…').fontSize(14).fontColor($r('app.color.text_tertiary'))
        }.layoutWeight(1).justifyContent(FlexAlign.Center)
      } else if (this.hasLoaded && this.confirmations.length === 0) {
        Column({ space: 10 }) {
          SymbolGlyph($r('sys.symbol.checkmark_circle'))
            .fontSize(34)
            .fontColor([$r('app.color.success')])
          Text('当前没有待确认操作').fontSize(17).fontWeight(FontWeight.Medium)
          Text('新的交易或账户操作确认出现后，可以点击右上角刷新。').fontSize(12)
            .fontColor($r('app.color.text_muted'))
        }.layoutWeight(1).justifyContent(FlexAlign.Center)
      } else {
        Column({ space: 10 }) {
          Row({ space: 10 }) {
            Button(this.submitting ? '处理中…' : `全部拒绝（${this.confirmations.length}）`)
              .layoutWeight(1)
              .enabled(!this.submitting)
              .backgroundColor($r('app.color.danger_surface'))
              .fontColor($r('app.color.danger'))
              .onClick(() => this.respondAll(false))
            Button(this.submitting ? '处理中…' : `全部批准（${this.confirmations.length}）`)
              .layoutWeight(1)
              .enabled(!this.submitting)
              .backgroundColor($r('app.color.brand_strong'))
              .onClick(() => this.respondAll(true))
          }.width('100%').padding({ left: 16, right: 16 })

          List({ space: 12 }) {
            ForEach(this.confirmations, (confirmation: SteamConfirmation) => {
              ListItem() {
                Column({ space: 8 }) {
                  Text(confirmation.headline).fontSize(16).fontWeight(FontWeight.Bold).width('100%')
                  Text(confirmation.summary.join(', ')).fontSize(13)
                    .fontColor($r('app.color.text_tertiary')).width('100%')
                  Row({ space: 10 }) {
                    Text(new Date(confirmation.creationTime * 1000).toLocaleString()).fontSize(11)
                      .fontColor($r('app.color.text_disabled')).layoutWeight(1)
                  }.width('100%')
                  Row({ space: 10 }) {
                    Button('拒绝').layoutWeight(1).backgroundColor($r('app.color.danger_surface'))
                      .fontColor($r('app.color.danger')).enabled(!this.submitting)
                      .onClick(() => this.respond(confirmation, false))
                    Button('批准').layoutWeight(1).backgroundColor($r('app.color.brand_strong'))
                      .enabled(!this.submitting).onClick(() => this.respond(confirmation, true))
                  }.width('100%')
                }.alignItems(HorizontalAlign.Start).padding(16).backgroundColor($r('app.color.surface'))
                  .borderRadius(16)
              }
            }, (confirmation: SteamConfirmation) => confirmation.id)
          }.layoutWeight(1).width('100%').height('100%').padding({ left: 16, right: 16, bottom: 24 })
        }.layoutWeight(1).width('100%')
      }
    }.width('100%').height('100%').backgroundColor($r('app.color.page_background'))
  }
}
