import type { RestClient } from '@/core/global/interfaces'
import type { AlertsService as IAlertsService } from '@/core/alerting/alerts/interfaces/alerts-service'
import type { AlertsCountDto } from '@/core/alerts/dtos/alerts-count-dto'
import type { AlertListingParams } from '@/core/alerting/alerts/types'

export const AlertsService = (restClient: RestClient): IAlertsService => {
  return {
    async fetchAlertsCount() {
      return await restClient.get<AlertsCountDto>('/alerting/alerts/count')
    },

    async fetchAlerts(params: AlertListingParams) {
      if (params.date) restClient.setQueryParam('date', params.date)
      if (params.level) restClient.setQueryParam('level', params.level)
      if (params.nextCursor) restClient.setQueryParam('nextCursor', params.nextCursor)
      if (params.previousCursor)
        restClient.setQueryParam('previousCursor', params.previousCursor)
      if (params.pageSize)
        restClient.setQueryParam('pageSize', params.pageSize.toString())
      return await restClient.get('/alerting/alerts')
    },

    async fetchAlert(alertId: string) {
      return await restClient.get(`/alerting/alerts/${alertId}`)
    },
  }
}
