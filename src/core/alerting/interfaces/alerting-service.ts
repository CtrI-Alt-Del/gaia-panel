import type { PaginationResponse, RestResponse } from "@/core/global/responses";
import type { AlarmDto } from "../dtos";
import type { AlarmListingParams } from "../types";

export interface AlertingService {
  fetchAlarms(
    params: AlarmListingParams
  ): Promise<RestResponse<PaginationResponse<AlarmDto>>>;
  activateAlarm(alarmId: string): Promise<RestResponse>;
  deactivateAlarm(alarmId: string): Promise<RestResponse>;
  createAlarm(alarmDto: AlarmDto): Promise<RestResponse<AlarmDto>>
}
