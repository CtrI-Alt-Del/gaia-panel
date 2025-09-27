import { useAuthProvider } from '@/ui/global/hooks/use-auth-provider'
import { ChangePasswordPageView } from './change-password-view'
import { useRouter } from '@/ui/global/hooks/use-router'

export const ChangePasswordPage = () => {
  const authProvider = useAuthProvider()
  const routerProvider = useRouter()

  return (
    <ChangePasswordPageView authProvider={authProvider} routerProvider={routerProvider} />
  )
}
