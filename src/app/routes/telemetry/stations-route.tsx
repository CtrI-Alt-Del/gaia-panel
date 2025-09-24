import {
  createLoader,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
} from "nuqs/server";
import type { Route } from "./+types/stations-route";

import { AxiosRestClient } from "@/rest/axios/axios-rest-client";
import { TelemetryService } from "@/rest/services/telemetry-service";
import { StationsPage } from "@/ui/telemetry/widgets/pages/stations";
import { ENV } from "@/core/global/constants";

export const searchParams = {
  name: parseAsString,
  isActive: parseAsBoolean,
  status: parseAsString,
  nextCursor: parseAsString,
  previousCursor: parseAsString,
  pageSize: parseAsInteger.withDefault(20),
};

export const loadSearchParams = createLoader(searchParams);

export const loader = async ({ request }: Route.ActionArgs) => {
  const { nextCursor, previousCursor, pageSize, name, isActive, status } =
    loadSearchParams(request);

  const restClient = AxiosRestClient();
  restClient.setBaseUrl(ENV.serverAppUrl);
  const service = TelemetryService(restClient);
  const response = await service.fetchStations({
    nextCursor,
    previousCursor,
    pageSize: Number(pageSize),
    name: name ?? undefined,
    isActive: isActive ?? undefined,
    status: status ?? undefined,
  });

  console.log("response", response);

  // Verificar se a requisição foi bem-sucedida
  if (!response.isSuccessful) {
    throw new Response(response.errorMessage, {
      status: response.statusCode,
    });
  }

  return {
    stations: response.body.items,
    nextCursor: response.body.nextCursor,
    previousCursor: response.body.previousCursor,
    pageSize: response.body.pageSize,
    hasNextPage: response.body.hasNextPage,
    hasPreviousPage: response.body.hasPreviousPage,
  };
};

export default StationsPage;
