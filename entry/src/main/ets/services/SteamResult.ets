/** 将 Steam EResult 转换为用户可理解、同时保留协议码的错误信息。 */
export class SteamResult {
  static message(code: string, action: string): string {
    return `${action}：${SteamResult.description(code)}（EResult ${code}）`;
  }

  static description(code: string): string {
    switch (code) {
      case '2':
        return 'Steam 未能完成请求';
      case '5':
        return '账户名或密码错误';
      case '8':
        return '请求参数无效';
      case '10':
        return 'Steam 正忙，请稍后重试';
      case '15':
        return '当前账户无权执行此操作';
      case '16':
        return 'Steam 请求超时';
      case '18':
        return '找不到该 Steam 账户';
      case '20':
        return 'Steam 服务暂不可用';
      case '21':
        return 'Steam 会话尚未登录';
      case '25':
        return '操作次数已达到限制';
      case '26':
        return 'Steam 会话或凭据已被撤销';
      case '27':
        return 'Steam 登录会话已过期';
      case '29':
        return '相同请求已经提交';
      case '63':
      case '66':
        return 'Steam 拒绝了本次账户登录';
      case '65':
        return '邮箱验证码错误';
      case '71':
        return '邮箱验证码已过期';
      case '84':
      case '87':
        return '请求过于频繁，请稍后重试';
      case '85':
        return '账户需要 Steam Guard 验证';
      case '88':
        return 'Steam Guard 验证码错误';
      case '89':
        return 'Steam Guard 激活码错误';
      case '92':
        return '账户尚未绑定移动设备';
      case '93':
        return '设备时间与 Steam 不同步';
      case '94':
        return '短信验证码错误';
      case '101':
        return 'Steam 要求完成验证码验证';
      case '118':
        return '需要先同意 Steam 用户协议';
      default:
        return 'Steam 返回了未识别的错误';
    }
  }
}
