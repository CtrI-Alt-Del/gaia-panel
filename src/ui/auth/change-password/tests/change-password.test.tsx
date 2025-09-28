import { render, screen, act, renderHook } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { ChangePasswordPageView } from '../change-password-view'
import { useChangePasswordPage, FormStep } from '../use-change-password-page'
import type { AuthProvider } from '@/core/auth/interfaces/auth-provider'
import type { RouterProvider } from '@/core/global/interfaces/router-provider'
import { ROUTES } from '@/core/global/constants/routes'

describe('Change Password Feature', () => {
  let authProviderMock: AuthProvider
  let routerProviderMock: RouterProvider

  beforeEach(() => {
    authProviderMock = mock<AuthProvider>()
    routerProviderMock = mock<RouterProvider>()

    // default behaviors
    vi.mocked(authProviderMock.sendChangePasswordEmail).mockResolvedValue(undefined)
    vi.mocked(authProviderMock.changePassword).mockResolvedValue(undefined)
    vi.mocked(authProviderMock.verifyOtp).mockResolvedValue(true)

    vi.clearAllMocks()
  })

  // Testes do Hook useChangePasswordPage
  describe('useChangePasswordPage hook', () => {
    it('should have initial state set to EMAIL step and empty email', () => {
      const { result } = renderHook(() =>
        useChangePasswordPage({
          authProvider: authProviderMock,
          routerProvider: routerProviderMock,
        }),
      )

      expect(result.current.currentStep).toBe(FormStep.EMAIL)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeUndefined()
      expect(result.current.email).toBe('')
    })

    it('should navigate to verification step after sending change password email successfully', async () => {
      const { result } = renderHook(() =>
        useChangePasswordPage({
          authProvider: authProviderMock,
          routerProvider: routerProviderMock,
        }),
      )

      result.current.emailForm.setValue('email', 'test@example.com')

      await act(async () => {
        await result.current.handleEmailSubmit()
      })

      expect(authProviderMock.sendChangePasswordEmail).toHaveBeenCalledWith(
        'test@example.com',
      )
      expect(result.current.email).toBe('test@example.com')
      expect(result.current.currentStep).toBe(FormStep.VERIFICATION)
      expect(result.current.error).toBeUndefined()
      expect(result.current.isLoading).toBe(false)
    })

    it('should set error and remain on EMAIL step when sending email fails', async () => {
      vi.mocked(authProviderMock.sendChangePasswordEmail).mockRejectedValueOnce(
        new Error('network'),
      )

      const { result } = renderHook(() =>
        useChangePasswordPage({
          authProvider: authProviderMock,
          routerProvider: routerProviderMock,
        }),
      )

      result.current.emailForm.setValue('email', 'test@example.com')

      await act(async () => {
        await result.current.handleEmailSubmit()
      })

      expect(result.current.currentStep).toBe(FormStep.EMAIL)
      expect(result.current.error).toMatch(/erro ao enviar o e-mail/i)
      expect(result.current.isLoading).toBe(false)
    })

    it('should go to PASSWORD step when verification succeeds', async () => {
      const { result } = renderHook(() =>
        useChangePasswordPage({
          authProvider: authProviderMock,
          routerProvider: routerProviderMock,
        }),
      )

      // Move to verification step first
      result.current.emailForm.setValue('email', 'test@example.com')
      await act(async () => {
        await result.current.handleEmailSubmit()
      })

      vi.mocked(authProviderMock.verifyOtp).mockResolvedValueOnce(true)

      result.current.verificationForm.setValue('code', '123456')
      await act(async () => {
        await result.current.handleVerificationSubmit()
      })

      expect(authProviderMock.verifyOtp).toHaveBeenCalledWith('123456')
      expect(result.current.currentStep).toBe(FormStep.PASSWORD)
      expect(result.current.error).toBeUndefined()
    })

    it('should set error when verification returns false', async () => {
      const { result } = renderHook(() =>
        useChangePasswordPage({
          authProvider: authProviderMock,
          routerProvider: routerProviderMock,
        }),
      )

      // Move to verification step
      result.current.emailForm.setValue('email', 'test@example.com')
      await act(async () => {
        await result.current.handleEmailSubmit()
      })

      vi.mocked(authProviderMock.verifyOtp).mockResolvedValueOnce(false)

      result.current.verificationForm.setValue('code', '000000')
      await act(async () => {
        await result.current.handleVerificationSubmit()
      })

      expect(result.current.currentStep).toBe(FormStep.VERIFICATION)
      expect(result.current.error).toMatch(/código de verificação inválido/i)
    })

    it('should set error when verification throws', async () => {
      const { result } = renderHook(() =>
        useChangePasswordPage({
          authProvider: authProviderMock,
          routerProvider: routerProviderMock,
        }),
      )

      // Move to verification step
      result.current.emailForm.setValue('email', 'test@example.com')
      await act(async () => {
        await result.current.handleEmailSubmit()
      })

      vi.mocked(authProviderMock.verifyOtp).mockRejectedValueOnce(new Error('bad'))

      result.current.verificationForm.setValue('code', '000000')
      await act(async () => {
        await result.current.handleVerificationSubmit()
      })

      expect(result.current.currentStep).toBe(FormStep.VERIFICATION)
      expect(result.current.error).toMatch(/código de verificação inválido/i)
    })

    it('should change password and navigate to sign-in on success', async () => {
      const { result } = renderHook(() =>
        useChangePasswordPage({
          authProvider: authProviderMock,
          routerProvider: routerProviderMock,
        }),
      )

      // Move to password step
      result.current.emailForm.setValue('email', 'test@example.com')
      await act(async () => {
        await result.current.handleEmailSubmit()
      })
      result.current.verificationForm.setValue('code', '123456')
      await act(async () => {
        await result.current.handleVerificationSubmit()
      })

      // Submit new password
      result.current.passwordForm.setValue('password', 'newStrongPassword')
      await act(async () => {
        await result.current.handlePasswordSubmit()
      })

      expect(authProviderMock.changePassword).toHaveBeenCalledWith('newStrongPassword')
      expect(routerProviderMock.goTo).toHaveBeenCalledWith(ROUTES.auth.signIn)
      expect(result.current.error).toBeUndefined()
    })

    it('should set error when change password throws and not navigate', async () => {
      const { result } = renderHook(() =>
        useChangePasswordPage({
          authProvider: authProviderMock,
          routerProvider: routerProviderMock,
        }),
      )

      // Move to password step
      result.current.emailForm.setValue('email', 'test@example.com')
      await act(async () => {
        await result.current.handleEmailSubmit()
      })
      result.current.verificationForm.setValue('code', '123456')
      await act(async () => {
        await result.current.handleVerificationSubmit()
      })

      vi.mocked(authProviderMock.changePassword).mockRejectedValueOnce(new Error('oops'))

      result.current.passwordForm.setValue('password', 'newStrongPassword')
      await act(async () => {
        await result.current.handlePasswordSubmit()
      })

      expect(result.current.currentStep).toBe(FormStep.PASSWORD)
      expect(result.current.error).toMatch(/erro ao alterar a senha/i)
      expect(routerProviderMock.goTo).not.toHaveBeenCalled()
    })

    it('should handle navigation helpers: back to login, back to email, back to verification', async () => {
      const { result } = renderHook(() =>
        useChangePasswordPage({
          authProvider: authProviderMock,
          routerProvider: routerProviderMock,
        }),
      )

      // Move forward to set different steps and errors
      result.current.emailForm.setValue('email', 'test@example.com')
      await act(async () => {
        await result.current.handleEmailSubmit()
      })
      result.current.verificationForm.setValue('code', 'bad')
      await act(async () => {
        await result.current.handleVerificationSubmit()
      })

      // Back to email should reset error and step
      act(() => {
        result.current.handleBackToEmail()
      })
      expect(result.current.currentStep).toBe(FormStep.EMAIL)
      expect(result.current.error).toBeUndefined()

      // Back to verification should reset error and step
      act(() => {
        result.current.handleBackToVerification()
      })
      expect(result.current.currentStep).toBe(FormStep.VERIFICATION)
      expect(result.current.error).toBeUndefined()

      // Back to login should call router
      act(() => {
        result.current.handleBackToLogin()
      })
      expect(routerProviderMock.goTo).toHaveBeenCalledWith(ROUTES.auth.signIn)
    })
  })

  // Testes do Componente ChangePasswordPageView
  describe('ChangePasswordPageView component', () => {
    it('should render email step by default', () => {
      render(
        <ChangePasswordPageView
          authProvider={authProviderMock}
          routerProvider={routerProviderMock}
        />,
      )

      expect(screen.getByText('Recuperação de Senha')).toBeInTheDocument()
      expect(
        screen.getByText('Digite seu e-mail para receber o código de verificação.'),
      ).toBeInTheDocument()
      expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Digite seu e-mail')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Enviar Código' })).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Voltar para o login' }),
      ).toBeInTheDocument()
    })

    it('should render Gaia logo', () => {
      render(
        <ChangePasswordPageView
          authProvider={authProviderMock}
          routerProvider={routerProviderMock}
        />,
      )

      const logo = screen.getByAltText('Gaia')
      expect(logo).toBeInTheDocument()
    })

    it('should render footer with copyright and Tecsus link', () => {
      render(
        <ChangePasswordPageView
          authProvider={authProviderMock}
          routerProvider={routerProviderMock}
        />,
      )

      expect(
        screen.getByText('© 2025 Gaia Web. Todos os direitos reservados.'),
      ).toBeInTheDocument()

      const tecsusLink = screen.getByText('Tecsus')
      expect(tecsusLink).toBeInTheDocument()
      expect(tecsusLink).toHaveAttribute('href', 'https://tecsus.com.br/')
      expect(tecsusLink).toHaveAttribute('target', '_blank')
      expect(tecsusLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
