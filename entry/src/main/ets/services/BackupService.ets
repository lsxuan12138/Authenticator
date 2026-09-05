import { common } from '@kit.AbilityKit';
import { cryptoFramework } from '@kit.CryptoArchitectureKit';
import { fileIo as fs, picker } from '@kit.CoreFileKit';
import { util } from '@kit.ArkTS';
import { BusinessError } from '@kit.BasicServicesKit';
import { StoredToken } from '../domain/Token';
import { TokenDuplicateGuard } from '../core/TokenDuplicateGuard';
import { TokenValidator } from '../core/TokenValidator';
import { AppError } from '../core/AppError';

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
  skipped: number;
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

  /** 将可移植 Token 字段序列化并用用户密码派生的 AES-GCM 密钥创建备份。 */
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
          algorithm: token.algorithm,
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
      const serialized = JSON.stringify(backup);
      if (new util.TextEncoder().encodeInto(serialized).length > BackupService.MAX_FILE_SIZE) {
        throw new AppError('backup_error_content_too_large', 'Backup content exceeds 8 MB');
      }
      return serialized;
    } catch (error) {
      const detail = error as BusinessError;
      if (error instanceof AppError) throw error;
      throw new AppError('backup_error_create', `Failed to create encrypted backup: ${detail.message ?? 'unknown'}`);
    }
  }

  /** 校验备份格式和认证标签后解密；密码错误与文件损坏统一作为不可信输入处理。 */
  static async decrypt(serialized: string, password: string): Promise<StoredToken[]> {
    if (password.length === 0) {
      throw new AppError('backup_error_password_required', 'Backup password is required');
    }
    const backup = JSON.parse(serialized) as EncryptedBackup;
    BackupService.validateBackup(backup);
    const base64 = new util.Base64Helper();
    const salt = base64.decodeSync(backup.salt, util.Type.BASIC);
    const iv = base64.decodeSync(backup.iv, util.Type.BASIC);
    const authTag = base64.decodeSync(backup.authTag, util.Type.BASIC);
    if (salt.length !== BackupService.SALT_SIZE || iv.length !== BackupService.IV_SIZE ||
      authTag.length !== BackupService.TAG_SIZE) {
      throw new AppError('backup_error_crypto_parameters', 'Backup encryption parameters are invalid');
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
      throw new AppError('backup_error_decrypt', 'Backup password is incorrect or the file is damaged');
    }
    let content: BackupContent;
    try {
      content = JSON.parse(new util.TextDecoder().decodeToString(plaintext)) as BackupContent;
    } catch (_) {
      throw new AppError('backup_error_plaintext_json', 'Decrypted backup content is not valid JSON');
    }
    return BackupService.validateContent(content);
  }

  /** 按 UUID 和验证码配置合并恢复数据，并统计跳过的重复条目。 */
  static merge(current: StoredToken[], incoming: StoredToken[]): BackupMergeResult {
    // UUID 是合并主键：保留现有位置并覆盖内容，新 UUID 按备份顺序追加。
    const positions: Map<string, number> = new Map();
    const merged: StoredToken[] = current.map((token: StoredToken, index: number) => {
      positions.set(token.id, index);
      return token;
    });
    let added = 0;
    let updated = 0;
    let skipped = 0;
    incoming.forEach((token: StoredToken) => {
      const existing = positions.get(token.id);
      if (existing === undefined) {
        if (merged.some((currentToken: StoredToken): boolean =>
          TokenDuplicateGuard.isSameConfiguration(currentToken, token))) {
          skipped++;
          return;
        }
        positions.set(token.id, merged.length);
        merged.push(token);
        added++;
      } else {
        // 同 UUID 的记录通常表示更新，但不能让它覆盖成另一条现有记录的验证码配置。
        if (merged.some((currentToken: StoredToken, index: number): boolean =>
          index !== existing && TokenDuplicateGuard.isSameConfiguration(currentToken, token))) {
          skipped++;
          return;
        }
        merged[existing] = token;
        updated++;
      }
    });
    return { tokens: merged, added: added, updated: updated, skipped: skipped };
  }

  /** 调用系统文件选择器保存加密备份；用户取消时返回 false。 */
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
    let failure: AppError | undefined;
    try {
      file = fs.openSync(selected[0], fs.OpenMode.WRITE_ONLY | fs.OpenMode.TRUNC);
      fs.writeSync(file.fd, content);
    } catch (error) {
      const detail = error as BusinessError;
      failure = new AppError('backup_error_write', `Failed to write backup file: ${detail.message ?? 'unknown'}`);
    }
    if (file !== undefined) {
      try {
        fs.closeSync(file.fd);
      } catch (error) {
        if (failure === undefined) {
          const detail = error as BusinessError;
          failure = new AppError('backup_error_close', `Failed to close backup file: ${detail.message ?? 'unknown'}`);
        }
      }
    }
    if (failure !== undefined) {
      throw failure;
    }
    return true;
  }

  /** 选择并限量读取备份文件，防止异常大文件占用过多内存。 */
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
    let failure: AppError | undefined;
    try {
      file = fs.openSync(selected[0], fs.OpenMode.READ_ONLY);
      const size = fs.statSync(file.fd).size;
      // 当前实现整文件读入内存，大小上限用于防止错误或恶意文件造成内存压力。
      if (size <= 0 || size > BackupService.MAX_FILE_SIZE) {
        throw new AppError('backup_error_file_size', 'Backup file is empty or exceeds 8 MB');
      }
      const buffer = new ArrayBuffer(size);
      const count = fs.readSync(file.fd, buffer);
      content = new util.TextDecoder().decodeToString(new Uint8Array(buffer.slice(0, count)));
    } catch (error) {
      const detail = error as BusinessError;
      failure = error instanceof AppError ? error :
        new AppError('backup_error_read', `Failed to read backup file: ${detail.message ?? 'unknown'}`);
    }
    if (file !== undefined) {
      try {
        fs.closeSync(file.fd);
      } catch (error) {
        if (failure === undefined) {
          const detail = error as BusinessError;
          failure = new AppError('backup_error_close', `Failed to close backup file: ${detail.message ?? 'unknown'}`);
        }
      }
    }
    if (failure !== undefined) {
      throw failure;
    }
    return content;
  }

  /** 使用 PBKDF2-HMAC-SHA256 从备份密码和随机盐派生 256 位密钥。 */
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
      throw new AppError('backup_error_key_derivation', `Failed to derive backup key: ${detail.message ?? 'unknown'}`);
    }
  }

  /** 统一约束备份密码的最低长度，避免弱口令直接进入派生流程。 */
  private static validatePassword(password: string): void {
    if (password.length < 8) {
      throw new AppError('backup_error_password_length', 'Backup password must contain at least 8 characters');
    }
  }

  /** 校验外层备份版本、算法参数和 Base64 字段是否完整。 */
  private static validateBackup(backup: EncryptedBackup): void {
    if (!backup || backup.format !== BackupService.FORMAT || backup.version !== 1 ||
      !backup.salt || !backup.iv || !backup.authTag || !backup.ciphertext) {
      throw new AppError('backup_error_unsupported', 'This is not a supported Authenticator encrypted backup');
    }
    if (!Number.isInteger(backup.iterations) || backup.iterations < 10000 || backup.iterations > 1000000) {
      throw new AppError('backup_error_kdf_parameters', 'Backup key derivation parameters are invalid');
    }
  }

  /** 校验解密后的内容版本、数组结构及每个 Token 的 UUID。 */
  private static validateContent(content: BackupContent): StoredToken[] {
    if (!content || content.version !== 1 || !Array.isArray(content.tokens)) {
      throw new AppError('backup_error_content_invalid', 'Backup content format is invalid');
    }
    try {
      return TokenValidator.normalizeAll(content.tokens);
    } catch (error) {
      throw new AppError('backup_error_token_data', `Backup contains invalid token data: ${(error as Error).message}`);
    }
  }
}
