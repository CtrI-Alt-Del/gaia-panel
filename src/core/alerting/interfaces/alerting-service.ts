import type { PaginationResponse, RestResponse } from '@/core/global/responses'
import type { AlarmDto } from '../dtos'
import type { AlarmListingParams } from '../types'
import type { AlertsCountDto } from '../alerts/dtos/alerts-count-dto'
import type { AlertDto } from '../alerts/dtos/alert-dto'
import type { AlertListingParams } from '../alerts/types'

export interface AlertingService {
  fetchAlarms(
    params: AlarmListingParams,
  ): Promise<RestResponse<PaginationResponse<AlarmDto>>>
  updateAlarm(alarm: AlarmDto): Promise<RestResponse<AlarmDto>>
  createAlarm(alarmDto: AlarmDto): Promise<RestResponse<AlarmDto>>
  activateAlarm(alarmId: string): Promise<RestResponse>
  deactivateAlarm(alarmId: string): Promise<RestResponse>
  fetchAlertsCount(): Promise<RestResponse<AlertsCountDto>>
  fetchAlerts(
    params: AlertListingParams,
  ): Promise<RestResponse<PaginationResponse<AlertDto>>>
  fetchAlert(alertId: string): Promise<RestResponse<AlertDto>>
  readAlert(alertId: string): Promise<RestResponse>
}
