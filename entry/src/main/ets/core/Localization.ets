import { common } from '@kit.AbilityKit';
import { AppError } from './AppError';

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

  /**
   * 将结构化业务错误转换成当前系统语言；未知异常只显示调用方提供的通用文案。
   * 原始 error.message 应另外写入诊断日志，不直接暴露给界面。
   */
  static error(context: common.Context, error: Object, fallback: Resource): string {
    if (error instanceof AppError) {
      try {
        return context.resourceManager.getStringByNameSync(error.resourceName, ...error.resourceArgs);
      } catch (_) {
        return error.message;
      }
    }
    return Localization.text(context, fallback);
  }
}
