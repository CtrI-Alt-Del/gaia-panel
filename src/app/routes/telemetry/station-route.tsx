import type { Route } from "./+types/station-route";

import { AxiosRestClient } from "@/rest/axios/axios-rest-client";
import { TelemetryService } from "@/rest/services/telemetry-service";
import { StationPage } from "@/ui/telemetry/widgets/pages/station";
import { ENV } from "@/core/global/constants";

export const loader = async ({ params }: Route.ActionArgs) => {
  const { id: stationId } = params;

  if (!stationId) {
    throw new Error("Station ID is required");
  }

  const restClient = AxiosRestClient();
  restClient.setBaseUrl(ENV.serverAppUrl);
  const service = TelemetryService(restClient);

  const [stationResponse, parametersResponse] = await Promise.all([
    service.fetchStation(stationId),
    service.fetchStationParameters(stationId),
  ]);

  console.log("station response", stationResponse);
  console.log("parameters response", parametersResponse);

  // Verificar se a estação foi encontrada
  if (!stationResponse.isSuccessful) {
    throw new Response(stationResponse.errorMessage, {
      status: stationResponse.statusCode,
    });
  }

  // Verificar se os parâmetros foram encontrados
  if (!parametersResponse.isSuccessful) {
    throw new Response(parametersResponse.errorMessage, {
      status: parametersResponse.statusCode,
    });
  }

  return {
    station: stationResponse.body,
    parameters: parametersResponse.body,
  };
};

export default StationPage;
