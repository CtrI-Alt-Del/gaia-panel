import { useLoaderData } from 'react-router'

import type { loader } from '@/app/routes/telemetry/station-parameters-route'
import { StationParametersSlotView } from '@/ui/telemetry/widgets/slots/station-parameters/station-parameters-slot'

export const StationParametersSlot = () => {
  const { parameters } = useLoaderData<typeof loader>()
  return <StationParametersSlotView parameters={parameters} />
}
