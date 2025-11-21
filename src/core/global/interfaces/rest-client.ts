import type { RestResponse } from '../responses/rest-response'

export type RestClientRequestConfig = {
  responseType?: 'json' | 'blob' | 'arraybuffer'
  headers?: Record<string, string>
}

export interface RestClient {
  get<ResponseBody>(
    url: string,
    config?: RestClientRequestConfig,
  ): Promise<RestResponse<ResponseBody>>
  post<ResponseBody>(
    url: string,
    body?: unknown,
    config?: RestClientRequestConfig,
  ): Promise<RestResponse<ResponseBody>>
  patch<ResponseBody>(
    url: string,
    body?: unknown,
    config?: RestClientRequestConfig,
  ): Promise<RestResponse<ResponseBody>>
  put<ResponseBody>(
    url: string,
    body?: unknown,
    config?: RestClientRequestConfig,
  ): Promise<RestResponse<ResponseBody>>
  delete(url: string, config?: RestClientRequestConfig): Promise<RestResponse>
  setBaseUrl(url: string): void
  setHeader(key: string, value: string): void
  setAuthorization(token: string): void
  setQueryParam(key: string, value: string | string[]): void
  setQueryParams(params: Record<string, string | string[]>): void
  clearQueryParams(): void
}
