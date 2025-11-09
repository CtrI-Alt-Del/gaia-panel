import type { loader } from '@/app/routes/telemetry/station-measurements-route'
import { useLoaderData } from 'react-router'
import { StationMeasurementsSlotView } from './station-measurements-slot-view'
import { useStationMeasurements } from './use-station-measurements'
import { useMeasurementsSocket } from '@/ui/global/hooks/use-measurements-socket'

export const StationMeasurementsSlot = () => {
  const loaderData = useLoaderData<typeof loader>()
  const {
    measurements,
    nextCursor,
    previousCursor,
    hasNextPage,
    hasPreviousPage,
    handleFetchMeasurements,
  } = useStationMeasurements()
  useMeasurementsSocket({
    params: {
      stationId: loaderData.station.id,
      pageSize: loaderData.pageSize,
      nextCursor: loaderData.nextCursor || undefined,
      previousCursor: loaderData.previousCursor || undefined,
      date: loaderData.date || undefined,
      parameterId: loaderData.parameterId || undefined,
    },
    onFetchMeasurements: handleFetchMeasurements,
  })

  console.log('StationMeasurementsSlot', { nextCursor, previousCursor })

  return (
    <StationMeasurementsSlotView
      defaultDate={loaderData.date ?? undefined}
      measurements={measurements}
      nextCursor={nextCursor}
      previousCursor={previousCursor}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
    />
  )
}
