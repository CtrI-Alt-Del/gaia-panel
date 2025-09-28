import { createLoader, parseAsString, parseAsInteger } from 'nuqs/server'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { restContext } from '@/app/contexts/rest-context'
import { AlarmsPage } from '@/ui/alerting/widgets/pages/alarms'
import type { Route } from '../membership/+types/users-route'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { AlertingService } from '@/rest/services/alerting-service'
import { authContext } from '@/app/contexts/auth-context'
import { redirect } from 'react-router'
import { ROUTES } from '@/core/global/constants/routes'
import { AxiosRestClient } from '@/rest/axios/axios-rest-client'
import { ENV } from '@/core/global/constants'

export const searchParams = {
  status: parseAsString,
  nextCursor: parseAsString,
  previousCursor: parseAsString,
  pageSize: parseAsInteger.withDefault(10),
}

export const loadSearchParams = createLoader(searchParams)

export const middleware = [AuthMiddleware, RestMiddleware, AlertingService]

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { nextCursor, previousCursor, pageSize, status } = loadSearchParams(request)

  const restClient = AxiosRestClient()
  restClient.setBaseUrl(ENV.gaiaServerUrl)
  const service = AlertingService(restClient)

  const response = await service.fetchAlarms({
    nextCursor,
    previousCursor,
    pageSize: Number(pageSize),
    status: status ?? undefined,
  })
  if (response.isFailure) response.throwError()

  console.log('response', response)
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
