import type { ParameterDto } from '@/core/dtos/telemetry/parameter-dto'
import type { StationDto } from '@/core/dtos/telemetry/station-dto'

export type MeasurementDto = {
  id: string
  station: StationDto
  parameter: ParameterDto
  value: number
  measuredAt: Date
}
