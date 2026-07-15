/** 应用路由名称；首页是 Navigation 的 NavBar，不注册到系统路由表。 */
export enum AppRoute {
  HOME = 'home',
  ADD = 'add',
  SETTINGS = 'settings',
  STEAM = 'steam',
  STEAM_MANAGEMENT = 'steamManagement',
  DETAIL = 'detail',
  ICON_PICKER = 'iconPicker'
}

/** Token 页面统一使用 UUID 传参，issuer 仅供图标选择页即时预览。 */
export class TokenRouteParam {
  tokenId: string = '';
  issuer: string = '';
}

export const APP_ROUTE_KEY: string = 'authenticator.currentRoute';

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
    AppRouter.markCurrent(AppRoute.HOME);
  }

  /** 由 NavDestination 可见事件同步底栏所需的当前路由。 */
  static markCurrent(route: AppRoute): void {
    AppStorage.setOrCreate<AppRoute>(APP_ROUTE_KEY, AppRoute.HOME);
    AppStorage.set<AppRoute>(APP_ROUTE_KEY, route);
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
