import { Outlet, redirect } from 'react-router'
import type { Route } from '../+types/root'

import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { DashboardLayout } from '@/ui/global/widgets/layouts'
import { membershipContext } from '../contexts/membership-context'
import { ENV } from '@/core/global/constants'
import { ROUTES } from '@/core/global/constants/routes'

export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

export const loader = async ({ context }: Route.LoaderArgs) => {
  try {
    const response = await fetch(ENV.gaiaServerUrl)
    console.log('Server response', await response.json())
  } catch (error) {
    console.log('error', error)
  }
  const { user } = context.get(membershipContext)
  if (!user?.isActive) return redirect(ROUTES.auth.signIn)
  return { user }
}

const AppLayout = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}

export default AppLayout
