import type { RestClient } from '@/core/global/interfaces'
import type { RestResponse } from '@/core/global/responses/rest-response'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'

export const TelemetryService = (restClient: RestClient) => {
  return {
    async fetchParameters(): Promise<RestResponse<ParameterDto[]>> {
      return await restClient.get<ParameterDto[]>('/telemetry/parameters')
    },

    async createParameter(
      parameter: Omit<ParameterDto, 'id'>,
    ): Promise<RestResponse<ParameterDto>> {
      return await restClient.post<ParameterDto>('/telemetry/parameters', parameter)
    },

    async updateParameter(
      id: string,
      parameter: Partial<ParameterDto>,
    ): Promise<RestResponse<ParameterDto>> {
      return await restClient.patch<ParameterDto>(
        `/telemetry/parameters/${id}`,
        parameter,
      )
    },

    async deleteParameter(id: string): Promise<RestResponse> {
      return await restClient.delete(`/telemetry/parameters/${id}`)
    },

    async fetchParameterById(id: string): Promise<RestResponse<ParameterDto>> {
      return await restClient.get<ParameterDto>(`/telemetry/parameters/${id}`)
    },
  }
}
