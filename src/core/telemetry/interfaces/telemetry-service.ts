import type {RestResponse } from '@/core/global/responses'
import type { ParameterDto } from '../dtos/parameter-dto'

export interface TelemetryService {
  fetchParameters(): Promise<RestResponse<ParameterDto[]>>
  createParameter(parameter: ParameterDto): Promise<RestResponse<ParameterDto>>
  updateParameter(parameter: ParameterDto): Promise<RestResponse<ParameterDto>>
  deleteParameter(parameterId: string): Promise<RestResponse>
  fetchParametersByStationId(stationId: string): Promise<RestResponse<ParameterDto[]>>
}
