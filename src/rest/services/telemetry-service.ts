import type { RestClient } from '@/core/global/interfaces'
import type { ParameterDto } from '@/core/telemetry/dtos'
import type { TelemetryService as ITelemetryService } from '@/core/telemetry/interfaces'
import type { ParametersListingParams } from '@/core/telemetry/types'

export const TelemetryService = (restClient: RestClient): ITelemetryService => {
  return {
    async fetchAlarms() {
      return await restClient.get('/telemetry/alarms')
    },

    async fetchParameters(params: ParametersListingParams) {
      // Debug: Log dos parâmetros recebidos
      console.log('[TELEMETRY_SERVICE] Parâmetros recebidos:', params)

      if (params.name) restClient.setQueryParam('name', params.name)
      if (params.unitOfMeasure)
        restClient.setQueryParam('unitOfMeasure', params.unitOfMeasure)
      if (params.isActive !== undefined)
        restClient.setQueryParam('isActive', params.isActive.toString())
      if (params.nextCursor) restClient.setQueryParam('nextCursor', params.nextCursor)
      if (params.previousCursor)
        restClient.setQueryParam('previousCursor', params.previousCursor)
      if (params.pageSize)
        restClient.setQueryParam('pageSize', params.pageSize.toString())

      // Debug: Log da URL final
      console.log(
        '[TELEMETRY_SERVICE] Query params configurados:',
        restClient.getQueryParams(),
      )

      return await restClient.get('/telemetry/parameters')
    },

    async createParameter(parameterDto: ParameterDto) {
      return await restClient.post('/telemetry/parameters', parameterDto)
    },

    async updateParameter(parameterDto: ParameterDto) {
      return await restClient.put(
        `/telemetry/parameters/${parameterDto.id}`,
        parameterDto,
      )
    },

    async activateParameter(parameterId: string) {
      console.log(`[TELEMETRY_SERVICE] Ativando parâmetro ${parameterId}`)
      return await restClient.patch(`/telemetry/parameters/${parameterId}`, {
        isActive: true,
      })
    },

    async deactivateParameter(parameterId: string) {
      console.log(`[TELEMETRY_SERVICE] Desativando parâmetro ${parameterId}`)
      return await restClient.delete(`/telemetry/parameters/${parameterId}`)
    },
  }
}
