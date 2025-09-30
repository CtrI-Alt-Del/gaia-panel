import { createLoader, parseAsString, parseAsInteger } from 'nuqs/server'
import type { Route } from './+types/stations-route'

import { StationsPage } from '@/ui/telemetry/widgets/pages/stations'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { restContext } from '@/app/contexts/rest-context'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { membershipContext } from '@/app/contexts/membership-context'

export const searchParams = {
  name: parseAsString,
  status: parseAsString,
  nextCursor: parseAsString,
  previousCursor: parseAsString,
  pageSize: parseAsInteger.withDefault(20),
}

export const loadSearchParams = createLoader(searchParams)

export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

export const loader = async ({ request, context }: Route.ActionArgs) => {
  const { nextCursor, previousCursor, pageSize, name, status } = loadSearchParams(request)
  const { telemetryService } = context.get(restContext)
  const { user } = context.get(membershipContext)

  const response = await telemetryService.fetchStations({
    nextCursor,
    previousCursor,
    pageSize: Number(pageSize),
    name: name ?? undefined,
    status: status ?? undefined,
  })
  if (response.isFailure) response.throwError()

  return {
    user,
    stations: response.body.items,
    nextCursor: response.body.nextCursor,
    previousCursor: response.body.previousCursor,
    pageSize: response.body.pageSize,
    hasNextPage: response.body.hasNextPage,
    hasPreviousPage: response.body.hasPreviousPage,
  }
}

export default StationsPage
