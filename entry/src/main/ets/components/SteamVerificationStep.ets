/**
 * Steam 登录与验证器激活流程共用的验证码输入区域。
 *
 * 将服务端返回的邮箱后缀、手机尾号等提示放在输入框上方，既保证实机布局一致，
 * 也允许通过本文件末尾的 @Preview 在 IDE 中安全检查界面，无需真实登录或迁移账户。
 */
@Component
export struct SteamVerificationStep {
  @Prop statusMessage: string = '';
  @Prop prompt: string = '';
  @Prop placeholder: string = '验证码';
  @Prop code: string = '';
  @Prop showCodeInput: boolean = true;
  onCodeChange: (value: string) => void = (_value: string): void => {};

  /** 按“服务端提示—操作说明—输入框”的顺序渲染验证信息。 */
  build() {
    Column({ space: 12 }) {
      if (this.statusMessage.length > 0) {
        Text(this.statusMessage)
          .fontSize(13)
          .fontColor($r('app.color.text_secondary'))
          .lineHeight(19)
          .padding(12)
          .backgroundColor($r('app.color.status_surface'))
          .borderRadius(12)
          .width('100%')
      }
      Text(this.prompt)
        .fontSize(14)
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.text_secondary'))
        .lineHeight(20)
        .width('100%')
      if (this.showCodeInput) {
        TextInput({ placeholder: this.placeholder, text: this.code })
          .onChange((value: string) => this.onCodeChange(value.trim()))
      }
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }
}

/** 在 Previewer 中展示邮箱验证码提示位于输入框上方的真实布局。 */
@Preview({ title: 'Steam 邮箱验证', deviceType: 'phone', width: 360, height: 760, locale: 'zh_CN' })
@Component
struct SteamEmailVerificationPreview {
  build() {
    Column({ space: 12 }) {
      Text('登录并添加 Steam Guard').fontSize(18).fontWeight(FontWeight.Bold).width('100%')
      SteamVerificationStep({
        statusMessage: '验证码已发送至 ***@example.com',
        prompt: '请输入 Steam 发送到邮箱的验证码',
        placeholder: 'Steam 验证码'
      })
      Button('我已完成验证，继续')
        .width('100%')
        .height(48)
        .backgroundColor($r('app.color.brand_strong'))
    }
    .width('100%')
    .padding(22)
    .alignItems(HorizontalAlign.Start)
    .backgroundColor($r('app.color.page_background'))
  }
}

/** 在 Previewer 中展示新增验证器的短信/邮件激活步骤。 */
@Preview({ title: 'Steam 验证器激活', deviceType: 'phone', width: 360, height: 760, locale: 'zh_CN' })
@Component
struct SteamAuthenticatorActivationPreview {
  build() {
    Column({ space: 12 }) {
      Text('登录并添加 Steam Guard').fontSize(18).fontWeight(FontWeight.Bold).width('100%')
      SteamVerificationStep({
        statusMessage: '请输入通过短信收到的激活码（尾号 1234）',
        prompt: 'Steam 登录已经完成，最后需要验证新增的移动验证器。',
        placeholder: '短信或邮件激活码'
      })
      Button('激活并保存 Steam Guard')
        .width('100%')
        .height(48)
        .backgroundColor($r('app.color.success'))
    }
    .width('100%')
    .padding(22)
    .alignItems(HorizontalAlign.Start)
    .backgroundColor($r('app.color.page_background'))
  }
}
