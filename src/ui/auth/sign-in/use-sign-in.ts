import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

type SignInFormData = z.infer<typeof signInSchema>

export function useSignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: SignInFormData) {
    setIsLoading(true)
    setError(undefined)

    try {
      // TODO: Implementar lógica de autenticação com Clerk
      // await signIn({ email: data.email, password: data.password })
      console.log('Sign in attempt:', data)

      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // TODO: Redirecionar após login bem-sucedido
    } catch {
      setError('Email ou senha inválidos')
    } finally {
      setIsLoading(false)
    }
  }

  function handleForgotPassword() {
    // TODO: Implementar lógica de recuperação de senha
    const email = form.getValues('email')
    console.log('Forgot password for:', email)
  }

  return {
    form,
    isLoading,
    error,
    onSubmit: form.handleSubmit(onSubmit),
    onForgotPassword: handleForgotPassword,
  }
}
