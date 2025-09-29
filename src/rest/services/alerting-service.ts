import type { RestClient } from '@/core/global/interfaces'
import type { AlertingService as IAlertingService } from '@/core/alerting/interfaces/alerting-service'
import type { AlarmListingParams } from '@/core/alerting/types'

export const AlertingService = (restClient: RestClient): IAlertingService => {
  return {
    async fetchAlarms(params: AlarmListingParams) {
      if (params.status) restClient.setQueryParam('status', params.status.toString())
      if (params.nextCursor) restClient.setQueryParam('nextCursor', params.nextCursor)
      if (params.previousCursor)
        restClient.setQueryParam('previousCursor', params.previousCursor)
      if (params.pageSize)
        restClient.setQueryParam('pageSize', params.pageSize.toString())
      return await restClient.get('/alerting/alarms')
    },

    async activateAlarm(alarmId: string) {
      return await restClient.patch(`/alerting/alarms/${alarmId}`)
    },

    async deactivateAlarm(alarmId) {
      return await restClient.delete(`/alerting/alarms/${alarmId}`)
    },
  }
}
