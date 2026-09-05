/**
 * 可由界面安全翻译的业务错误。
 *
 * message 只用于诊断日志，resourceName 和 resourceArgs 才是面向用户的稳定错误契约。
 * 服务层不得依赖已经翻译的文本判断错误类型。
 */
export class AppError extends Error {
  readonly resourceName: string;
  readonly resourceArgs: Array<string | number>;

  constructor(resourceName: string, diagnosticMessage: string,
    resourceArgs: Array<string | number> = []) {
    super(diagnosticMessage);
    this.name = 'AppError';
    this.resourceName = resourceName;
    this.resourceArgs = resourceArgs;
  }
}
