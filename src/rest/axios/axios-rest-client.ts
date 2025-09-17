import axios, { type AxiosInstance } from 'axios'
import type { RestClient } from '../../core/global/interfaces/rest-client'
import type { RestResponse } from '../../core/global/responses/rest-response'
import { buildUrl, createRestResponse, handleError } from './utils'

export const AxiosRestClient = (baseUrl?: string): RestClient => {
  const axiosInstance: AxiosInstance = axios.create()
  let currentBaseUrl: string = ''
  const queryParams: Record<string, string | string[]> = {}

  if (baseUrl) {
    currentBaseUrl = baseUrl
    axiosInstance.defaults.baseURL = baseUrl
  }

  return {
    async get<ResponseBody>(url: string): Promise<RestResponse<ResponseBody>> {
      try {
        console.log(buildUrl(currentBaseUrl, url, queryParams))
        const response = await axiosInstance.get<ResponseBody>(
          buildUrl(currentBaseUrl, url, queryParams),
        )
        return createRestResponse<ResponseBody>(response)
      } catch (error) {
        return handleError<ResponseBody>(error)
      }
    },

    async post<ResponseBody>(
      url: string,
      body?: unknown,
    ): Promise<RestResponse<ResponseBody>> {
      try {
        const response = await axiosInstance.post<ResponseBody>(
          buildUrl(currentBaseUrl, url, queryParams),
          body,
        )
        return createRestResponse<ResponseBody>(response)
      } catch (error) {
        return handleError<ResponseBody>(error)
      }
    },

    async patch<ResponseBody>(
      url: string,
      body?: unknown,
    ): Promise<RestResponse<ResponseBody>> {
      try {
        const response = await axiosInstance.patch<ResponseBody>(
          buildUrl(currentBaseUrl, url, queryParams),
          body,
        )
        return createRestResponse<ResponseBody>(response)
      } catch (error) {
        return handleError<ResponseBody>(error)
      }
    },

    async put<ResponseBody>(
      url: string,
      body?: unknown,
    ): Promise<RestResponse<ResponseBody>> {
      try {
        const response = await axiosInstance.put<ResponseBody>(
          buildUrl(currentBaseUrl, url, queryParams),
          body,
        )
        return createRestResponse<ResponseBody>(response)
      } catch (error) {
        return handleError<ResponseBody>(error)
      }
    },

    async delete(url: string): Promise<RestResponse> {
      try {
        const response = await axiosInstance.delete(
          buildUrl(currentBaseUrl, url, queryParams),
        )
        return createRestResponse(response)
      } catch (error) {
        return handleError(error)
      }
    },

    setBaseUrl(url: string): void {
      currentBaseUrl = url
      axiosInstance.defaults.baseURL = url
    },

    setHeader(key: string, value: string): void {
      axiosInstance.defaults.headers.common[key] = value
    },

    setAuthorization(token: string): void {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
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
