import { renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { useSignInPage } from '../use-sign-in-page'
import type { AuthProvider } from '@/core/auth/interfaces'
import type { ToastProvider } from '@/core/global/interfaces'
import type { RouterProvider } from '@/core/global/interfaces/router-provider'
import { ROUTES } from '@/core/global/constants/routes'

describe('useSignInPage hook', () => {
  let authProviderMock: AuthProvider
  let toastProviderMock: ToastProvider
  let routerProviderMock: RouterProvider

  beforeEach(() => {
    authProviderMock = mock<AuthProvider>()
    toastProviderMock = mock<ToastProvider>()
    routerProviderMock = mock<RouterProvider>()

    vi.mocked(authProviderMock.signIn).mockResolvedValue(true)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return form, isLoading, error, onSubmit and onForgotPassword', () => {
    const { result } = renderHook(() =>
      useSignInPage({
        authProvider: authProviderMock,
        toastProvider: toastProviderMock,
        routerProvider: routerProviderMock,
      }),
    )

    expect(result.current.form).toBeDefined()
    expect(typeof result.current.isLoading).toBe('boolean')
    expect(result.current.error).toBeUndefined()
    expect(typeof result.current.onSubmit).toBe('function')
  })

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() =>
      useSignInPage({
        authProvider: authProviderMock,
        toastProvider: toastProviderMock,
        routerProvider: routerProviderMock,
      }),
    )

    expect(result.current.form.getValues()).toEqual({
      email: '',
      password: '',
    })
  })

  it('should have isLoading state that can be checked', () => {
    const { result } = renderHook(() =>
      useSignInPage({
        authProvider: authProviderMock,
        toastProvider: toastProviderMock,
        routerProvider: routerProviderMock,
      }),
    )

    // Initially should be false
    expect(result.current.isLoading).toBe(false)
  })

  it('should call authProvider.signIn with correct credentials', async () => {
    const { result } = renderHook(() =>
      useSignInPage({
        authProvider: authProviderMock,
        toastProvider: toastProviderMock,
        routerProvider: routerProviderMock,
      }),
    )

    result.current.form.setValue('email', 'test@example.com')
    result.current.form.setValue('password', 'password123')

    await result.current.onSubmit()

    expect(authProviderMock.signIn).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
    )
  })

  it('should navigate to users page on successful sign in', async () => {
    const { result } = renderHook(() =>
      useSignInPage({
        authProvider: authProviderMock,
        toastProvider: toastProviderMock,
        routerProvider: routerProviderMock,
      }),
    )

    result.current.form.setValue('email', 'test@example.com')
    result.current.form.setValue('password', 'password123')

    await result.current.onSubmit()

    expect(routerProviderMock.goTo).toHaveBeenCalledWith(ROUTES.users)
  })

  it('should show error toast on failed sign in', async () => {
    vi.mocked(authProviderMock.signIn).mockResolvedValue(false)

    const { result } = renderHook(() =>
      useSignInPage({
        authProvider: authProviderMock,
        toastProvider: toastProviderMock,
        routerProvider: routerProviderMock,
      }),
    )

    result.current.form.setValue('email', 'test@example.com')
    result.current.form.setValue('password', 'wrongpassword')

    await result.current.onSubmit()

    expect(toastProviderMock.showError).toHaveBeenCalledWith('Email ou senha inválidos')
    expect(routerProviderMock.goTo).not.toHaveBeenCalled()
  })

  it('should handle sign in errors gracefully', async () => {
    const signInError = new Error('Network error')
    vi.mocked(authProviderMock.signIn).mockRejectedValue(signInError)

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const { result } = renderHook(() =>
      useSignInPage({
        authProvider: authProviderMock,
        toastProvider: toastProviderMock,
        routerProvider: routerProviderMock,
      }),
    )

    result.current.form.setValue('email', 'test@example.com')
    result.current.form.setValue('password', 'password123')

    await result.current.onSubmit()

    expect(consoleSpy).toHaveBeenCalledWith('error', signInError)
    expect(routerProviderMock.goTo).not.toHaveBeenCalled()
    expect(toastProviderMock.showError).not.toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  it('should set isLoading to false after sign in attempt', async () => {
    const { result } = renderHook(() =>
      useSignInPage({
        authProvider: authProviderMock,
        toastProvider: toastProviderMock,
        routerProvider: routerProviderMock,
      }),
    )

    result.current.form.setValue('email', 'test@example.com')
    result.current.form.setValue('password', 'password123')

    await result.current.onSubmit()

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('should handle forgot password with current email', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const { result } = renderHook(() =>
      useSignInPage({
        authProvider: authProviderMock,
        toastProvider: toastProviderMock,
        routerProvider: routerProviderMock,
      }),
    )

    result.current.form.setValue('email', 'test@example.com')

    result.current.onForgotPassword()

    expect(consoleSpy).toHaveBeenCalledWith('Forgot password for:', 'test@example.com')

    consoleSpy.mockRestore()
  })

  it('should handle forgot password with empty email', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const { result } = renderHook(() =>
      useSignInPage({
        authProvider: authProviderMock,
        toastProvider: toastProviderMock,
        routerProvider: routerProviderMock,
      }),
    )


    result.current.onForgotPassword()

    expect(consoleSpy).toHaveBeenCalledWith('Forgot password for:', '')

    consoleSpy.mockRestore()
  })

  it('should clear error when starting new sign in attempt', async () => {
    const { result } = renderHook(() =>
      useSignInPage({
        authProvider: authProviderMock,
        toastProvider: toastProviderMock,
        routerProvider: routerProviderMock,
      }),
    )

    // Set an error first
    result.current.form.setValue('email', 'test@example.com')
    result.current.form.setValue('password', 'wrongpassword')
    vi.mocked(authProviderMock.signIn).mockResolvedValue(false)
    await result.current.onSubmit()

    // Now try again with correct credentials
    vi.mocked(authProviderMock.signIn).mockResolvedValue(true)
    result.current.form.setValue('password', 'correctpassword')

    await result.current.onSubmit()

    expect(result.current.error).toBeUndefined()
  })
})
