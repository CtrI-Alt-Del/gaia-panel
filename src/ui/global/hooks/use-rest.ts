import { ENV } from '@/core/global/constants'
import { AxiosRestClient } from '@/rest/axios/axios-rest-client'
import { MembershipService, TelemetryService, AlertingService } from '@/rest/services'

export function useRest() {
  const restClient = AxiosRestClient()

  restClient.setBaseUrl(ENV.gaiaServerUrl)

  return {
    membershipService: MembershipService(restClient),
    telemetryService: TelemetryService(restClient),
    alertingService: AlertingService(restClient),
    authService: null,
  }
}
