import { BusinessError } from '@kit.BasicServicesKit';
import { DiagnosticLogService } from './DiagnosticLogService';
import { SteamProtocol } from './SteamProtocol';
import { SteamWebApiClient } from './SteamWebApiClient';

/**
 * 为所有依赖时间签名的 Steam 功能提供统一的服务端校时。
 * 偏差只缓存在当前进程，不写入 Token；应用重启或缓存过期后会重新探测。
 */
export class SteamTimeService {
  private static readonly OFFSET_TTL: number = 12 * 60 * 60 * 1000;
  private static offsetSeconds: number = 0;
  private static offsetExpiresAt: number = 0;

  /** 返回经过 Steam 校准的 Unix 秒；探测失败时短暂回退到系统时间。 */
  static async now(): Promise<number> {
    const now = Date.now();
    if (now < SteamTimeService.offsetExpiresAt) {
      return Math.floor(now / 1000) + SteamTimeService.offsetSeconds;
    }
    const sentAt = Date.now();
    try {
      const payload = SteamProtocol.encodeTime(Math.floor(sentAt / 1000));
      const response = await SteamWebApiClient.protobuf('TwoFactor', 'QueryTime', payload);
      const receivedAt = Date.now();
      const result = SteamProtocol.decodeTime(response);
      if (!Number.isFinite(result.serverTime) || result.serverTime <= 0) {
        throw new Error('Steam 未返回有效服务器时间');
      }
      // 使用请求往返的中点近似服务端采样时刻，避免把全部网络延迟计入时钟偏差。
      const midpoint = Math.floor((sentAt + receivedAt) / 2000);
      SteamTimeService.offsetSeconds = result.serverTime - midpoint;
      SteamTimeService.offsetExpiresAt = receivedAt + SteamTimeService.OFFSET_TTL;
      DiagnosticLogService.info('SteamTime',
        `Server time synchronized, offset=${SteamTimeService.offsetSeconds}s, ` +
        `tolerance=${result.skewToleranceSeconds}s`);
    } catch (error) {
      const detail = error as BusinessError;
      SteamTimeService.offsetSeconds = 0;
      // 失败也短暂缓存，避免一次批量操作反复触发相同的失败请求。
      SteamTimeService.offsetExpiresAt = Date.now() + 60 * 1000;
      DiagnosticLogService.warn('SteamTime',
        `Server time synchronization failed; using system time: ${detail.message ?? 'unknown'}`);
    }
    return Math.floor(Date.now() / 1000) + SteamTimeService.offsetSeconds;
  }
}
