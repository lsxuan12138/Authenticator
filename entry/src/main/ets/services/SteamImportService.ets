import { common } from '@kit.AbilityKit';
import { fileIo as fs, picker } from '@kit.CoreFileKit';
import { util } from '@kit.ArkTS';
import { BusinessError } from '@kit.BasicServicesKit';
import { SteamGuardMetadata } from '../domain/Token';

export interface SteamImportResult {
  metadata: SteamGuardMetadata;
  sharedSecret: string;
  accountName: string;
}

/**
 * Steam Desktop Authenticator maFile 与常见 JSON 备份的兼容导入器。
 * 支持 snake_case/camelCase 以及令牌嵌套对象，兼容不同工具生成的导出格式。
 */
export class SteamImportService {
  static parse(text: string): SteamImportResult {
    // 在 JSON.parse 前把 Steam ID 包成字符串，防止 64 位整数经过 Number 后精度丢失。
    const normalized = text.replace(/("steam_id"\s*:\s*)(\d{16,})/g, '$1"$2"');
    const root = JSON.parse(normalized) as Record<string, Object>;
    const source = SteamImportService.unwrap(root);
    const tokens = (source['tokens'] ?? {}) as Record<string, Object>;
    const steamId = SteamImportService.first(source, ['steam_id', 'steamid', 'steamID', 'SteamID']);
    const accessToken = SteamImportService.first(tokens, ['access_token', 'accessToken']) ||
      SteamImportService.first(source, ['access_token', 'accessToken']);
    const identitySecret = SteamImportService.first(source, ['identity_secret', 'identitySecret']);
    const deviceId = SteamImportService.first(source, ['device_id', 'deviceID', 'deviceId']);
    if (!steamId || !accessToken || !identitySecret || !deviceId) {
      throw new Error('文件缺少 steam_id、access_token、identity_secret 或 device_id');
    }
    const metadata: SteamGuardMetadata = {
      steamId: steamId,
      accountName: SteamImportService.first(source, ['account_name', 'accountName']),
      identitySecret: identitySecret,
      deviceId: deviceId,
      accessToken: accessToken,
      refreshToken: SteamImportService.first(tokens, ['refresh_token', 'refreshToken']) ||
        SteamImportService.first(source, ['refresh_token', 'refreshToken']),
      revocationCode: SteamImportService.first(source, ['revocation_code', 'revocationCode']),
      serialNumber: SteamImportService.first(source, ['serial_number', 'serialNumber']),
      tokenGid: SteamImportService.first(source, ['token_gid', 'tokenGid']),
      uri: SteamImportService.first(source, ['uri']),
      secret1: SteamImportService.first(source, ['secret_1', 'secret1'])
    };
    const result: SteamImportResult = {
      metadata: metadata,
      sharedSecret: SteamImportService.first(source, ['shared_secret', 'sharedSecret', 'shardSecret']),
      accountName: metadata.accountName
    };
    return result;
  }

  static async pickAndRead(context: common.UIAbilityContext): Promise<string> {
    const options = new picker.DocumentSelectOptions();
    options.maxSelectNumber = 1;
    options.fileSuffixFilters = ['.maFile', '.json'];
    const selected = await new picker.DocumentViewPicker(context).select(options);
    if (selected.length === 0) {
      return '';
    }
    let file: fs.File | undefined;
    let content = '';
    let failure: Error | undefined;
    try {
      file = fs.openSync(selected[0], fs.OpenMode.READ_ONLY);
      const size = fs.statSync(file.fd).size;
      const data = new ArrayBuffer(size);
      const count = fs.readSync(file.fd, data);
      content = new util.TextDecoder().decodeToString(new Uint8Array(data.slice(0, count)));
    } catch (error) {
      const detail = error as BusinessError;
      failure = new Error(`读取 Steam 导入文件失败：${detail.message ?? '未知错误'}`);
    }
    if (file !== undefined) {
      try {
        fs.closeSync(file.fd);
      } catch (error) {
        if (failure === undefined) {
          const detail = error as BusinessError;
          failure = new Error(`关闭 Steam 导入文件失败：${detail.message ?? '未知错误'}`);
        }
      }
    }
    if (failure !== undefined) {
      throw failure;
    }
    return content;
  }

  private static unwrap(root: Record<string, Object>): Record<string, Object> {
    // 某些导出格式会将真实 maFile 内容包装在 steam 或 external 节点中。
    const nested = root['steam'] ?? root['external'];
    if (typeof nested === 'string') {
      return JSON.parse(nested) as Record<string, Object>;
    }
    if (typeof nested === 'object' && nested !== null) {
      return nested as Record<string, Object>;
    }
    return root;
  }

  private static first(source: Record<string, Object>, keys: string[]): string {
    for (const key of keys) {
      const value = source[key];
      if (value !== undefined && value !== null && `${value}`.length > 0) {
        return `${value}`;
      }
    }
    return '';
  }
}
