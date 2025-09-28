import type { PaginationResponse, RestResponse } from "@/core/global/responses";
import type { AlarmDto } from "../dtos";
import type { AlarmListingParams } from "../types";

export interface AlertingService{
    fetchAlarms(params: AlarmListingParams): Promise<RestResponse<PaginationResponse<AlarmDto>>>
    updateAlarm(alarm: AlarmDto): Promise<RestResponse<AlarmDto>>
}