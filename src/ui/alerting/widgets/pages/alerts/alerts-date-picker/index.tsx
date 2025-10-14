import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'
import { AlertsDatePickerView } from './alerts-date-picker-view'

export const AlertsDatePicker = () => {
  const [value] = useQueryParamString('date', '')

  return <AlertsDatePickerView value={value || null} placeholder='Filtrar por data' />
}
