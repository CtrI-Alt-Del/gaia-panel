import { SERVER_ENV } from '@/core/global/constants/server-env'
import type { Route } from '../+types/root'

import { AxiosRestClient } from '@/rest/axios/axios-rest-client'
import { AlertingService, MembershipService, TelemetryService } from '@/rest/services'
import { restContext } from '../contexts/rest-context'
import { authContext } from '../contexts/auth-context'
import { AlertsService } from '@/rest/services/alerts-service'

export const RestMiddleware = async ({ context }: Route.LoaderArgs) => {
  const { accessToken } = context.get(authContext)

  const restClient = AxiosRestClient()

  restClient.setBaseUrl(SERVER_ENV.gaiaServerUrl)
  if (accessToken) restClient.setAuthorization(accessToken)

  const membershipService = MembershipService(restClient)
  const telemetryService = TelemetryService(restClient)
  const alertingService = AlertingService(restClient)
  const alertsService = AlertsService(restClient)

  context.set(restContext, {
    membershipService,
    telemetryService,
    alertingService,
    alertsService,
  })
}
