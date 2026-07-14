import { common } from '@kit.AbilityKit';
import { BusinessError, deviceInfo } from '@kit.BasicServicesKit';
import { fileIo as fs, picker } from '@kit.CoreFileKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { util } from '@kit.ArkTS';

const LOG_DOMAIN: number = 0xD004;
const LOG_TAG: string = 'DiagnosticLog';

export interface DiagnosticLogStats {
  bytes: number;
  files: number;
}

/**
 * 应用自有的诊断日志。
 * HiLog 不提供普通应用可依赖的回读接口，因此关键日志同时写入沙箱中的小型环形文件。
 */
export class DiagnosticLogService {
  private static readonly DIRECTORY_NAME: string = 'diagnostic_logs';
  private static readonly ACTIVE_FILE: string = 'app.log';
  private static readonly MAX_FILE_SIZE: number = 256 * 1024;
  private static readonly FILE_COUNT: number = 3;
  private static directory: string = '';

  static initialize(context: common.Context): void {
    try {
      DiagnosticLogService.directory = `${context.filesDir}/${DiagnosticLogService.DIRECTORY_NAME}`;
      if (!fs.accessSync(DiagnosticLogService.directory)) {
        fs.mkdirSync(DiagnosticLogService.directory);
      }
      DiagnosticLogService.info('Lifecycle', `Logger initialized, sdkApi=${deviceInfo.sdkApiVersion}`);
    } catch (error) {
      const detail = error as BusinessError;
      hilog.error(LOG_DOMAIN, LOG_TAG, 'Logger initialization failed: %{public}s', detail.message ?? 'unknown');
    }
  }

  static debug(tag: string, message: string): void {
    DiagnosticLogService.write('DEBUG', tag, message);
  }

  static info(tag: string, message: string): void {
    DiagnosticLogService.write('INFO', tag, message);
  }

  static warn(tag: string, message: string): void {
    DiagnosticLogService.write('WARN', tag, message);
  }

  static error(tag: string, message: string): void {
    DiagnosticLogService.write('ERROR', tag, message);
  }

  static stats(): DiagnosticLogStats {
    let bytes = 0;
    let files = 0;
    if (!DiagnosticLogService.directory) {
      return { bytes: bytes, files: files };
    }
    try {
      for (let index = DiagnosticLogService.FILE_COUNT - 1; index >= 0; index--) {
        const path = DiagnosticLogService.logPath(index);
        if (!fs.accessSync(path)) {
          continue;
        }
        bytes += fs.statSync(path).size;
        files++;
      }
    } catch (error) {
      const detail = error as BusinessError;
      hilog.error(LOG_DOMAIN, LOG_TAG, 'Failed to inspect diagnostic logs: %{public}s', detail.message ?? 'unknown');
    }
    return { bytes: bytes, files: files };
  }

