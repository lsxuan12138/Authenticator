import { abilityDelegatorRegistry } from '@kit.TestKit';
import { describe, it, expect } from '@ohos/hypium';

/** 真机测试包的最小启动检查，确认测试运行在目标应用而非模板 bundle 上。 */
export default function abilityTest(): void {
  describe('ApplicationSmoke', (): void => {
    it('usesExpectedBundle', 0, (): void => {
      const argumentsInfo = abilityDelegatorRegistry.getArguments();
      expect(argumentsInfo.bundleName).assertEqual('com.lsxuan.authenticator');
    });
  });
}
