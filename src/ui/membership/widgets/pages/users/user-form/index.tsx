import { UserFormView } from './user-form-view'
import { useRest } from '@/ui/global/hooks/use-rest'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'
import { useToastProvider } from '@/ui/global/hooks/use-toast'
import type { UserDto } from '@/core/membership/dtos/user-dto'

type UserFormProps = {
  onSuccess?: () => void
  onCancel: () => void
  userDto?: UserDto
}

export const UserForm = ({ onSuccess, onCancel, userDto }: UserFormProps) => {
  const { membershipService } = useRest()
  const uiProvider = useUiProvider()
  const toastProvider = useToastProvider()
  return (
    <UserFormView
      membershipService={membershipService}
      uiProvider={uiProvider}
      toastProvider={toastProvider}
      onSuccess={onSuccess}
      onCancel={onCancel}
      userDto={userDto}
    />
  )
}
