import type { TelemetryService as ITelemetryService } from '@/core/telemetry/interfaces/telemetry-service'
import type { RestClient } from '@/core/global/interfaces'
import type { RestResponse } from '@/core/global/responses/rest-response'
import type { PaginationResponse } from '@/core/global/responses'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'
import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'
import type { ParametersListingParams, StationsListingParams, MeasurementsListingParams } from '@/core/telemetry/types'
import type { AlarmDto } from '@/core/alerting/dtos/alarm-dto'

export const TelemetryService = (restClient: RestClient): ITelemetryService => {
  return {
    async fetchAlarms(): Promise<RestResponse<PaginationResponse<AlarmDto>>> {
      return await restClient.get<PaginationResponse<AlarmDto>>('/telemetry/alarms')
    },

    async fetchParameters(params: ParametersListingParams): Promise<RestResponse<PaginationResponse<ParameterDto>>> {
      if (params.name) restClient.setQueryParam('name', params.name)
        if (params.status) restClient.setQueryParam('status', params.status.toLowerCase())
        if (params.nextCursor) restClient.setQueryParam('nextCursor', params.nextCursor)
        if (params.previousCursor)
          restClient.setQueryParam('previousCursor', params.previousCursor)
        if (params.pageSize)
          restClient.setQueryParam('pageSize', params.pageSize.toString())
      return await restClient.get<PaginationResponse<ParameterDto>>('/telemetry/parameters')
    },

    async createParameter(
      parameter: Omit<ParameterDto, 'id'>,
    ): Promise<RestResponse<ParameterDto>> {
      return await restClient.post<ParameterDto>('/telemetry/parameters', parameter)
    },

    async updateParameter(parameter: Partial<ParameterDto>): Promise<RestResponse<ParameterDto>> {
      const { id, name, unitOfMeasure, factor, offset } = parameter;
      const body: Partial<ParameterDto> = {};
      if (name !== undefined) body.name = name;
      if (unitOfMeasure !== undefined) body.unitOfMeasure = unitOfMeasure;
      if (factor !== undefined) body.factor = factor;
      if (offset !== undefined) body.offset = offset;
      return await restClient.put<ParameterDto>(
        `/telemetry/parameters/${id}`,
        body,
      );
    },

    async deleteParameter(id: string): Promise<RestResponse> {
      return await restClient.delete(`/telemetry/parameters/${id}`)
    },

    async fetchStations(
      params: StationsListingParams,
    ): Promise<RestResponse<PaginationResponse<StationDto>>> {
      if (params.name) restClient.setQueryParam('name', params.name)
      if (params.status) restClient.setQueryParam('status', params.status.toLowerCase())
      if (params.nextCursor) restClient.setQueryParam('nextCursor', params.nextCursor)
      if (params.previousCursor)
        restClient.setQueryParam('previousCursor', params.previousCursor)
      if (params.pageSize)
        restClient.setQueryParam('pageSize', params.pageSize.toString())

      return await restClient.get<PaginationResponse<StationDto>>('/telemetry/stations')
    },

    async createStation(station: StationDto, parameterIds: string[]): Promise<RestResponse<StationDto>> {
      return await restClient.post<StationDto>('/telemetry/stations', {
        station, 
        parameterIds,
      })
    },

    async fetchStation(stationId: string): Promise<RestResponse<StationDto>> {
      return await restClient.get<StationDto>(`/telemetry/stations/${stationId}`)
    },

    async updateStation(station: StationDto, parameterIds: string[]): Promise<RestResponse<StationDto>> {
      return await restClient.put<StationDto>(
        `/telemetry/stations/${station.id}`,
        {
          station,
          parameterIds,
        },
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
    async fetchParametersByStationId(stationId): Promise<RestResponse<ParameterDto[]>> {
      return await restClient.get<ParameterDto[]>(
        `/telemetry/stations/parameters/${stationId}`,
      )
    },

    async activateParameter(parameterId: string): Promise<RestResponse<ParameterDto>> {
      return await restClient.patch<ParameterDto>(`/telemetry/parameters/${parameterId}`)
    },

    async deactivateParameter(parameterId: string): Promise<RestResponse<ParameterDto>> {
      return await restClient.delete(`/telemetry/parameters/${parameterId}`) as RestResponse<ParameterDto>;
    },

    async fetchMeasurements(
      params: MeasurementsListingParams,
    ): Promise<RestResponse<PaginationResponse<MeasurementDto>>> {
      if (params.status) restClient.setQueryParam('status', params.status.toLowerCase())
      if (params.date) restClient.setQueryParam('date', params.date)
      if (params.parameterName) restClient.setQueryParam('parameterName', params.parameterName)
      if (params.stationName) restClient.setQueryParam('stationName', params.stationName)
      if (params.stationId) restClient.setQueryParam('stationId', params.stationId)
      if (params.nextCursor) restClient.setQueryParam('nextCursor', params.nextCursor)
      if (params.previousCursor)
        restClient.setQueryParam('previousCursor', params.previousCursor)
      if (params.pageSize)
        restClient.setQueryParam('pageSize', params.pageSize.toString())

      return await restClient.get<PaginationResponse<MeasurementDto>>('/telemetry/measurements')
    },

  }
}
