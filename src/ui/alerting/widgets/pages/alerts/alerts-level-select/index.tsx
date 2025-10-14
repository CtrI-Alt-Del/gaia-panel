import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'
import { AlertsLevelSelectView } from './alerts-level-select-view'

export const AlertsLevelSelect = () => {
  const [value] = useQueryParamString('level', 'all')

  return <AlertsLevelSelectView value={value} />
}
