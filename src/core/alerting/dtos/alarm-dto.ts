import type { AlarmLevel } from '../types'
import type { AlarmRuleDto } from './alarm-rule-dto'
import type { ParameterAggregateDto } from './parameter-aggregate-dto'

export type AlarmDto = {
  id?: string
  message: string
  parameter: ParameterAggregateDto
  rule: AlarmRuleDto
  level: AlarmLevel
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}
