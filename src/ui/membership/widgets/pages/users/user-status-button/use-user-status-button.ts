import type { MembershipService } from '@/core/membership/interfaces'
import type { ToastProvider, UiProvider } from '@/core/global/interfaces'

type UseUserStatusButtonProps = {
  userId: string
  isUserActive: boolean
  membershipService: MembershipService
  toastProvider: ToastProvider
  uiProvider: UiProvider
}

export function useUserStatusButton({
  userId,
  isUserActive,
  membershipService,
  toastProvider,
  uiProvider,
}: UseUserStatusButtonProps) {
  async function handleActivate() {
    const response = await membershipService.activateUser(userId)
    if (response.isFailure) {
      toastProvider.showError(response.errorMessage)
    }
    if (response.isSuccessful) {
      toastProvider.showSuccess('Usuário ativado com sucesso!')
      await uiProvider.reload()
    }
  }

  async function handleDeactivate() {
    const response = await membershipService.deactivateUser(userId)

    if (response.isFailure) {
      toastProvider.showError(response.errorMessage)
    }
    if (response.isSuccessful) {
      toastProvider.showSuccess('Usuário desativado com sucesso!')
      await uiProvider.reload()
    }
  }

  function handleConfirm() {
    if (isUserActive) {
      handleDeactivate()
    } else {
      handleActivate()
    }
  }

  return {
    handleConfirm,
  }
}
