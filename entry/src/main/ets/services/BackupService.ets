import { common } from '@kit.AbilityKit';
import { cryptoFramework } from '@kit.CryptoArchitectureKit';
import { fileIo as fs, picker } from '@kit.CoreFileKit';
import { util } from '@kit.ArkTS';
import { BusinessError } from '@kit.BasicServicesKit';
import { StoredToken, TokenKind } from '../domain/Token';
import { TokenId } from '../core/TokenId';

interface BackupContent {
  version: number;
  tokens: StoredToken[];
}

interface EncryptedBackup {
  format: string;
  version: number;
  createdAt: number;
  iterations: number;
  salt: string;
  iv: string;
  authTag: string;
  ciphertext: string;
}

export interface BackupMergeResult {
  tokens: StoredToken[];
  added: number;
  updated: number;
}

/**
 * 可移植的密码加密备份。
 * 与本机 SecureTokenVault 不同，备份密钥由用户密码通过 PBKDF2 派生，因而可跨设备恢复。
 */
export class BackupService {
  private static readonly FORMAT: string = 'harmony-authenticator-backup';
  private static readonly AAD: string = 'harmony-authenticator-backup.v1';
  private static readonly ITERATIONS: number = 210000;
  private static readonly SALT_SIZE: number = 16;
  private static readonly IV_SIZE: number = 12;
  private static readonly TAG_SIZE: number = 16;
  private static readonly MAX_FILE_SIZE: number = 8 * 1024 * 1024;

