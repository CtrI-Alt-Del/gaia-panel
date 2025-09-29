import type { loader } from '@/app/routes/telemetry/station-route'
import { StationLocationSlotView } from './stations-details-slot-view'
import { useLoaderData } from 'react-router'

export const StationLocationSlot = () => {
  const { station } = useLoaderData<typeof loader>()
  return <StationLocationSlotView station={station} />
}
