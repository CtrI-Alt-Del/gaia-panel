import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'

export type UseUserNameSearchInputProps = {
  value?: string
  defaultValue?: string
}

export function useUserNameSearchInput() {
  const [queryValue] = useQueryParamString('name', '')

  return {
    value: queryValue,
  }
}
