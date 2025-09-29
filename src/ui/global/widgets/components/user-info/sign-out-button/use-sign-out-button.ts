import type { AuthProvider } from '@/core/auth/interfaces'
import { ROUTES } from '@/core/global/constants/routes'
import type { RouterProvider } from '@/core/global/interfaces/router-provider'

type Params = {
  authProvider: AuthProvider
  routerProvider: RouterProvider
}

export function useSignOutButton({ authProvider, routerProvider }: Params) {
  async function handleClick() {
    await authProvider.signOut()
    routerProvider.goTo(ROUTES.auth.signIn)
  }

  return {
    handleClick,
  }
}
