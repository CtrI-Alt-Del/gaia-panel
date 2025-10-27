import { Outlet } from 'react-router'
import type { Route } from '../+types/root'

import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { VisitorMiddleware } from '@/app/middlewares/visitor-middleware'
import { DashboardLayout } from '@/ui/global/widgets/layouts'
import { SERVER_ENV } from '@/core/global/constants/server-env'
import { membershipContext } from '../contexts/membership-context'

export const middleware = [
  AuthMiddleware,
  RestMiddleware,
  MembershipMiddleware,
  VisitorMiddleware,
]

const getContextData = (context: any, contextKey: any) => {
  try {
    return context.get(contextKey)
  } catch {
    return undefined
  }
}

export const loader = async ({ context }: Route.LoaderArgs) => {
  try {
    const response = await fetch(SERVER_ENV.gaiaServerUrl)
    console.log('Server response', await response.json())
  } catch (error) {
    console.log('error', error)
  }

  const membershipData = getContextData(context, membershipContext) as
    | { user: any }
    | undefined
  const user = membershipData?.user

  return { user, isVisitor: !user }
}

const AppLayout = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}

export default AppLayout