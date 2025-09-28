import {
  createLoader,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
} from "nuqs/server";
import type { Route } from "./+types/stations-route";

import { StationsPage } from "@/ui/telemetry/widgets/pages/stations";
import { RestMiddleware } from "@/app/middlewares/rest-middleware";
import { restContext } from "@/app/contexts/rest-context";

export const searchParams = {
  name: parseAsString,
  isActive: parseAsBoolean,
  status: parseAsString,
  nextCursor: parseAsString,
  previousCursor: parseAsString,
  pageSize: parseAsInteger.withDefault(20),
};

export const loadSearchParams = createLoader(searchParams);

export const middleware = [RestMiddleware]

export const loader = async ({ request, context }: Route.ActionArgs) => {
  const { nextCursor, previousCursor, pageSize, name, isActive, status } =
    loadSearchParams(request);
  const { telemetryService } = context.get(restContext)
    
  const response = await telemetryService.fetchStations({
    nextCursor,
    previousCursor,
    pageSize: Number(pageSize),
    name: name ?? undefined,
    isActive: isActive ?? undefined,
    status: status ?? undefined,
  });
  if (response.isFailure) response.throwError()

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
