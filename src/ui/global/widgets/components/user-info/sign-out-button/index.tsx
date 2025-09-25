import { useRouter } from '@/ui/global/hooks/use-router'
import { useAuthProvider } from '@/ui/global/hooks/use-auth-provider'
import { SignOutButtonView } from './sign-out-button-view'
import { useSignOutButton } from './use-sign-out-button'

export const SignOutButton = () => {
  const authProvider = useAuthProvider()
  const routerProvider = useRouter()
  const { handleClick } = useSignOutButton({ authProvider, routerProvider })

  return <SignOutButtonView onClick={handleClick} />
}
