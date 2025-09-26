import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'
import { StatusSelectView } from './status-select-view'

export type StatusSelectProps = {
  className?: string
}

export const StatusSelect = ({ className }: StatusSelectProps) => {
  const [queryValue, setQueryValue] = useQueryParamString('isActive', 'all')

  return (
    <StatusSelectView
      value={queryValue}
      className={className}
      onValueChange={setQueryValue}
    />
  )
}
