import { redirect } from 'react-router'
import { createLoader, parseAsString, parseAsInteger } from 'nuqs/server'
import type { Route } from './+types/users-route'

import { UsersPage } from '@/ui/membership/widgets/pages/users'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { restContext } from '@/app/contexts/rest-context'
import { authContext } from '@/app/contexts/auth-context'
import { ROUTES } from '@/core/global/constants/routes'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { membershipContext } from '@/app/contexts/membership-context'

export const searchParams = {
  name: parseAsString,
  status: parseAsString,
  nextCursor: parseAsString,
  previousCursor: parseAsString,
  pageSize: parseAsInteger.withDefault(10),
}

export const loadSearchParams = createLoader(searchParams)

export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

export const loader = async ({ context, request }: Route.ActionArgs) => {
  const { nextCursor, previousCursor, pageSize, name, status } = loadSearchParams(request)
  const { user } = context.get(membershipContext)
  const { userId } = context.get(authContext)

  if (!userId || !user?.isActive) {
    return redirect(ROUTES.auth.signIn)
  }

  const { membershipService } = context.get(restContext)
  const response = await membershipService.fetchUsers({
    nextCursor,
    previousCursor,
    pageSize: Number(pageSize),
    name: name ?? undefined,
    status: status ?? undefined,
  })
  if (response.isFailure) response.throwError()

  const userResponse = await membershipService.fetchUser(userId)
  if (userResponse.isFailure) userResponse.throwError()
  if (userResponse.body.role !== 'owner') return redirect(ROUTES.stations)

  return {
    users: response.body.items,
    user,
    nextCursor: response.body.nextCursor,
    previousCursor: response.body.previousCursor,
    pageSize: response.body.pageSize,
    hasNextPage: response.body.hasNextPage,
    hasPreviousPage: response.body.hasPreviousPage,
  }
}

export default UsersPage
