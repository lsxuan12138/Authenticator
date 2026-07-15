import { common } from '@kit.AbilityKit';
import { StoredToken } from '../domain/Token';
import { TokenRepository } from './TokenRepository';
import { IconPack, IconPackService } from '../services/IconPackService';

export const APP_TOKENS_KEY: string = 'authenticator.tokens';
export const APP_ICON_PACKS_KEY: string = 'authenticator.iconPacks';
export const APP_ACTIVE_ICON_PACK_KEY: string = 'authenticator.activeIconPack';

/**
 * 应用内共享数据入口。AppStorage 负责页面间响应式同步，TokenRepository 仍负责加密持久化，
 * 因此路由页面无需依赖 Index 实例，也不会把密钥明文写入新的持久化位置。
 */
export class AppStore {
  private static readonly repository: TokenRepository = new TokenRepository();

  /** 打开安全仓库、加载共享状态并修复失效的自动/手动图标引用。 */
  static async initialize(context: common.UIAbilityContext): Promise<void> {
    await AppStore.repository.open(context);
    let tokens = await AppStore.repository.list();
    const iconPacks = await IconPackService.list(context);
    let activeIconPackKey = await IconPackService.activePackKey(context);
    if (activeIconPackKey !== IconPackService.noPackKey() &&
      !iconPacks.some((pack: IconPack): boolean => IconPackService.packKey(pack) === activeIconPackKey)) {
      activeIconPackKey = IconPackService.noPackKey();
      await IconPackService.selectPack(context, activeIconPackKey);
    }

    let iconsChanged = false;
    tokens = tokens.map((token: StoredToken): StoredToken => {
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
    if (iconsChanged) {
      await AppStore.repository.save(tokens);
    }

    AppStorage.setOrCreate<StoredToken[]>(APP_TOKENS_KEY, []);
    AppStorage.setOrCreate<IconPack[]>(APP_ICON_PACKS_KEY, []);
    AppStorage.setOrCreate<string>(APP_ACTIVE_ICON_PACK_KEY, IconPackService.noPackKey());
    AppStorage.set<StoredToken[]>(APP_TOKENS_KEY, tokens);
    AppStorage.set<IconPack[]>(APP_ICON_PACKS_KEY, iconPacks);
    AppStorage.set<string>(APP_ACTIVE_ICON_PACK_KEY, activeIconPackKey);
  }

  /** 返回系统路由 Builder 创建页面时使用的最新 Token 快照。 */
  static tokens(): StoredToken[] {
    return AppStorage.get<StoredToken[]>(APP_TOKENS_KEY) ?? [];
  }

  /** 返回已安装图标包快照。 */
  static iconPacks(): IconPack[] {
    return AppStorage.get<IconPack[]>(APP_ICON_PACKS_KEY) ?? [];
  }

  /** 返回当前活动图标包标识。 */
  static activeIconPackKey(): string {
    return AppStorage.get<string>(APP_ACTIVE_ICON_PACK_KEY) ?? IconPackService.noPackKey();
  }

  /** 先写入加密仓库，成功后再通知所有 @StorageLink 页面。 */
  static async updateTokens(tokens: StoredToken[]): Promise<void> {
    const next = [...tokens];
    await AppStore.repository.save(next);
    AppStorage.set<StoredToken[]>(APP_TOKENS_KEY, next);
  }

  /** 同步图标包安装或删除结果。 */
  static updateIconPacks(packs: IconPack[]): void {
    AppStorage.set<IconPack[]>(APP_ICON_PACKS_KEY, [...packs]);
  }

  /** 同步活动图标包选择。 */
  static updateActiveIconPack(key: string): void {
    AppStorage.set<string>(APP_ACTIVE_ICON_PACK_KEY, key);
  }
}
