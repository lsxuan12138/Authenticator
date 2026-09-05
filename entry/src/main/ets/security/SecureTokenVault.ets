import { cryptoFramework } from '@kit.CryptoArchitectureKit';
import { asset } from '@kit.AssetStoreKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { util } from '@kit.ArkTS';

interface EncryptedTokenPayload {
  version: number;
  iv: string;
  authTag: string;
  ciphertext: string;
}

/**
 * 本机 Token 信封加密实现。
 * 随机 256 bit 主密钥存入 Asset Store，任意长度的 Token JSON 使用 AES-256-GCM 加密后
 * 再写入 Preferences。这样既使用系统安全服务保护密钥，也不受 Asset 单条秘密 1KB 的限制。
 */
export class SecureTokenVault {
  private static readonly MASTER_KEY_ALIAS: string = 'authenticator.token-master-key.v1';
  private static readonly DEFAULT_AAD: string = 'authenticator.tokens.v2';
  private static readonly KEY_SIZE: number = 32;
  private static readonly IV_SIZE: number = 12;
  private static readonly TAG_SIZE: number = 16;
  private readonly encoder: util.TextEncoder = new util.TextEncoder();
  private readonly decoder: util.TextDecoder = new util.TextDecoder();
  private readonly base64: util.Base64Helper = new util.Base64Helper();

