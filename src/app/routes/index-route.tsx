import type { Route } from './+types/index-route'

import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { membershipContext } from '@/app/contexts/membership-context'
import { redirect } from 'react-router'
import { ROUTES } from '@/core/global/constants/routes'

export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

export const loader = async ({ context }: Route.ActionArgs) => {
  const { user } = context.get(membershipContext)

  if (user?.isActive) {
    return redirect(ROUTES.dashboard)
  }

  return redirect(ROUTES.auth.signIn)
}
