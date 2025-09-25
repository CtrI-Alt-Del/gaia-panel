import { ENV } from "@/core/global/constants";
import { AxiosRestClient } from "@/rest/axios/axios-rest-client";
import { MembershipService, TelemetryService } from "@/rest/services";

const restClient = AxiosRestClient();

restClient.setBaseUrl(ENV.serverAppUrl);

export function useRest() {
  return {
    membershipService: MembershipService(restClient),
    telemetryService: TelemetryService(restClient),
    alertingService: null,
    authService: null,
  };
}
