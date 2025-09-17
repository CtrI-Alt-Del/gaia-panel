import { UserNameSearchInputView } from './user-name-search-input-view'
import { useUserNameSearchInput } from './use-user-name-search-input'

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
  const { value } = useUserNameSearchInput()

  return (
    <UserNameSearchInputView
      value={value}
      label={label}
      placeholder={placeholder}
      className={className}
      id={id}
    />
  )
}
