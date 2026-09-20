/** 应用二级路由名称；验证码与设置由根 HdsTabs 承载，不进入路由栈。 */
export enum AppRoute {
  ADD = 'add',
  STEAM = 'steam',
  STEAM_HISTORY = 'steamHistory',
  STEAM_MANAGEMENT = 'steamManagement',
  DETAIL = 'detail',
  ICON_PICKER = 'iconPicker'
}

/** Token 页面统一使用 UUID 传参，issuer 仅供图标选择页即时预览。 */
export class TokenRouteParam {
  tokenId: string = '';
  issuer: string = '';
}

/**
 * 集中持有与根 Navigation 一一对应的路由栈，并封装应用级跳转操作。
 * 页面 Builder 由系统路由表创建，因此通过该控制器共享同一个 NavPathStack。
 */
export class AppRouter {
  private static readonly pathStack: NavPathStack = new NavPathStack();

  /** 返回根 Navigation 使用的唯一导航控制器。 */
  static stack(): NavPathStack {
    return AppRouter.pathStack;
  }

  /** 进入不需要业务参数的页面。 */
  static push(route: AppRoute): void {
    AppRouter.pathStack.pushPath({ name: route });
  }

  /** 携带 Token UUID 进入详情、Steam 或图标选择页面。 */
  static pushToken(route: AppRoute, tokenId: string, issuer: string = ''): void {
    const param = new TokenRouteParam();
    param.tokenId = tokenId;
    param.issuer = issuer;
    AppRouter.pathStack.pushPath({ name: route, param: param });
  }

  /** 返回上一层页面。 */
  static pop(): void {
    AppRouter.pathStack.pop();
  }

  /** 清空二级页面并回到首页 NavBar。 */
  static returnHome(): void {
    AppRouter.pathStack.clear();
  }

  /** 从系统 Builder 参数读取 Token UUID。 */
  static tokenId(param: ESObject): string {
    return (param as TokenRouteParam).tokenId;
  }

  /** 从系统 Builder 参数读取图标预览 issuer。 */
  static issuer(param: ESObject): string {
    return (param as TokenRouteParam).issuer;
  }
}
