import type { PaginationResponse, RestResponse } from "@/core/global/responses";
import type { AlarmDto } from "../dtos";
import type { AlarmListingParams } from "../types";

export interface AlertingService {
  fetchAlarms(
    params: AlarmListingParams
  ): Promise<RestResponse<PaginationResponse<AlarmDto>>>
  updateAlarm(alarm: AlarmDto): Promise<RestResponse<AlarmDto>>
  createAlarm(alarmDto: AlarmDto): Promise<RestResponse<AlarmDto>>
  activateAlarm(alarmId: string): Promise<RestResponse>
  deactivateAlarm(alarmId: string): Promise<RestResponse>
  fetchAlertsCount(): Promise<RestResponse<import('@/core/alerts/dtos/alerts-count-dto').AlertsCountDto>>
  fetchAlerts(
    params: import('@/core/alerts/types').AlertListingParams
  ): Promise<RestResponse<PaginationResponse<import('@/core/alerts/dtos/alert-dto').AlertDto>>>
  fetchAlert(alertId: string): Promise<RestResponse<import('@/core/alerts/dtos/alert-dto').AlertDto>>
}