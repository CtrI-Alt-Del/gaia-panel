import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { useSignOutButton } from '../use-sign-out-button'
import type { AuthProvider } from '@/core/auth/interfaces'
import type { RouterProvider } from '@/core/global/interfaces/router-provider'
import { ROUTES } from '@/core/global/constants/routes'

describe('useSignOutButton hook', () => {
  let authProviderMock: AuthProvider
  let routerProviderMock: RouterProvider

  beforeEach(() => {
    authProviderMock = mock<AuthProvider>()
    vi.mocked(authProviderMock.signOut).mockResolvedValue(undefined)

    routerProviderMock = mock<RouterProvider>()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return handleClick function', () => {
    const { result } = renderHook(() =>
      useSignOutButton({
        authProvider: authProviderMock,
        routerProvider: routerProviderMock,
      }),
    )

    expect(typeof result.current.handleClick).toBe('function')
  })

  it('should call authProvider.signOut when handleClick is executed', async () => {
    const { result } = renderHook(() =>
      useSignOutButton({
        authProvider: authProviderMock,
        routerProvider: routerProviderMock,
      }),
    )

    await result.current.handleClick()

    expect(authProviderMock.signOut).toHaveBeenCalledTimes(1)
  })

  it('should call routerProvider.goTo with sign in route after signOut', async () => {
    const { result } = renderHook(() =>
      useSignOutButton({
        authProvider: authProviderMock,
        routerProvider: routerProviderMock,
      }),
    )

    await result.current.handleClick()

    expect(routerProviderMock.goTo).toHaveBeenCalledTimes(1)
    expect(routerProviderMock.goTo).toHaveBeenCalledWith(ROUTES.auth.signIn)
  })

  it('should call signOut before goTo', async () => {
    const { result } = renderHook(() =>
      useSignOutButton({
        authProvider: authProviderMock,
        routerProvider: routerProviderMock,
      }),
    )

    await result.current.handleClick()

    expect(authProviderMock.signOut).toHaveBeenCalledBefore(
      routerProviderMock.goTo as any,
    )
  })

  it('should handle signOut error gracefully', async () => {
    const signOutError = new Error('Sign out failed')
    vi.mocked(authProviderMock.signOut).mockRejectedValue(signOutError)

    const { result } = renderHook(() =>
      useSignOutButton({
        authProvider: authProviderMock,
        routerProvider: routerProviderMock,
      }),
    )

    await expect(result.current.handleClick()).rejects.toThrow('Sign out failed')
    expect(routerProviderMock.goTo).not.toHaveBeenCalled()
  })
})
