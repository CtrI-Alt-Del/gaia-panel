import type { RestClient } from '@/core/global/interfaces'
import type { TelemetryService as ITelemetryService } from '@/core/telemetry/interfaces'
import type { ParametersListingParams } from '@/core/telemetry/types'

export const TelemetryService = (restClient: RestClient): ITelemetryService => {
  return {
    async fetchParameters(params: ParametersListingParams) {
      if (params.name) restClient.setQueryParam('name', params.name)
      if (params.unitOfMeasure)
        restClient.setQueryParam('unitOfMeasure', params.unitOfMeasure)
      if (params.isActive)
        restClient.setQueryParam('isActive', params.isActive.toString())
      if (params.nextCursor) restClient.setQueryParam('nextCursor', params.nextCursor)
      if (params.previousCursor)
        restClient.setQueryParam('previousCursor', params.previousCursor)
      if (params.pageSize)
        restClient.setQueryParam('pageSize', params.pageSize.toString())
      return await restClient.get('/telemetry/parameters')
    },
  }
}
