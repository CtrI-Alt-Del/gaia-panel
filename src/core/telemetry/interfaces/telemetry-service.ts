import type { PaginationResponse, RestResponse } from '@/core/global/responses'
import type { AlarmDto } from '../../alerting/dtos/alarm-dto'
import type { ParameterDto } from '../dtos/parameter-dto'
import type { ParametersListingParams } from '../types'

export interface TelemetryService {
  fetchAlarms(): Promise<RestResponse<PaginationResponse<AlarmDto>>>

  fetchParameters(
    params: ParametersListingParams,
  ): Promise<RestResponse<PaginationResponse<ParameterDto>>>
  createParameter(parameterDto: ParameterDto): Promise<RestResponse<ParameterDto>>
  updateParameter(parameterDto: ParameterDto): Promise<RestResponse<ParameterDto>>
  activateParameter(parameterId: string): Promise<RestResponse>
  deactivateParameter(parameterId: string): Promise<RestResponse>
}
