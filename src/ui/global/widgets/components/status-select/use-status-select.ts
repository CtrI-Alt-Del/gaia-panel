import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'

export function useStatusSelect() {
  const [queryValue] = useQueryParamString('status', 'all')

  return {
    value: queryValue,
  }
}
