import { useLoaderData } from 'react-router'
import { StationMeasurementsSlotView } from './station-measurements-slot-view'
import type { loader } from '@/app/routes/telemetry/station-measurements-route'

export const StationMeasurementsSlot = () => {
  const { date } = useLoaderData<typeof loader>()
  return <StationMeasurementsSlotView defaultDate={date ?? undefined} />
}
