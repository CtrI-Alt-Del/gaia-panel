import { createLoader, parseAsString, parseAsInteger } from 'nuqs/server'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { restContext } from '@/app/contexts/rest-context'
import { AlarmsPage } from '@/ui/alerting/widgets/pages/alarms'
import type { Route } from '../membership/+types/users-route'

export const searchParams = {
  status: parseAsString,
  nextCursor: parseAsString,
  previousCursor: parseAsString,
  pageSize: parseAsInteger.withDefault(10),
  level: parseAsString
}

export const loadSearchParams = createLoader(searchParams)

export const middleware = [RestMiddleware]

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const { nextCursor, previousCursor, pageSize, status, level } = loadSearchParams(request)
  const { alertingService } = context.get(restContext)
  const response = await alertingService.fetchAlarms({
    nextCursor,
    previousCursor,
    pageSize: Number(pageSize),
    status: status ?? undefined,
    level: level ?? undefined
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
