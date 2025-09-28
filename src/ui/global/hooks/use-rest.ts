import { ENV } from '@/core/global/constants'
import { AxiosRestClient } from '@/rest/axios/axios-rest-client'
import { MembershipService, TelemetryService } from '@/rest/services'
import { AlertingService } from '@/rest/services/alerting-service'

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
