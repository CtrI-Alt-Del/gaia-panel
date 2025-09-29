import { UserNameSearchInputView } from './user-name-search-input-view'
import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'

export type UserNameSearchInputProps = {
  label: string
  placeholder?: string
  className?: string
  id?: string
}

export const UserNameSearchInput = ({
  label,
  placeholder,
  className,
  id,
}: UserNameSearchInputProps) => {
  const [queryValue] = useQueryParamString('name', '')

  return (
    <UserNameSearchInputView
      value={queryValue}
      label={label}
      placeholder={placeholder}
      className={className}
      id={id}
    />
  )
}
