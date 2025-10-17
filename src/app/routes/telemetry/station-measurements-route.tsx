import { restContext } from "@/app/contexts/rest-context";
import { RestMiddleware } from "@/app/middlewares/rest-middleware";
import { StationMeasurementsSlot } from "@/ui/telemetry/widgets/slots/station-measurements";
import type { Route as MeasurementsRoute } from "./+types/station-route";

export const middleware = [RestMiddleware];

export const loader = async ({
  params,
  context,
}: MeasurementsRoute.ActionArgs) => {
  const { stationId } = params;
  const { telemetryService } = context.get(restContext);

  const stationResponse = await telemetryService.fetchStation(stationId);
  if (stationResponse.isFailure) stationResponse.throwError();

  const measurementsResponse = await telemetryService.fetchMeasurements({
    stationName: stationResponse.body.name,
    pageSize: 20,
  });

  if (measurementsResponse.isFailure) measurementsResponse.throwError();

  return {
    station: stationResponse.body,
    measurements: measurementsResponse.body.items,
    nextCursor: measurementsResponse.body.nextCursor ?? null,
    previousCursor: measurementsResponse.body.previousCursor ?? null,
    hasNextPage: Boolean(measurementsResponse.body.nextCursor),
    hasPreviousPage: Boolean(measurementsResponse.body.previousCursor),
  };
};

export default StationMeasurementsSlot;
