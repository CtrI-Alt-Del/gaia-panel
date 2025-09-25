import { SignInPage } from '@/ui/auth/sign-in'
import type { Route } from '../../+types/root'
import { authContext } from '@/app/contexts/auth-context'
import { redirect } from 'react-router'
import { ROUTES } from '@/core/global/constants/routes'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'

export const middleware = [AuthMiddleware]

export const loader = async ({ context }: Route.LoaderArgs) => {
  const { userId } = context.get(authContext)
  if (userId) return redirect(ROUTES.stations)
}

export default SignInPage
