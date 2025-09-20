import type { PaginationResponse, RestResponse } from '@/core/global/responses'
import type { AlarmDto } from '../../alerting/dtos/alarm-dto'
import type { ParameterDto } from '../dtos/parameter-dto'

export interface TelemetryService {
  fetchAlarms(): Promise<RestResponse<PaginationResponse<AlarmDto>>>
  fetchParameters(): Promise<RestResponse<ParameterDto[]>>
  createParameter(parameter: ParameterDto): Promise<RestResponse<ParameterDto>>
  updateParameter(parameter: ParameterDto): Promise<RestResponse<ParameterDto>>
  deleteParameter(parameterId: string): Promise<RestResponse>
}
