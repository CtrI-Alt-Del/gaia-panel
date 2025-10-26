import type { ParameterAggregateDto } from '@/core/alerting/dtos'

export type MeasurementDto = {
  value: number
  createdAt: Date
  parameter: ParameterAggregateDto
}
