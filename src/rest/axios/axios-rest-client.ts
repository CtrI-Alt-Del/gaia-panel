import Axios from 'axios'
import type {
  RestClient,
  RestClientRequestConfig,
} from '../../core/global/interfaces/rest-client'
import type { RestResponse } from '../../core/global/responses/rest-response'
import { buildUrl, createRestResponse, handleError } from './utils'

export const AxiosRestClient = (baseUrl?: string): RestClient => {
  const axios = Axios.create()
  let currentBaseUrl: string = ''
  const queryParams: Record<string, string | string[]> = {}

  if (baseUrl) {
    currentBaseUrl = baseUrl
    axios.defaults.baseURL = baseUrl
    axios.defaults.headers.common['Content-Type'] = 'application/json'
  }

  return {
    async get<ResponseBody>(
      url: string,
      config?: RestClientRequestConfig,
    ): Promise<RestResponse<ResponseBody>> {
      try {
        const response = await axios.get<ResponseBody>(
          buildUrl(currentBaseUrl, url, queryParams),
          mapAxiosConfig(config),
        )
        return createRestResponse<ResponseBody>(response)
      } catch (error) {
        return handleError<ResponseBody>(error)
      }
    },

    async post<ResponseBody>(
      url: string,
      body?: unknown,
      config?: RestClientRequestConfig,
    ): Promise<RestResponse<ResponseBody>> {
      try {
        const response = await axios.post<ResponseBody>(
          buildUrl(currentBaseUrl, url, queryParams),
          body,
          mapAxiosConfig(config),
        )
        return createRestResponse<ResponseBody>(response)
      } catch (error) {
        return handleError<ResponseBody>(error)
      }
    },

    async patch<ResponseBody>(
      url: string,
      body?: unknown,
      config?: RestClientRequestConfig,
    ): Promise<RestResponse<ResponseBody>> {
      try {
        const response = await axios.patch<ResponseBody>(
          buildUrl(currentBaseUrl, url, queryParams),
          body,
          mapAxiosConfig(config),
        )
        return createRestResponse<ResponseBody>(response)
      } catch (error) {
        return handleError<ResponseBody>(error)
      }
    },

    async put<ResponseBody>(
      url: string,
      body?: unknown,
      config?: RestClientRequestConfig,
    ): Promise<RestResponse<ResponseBody>> {
      try {
        const response = await axios.put<ResponseBody>(
          buildUrl(currentBaseUrl, url, queryParams),
          body,
          mapAxiosConfig(config),
        )
        return createRestResponse<ResponseBody>(response)
      } catch (error) {
        return handleError<ResponseBody>(error)
      }
    },

    async delete(
      url: string,
      config?: RestClientRequestConfig,
    ): Promise<RestResponse> {
      try {
        const response = await axios.delete(
          buildUrl(currentBaseUrl, url, queryParams),
          mapAxiosConfig(config),
        )
        return createRestResponse(response)
      } catch (error) {
        return handleError(error)
      }
    },

    setBaseUrl(url: string): void {
      currentBaseUrl = url
      axios.defaults.baseURL = url
    },

    setHeader(key: string, value: string): void {
      axios.defaults.headers.common[key] = value
    },

    setAuthorization(token: string): void {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },

    setQueryParam(key: string, value: string | string[]): void {
      queryParams[key] = value
    },

    setQueryParams(params: Record<string, string | string[]>): void {
      Object.assign(queryParams, params)
    },

    clearQueryParams(): void {
      Object.keys(queryParams).forEach((key) => {
        delete queryParams[key]
      })
    },
  }
}

function mapAxiosConfig(config?: RestClientRequestConfig) {
  if (!config) return undefined

  return {
    responseType: config.responseType,
    headers: config.headers,
  }
}
