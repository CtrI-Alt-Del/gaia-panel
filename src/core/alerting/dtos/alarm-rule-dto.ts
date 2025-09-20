import type { AlarmRuleOperation } from '../types'

export type AlarmRuleDto = {
  threshold: bigint
  operation: AlarmRuleOperation
}