  static async create(tokens: StoredToken[], password: string): Promise<string> {
    BackupService.validatePassword(password);
    try {
      const salt = cryptoFramework.createRandom().generateRandomSync(BackupService.SALT_SIZE).data;
      const iv = cryptoFramework.createRandom().generateRandomSync(BackupService.IV_SIZE).data;
      const keyBytes = await BackupService.deriveKey(password, salt, BackupService.ITERATIONS);
      const key = cryptoFramework.createSymKeyGenerator('AES256').convertKeySync({ data: keyBytes });
      const params: cryptoFramework.GcmParamsSpec = {
        iv: { data: iv },
        aad: { data: new util.TextEncoder().encodeInto(BackupService.AAD) },
        authTag: { data: new Uint8Array(BackupService.TAG_SIZE) },
        algName: 'GcmParamsSpec'
      };
      // 显式复制可移植字段，既不修改运行中数据，也不会把后续新增的本机字段意外写入备份。
      const portableTokens = tokens.map((token: StoredToken): StoredToken => {
        const portable: StoredToken = {
          id: token.id,
          issuer: token.issuer,
          account: token.account,
          secret: token.secret,
          digits: token.digits,
          period: token.period,
          kind: token.kind,
          iconPath: '',
          iconManual: false,
          createdAt: token.createdAt
        };
        if (token.steam) {
          portable.steam = {
            steamId: token.steam.steamId,
            accountName: token.steam.accountName,
            identitySecret: token.steam.identitySecret,
            deviceId: token.steam.deviceId,
            accessToken: token.steam.accessToken,
            refreshToken: token.steam.refreshToken,
            // Guard Data 与令牌一样属于可移植会话凭据，只能出现在 AES-GCM 加密载荷中。
            guardData: token.steam.guardData,
            revocationCode: token.steam.revocationCode,
            serialNumber: token.steam.serialNumber,
            tokenGid: token.steam.tokenGid,
            uri: token.steam.uri,
            secret1: token.steam.secret1
          };
        }
        return portable;
      });
      const content: BackupContent = { version: 1, tokens: portableTokens };
      const cipher = cryptoFramework.createCipher('AES256|GCM|PKCS7');
      cipher.initSync(cryptoFramework.CryptoMode.ENCRYPT_MODE, key, params);
      const encrypted = cipher.updateSync({
        data: new util.TextEncoder().encodeInto(JSON.stringify(content))
      }).data;
      const authTag = cipher.doFinalSync(null).data;
      const base64 = new util.Base64Helper();
      // 外层仅保存解密所需的公开参数；Token、密码和派生密钥均不以明文出现。
      const backup: EncryptedBackup = {
        format: BackupService.FORMAT,
        version: 1,
        createdAt: Date.now(),
        iterations: BackupService.ITERATIONS,
        salt: base64.encodeToStringSync(salt, util.Type.BASIC),
        iv: base64.encodeToStringSync(iv, util.Type.BASIC),
        authTag: base64.encodeToStringSync(authTag, util.Type.BASIC),
        ciphertext: base64.encodeToStringSync(encrypted, util.Type.BASIC)
      };
      return JSON.stringify(backup);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`创建加密备份失败：${detail.message ?? '未知错误'}`);
    }
  }

  static async decrypt(serialized: string, password: string): Promise<StoredToken[]> {
    if (password.length === 0) {
      throw new Error('请输入备份密码');
    }
    const backup = JSON.parse(serialized) as EncryptedBackup;
    BackupService.validateBackup(backup);
    const base64 = new util.Base64Helper();
    const salt = base64.decodeSync(backup.salt, util.Type.BASIC);
    const iv = base64.decodeSync(backup.iv, util.Type.BASIC);
    const authTag = base64.decodeSync(backup.authTag, util.Type.BASIC);
    if (salt.length !== BackupService.SALT_SIZE || iv.length !== BackupService.IV_SIZE ||
      authTag.length !== BackupService.TAG_SIZE) {
      throw new Error('备份文件的加密参数无效');
    }
    const params: cryptoFramework.GcmParamsSpec = {
      iv: { data: iv },
      aad: { data: new util.TextEncoder().encodeInto(BackupService.AAD) },
      authTag: { data: authTag },
      algName: 'GcmParamsSpec'
    };
    let plaintext: Uint8Array;
    try {
      const keyBytes = await BackupService.deriveKey(password, salt, backup.iterations);
      const key = cryptoFramework.createSymKeyGenerator('AES256').convertKeySync({ data: keyBytes });
      const cipher = cryptoFramework.createCipher('AES256|GCM|PKCS7');
      cipher.initSync(cryptoFramework.CryptoMode.DECRYPT_MODE, key, params);
      plaintext = cipher.updateSync({
        data: base64.decodeSync(backup.ciphertext, util.Type.BASIC)
      }).data;
      cipher.doFinalSync(null);
    } catch (_) {
      throw new Error('无法解密备份：密码错误或文件已损坏');
    }
    let content: BackupContent;
    try {
      content = JSON.parse(new util.TextDecoder().decodeToString(plaintext)) as BackupContent;
    } catch (_) {
      throw new Error('备份已解密，但内容不是有效的 JSON');
    }
    return BackupService.validateContent(content);
  }

  static merge(current: StoredToken[], incoming: StoredToken[]): BackupMergeResult {
    // UUID 是合并主键：保留现有位置并覆盖内容，新 UUID 按备份顺序追加。
    const positions: Map<string, number> = new Map();
    const merged: StoredToken[] = current.map((token: StoredToken, index: number) => {
      positions.set(token.id, index);
      return token;
    });
    let added = 0;
    let updated = 0;
    incoming.forEach((token: StoredToken) => {
      const existing = positions.get(token.id);
      if (existing === undefined) {
        positions.set(token.id, merged.length);
        merged.push(token);
        added++;
      } else {
        merged[existing] = token;
        updated++;
      }
    });
    return { tokens: merged, added: added, updated: updated };
  }

  static async saveFile(context: common.UIAbilityContext, content: string): Promise<boolean> {
    const options = new picker.DocumentSaveOptions();
    const day = new Date().toISOString().substring(0, 10);
    options.newFileNames = [`authenticator-backup-${day}.authbackup`];
    options.fileSuffixChoices = ['Authenticator 加密备份|.authbackup'];
    const selected = await new picker.DocumentViewPicker(context).save(options);
    if (selected.length === 0) {
      return false;
    }
    let file: fs.File | undefined;
    let failure: Error | undefined;
    try {
      file = fs.openSync(selected[0], fs.OpenMode.WRITE_ONLY | fs.OpenMode.TRUNC);
      fs.writeSync(file.fd, content);
    } catch (error) {
      const detail = error as BusinessError;
      failure = new Error(`写入备份文件失败：${detail.message ?? '未知错误'}`);
    }
    if (file !== undefined) {
      try {
        fs.closeSync(file.fd);
      } catch (error) {
        if (failure === undefined) {
          const detail = error as BusinessError;
          failure = new Error(`关闭备份文件失败：${detail.message ?? '未知错误'}`);
        }
      }
    }
    if (failure !== undefined) {
      throw failure;
    }
    return true;
  }

  static async pickFile(context: common.UIAbilityContext): Promise<string> {
    const options = new picker.DocumentSelectOptions();
    options.maxSelectNumber = 1;
    options.fileSuffixFilters = ['.authbackup', '.json'];
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
      // 当前实现整文件读入内存，大小上限用于防止错误或恶意文件造成内存压力。
      if (size <= 0 || size > BackupService.MAX_FILE_SIZE) {
        throw new Error('备份文件为空或超过 8MB');
      }
      const buffer = new ArrayBuffer(size);
      const count = fs.readSync(file.fd, buffer);
      content = new util.TextDecoder().decodeToString(new Uint8Array(buffer.slice(0, count)));
    } catch (error) {
      const detail = error as BusinessError;
      failure = new Error(`读取备份文件失败：${detail.message ?? '未知错误'}`);
    }
    if (file !== undefined) {
      try {
        fs.closeSync(file.fd);
      } catch (error) {
        if (failure === undefined) {
          const detail = error as BusinessError;
          failure = new Error(`关闭备份文件失败：${detail.message ?? '未知错误'}`);
        }
      }
    }
    if (failure !== undefined) {
      throw failure;
    }
    return content;
  }

  private static async deriveKey(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
    // 随机 salt 防止相同密码产生相同密钥；迭代次数提高离线猜测成本。
    const spec: cryptoFramework.PBKDF2Spec = {
      algName: 'PBKDF2',
      password: password,
      salt: salt,
      iterations: iterations,
      keySize: 32
    };
    try {
      return (await cryptoFramework.createKdf('PBKDF2|SHA256').generateSecret(spec)).data;
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`派生备份密钥失败：${detail.message ?? '未知错误'}`);
    }
  }

  private static validatePassword(password: string): void {
    if (password.length < 8) {
      throw new Error('备份密码至少需要 8 个字符');
    }
  }

  private static validateBackup(backup: EncryptedBackup): void {
    if (!backup || backup.format !== BackupService.FORMAT || backup.version !== 1 ||
      !backup.salt || !backup.iv || !backup.authTag || !backup.ciphertext) {
      throw new Error('这不是受支持的 Authenticator 加密备份');
    }
    if (!Number.isInteger(backup.iterations) || backup.iterations < 10000 || backup.iterations > 1000000) {
      throw new Error('备份文件的密钥派生参数无效');
    }
  }

  private static validateContent(content: BackupContent): StoredToken[] {
    if (!content || content.version !== 1 || !Array.isArray(content.tokens)) {
      throw new Error('备份内容格式无效');
    }
    const ids: Set<string> = new Set();
    content.tokens.forEach((token: StoredToken) => {
      if (!token || typeof token.id !== 'string' || typeof token.issuer !== 'string' ||
        typeof token.account !== 'string' ||
        typeof token.secret !== 'string' || (token.kind !== TokenKind.TOTP && token.kind !== TokenKind.STEAM) ||
        !Number.isInteger(token.period) || token.period < 1 || token.period > 300) {
        throw new Error('备份中包含无效的 Token 数据');
      }
      if (!TokenId.isUuid(token.id)) {
        throw new Error('备份中包含无效的 Token UUID');
      }
      token.id = token.id.toLowerCase();
      if (ids.has(token.id)) {
        throw new Error('备份中包含重复的 Token UUID');
      }
      ids.add(token.id);
    });
    return content.tokens;
  }
}
