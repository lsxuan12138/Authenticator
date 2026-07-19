import { BusinessError } from '@kit.BasicServicesKit';
import { http } from '@kit.NetworkKit';
import { util } from '@kit.ArkTS';
import { DiagnosticLogService } from './DiagnosticLogService';
import { SteamResult } from './SteamResult';

/** 所有 Steam HTTP 请求使用的稳定响应对象。 */
export interface SteamTextResponse {
  body: string;
  responseCode: number;
  eResult: string;
}

/** 本应用实际会设置的 Steam HTTP 请求头。 */
export interface SteamHttpHeaders {
  'Content-Type'?: string;
  'Accept'?: string;
  'Cookie'?: string;
  'X-Requested-With'?: string;
}

/**
 * Steam 联网功能的唯一 Network Kit 入口。
 * 统一负责超时、HTTP 状态、x-eresult、protobuf 包装、诊断日志与 HttpRequest 释放。
 */
export class SteamWebApiClient {
  private static readonly TIMEOUT: number = 15000;

  /** 调用 IAuthenticationService/ITwoFactorService 的 protobuf Web API。 */
  static async protobuf(service: string, method: string, payload: Uint8Array,
    accessToken: string = '', acceptedResults: string[] = ['1', 'OK']): Promise<Uint8Array> {
    const encoded = new util.Base64Helper().encodeToStringSync(payload, util.Type.BASIC);
    const suffix = accessToken.length > 0 ? `?access_token=${encodeURIComponent(accessToken)}` : '';
    const url = `https://api.steampowered.com/I${service}Service/${method}/v1/${suffix}`;
    const request = http.createHttp();
    try {
      DiagnosticLogService.info('SteamWebApi', `${service}.${method} request`);
      const response = await request.request(url, {
        method: http.RequestMethod.POST,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/octet-stream'
        },
        extraData: `input_protobuf_encoded=${encodeURIComponent(encoded)}`,
        expectDataType: http.HttpDataType.ARRAY_BUFFER,
        connectTimeout: SteamWebApiClient.TIMEOUT,
        readTimeout: SteamWebApiClient.TIMEOUT
      });
      const eResult = SteamWebApiClient.eResult(response.header);
      SteamWebApiClient.validate(service, method, response.responseCode, eResult, acceptedResults, true);
      return new Uint8Array(response.result as ArrayBuffer);
    } catch (error) {
      throw SteamWebApiClient.requestError(`${service}.${method}`, error as Object);
    } finally {
      request.destroy();
    }
  }

  /** 执行返回 JSON 的 GET 请求；移动确认列表使用该入口。 */
  static async getJson(label: string, url: string,
    header: SteamHttpHeaders = {}): Promise<Record<string, Object>> {
    const response = await SteamWebApiClient.requestText(label, url, http.RequestMethod.GET, '', header);
    return SteamWebApiClient.parseJson(label, response);
  }

  /** 执行表单 POST 并解析 JSON；移动确认操作使用该入口。 */
  static async postFormJson(label: string, url: string, data: string,
    header: SteamHttpHeaders = {}): Promise<Record<string, Object>> {
    const response = await SteamWebApiClient.requestText(label, url, http.RequestMethod.POST, data, header);
    return SteamWebApiClient.parseJson(label, response);
  }

  /** 执行不依赖响应体的表单 POST，同时严格校验 Steam 协议结果码。 */
  static async postForm(label: string, url: string, data: string, header: SteamHttpHeaders = {},
    requireEResult: boolean = false): Promise<void> {
    await SteamWebApiClient.requestText(label, url, http.RequestMethod.POST, data, header, requireEResult);
  }

  /** Network Kit 文本请求的共同实现，不让业务服务直接接触 HttpRequest。 */
  private static async requestText(label: string, url: string, method: http.RequestMethod,
    data: string, header: SteamHttpHeaders, requireEResult: boolean = false): Promise<SteamTextResponse> {
    const request = http.createHttp();
    try {
      DiagnosticLogService.info('SteamWebApi', `${label} request`);
      const response = await request.request(url, {
        method: method,
        header: header,
        extraData: data,
        expectDataType: http.HttpDataType.STRING,
        connectTimeout: SteamWebApiClient.TIMEOUT,
        readTimeout: SteamWebApiClient.TIMEOUT
      });
      const eResult = SteamWebApiClient.eResult(response.header);
      SteamWebApiClient.validate('HTTP', label, response.responseCode, eResult, ['1', 'OK'], requireEResult);
      return {
        body: typeof response.result === 'string' ? response.result : '',
        responseCode: response.responseCode,
        eResult: eResult
      };
    } catch (error) {
      throw SteamWebApiClient.requestError(label, error as Object);
    } finally {
      request.destroy();
    }
  }

  /** 同时验证 HTTP 和 Steam EResult，错误中保留原始协议码。 */
  private static validate(service: string, method: string, responseCode: number, eResult: string,
    acceptedResults: string[], requireEResult: boolean): void {
    DiagnosticLogService.info('SteamWebApi',
      `${service}.${method} response: HTTP=${responseCode}, EResult=${eResult || 'missing'}`);
    if (responseCode < 200 || responseCode >= 300) {
      throw new Error(`Steam ${method} 请求失败（HTTP ${responseCode}）`);
    }
    if (requireEResult && eResult.length === 0) {
      throw new Error(`Steam ${method} 响应缺少 x-eresult`);
    }
    if (eResult.length > 0 && !acceptedResults.includes(eResult)) {
      throw new Error(SteamResult.message(eResult, `Steam ${method} 请求失败`));
    }
  }

  /** 解析 JSON，并把代理页或异常响应转成可诊断错误。 */
  private static parseJson(label: string, response: SteamTextResponse): Record<string, Object> {
    try {
      return JSON.parse(response.body) as Record<string, Object>;
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.error('SteamWebApi',
        `${label} returned invalid JSON: length=${response.body.length}, message=${detail.message ?? 'unknown'}`);
      throw new Error(`Steam ${label} 返回了无法解析的数据（HTTP ${response.responseCode}）`);
    }
  }

  /** Network Kit 把 header 暴露为 Object；序列化后兼容字符串、数字和单元素数组值。 */
  private static eResult(header: Object): string {
    const text = JSON.stringify(header);
    const match = text.match(
      /"x-eresult"\s*:\s*(?:"([^"\\]*)"|(\d+)|\[\s*(?:"([^"\\]*)"|(\d+))\s*\])/i);
    if (match === null) {
      return '';
    }
    return match[1] || match[2] || match[3] || match[4] || '';
  }

  /** 统一记录 Network Kit 与协议错误，避免在多个服务中重复包装。 */
  private static requestError(label: string, error: Object): Error {
    const detail = error as BusinessError;
    const message = detail.message ?? `${error}`;
    DiagnosticLogService.error('SteamWebApi',
      `${label} failed: code=${detail.code !== undefined ? detail.code : 'unknown'}, message=${message}`);
    if (message.startsWith('Steam ')) {
      return new Error(message);
    }
    return new Error(`Steam ${label} 网络请求失败：${message}`);
  }
}
