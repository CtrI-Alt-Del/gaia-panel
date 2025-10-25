import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { AuthProvider } from '@/core/auth/interfaces'
import type { ToastProvider } from '@/core/global/interfaces'
import type { RouterProvider } from '@/core/global/interfaces/router-provider'
import { ROUTES } from '@/core/global/constants/routes'

const signInSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 6 caracteres'),
})

type SignInFormData = z.infer<typeof signInSchema>

type Params = {
  authProvider: AuthProvider
  toastProvider: ToastProvider
  routerProvider: RouterProvider
}

export function useSignInPage({ authProvider, toastProvider, routerProvider }: Params) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: SignInFormData) {
    setIsLoading(true)
    setError(undefined)

    try {
      await authProvider.signOut()
      const isSuccessful = await authProvider.signIn(data.email, data.password)
      if (isSuccessful) {
        routerProvider.goTo(ROUTES.users)
        return
      }
      toastProvider.showError('Email ou senha inválidos')
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  function onForgotPassword() {
    console.log('Forgot password for:', form.getValues('email'))
  }

  function onVisitorLogin() {
    routerProvider.goTo(ROUTES.dashboard)
  }

  return {
    form,
    isLoading,
    error,
    onSubmit: form.handleSubmit(onSubmit),
    onForgotPassword,
    onVisitorLogin,
  }
}
