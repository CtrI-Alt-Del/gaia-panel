import type { loader } from "@/app/routes/telemetry/station-measurements-route"
import { useLoaderData } from "react-router"
import { StationMeasurementsSlotView } from "./station-measurements-slot-view"


export const StationMeasurementsSlot = () => {
  const { date, measurements, nextCursor, previousCursor, hasNextPage, hasPreviousPage } =
    useLoaderData<typeof loader>()
  return (
    <StationMeasurementsSlotView
      defaultDate={date ?? undefined}
      measurements={measurements}
      nextCursor={nextCursor}
      previousCursor={previousCursor}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
    />
  )
}
