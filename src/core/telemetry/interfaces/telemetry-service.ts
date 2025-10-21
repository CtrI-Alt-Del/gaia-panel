import type { PaginationResponse, RestResponse } from '@/core/global/responses'
import type { ParameterDto } from '../dtos/parameter-dto'
import type { StationDto } from '../dtos/station-dto'
import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'
import type { AlarmDto } from '@/core/alerting/dtos/alarm-dto'
import type { StationsListingParams } from '../types'
import type { ParametersListingParams } from '../types/parameters-listing-params'
import type { MeasurementsListingParams } from '../types/measurements-listing-params'

export interface TelemetryService {
  fetchStationsCount(): Promise<RestResponse<StationsCountDto>>
  fetchParameters(params: ParametersListingParams): Promise<RestResponse<PaginationResponse<ParameterDto>>> 
  fetchAlarms(): Promise<RestResponse<PaginationResponse<AlarmDto>>>
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
  activateParameter(parameterId: string): Promise<RestResponse<ParameterDto>>
  deactivateParameter(parameterId: string): Promise<RestResponse<ParameterDto>>
  fetchMeasurements(params: MeasurementsListingParams): Promise<RestResponse<PaginationResponse<MeasurementDto>>>
}
