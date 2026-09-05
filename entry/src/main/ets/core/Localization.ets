import { common } from '@kit.AbilityKit';

/**
 * 为对话框、Toast 和状态字符串读取本地化资源。
 * 声明式组件应优先直接使用 $r；只有必须得到 string 的命令式 API 才使用此工具。
 */
export class Localization {
  static text(context: common.Context, resource: Resource,
    args: Array<string | number> = [], fallback: string = ''): string {
    try {
      return context.resourceManager.getStringSync(resource.id, ...args);
    } catch (_) {
      return fallback;
    }
  }
}
