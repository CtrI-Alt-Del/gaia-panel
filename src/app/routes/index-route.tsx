import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { redirect } from 'react-router'
import { ROUTES } from '@/core/global/constants/routes'

export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

export const loader = async () => {
  return redirect(ROUTES.auth.signIn)
}
