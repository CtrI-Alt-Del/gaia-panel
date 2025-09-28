import type { RestResponse } from "@/core/global/responses";
import type { AlarmDto } from "../dtos";

export interface AlertingService{
    fetchAlarms(alarmId: string): Promise<RestResponse<AlarmDto>>
}