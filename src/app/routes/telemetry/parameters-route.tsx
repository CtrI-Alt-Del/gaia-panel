import { createLoader, parseAsString, parseAsInteger } from 'nuqs/server'

import type { Route } from './+types/parameters-route'
import { ParametersPage } from '@/ui/telemetry/widgets/pages/parameters'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { restContext } from '@/app/contexts/rest-context'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { membershipContext } from '@/app/contexts/membership-context'

export const searchParams = {
  name: parseAsString,
  unitOfMeasure: parseAsString,
  status: parseAsString.withDefault('all'),
  nextCursor: parseAsString,
  previousCursor: parseAsString,
  pageSize: parseAsInteger.withDefault(10),
}

export const loadSearchParams = createLoader(searchParams)

export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const { telemetryService } = context.get(restContext)
  const { nextCursor, previousCursor, pageSize, name, status } = loadSearchParams(request)
  const { user } = context.get(membershipContext)

  const service = telemetryService

  const response = await service.fetchParameters({
    nextCursor,
    previousCursor,
    pageSize: Number(pageSize),
    name: name ?? undefined,
    status: status ?? 'all',
  })
  if (response.isFailure) {
    response.throwError()
  }

  return {
    user,
    parameters: response.body.items,
    nextCursor: response.body.nextCursor,
    previousCursor: response.body.previousCursor,
    pageSize: response.body.pageSize,
    hasNextPage: response.body.hasNextPage,
    hasPreviousPage: response.body.hasPreviousPage,
    telemetryService,
  }
}

export default ParametersPage
