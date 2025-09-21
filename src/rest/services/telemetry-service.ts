import type { TelemetryService as ITelemetryService } from "@/core/telemetry/interfaces/telemetry-service";
import type { RestClient } from "@/core/global/interfaces";
import type { RestResponse } from "@/core/global/responses/rest-response";
import type { PaginationResponse } from "@/core/global/responses";
import type { ParameterDto } from "@/core/telemetry/dtos/parameter-dto";
import type { AlarmDto } from "@/core/alerting/dtos/alarm-dto";

export const TelemetryService = (restClient: RestClient): ITelemetryService => {
  return {
    async fetchAlarms(): Promise<RestResponse<PaginationResponse<AlarmDto>>> {
      return await restClient.get<PaginationResponse<AlarmDto>>(
        "/telemetry/alarms"
      );
    },

    async fetchParameters(): Promise<RestResponse<ParameterDto[]>> {
      return await restClient.get<ParameterDto[]>("/telemetry/parameters");
    },

    async createParameter(
      parameter: Omit<ParameterDto, "id">
    ): Promise<RestResponse<ParameterDto>> {
      return await restClient.post<ParameterDto>(
        "/telemetry/parameters",
        parameter
      );
    },

    async updateParameter(
      parameter: ParameterDto
    ): Promise<RestResponse<ParameterDto>> {
      return await restClient.patch<ParameterDto>(
        `/telemetry/parameters/${parameter.id}`,
        parameter
      );
    },

    async deleteParameter(id: string): Promise<RestResponse> {
      return await restClient.delete(`/telemetry/parameters/${id}`);
    },
  };
};
