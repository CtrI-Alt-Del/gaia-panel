import { createLoader, parseAsString, parseAsInteger } from 'nuqs/server'

import { AlarmsFaker } from '@/core/alerting/dtos/fakers/alarms-faker'
import { PaginationResponse } from '@/core/global/responses/pagination-response'
import { RestResponse } from '@/core/global/responses/rest-response'

import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { restContext } from '@/app/contexts/rest-context'
import { AlarmsPage } from '@/ui/alerting/widgets/pages/alarms'
import type { Route } from '../membership/+types/users-route'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { AlertingService } from '@/rest/services/alerting-service'

export const searchParams = {
  status: parseAsString,
  nextCursor: parseAsString,
  previousCursor: parseAsString,
  pageSize: parseAsInteger.withDefault(10),
}

export const loadSearchParams = createLoader(searchParams)

export const middleware = [AuthMiddleware, RestMiddleware, AlertingService]

export const loader = async ({ context, request }: Route.LoaderArgs) => {
  const { status, nextCursor, previousCursor, pageSize } = loadSearchParams(request)
  const { alerginService } = context.get(restContext)

  const response = await alerginService.fetchAlarms({
    nextCursor,
    previousCursor,
    pageSize: Number(pageSize),
    status: status ?? undefined,
  })
  if (response.isFailure) response.throwError()

  return {
    alarms: response.body.items,
    nextCursor: response.body.nextCursor,
    previousCursor: response.body.previousCursor,
    pageSize: response.body.pageSize,
    hasNextPage: response.body.hasNextPage,
    hasPreviousPage: response.body.hasPreviousPage,
  }
}

export default AlarmsPage
