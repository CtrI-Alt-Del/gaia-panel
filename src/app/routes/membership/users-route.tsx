import { createLoader, parseAsString, parseAsInteger } from 'nuqs/server'

import type { Route } from './+types/users-route'
import { UsersPage } from '@/ui/membership/widgets/pages/users'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { restContext } from '@/app/contexts/rest-context'

export const searchParams = {
  name: parseAsString,
  status: parseAsString,
  nextCursor: parseAsString,
  previousCursor: parseAsString,
  pageSize: parseAsInteger.withDefault(10),
}

export const middleware = [RestMiddleware]

export const loadSearchParams = createLoader(searchParams)

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const { membershipService } = context.get(restContext)
  const { nextCursor, previousCursor, pageSize, name, status } = loadSearchParams(request)

  const service = membershipService

  const response = await service.fetchUsers({
    nextCursor,
    previousCursor,
    pageSize: Number(pageSize),
    name: name ?? undefined,
    status: status ?? undefined,
  })

  return {
    users: response.body.items,
    nextCursor: response.body.nextCursor,
    previousCursor: response.body.previousCursor,
    pageSize: response.body.pageSize,
    hasNextPage: response.body.hasNextPage,
    hasPreviousPage: response.body.hasPreviousPage,
    membershipService,
  }
}

export default UsersPage
