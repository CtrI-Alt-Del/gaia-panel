import { ENV } from '@/core/global/constants'
import type { Route } from '../+types/root'

import { AxiosRestClient } from '@/rest/axios/axios-rest-client'

import { MembershipService, TelemetryService } from '@/rest/services'
import { restContext } from '../contexts/rest-context'
import { authContext } from '../contexts/auth-context'

export const RestMiddleware = async ({ context }: Route.LoaderArgs) => {
  const { accessToken } = context.get(authContext)

  const restClient = AxiosRestClient()
  restClient.setBaseUrl(ENV.gaiaServerUrl)
  if (accessToken) restClient.setAuthorization(accessToken)

  const membershipService = MembershipService(restClient)
  const telemetryService = TelemetryService(restClient)

  context.set(restContext, {
    membershipService,
    telemetryService,
  })
}
