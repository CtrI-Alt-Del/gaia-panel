import { SignInPage } from '@/ui/auth/sign-in'
import type { Route } from '../../+types/root'
import { authContext } from '@/app/contexts/auth-context'
import { redirect } from 'react-router'
import { ROUTES } from '@/core/global/constants/routes'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { ENV } from '@/core/global/constants'

export const middleware = [AuthMiddleware]

export const loader = async ({ context }: Route.LoaderArgs) => {
  const { userId } = context.get(authContext)

  try {
    const response = await fetch(ENV.gaiaServerUrl)
    console.log('response', await response.json())
  } catch (error) {
    console.log('error', error)
  }

  if (userId) return redirect(ROUTES.stations)
}

export default SignInPage
