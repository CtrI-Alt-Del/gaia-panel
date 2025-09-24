import type { PaginationResponse, RestResponse } from '@/core/global/responses'
import type { AlarmDto } from '../../alerting/dtos/alarm-dto'
import type { ParameterDto } from '../dtos/parameter-dto'
import type { StationDto } from '../dtos/station-dto'
import type { StationsListingParams } from '../types'

export interface TelemetryService {
  // Alarms
  fetchAlarms(): Promise<RestResponse<PaginationResponse<AlarmDto>>>

  // Parameters
  fetchParameters(): Promise<RestResponse<ParameterDto[]>>
  createParameter(parameter: ParameterDto): Promise<RestResponse<ParameterDto>>
  updateParameter(parameter: ParameterDto): Promise<RestResponse<ParameterDto>>
  deleteParameter(parameterId: string): Promise<RestResponse>

  // Stations
  fetchStations(
    params: StationsListingParams,
  ): Promise<RestResponse<PaginationResponse<StationDto>>>
  createStation(station: StationDto): Promise<RestResponse<StationDto>>
  fetchStation(stationId: string): Promise<RestResponse<StationDto>>
  updateStation(station: StationDto): Promise<RestResponse<StationDto>>
  activateStation(stationId: string): Promise<RestResponse<StationDto>>
  deactivateStation(stationId: string): Promise<RestResponse>
  fetchStationParameters(stationId: string): Promise<RestResponse<ParameterDto[]>>
}
