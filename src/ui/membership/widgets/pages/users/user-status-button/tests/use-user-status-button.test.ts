import { mock, type MockProxy } from 'vitest-mock-extended'
import { act, renderHook, waitFor } from '@testing-library/react'

import type { MembershipService } from '@/core/membership/interfaces/membership-service'
import type { ToastProvider, UiProvider } from '@/core/global/interfaces'
import { RestResponse } from '@/core/global/responses'
import { HTTP_STATUS_CODE } from '@/core/global/constants'

import { useUserStatusButton } from '../use-user-status-button'

describe('useUserStatusButton', () => {
  let membershipService: MockProxy<MembershipService>
  let toastProvider: MockProxy<ToastProvider>
  let uiProvider: MockProxy<UiProvider>
  const userId = '1'
  const errorMessage = 'error message'

  beforeEach(() => {
    membershipService = mock<MembershipService>()
    toastProvider = mock<ToastProvider>()
    uiProvider = mock<UiProvider>()
  })

  it('should try to deactivate user when user is active', async () => {
    membershipService.deactivateUser.mockResolvedValue(new RestResponse())

    const { result } = renderHook(() =>
      useUserStatusButton({
        userId,
        isUserActive: true,
        membershipService,
        toastProvider,
        uiProvider,
      }),
    )

    act(() => {
      result.current.handleConfirm()
    })

    await waitFor(() => {
      expect(membershipService.deactivateUser).toHaveBeenCalledWith(userId)
    })
  })

  it('should try to activate user when user is inactive', async () => {
    membershipService.activateUser.mockResolvedValue(new RestResponse())

    const { result } = renderHook(() =>
      useUserStatusButton({
        userId,
        isUserActive: false,
        membershipService,
        toastProvider,
        uiProvider,
      }),
    )

    act(() => {
      result.current.handleConfirm()
    })

    await waitFor(() => {
      expect(membershipService.activateUser).toHaveBeenCalledWith(userId)
    })
  })

  it('should show toast error when deactivate user fails', async () => {
    membershipService.deactivateUser.mockResolvedValue(
      new RestResponse({
        statusCode: HTTP_STATUS_CODE.serverError,
        errorMessage,
      }),
    )

    const { result } = renderHook(() =>
      useUserStatusButton({
        userId,
        isUserActive: true,
        membershipService,
        toastProvider,
        uiProvider,
      }),
    )

    act(() => {
      result.current.handleConfirm()
    })

    await waitFor(() => {
      expect(toastProvider.showError).toHaveBeenCalledWith(errorMessage)
    })
  })

  it('should show toast error when activate user fails', async () => {
    membershipService.activateUser.mockResolvedValue(
      new RestResponse({
        statusCode: HTTP_STATUS_CODE.serverError,
        errorMessage,
      }),
    )

    const { result } = renderHook(() =>
      useUserStatusButton({
        userId,
        isUserActive: false,
        membershipService,
        toastProvider,
        uiProvider,
      }),
    )

    act(() => {
      result.current.handleConfirm()
    })

    await waitFor(() => {
      expect(toastProvider.showError).toHaveBeenCalledWith(errorMessage)
    })
  })

  it('should show toast success and reload ui when activate user succeeds', async () => {
    membershipService.activateUser.mockResolvedValue(new RestResponse())

    const { result } = renderHook(() =>
      useUserStatusButton({
        userId,
        isUserActive: false,
        membershipService,
        toastProvider,
        uiProvider,
      }),
    )

    act(() => {
      result.current.handleConfirm()
    })

    await waitFor(() => {
      expect(toastProvider.showSuccess).toHaveBeenCalledWith(
        'Usuário ativado com sucesso!',
      )
      expect(uiProvider.reload).toHaveBeenCalled()
    })
  })

  it('should show toast success and reload ui when deactivate user succeeds', async () => {
    membershipService.deactivateUser.mockResolvedValue(new RestResponse())

    const { result } = renderHook(() =>
      useUserStatusButton({
        userId,
        isUserActive: true,
        membershipService,
        toastProvider,
        uiProvider,
      }),
    )

    act(() => {
      result.current.handleConfirm()
    })

    await waitFor(() => {
      expect(toastProvider.showSuccess).toHaveBeenCalledWith(
        'Usuário desativado com sucesso!',
      )
    })
  })
})
