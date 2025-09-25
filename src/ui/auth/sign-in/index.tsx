import { useAuthProvider } from '@/ui/global/hooks/use-auth-provider'
import { SignInPageView } from './sign-in-page-view'
import { useSignInPage } from './use-sign-in-page'
import { useRouter } from '@/ui/global/hooks/use-router'
import { useToastProvider } from '@/ui/global/hooks/use-toast'

export const SignInPage = () => {
  const authProvider = useAuthProvider()
  const toastProvider = useToastProvider()
  const routerProvider = useRouter()
  const { form, isLoading, error, onSubmit, onForgotPassword } = useSignInPage({
    authProvider,
    toastProvider,
    routerProvider,
  })

  return (
    <SignInPageView
      form={form}
      isLoading={isLoading}
      error={error}
      onSubmit={onSubmit}
      onForgotPassword={onForgotPassword}
    />
  )
}
