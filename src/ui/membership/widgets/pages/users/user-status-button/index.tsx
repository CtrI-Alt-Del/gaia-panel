import { UserStatusButtonView } from './user-status-button-view'
import { useUserStatusButton } from './use-user-status-button'
import { useToastProvider } from '@/ui/global/hooks/use-toast'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'
import { useRest } from '@/ui/global/hooks/use-rest'

type Props = {
  userId: string
  isActive: boolean
}

export const UserStatusButton = ({ userId, isActive }: Props) => {
  const { membershipService } = useRest()
  const toastProvider = useToastProvider()
  const uiProvider = useUiProvider()
  const { handleConfirm } = useUserStatusButton({
    userId,
    isUserActive: isActive,
    membershipService,
    uiProvider,
    toastProvider,
  })

  return (
    <UserStatusButtonView
      isActive={isActive}
      onConfirm={handleConfirm}
    />
  )
}
