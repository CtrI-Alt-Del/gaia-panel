import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'
import { PageSizeSelectView } from './page-size-select-view'

export type PageSizeSelectProps = {
  className?: string
}

export const PageSizeSelect = ({ className }: PageSizeSelectProps) => {
  const [value, setValue] = useQueryParamString('pageSize', '10')

  return (
    <PageSizeSelectView value={value} className={className} onValueChange={setValue} />
  )
}
