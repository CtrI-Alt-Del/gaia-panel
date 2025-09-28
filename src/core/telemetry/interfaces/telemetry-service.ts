import type {PaginationResponse, RestResponse } from '@/core/global/responses'
import type { ParameterDto } from '../dtos/parameter-dto'
import type { StationDto } from '../dtos/station-dto'
import type { StationsListingParams } from '../types'
import type { ParametersListingParams } from '../types/parameters-listing-params'
import type { AlarmDto } from '@/core/alerting/dtos'

export interface TelemetryService {
  fetchAlarms(): Promise<RestResponse<PaginationResponse<AlarmDto>>>
  fetchParameters(params: ParametersListingParams): Promise<RestResponse<PaginationResponse<ParameterDto>>> 
  createParameter(parameter: ParameterDto): Promise<RestResponse<ParameterDto>>
  updateParameter(parameter: ParameterDto): Promise<RestResponse<ParameterDto>>
  deleteParameter(parameterId: string): Promise<RestResponse>
  fetchStations(
    params: StationsListingParams,
  ): Promise<RestResponse<PaginationResponse<StationDto>>>
  createStation(station: StationDto, parameterIds: string[]): Promise<RestResponse<StationDto>>
  updateStation(station: StationDto, parameterIds: string[]): Promise<RestResponse<StationDto>>
  fetchStation(stationId: string): Promise<RestResponse<StationDto>>
  activateStation(stationId: string): Promise<RestResponse<StationDto>>
  deactivateStation(stationId: string): Promise<RestResponse>
  fetchStationParameters(stationId: string): Promise<RestResponse<ParameterDto[]>>
  fetchParametersByStationId(stationId: string): Promise<RestResponse<ParameterDto[]>>
}
