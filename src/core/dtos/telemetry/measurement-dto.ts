import type { ParameterDto } from "@/core/dtos/telemetry/parameter-dto";
import type { StationDto } from "@/core/telemetry/dtos/station-dto";

export type MeasurementDto = {
  id: string;
  station?: StationDto;
  parameter?: ParameterDto;
  parameterName?: string;
  value: number;
  measuredAt?: Date;
  stationParameter?: {
    id: string;
    parameterId: string;
    stationId: string;
  };
  unitOfMeasure?: string;
  createdAt?: string;
};
