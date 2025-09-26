import { ENV } from '@/core/global/constants'
import { AxiosRestClient } from '@/rest/axios/axios-rest-client'
import { MembershipService, TelemetryService } from '@/rest/services'

export function useRest() {
  const restClient = AxiosRestClient()

  restClient.setBaseUrl(ENV.serverAppUrl)

  return {
    membershipService: MembershipService(restClient),
    telemetryService: TelemetryService(restClient),
    alertingService: null,
    authService: null,
  }
}
