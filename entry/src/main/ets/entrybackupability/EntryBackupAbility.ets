import { hilog } from '@kit.PerformanceAnalysisKit';
import { BackupExtensionAbility, BundleVersion } from '@kit.CoreFileKit';

const DOMAIN = 0x0000;

/**
 * HarmonyOS 系统备份扩展的生命周期入口。
 * Token 不在这里交给系统明文备份；跨设备迁移统一使用应用内的密码加密导入/导出。
 */
export default class EntryBackupAbility extends BackupExtensionAbility {
  /** 系统备份回调；敏感 Token 不进入系统明文备份，用户应使用应用内加密备份。 */
  async onBackup() {
    hilog.info(DOMAIN, 'testTag', 'onBackup ok');
    await Promise.resolve();
  }

  /** 系统恢复回调；保持沙箱密钥策略，不自动恢复跨设备不可解密的数据。 */
  async onRestore(bundleVersion: BundleVersion) {
    hilog.info(DOMAIN, 'testTag', 'onRestore ok %{public}s', JSON.stringify(bundleVersion));
    await Promise.resolve();
  }
}
