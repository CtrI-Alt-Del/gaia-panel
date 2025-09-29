import type { AlarmRuleOperation } from '../types'

export type AlarmRuleDto = {
  threshold: number
  operation: AlarmRuleOperation
}
