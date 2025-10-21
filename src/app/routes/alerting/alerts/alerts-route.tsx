import { createLoader, parseAsString, parseAsInteger } from 'nuqs/server'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { restContext } from '@/app/contexts/rest-context'
import { AlertsPage } from '@/ui/alerting/widgets/pages/alerts'
import type { Route } from '../../membership/+types/users-route'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { membershipContext } from '@/app/contexts/membership-context'

export const searchParams = {
  date: parseAsString,
  nextCursor: parseAsString,
  previousCursor: parseAsString,
  pageSize: parseAsInteger.withDefault(10),
  level: parseAsString,
}

export const loadSearchParams = createLoader(searchParams)

export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const { nextCursor, previousCursor, pageSize, date, level } = loadSearchParams(request)
  const { alertsService } = context.get(restContext)
  const { user } = context.get(membershipContext)
  const response = await alertsService.fetchAlerts({
    nextCursor,
    previousCursor,
    pageSize: Number(pageSize),
    date: date ?? undefined,
    level: level && level !== 'all' ? level : undefined,
  })
  if (response.isFailure) response.throwError()

  return {
    user,
    alerts: response.body.items,
    nextCursor: response.body.nextCursor,
    previousCursor: response.body.previousCursor,
    pageSize: response.body.pageSize,
    hasNextPage: response.body.hasNextPage,
    hasPreviousPage: response.body.hasPreviousPage,
  }
}

export default AlertsPage
