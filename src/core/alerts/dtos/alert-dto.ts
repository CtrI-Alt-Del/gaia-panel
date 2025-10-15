import type { ParameterAggregateDto } from '@/core/alerting/dtos'

export type AlertDto = {
  id?: string
  message: string
  parameter: ParameterAggregateDto
  level: string
  createdAt: Date
}
