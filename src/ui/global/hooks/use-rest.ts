import { ENV } from '@/core/global/constants'
import { AxiosRestClient } from '@/rest/axios/axios-rest-client'
import { MembershipService } from '@/rest/services'

export function useRest() {
  const restClient = AxiosRestClient()

  restClient.setBaseUrl(ENV.gaiaServerUrl)

  return {
    membershipService: MembershipService(restClient),
    alertingService: null,
    authService: null,
  }
}
