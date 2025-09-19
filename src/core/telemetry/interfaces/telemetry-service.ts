import type { PaginationResponse, RestResponse } from '@/core/global/responses'
import type { ParameterDto } from '../dtos/parameter-dto'
import type { ParametersListingParams } from '../types'

export interface TelemetryService {
  fetchParameters(
    params: ParametersListingParams,
  ): Promise<RestResponse<PaginationResponse<ParameterDto>>>
}
