import type { PaginationResponse, RestResponse } from '@/core/global/responses'
import type { AlertDto } from '../dtos'
import type { AlertListingParams } from '../types'

export interface AlertsService {
  fetchAlerts(
    params: AlertListingParams,
  ): Promise<RestResponse<PaginationResponse<AlertDto>>>
  fetchAlert(alertId: string): Promise<RestResponse<AlertDto>>
}
