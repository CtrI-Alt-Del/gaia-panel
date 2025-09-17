import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'

export type UsePageSizeSelectProps = {
  value?: string | number
}

export function usePageSizeSelect() {
  const [value] = useQueryParamString('pageSize', '10')

  return {
    value,
  }
}
