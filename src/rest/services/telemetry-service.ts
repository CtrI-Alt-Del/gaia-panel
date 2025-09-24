import type { TelemetryService as ITelemetryService } from '@/core/telemetry/interfaces/telemetry-service'
import type { RestClient } from '@/core/global/interfaces'
import type { RestResponse } from '@/core/global/responses/rest-response'
import type { PaginationResponse } from '@/core/global/responses'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'
import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import type { StationsListingParams } from '@/core/telemetry/types'
import type { AlarmDto } from '@/core/alerting/dtos/alarm-dto'

export const TelemetryService = (restClient: RestClient): ITelemetryService => {
  return {
    // Alarms
    async fetchAlarms(): Promise<RestResponse<PaginationResponse<AlarmDto>>> {
      return await restClient.get<PaginationResponse<AlarmDto>>('/telemetry/alarms')
    },

    // Parameters
    async fetchParameters(): Promise<RestResponse<ParameterDto[]>> {
      return await restClient.get<ParameterDto[]>('/telemetry/parameters')
    },

    async createParameter(
      parameter: Omit<ParameterDto, 'id'>,
    ): Promise<RestResponse<ParameterDto>> {
      return await restClient.post<ParameterDto>('/telemetry/parameters', parameter)
    },

    async updateParameter(parameter: ParameterDto): Promise<RestResponse<ParameterDto>> {
      return await restClient.patch<ParameterDto>(
        `/telemetry/parameters/${parameter.id}`,
        parameter,
      )
    },

    async deleteParameter(id: string): Promise<RestResponse> {
      return await restClient.delete(`/telemetry/parameters/${id}`)
    },

    // Stations
    async fetchStations(
      params: StationsListingParams,
    ): Promise<RestResponse<PaginationResponse<StationDto>>> {
      if (params.name) restClient.setQueryParam('name', params.name)
      if (params.isActive !== undefined)
        restClient.setQueryParam('isActive', params.isActive.toString())
      if (params.status) restClient.setQueryParam('status', params.status)
      if (params.nextCursor) restClient.setQueryParam('nextCursor', params.nextCursor)
      if (params.previousCursor)
        restClient.setQueryParam('previousCursor', params.previousCursor)
      if (params.pageSize)
        restClient.setQueryParam('pageSize', params.pageSize.toString())

      return await restClient.get<PaginationResponse<StationDto>>('/telemetry/stations')
    },

    async createStation(station: StationDto): Promise<RestResponse<StationDto>> {
      return await restClient.post<StationDto>('/telemetry/stations', station)
    },

    async fetchStation(stationId: string): Promise<RestResponse<StationDto>> {
      return await restClient.get<StationDto>(`/telemetry/stations/${stationId}`)
    },

    async updateStation(station: StationDto): Promise<RestResponse<StationDto>> {
      return await restClient.put<StationDto>(
        `/telemetry/stations/${station.id}`,
        station,
      )
    },

    async activateStation(stationId: string): Promise<RestResponse<StationDto>> {
      return await restClient.patch<StationDto>(`/telemetry/stations/${stationId}`)
    },

    async deactivateStation(stationId: string): Promise<RestResponse> {
      return await restClient.delete(`/telemetry/stations/${stationId}`)
    },

    async fetchStationParameters(
      stationId: string,
    ): Promise<RestResponse<ParameterDto[]>> {
      return await restClient.get<ParameterDto[]>(
        `/telemetry/stations/parameters/${stationId}`,
      )
    },
  }
}
