import { AxiosRestClient } from "@/rest/axios/axios-rest-client"
import { MembershipService } from "@/rest/services"

const restClient = AxiosRestClient()

export function useRest() {
  return {
    membershipService: MembershipService(restClient),
    alertingService: null,
    authService: null,
  }
}