  /** 使用 Asset Store 中的主密钥和随机 IV 将 Token JSON 加密为版本化载荷。 */
  async encrypt(plaintext: string, aad: string = SecureTokenVault.DEFAULT_AAD): Promise<string> {
    try {
      const keyBytes = await this.loadOrCreateMasterKey();
      const iv = cryptoFramework.createRandom().generateRandomSync(SecureTokenVault.IV_SIZE).data;
      const cipher = cryptoFramework.createCipher('AES256|GCM|PKCS7');
      const key = cryptoFramework.createSymKeyGenerator('AES256').convertKeySync({ data: keyBytes });
      // AAD 不加密，但会参与认证；版本或用途不匹配时解密必然失败。
      const params: cryptoFramework.GcmParamsSpec = {
        iv: { data: iv },
        aad: { data: this.encoder.encodeInto(aad) },
        authTag: { data: new Uint8Array(SecureTokenVault.TAG_SIZE) },
        algName: 'GcmParamsSpec'
      };

      cipher.initSync(cryptoFramework.CryptoMode.ENCRYPT_MODE, key, params);
      const ciphertext = cipher.updateSync({ data: this.encoder.encodeInto(plaintext) }).data;
      const authTag = cipher.doFinalSync(null).data;
      const payload: EncryptedTokenPayload = {
        version: 1,
        iv: this.base64.encodeToStringSync(iv, util.Type.BASIC),
        authTag: this.base64.encodeToStringSync(authTag, util.Type.BASIC),
        ciphertext: this.base64.encodeToStringSync(ciphertext, util.Type.BASIC)
      };
      return JSON.stringify(payload);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`加密 Token 数据失败：${detail.message ?? '未知错误'}`);
    }
  }

  /** 验证 AES-GCM 标签并解密持久化载荷，认证失败时不返回任何明文。 */
  async decrypt(serialized: string, aad: string = SecureTokenVault.DEFAULT_AAD): Promise<string> {
    try {
      const payload = JSON.parse(serialized) as EncryptedTokenPayload;
      this.validatePayload(payload);
      const keyBytes = await this.loadExistingMasterKey();
      const key = cryptoFramework.createSymKeyGenerator('AES256').convertKeySync({ data: keyBytes });
      const params: cryptoFramework.GcmParamsSpec = {
        iv: { data: this.base64.decodeSync(payload.iv, util.Type.BASIC) },
        aad: { data: this.encoder.encodeInto(aad) },
        authTag: { data: this.base64.decodeSync(payload.authTag, util.Type.BASIC) },
        algName: 'GcmParamsSpec'
      };
      const cipher = cryptoFramework.createCipher('AES256|GCM|PKCS7');
      cipher.initSync(cryptoFramework.CryptoMode.DECRYPT_MODE, key, params);
      const plaintext = cipher.updateSync({
        data: this.base64.decodeSync(payload.ciphertext, util.Type.BASIC)
      }).data;
      // doFinalSync 会验证 GCM 认证标签；密文被修改时此处抛出异常。
      cipher.doFinalSync(null);
      return this.decoder.decodeToString(plaintext);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`解密 Token 数据失败：${detail.message ?? '数据损坏或密钥不可用'}`);
    }
  }

  /** 在进入密码学 API 前检查载荷版本、必需字段和二进制长度。 */
  private validatePayload(payload: EncryptedTokenPayload): void {
    if (!payload || payload.version !== 1 || !payload.iv || !payload.authTag || !payload.ciphertext) {
      throw new Error('加密 Token 数据格式无效');
    }
    const iv = this.base64.decodeSync(payload.iv, util.Type.BASIC);
    const authTag = this.base64.decodeSync(payload.authTag, util.Type.BASIC);
    if (iv.length !== SecureTokenVault.IV_SIZE || authTag.length !== SecureTokenVault.TAG_SIZE) {
      throw new Error('加密 Token 参数无效');
    }
  }

  /** 读取现有主密钥；首次运行时生成并写入系统 Asset Store。 */
  private async loadOrCreateMasterKey(): Promise<Uint8Array> {
    const existing = await this.queryMasterKey();
    if (existing) {
      return existing;
    }

    try {
      const generated = cryptoFramework.createRandom().generateRandomSync(SecureTokenVault.KEY_SIZE).data;
      const attributes: asset.AssetMap = new Map();
      attributes.set(asset.Tag.SECRET, generated);
      attributes.set(asset.Tag.ALIAS, this.encoder.encodeInto(SecureTokenVault.MASTER_KEY_ALIAS));
      // 首次解锁后可访问，且明确禁止跨设备同步；卸载应用时密钥随应用数据删除。
      attributes.set(asset.Tag.ACCESSIBILITY, asset.Accessibility.DEVICE_FIRST_UNLOCKED);
      attributes.set(asset.Tag.SYNC_TYPE, asset.SyncType.NEVER);
      attributes.set(asset.Tag.CONFLICT_RESOLUTION, asset.ConflictResolution.THROW_ERROR);
      await asset.add(attributes);
      return generated;
    } catch (error) {
      const detail = error as BusinessError;
      // 并发首次保存时另一个调用可能已创建密钥，重复错误应重新读取而不能覆盖。
      if (detail.code === asset.ErrorCode.DUPLICATED) {
        return await this.loadExistingMasterKey();
      }
      throw new Error(`创建安全主密钥失败：${detail.message}`);
    }
  }

  /** 在并发创建发生重复时重新读取胜出的 Asset Store 主密钥。 */
  private async loadExistingMasterKey(): Promise<Uint8Array> {
    const existing = await this.queryMasterKey();
    if (!existing) {
      throw new Error('安全主密钥不存在，无法读取 Token 数据');
    }
    return existing;
  }

  /** 查询并校验 Asset Store 中保存的固定长度主密钥。 */
  private async queryMasterKey(): Promise<Uint8Array | undefined> {
    const query: asset.AssetMap = new Map();
    query.set(asset.Tag.ALIAS, this.encoder.encodeInto(SecureTokenVault.MASTER_KEY_ALIAS));
    query.set(asset.Tag.RETURN_TYPE, asset.ReturnType.ALL);
    try {
      const results = await asset.query(query);
      if (results.length === 0) {
        return undefined;
      }
      const secret = results[0].get(asset.Tag.SECRET) as Uint8Array;
      if (!secret || secret.length !== SecureTokenVault.KEY_SIZE) {
        throw new Error('安全主密钥格式无效');
      }
      return secret;
    } catch (error) {
      const detail = error as BusinessError;
      if (detail.code === asset.ErrorCode.NOT_FOUND) {
        return undefined;
      }
      throw new Error(`读取安全主密钥失败：${detail.message}`);
    }
  }
}
