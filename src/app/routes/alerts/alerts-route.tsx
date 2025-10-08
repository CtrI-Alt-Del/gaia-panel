import { createLoader, parseAsString, parseAsInteger } from 'nuqs/server'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { AlertsPage } from '@/ui/alerts/widgets/pages/alerts'
import type { Route } from '../membership/+types/users-route'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { membershipContext } from '@/app/contexts/membership-context'
import { AlertsFaker } from '@/core/alerts/dtos/fakers'

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
  const { pageSize, date, level } = loadSearchParams(request)
  const { user } = context.get(membershipContext)

  const mockAlerts = AlertsFaker.fakeMany(25)

  let filteredAlerts = mockAlerts

  if (level) {
    filteredAlerts = filteredAlerts.filter((alert) => alert.level === level)
  }

  if (date) {
    const filterDate = new Date(date)
    filteredAlerts = filteredAlerts.filter((alert) => {
      const alertDate = new Date(alert.createdAt)
      return (
        alertDate.getDate() === filterDate.getDate() &&
        alertDate.getMonth() === filterDate.getMonth() &&
        alertDate.getFullYear() === filterDate.getFullYear()
      )
    })
  }

  const startIndex = 0
  const endIndex = Math.min(startIndex + Number(pageSize), filteredAlerts.length)
  const paginatedAlerts = filteredAlerts.slice(startIndex, endIndex)

  return {
    user,
    alerts: paginatedAlerts,
    nextCursor: endIndex < filteredAlerts.length ? 'next-cursor' : null,
    previousCursor: startIndex > 0 ? 'prev-cursor' : null,
    pageSize: Number(pageSize),
    hasNextPage: endIndex < filteredAlerts.length,
    hasPreviousPage: startIndex > 0,
  }
}

export default AlertsPage

// import { createLoader, parseAsString, parseAsInteger } from 'nuqs/server'
// import { RestMiddleware } from '@/app/middlewares/rest-middleware'
// import { restContext } from '@/app/contexts/rest-context'
// import { AlertsPage } from '@/ui/alerts/widgets/pages/alerts'
// import type { Route } from '../membership/+types/users-route'
// import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
// import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
// import { membershipContext } from '@/app/contexts/membership-context'

// export const searchParams = {
//   date: parseAsString,
//   nextCursor: parseAsString,
//   previousCursor: parseAsString,
//   pageSize: parseAsInteger.withDefault(10),
//   level: parseAsString,
// }

// export const loadSearchParams = createLoader(searchParams)

// export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

// export const loader = async ({ request, context }: Route.LoaderArgs) => {
//   const { nextCursor, previousCursor, pageSize, date, level } = loadSearchParams(request)
//   const { alertsService } = context.get(restContext)
//   const { user } = context.get(membershipContext)
//   const response = await alertsService.fetchAlerts({
//     nextCursor,
//     previousCursor,
//     pageSize: Number(pageSize),
//     date: date ?? undefined,
//     level: level ?? undefined,
//   })
//   if (response.isFailure) response.throwError()

//   return {
//     user,
//     alerts: response.body.items,
//     nextCursor: response.body.nextCursor,
//     previousCursor: response.body.previousCursor,
//     pageSize: response.body.pageSize,
//     hasNextPage: response.body.hasNextPage,
//     hasPreviousPage: response.body.hasPreviousPage,
//   }
// }

// export default AlertsPage
