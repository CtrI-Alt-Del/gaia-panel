import { useLoaderData } from "react-router";
import type { loader as StationMeasurementsLoader } from "@/app/routes/telemetry/station-measurements-route";
import { StationMeasurementsSlotView } from "./station-measurements-slot-view";

export const StationMeasurementsSlot = () => {
  const {
    station,
    measurements = [],
    nextCursor,
    previousCursor,
    hasNextPage,
    hasPreviousPage,
  } = useLoaderData<typeof StationMeasurementsLoader>();
  return (
    <StationMeasurementsSlotView
      station={station}
      measurements={measurements}
      nextCursor={nextCursor}
      previousCursor={previousCursor}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
    />
  );
};
