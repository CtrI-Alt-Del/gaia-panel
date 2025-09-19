import { useState } from 'react'

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
  const [isLoading, setIsLoading] = useState(false)

  async function handleActivate() {
    setIsLoading(true)
    const response = await membershipService.activateUser(userId)
    if (response.isFailure) {
      toastProvider.showError(response.errorMessage)
    }
    if (response.isSuccessful) {
      toastProvider.showSuccess('Usuário ativado com sucesso!')
      await uiProvider.reload()
    }
    setIsLoading(false)
  }

  async function handleDeactivate() {
    console.log('handleDeactivate')
    setIsLoading(true)
    const response = await membershipService.deactivateUser(userId)
    if (response.isFailure) {
      toastProvider.showError(response.errorMessage)
    }
    if (response.isSuccessful) {
      toastProvider.showSuccess('Usuário desativado com sucesso!')
      await uiProvider.reload()
    }
    setIsLoading(false)
  }

  function handleConfirm() {
    if (isUserActive) {
      handleDeactivate()
    } else {
      handleActivate()
    }
  }

  return {
    isLoading,
    handleConfirm,
  }
}
