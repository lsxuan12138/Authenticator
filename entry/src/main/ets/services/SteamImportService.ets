import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { fileIo as fs, picker } from '@kit.CoreFileKit';
import { util } from '@kit.ArkTS';
import { SteamGuardMetadata } from '../domain/Token';
import { AppError } from '../core/AppError';

export interface SteamImportResult {
  metadata: SteamGuardMetadata;
  sharedSecret: string;
  accountName: string;
}

/** 严格解析 Steam Desktop Authenticator maFile 和兼容 JSON。 */
export class SteamImportService {
  private static readonly MAX_FILE_SIZE: number = 2 * 1024 * 1024;

  /** 解析文本并把不同 maFile 字段命名归一到应用模型。 */
  static parse(text: string): SteamImportResult {
    if (!text.trim()) {
      throw new AppError('steam_import_error_empty', 'Steam import content is empty');
    }
    // SteamID 超过 JavaScript 安全整数范围；在 JSON.parse 前统一把常见别名的裸数字包成字符串。
    const normalized = text.replace(
      /("(?:steam_id|steamid|steamID|SteamID)"\s*:\s*)(\d{16,20})(?=\s*[,}])/g,
      '$1"$2"');
    let root: Record<string, Object>;
    try {
      root = JSON.parse(normalized) as Record<string, Object>;
    } catch (error) {
      const detail = error as BusinessError;
      throw new AppError('steam_import_error_json',
        `Steam import content is not valid JSON: ${detail.message ?? 'invalid format'}`);
    }
    const source = SteamImportService.unwrap(root);
    const tokens = SteamImportService.record(source['tokens']);
    const steamId = SteamImportService.first(source, ['steam_id', 'steamid', 'steamID', 'SteamID']);
    const accountName = SteamImportService.first(source, ['account_name', 'accountName']);
    const accessToken = SteamImportService.first(tokens, ['access_token', 'accessToken']) ||
      SteamImportService.first(source, ['access_token', 'accessToken']);
    const refreshToken = SteamImportService.first(tokens, ['refresh_token', 'refreshToken']) ||
      SteamImportService.first(source, ['refresh_token', 'refreshToken']);
    const sharedSecret = SteamImportService.first(source, ['shared_secret', 'sharedSecret']);
    const identitySecret = SteamImportService.first(source, ['identity_secret', 'identitySecret']);
    const deviceId = SteamImportService.first(source, ['device_id', 'deviceID', 'deviceId']);

    if (!/^\d{16,20}$/.test(steamId)) {
      throw new AppError('steam_import_error_id', 'File is missing a valid steam_id');
    }
    if (!sharedSecret || !identitySecret || !deviceId) {
      throw new AppError('steam_import_error_secrets',
        'File is missing shared_secret, identity_secret, or device_id');
    }
    if (!accessToken && !refreshToken) {
      throw new AppError('steam_import_error_session', 'File requires an access_token or refresh_token');
    }
    SteamImportService.requireBase64('shared_secret', sharedSecret);
    SteamImportService.requireBase64('identity_secret', identitySecret);
    const secret1 = SteamImportService.first(source, ['secret_1', 'secret1']);
    if (secret1) {
      SteamImportService.requireBase64('secret_1', secret1);
    }

    const metadata: SteamGuardMetadata = {
      steamId: steamId,
      accountName: accountName,
      identitySecret: identitySecret,
      deviceId: deviceId,
      accessToken: accessToken,
      refreshToken: refreshToken,
      guardData: SteamImportService.first(source, ['guard_data', 'guardData']),
      revocationCode: SteamImportService.first(source, ['revocation_code', 'revocationCode']),
      serialNumber: SteamImportService.first(source, ['serial_number', 'serialNumber']),
      tokenGid: SteamImportService.first(source, ['token_gid', 'tokenGid']),
      uri: SteamImportService.first(source, ['uri']),
      secret1: secret1
    };
    return { metadata: metadata, sharedSecret: sharedSecret, accountName: accountName };
  }

  /** 使用系统文件选择器读取单个小型 JSON，并在所有路径关闭文件句柄。 */
  static async pickAndRead(context: common.UIAbilityContext): Promise<string> {
    const options = new picker.DocumentSelectOptions();
    options.maxSelectNumber = 1;
    options.fileSuffixFilters = ['.maFile', '.json'];
    const selected = await new picker.DocumentViewPicker(context).select(options);
    if (selected.length === 0) {
      return '';
    }
    let file: fs.File | undefined;
    let failure: AppError | undefined;
    let content = '';
    try {
      file = fs.openSync(selected[0], fs.OpenMode.READ_ONLY);
      const size = fs.statSync(file.fd).size;
      if (size <= 0 || size > SteamImportService.MAX_FILE_SIZE) {
        throw new AppError('steam_import_error_file_size', 'Steam import file must be non-empty and below 2 MB');
      }
      const data = new ArrayBuffer(size);
      const count = fs.readSync(file.fd, data);
      content = new util.TextDecoder().decodeToString(new Uint8Array(data.slice(0, count)));
    } catch (error) {
      const detail = error as BusinessError;
      failure = error instanceof AppError ? error :
        new AppError('steam_import_error_read', `Failed to read Steam import file: ${detail.message ?? 'unknown'}`);
    }
    if (file !== undefined) {
      try {
        fs.closeSync(file.fd);
      } catch (error) {
        if (failure === undefined) {
          const detail = error as BusinessError;
          failure = new AppError('steam_import_error_close',
            `Failed to close Steam import file: ${detail.message ?? 'unknown'}`);
        }
      }
    }
    if (failure !== undefined) {
      throw failure;
    }
    return content;
  }

  /** 解开备份工具可能添加的 steam/external 外层包装。 */
  private static unwrap(root: Record<string, Object>): Record<string, Object> {
    const nested = root['steam'] ?? root['external'];
    if (typeof nested === 'string') {
      try {
        return JSON.parse(nested) as Record<string, Object>;
      } catch (error) {
        const detail = error as BusinessError;
        throw new AppError('steam_import_error_nested_json',
          `Nested Steam data is not valid JSON: ${detail.message ?? 'invalid format'}`);
      }
    }
    return SteamImportService.record(nested, root);
  }

  /** 只把非数组 JSON 对象视为记录，否则返回指定后备值。 */
  private static record(value: Object | undefined, fallback: Record<string, Object> = {}): Record<string, Object> {
    return typeof value === 'object' && value !== null && !Array.isArray(value) ?
      value as Record<string, Object> : fallback;
  }

  /** 按别名顺序读取第一个可用的字符串或数字字段。 */
  private static first(source: Record<string, Object>, keys: string[]): string {
    for (const key of keys) {
      const value = source[key];
      if (typeof value === 'string' && value.trim().length > 0) {
        return value.trim();
      }
      if (typeof value === 'number') {
        return `${value}`;
      }
    }
    return '';
  }

  /** 在保存前验证 maFile 的二进制密钥字段确实是非空 Base64。 */
  private static requireBase64(field: string, value: string): void {
    const paddingIndex = value.indexOf('=');
    const invalidPadding = paddingIndex >= 0 && value.length % 4 !== 0;
    if (!/^[A-Za-z0-9+/]+={0,2}$/.test(value) || value.length % 4 === 1 || invalidPadding) {
      throw new AppError('steam_import_error_base64', `${field} is not valid Base64 data`, [field]);
    }
  }
}
