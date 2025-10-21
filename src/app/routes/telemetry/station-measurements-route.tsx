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
    stationId: stationId,
    pageSize: 20,
  });

  if (measurementsResponse.isFailure) measurementsResponse.throwError();

  const parametersResponse = await telemetryService.fetchParametersByStationId(stationId);
  
  const parametersMap = parametersResponse.isSuccessful 
    ? new Map(parametersResponse.body.map(p => [p.id, p]))
    : new Map();

  const enrichedMeasurements = measurementsResponse.body.items.map(measurement => ({
    ...measurement,
    parameterName: measurement.stationParameter 
      ? parametersMap.get(measurement.stationParameter.parameterId)?.name 
      : undefined,
    parameter: measurement.stationParameter
      ? parametersMap.get(measurement.stationParameter.parameterId)
      : undefined,
  }));

  return {
    station: stationResponse.body,
    measurements: enrichedMeasurements,
    nextCursor: measurementsResponse.body.nextCursor ?? null,
    previousCursor: measurementsResponse.body.previousCursor ?? null,
    hasNextPage: Boolean(measurementsResponse.body.nextCursor),
    hasPreviousPage: Boolean(measurementsResponse.body.previousCursor),
  };
};

export default StationMeasurementsSlot;
