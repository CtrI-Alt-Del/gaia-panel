import type { AlarmDto } from '@/core/alerting/dtos/alarm-dto'
import type { RestClient } from '@/core/global/interfaces'
import type { AlertingService as IAlertingService } from '@/core/alerting/interfaces/alerting-service'
import type { AlarmListingParams } from '@/core/alerting/types'

export const AlertingService = (restClient: RestClient): IAlertingService => {
  return {
    async fetchAlarms(params: AlarmListingParams) {
      if (params.status) restClient.setQueryParam('status', params.status.toString())
      if (params.level) restClient.setQueryParam('level', params.level.toString())
      if (params.nextCursor) restClient.setQueryParam('nextCursor', params.nextCursor)
      if (params.previousCursor)
        restClient.setQueryParam('previousCursor', params.previousCursor)
      if (params.pageSize)
        restClient.setQueryParam('pageSize', params.pageSize.toString())
      return await restClient.get('/alerting/alarms')
    },

    async createAlarm(alarmDto: AlarmDto) {
      return await restClient.post('/alerting/alarms', alarmDto)
    },

    async updateAlarm(alarm: AlarmDto) {
          return await restClient.put(`/alerting/alarms/${alarm.id}`, alarm)
    },

    async activateAlarm(alarmId: string) {
      return await restClient.patch(`/alerting/alarms/${alarmId}`)
    },

    async deactivateAlarm(alarmId) {
      return await restClient.delete(`/alerting/alarms/${alarmId}`)
    },

    async fetchAlertsCount() {
      return await restClient.get('/alerting/alerts/count')
    },

    async fetchAlerts(params) {
      if (params.date) restClient.setQueryParam('date', params.date)
      if (params.level) restClient.setQueryParam('level', params.level)
      if (params.nextCursor) restClient.setQueryParam('nextCursor', params.nextCursor)
      if (params.previousCursor)
        restClient.setQueryParam('previousCursor', params.previousCursor)
      if (params.pageSize)
        restClient.setQueryParam('pageSize', params.pageSize.toString())
      return await restClient.get('/alerts')
    },

    async fetchAlert(alertId) {
      return await restClient.get(`/alerts/${alertId}`)
    },
  }
}
