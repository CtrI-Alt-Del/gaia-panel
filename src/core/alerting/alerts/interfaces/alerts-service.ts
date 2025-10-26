import type { PaginationResponse, RestResponse } from '@/core/global/responses'
import type { AlertDto } from '../dtos'
import type { AlertsCountDto } from '../dtos/alerts-count-dto'
import type { AlertListingParams } from '../types'

export interface AlertsService {
  fetchAlertsCount(): Promise<RestResponse<AlertsCountDto>>
  fetchAlerts(
    params: AlertListingParams,
  ): Promise<RestResponse<PaginationResponse<AlertDto>>>
  fetchAlert(alertId: string): Promise<RestResponse<AlertDto>>
}