  static clear(): void {
    if (!DiagnosticLogService.directory) {
      return;
    }
    try {
      for (let index = DiagnosticLogService.FILE_COUNT - 1; index >= 0; index--) {
        const path = DiagnosticLogService.logPath(index);
        if (fs.accessSync(path)) {
          fs.unlinkSync(path);
        }
      }
      hilog.info(LOG_DOMAIN, LOG_TAG, 'Diagnostic logs cleared');
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`清除诊断日志失败：${detail.message ?? '未知错误'}`);
    }
  }

  static async export(context: common.UIAbilityContext): Promise<boolean> {
    const content = DiagnosticLogService.exportContent();
    const options = new picker.DocumentSaveOptions();
    const day = new Date().toISOString().substring(0, 10);
    options.newFileNames = [`authenticator-diagnostics-${day}.txt`];
    options.fileSuffixChoices = ['Authenticator 诊断日志|.txt'];
    const selected = await new picker.DocumentViewPicker(context).save(options);
    if (selected.length === 0) {
      return false;
    }
    DiagnosticLogService.writeExportFile(selected[0], content);
    DiagnosticLogService.info('Diagnostics', `Diagnostic log exported, bytes=${content.length}`);
    return true;
  }

  private static write(level: string, tag: string, message: string): void {
    const safeTag = DiagnosticLogService.sanitizeTag(tag);
    const safeMessage = DiagnosticLogService.sanitize(message);
    DiagnosticLogService.writeHiLog(level, safeTag, safeMessage);
    if (!DiagnosticLogService.directory) {
      return;
    }
    try {
      const line = `${new Date().toISOString()} ${level.padEnd(5, ' ')} ${safeTag} ${safeMessage}\n`;
      const bytes = new util.TextEncoder().encodeInto(line).length;
      DiagnosticLogService.rotateIfNeeded(bytes);
      const file = fs.openSync(DiagnosticLogService.logPath(0),
        fs.OpenMode.WRITE_ONLY | fs.OpenMode.CREATE | fs.OpenMode.APPEND);
      try {
        fs.writeSync(file.fd, line);
      } catch (writeError) {
        const detail = writeError as BusinessError;
        hilog.error(LOG_DOMAIN, LOG_TAG, 'Failed to write diagnostic log: %{public}s',
          detail.message ?? 'unknown');
      } finally {
        try {
          fs.closeSync(file.fd);
        } catch (closeError) {
          const detail = closeError as BusinessError;
          hilog.error(LOG_DOMAIN, LOG_TAG, 'Failed to close log file: %{public}s', detail.message ?? 'unknown');
        }
      }
    } catch (error) {
      const detail = error as BusinessError;
      hilog.error(LOG_DOMAIN, LOG_TAG, 'Failed to persist diagnostic log: %{public}s', detail.message ?? 'unknown');
    }
  }

  private static writeHiLog(level: string, tag: string, message: string): void {
    switch (level) {
      case 'DEBUG':
        hilog.debug(LOG_DOMAIN, tag, '%{public}s', message);
        break;
      case 'WARN':
        hilog.warn(LOG_DOMAIN, tag, '%{public}s', message);
        break;
      case 'ERROR':
        hilog.error(LOG_DOMAIN, tag, '%{public}s', message);
        break;
      default:
        hilog.info(LOG_DOMAIN, tag, '%{public}s', message);
        break;
    }
  }

  private static rotateIfNeeded(incomingBytes: number): void {
    try {
      const active = DiagnosticLogService.logPath(0);
      if (!fs.accessSync(active) || fs.statSync(active).size + incomingBytes <= DiagnosticLogService.MAX_FILE_SIZE) {
        return;
      }
      const oldest = DiagnosticLogService.logPath(DiagnosticLogService.FILE_COUNT - 1);
      if (fs.accessSync(oldest)) {
        fs.unlinkSync(oldest);
      }
      for (let index = DiagnosticLogService.FILE_COUNT - 2; index >= 0; index--) {
        const source = DiagnosticLogService.logPath(index);
        if (fs.accessSync(source)) {
          fs.moveFileSync(source, DiagnosticLogService.logPath(index + 1));
        }
      }
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`轮换诊断日志失败：${detail.message ?? '未知错误'}`);
    }
  }

  private static exportContent(): string {
    const parts: string[] = [
      'Authenticator diagnostic log',
      `Exported: ${new Date().toISOString()}`,
      `SDK API: ${deviceInfo.sdkApiVersion}`,
      'Sensitive credentials are automatically redacted. Review before sharing.',
      ''
    ];
    if (!DiagnosticLogService.directory) {
      return parts.join('\n');
    }
    try {
      for (let index = DiagnosticLogService.FILE_COUNT - 1; index >= 0; index--) {
        const path = DiagnosticLogService.logPath(index);
        if (fs.accessSync(path)) {
          parts.push(DiagnosticLogService.readText(path));
        }
      }
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`汇总诊断日志失败：${detail.message ?? '未知错误'}`);
    }
    return parts.join('\n');
  }

  private static readText(path: string): string {
    let file: fs.File | undefined;
    let content = '';
    let failure: Error | undefined;
    try {
      file = fs.openSync(path, fs.OpenMode.READ_ONLY);
      const size = fs.statSync(file.fd).size;
      const data = new ArrayBuffer(size);
      const count = fs.readSync(file.fd, data);
      content = new util.TextDecoder().decodeToString(new Uint8Array(data.slice(0, count)));
    } catch (error) {
      const detail = error as BusinessError;
      failure = new Error(`读取诊断日志失败：${detail.message ?? '未知错误'}`);
    }
    if (file !== undefined) {
      try {
        fs.closeSync(file.fd);
      } catch (error) {
        if (failure === undefined) {
          const detail = error as BusinessError;
          failure = new Error(`关闭诊断日志失败：${detail.message ?? '未知错误'}`);
        }
      }
    }
    if (failure !== undefined) {
      throw failure;
    }
    return content;
  }

  private static writeExportFile(uri: string, content: string): void {
    let file: fs.File | undefined;
    let failure: Error | undefined;
    try {
      file = fs.openSync(uri, fs.OpenMode.WRITE_ONLY | fs.OpenMode.TRUNC);
      fs.writeSync(file.fd, content);
    } catch (error) {
      const detail = error as BusinessError;
      failure = new Error(`写入诊断日志失败：${detail.message ?? '未知错误'}`);
    }
    if (file !== undefined) {
      try {
        fs.closeSync(file.fd);
      } catch (error) {
        if (failure === undefined) {
          const detail = error as BusinessError;
          failure = new Error(`关闭导出文件失败：${detail.message ?? '未知错误'}`);
        }
      }
    }
    if (failure !== undefined) {
      throw failure;
    }
  }

  private static logPath(index: number): string {
    return index === 0 ? `${DiagnosticLogService.directory}/${DiagnosticLogService.ACTIVE_FILE}` :
      `${DiagnosticLogService.directory}/app.${index}.log`;
  }

  private static sanitizeTag(tag: string): string {
    const normalized = tag.replace(/[^A-Za-z0-9_.-]/g, '_');
    return normalized.length > 0 ? normalized.substring(0, 31) : LOG_TAG;
  }

  private static sanitize(message: string): string {
    let value = message.replaceAll('\r', ' ').replaceAll('\n', ' ');
    // 同时覆盖普通 key=value 与 JSON 的 "key":"value"，避免服务端响应进入日志时泄漏凭据。
    value = value.replace(
      /(["']?(?:access[_ -]?token|refresh[_ -]?token|identity[_ -]?secret|shared[_ -]?secret|secret1?|password|authorization|cookie|sessionid)["']?\s*[=:]\s*)["']?[^"',\s;&}]+["']?/gi,
      '$1<redacted>');
    value = value.replace(/steamLoginSecure=[^\s;]+/gi, 'steamLoginSecure=<redacted>');
    value = value.replace(/\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g,
      '<jwt-redacted>');
    value = value.replace(/\b\d{17}\b/g, '<steam-id>');
    value = value.replace(/android:[0-9a-f-]{16,}/gi, 'android:<device-id>');
    return value.length > 2000 ? `${value.substring(0, 2000)}…` : value;
  }
}
