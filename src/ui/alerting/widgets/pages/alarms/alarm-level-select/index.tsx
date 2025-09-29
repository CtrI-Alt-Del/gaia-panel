import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'
import { AlarmLevelSelectView } from './alarm-level-select-view'

export const AlarmLevelSelect = () => {
  const [value] = useQueryParamString('level', 'all')

  return <AlarmLevelSelectView value={value} />
}
