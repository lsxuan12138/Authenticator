import { common } from '@kit.AbilityKit';
import { preferences } from '@kit.ArkData';
import { StoredToken } from '../domain/Token';
import { SecureTokenVault } from '../security/SecureTokenVault';
import { TokenId } from '../core/TokenId';

/**
 * Token 持久化边界。
 * Preferences 只保存 SecureTokenVault 生成的密文；调用方始终操作完整的 StoredToken 数组。
 */
export class TokenRepository {
  private static readonly STORE_NAME: string = 'authenticator_v1';
  private static readonly ENCRYPTED_TOKENS_KEY: string = 'tokens_encrypted_v2';
  private store?: preferences.Preferences;
  private readonly vault: SecureTokenVault = new SecureTokenVault();

  async open(context: common.UIAbilityContext): Promise<void> {
    this.store = await preferences.getPreferences(context, TokenRepository.STORE_NAME);
  }

  async list(): Promise<StoredToken[]> {
    if (!this.store) return [];
    const encrypted = await this.store.get(TokenRepository.ENCRYPTED_TOKENS_KEY, '') as string;
    if (!encrypted) return [];
    const raw = await this.vault.decrypt(encrypted);
    return this.parseTokens(raw);
  }

  async save(items: StoredToken[]): Promise<void> {
    if (!this.store) throw new Error('数据仓库尚未初始化');
    const raw = JSON.stringify(items);
    const encrypted = await this.vault.encrypt(raw);
    // 写入前、flush 后各校验一次，避免损坏数据替换最后一份可用状态。
    await this.verifyEncryptedData(encrypted, raw);
    await this.store.put(TokenRepository.ENCRYPTED_TOKENS_KEY, encrypted);
    await this.store.flush();
    await this.verifyStoredData(raw);
  }

  private parseTokens(raw: string): StoredToken[] {
    // JSON.parse 成功并不代表根节点类型正确，仓库只接受数组。
    const items = JSON.parse(raw) as StoredToken[];
    if (!Array.isArray(items)) throw new Error('Token 数据格式无效');
    if (items.some((token: StoredToken) => !token || !TokenId.isUuid(token.id))) {
      throw new Error('Token 数据包含无效 UUID');
    }
    return items;
  }

  private async verifyEncryptedData(encrypted: string, expected: string): Promise<void> {
    const decrypted = await this.vault.decrypt(encrypted);
    this.parseTokens(decrypted);
    if (decrypted !== expected) throw new Error('Token 加密数据校验失败');
  }

  private async verifyStoredData(expected: string): Promise<void> {
    if (!this.store) throw new Error('数据仓库尚未初始化');
    const encrypted = await this.store.get(TokenRepository.ENCRYPTED_TOKENS_KEY, '') as string;
    if (!encrypted) throw new Error('Token 加密数据写入失败');
    await this.verifyEncryptedData(encrypted, expected);
  }
}
