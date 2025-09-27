import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { AuthProvider } from '@/core/auth/interfaces'
import type { RouterProvider } from '@/core/global/interfaces/router-provider'
import { ROUTES } from '@/core/global/constants/routes'

export const emailSchema = z.object({
  email: z.string().email('Digite um e-mail válido'),
})

export type EmailFormData = z.infer<typeof emailSchema>

export const verificationCodeSchema = z.object({
  code: z.string().min(6, 'O código deve ter pelo menos 6 caracteres'),
})

export type VerificationCodeFormData = z.infer<typeof verificationCodeSchema>

export const changePasswordSchema = z.object({
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
})

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

export enum FormStep {
  EMAIL = 'email',
  VERIFICATION = 'verification',
  PASSWORD = 'password',
}

type Params = {
  authProvider: AuthProvider
  routerProvider: RouterProvider
}

export function useChangePasswordPage({ authProvider, routerProvider }: Params) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.EMAIL)
  const [email, setEmail] = useState<string>('')

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
  })

  const verificationForm = useForm<VerificationCodeFormData>({
    resolver: zodResolver(verificationCodeSchema),
    mode: 'onChange',
  })

  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  })

  function handleBackToLogin() {
    routerProvider.goTo(ROUTES.auth.signIn)
  }

  function handleBackToEmail() {
    setCurrentStep(FormStep.EMAIL)
    setError(undefined)
  }

  function handleBackToVerification() {
    setCurrentStep(FormStep.VERIFICATION)
    setError(undefined)
  }

  async function handleEmailSubmit(data: EmailFormData) {
    setIsLoading(true)
    setError(undefined)

    try {
      await authProvider.sendChangePasswordEmail(data.email)
      setEmail(data.email)
      setCurrentStep(FormStep.VERIFICATION)
    } catch (error) {
      setError(
        'Ocorreu um erro ao enviar o e-mail de alteração de senha. Tente novamente.',
      )
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleVerificationSubmit(data: VerificationCodeFormData) {
    setIsLoading(true)
    setError(undefined)

    try {
      const isVerified = await authProvider.verifyOtp(data.code)
      if (isVerified) { 
        setCurrentStep(FormStep.PASSWORD)
      } else {
        setError('Código de verificação inválido. Tente novamente.')
      }
    } catch (error) {
      setError('Código de verificação inválido. Tente novamente.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePasswordSubmit(data: ChangePasswordFormData) {
    setIsLoading(true)
    setError(undefined)

    try {
      await authProvider.changePassword(data.password)
      routerProvider.goTo(ROUTES.auth.signIn)
    } catch (error) {
      setError('Ocorreu um erro ao alterar a senha. Tente novamente.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    emailForm,
    verificationForm,
    passwordForm,
    currentStep,
    isLoading,
    error,
    email,
    handleEmailSubmit: emailForm.handleSubmit(handleEmailSubmit),
    handleVerificationSubmit: verificationForm.handleSubmit(handleVerificationSubmit),
    handlePasswordSubmit: passwordForm.handleSubmit(handlePasswordSubmit),
    handleBackToLogin,
    handleBackToEmail,
    handleBackToVerification,
  }
}
