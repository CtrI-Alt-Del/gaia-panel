import type { RestClient } from '@/core/global/interfaces'
import type { AlertingService as IAlertingService } from '@/core/alerting/interfaces/alerting-service'
import type { AlarmListingParams } from '@/core/alerting/types'
import type {AlarmDto} from '@/core/alerting/dtos/alarm-dto'

export const AlertingService = (restClient: RestClient): IAlertingService => {
  return {
    async fetchAlarms(params: AlarmListingParams) {
      if (params.status) restClient.setQueryParam('status', params.status.toString())
      if (params.nextCursor) restClient.setQueryParam('nextCursor', params.nextCursor)
      if (params.previousCursor)
        restClient.setQueryParam('previousCursor', params.previousCursor)
      if (params.pageSize)
        restClient.setQueryParam('pageSize', params.pageSize.toString())
      return await restClient.get('/alerting/alarm')
    },

    async activateAlarm(alarmId: string) {
      return await restClient.patch(`/alerting/alarms/${alarmId}`)
    },

    async deactivateAlarm(alarmId) {
      return await restClient.delete(`/alerting/alarms/${alarmId}`)
    },

    async createAlarm(alarmDto: AlarmDto) {
      return await restClient.post("alerting/alarm", alarmDto)
    },
  }
}
