import { Outlet } from 'react-router'
import type { Route } from '../+types/root'

import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { DashboardLayout } from '@/ui/global/widgets/layouts'
import { membershipContext } from '../contexts/membership-context'

export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

export const loader = async ({ context }: Route.LoaderArgs) => {
  return context.get(membershipContext)
}

const AppLayout = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}

export default AppLayout
