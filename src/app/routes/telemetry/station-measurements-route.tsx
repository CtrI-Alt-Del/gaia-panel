import type { Route } from './+types/station-route'

import { restContext } from '@/app/contexts/rest-context'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { StationMeasurementsSlot } from '@/ui/telemetry/widgets/slots/station-measurements'

export const middleware = [RestMiddleware]

export const loader = async ({ params, context }: Route.ActionArgs) => {
  const { stationId } = params
  const { telemetryService } = context.get(restContext)
  const response = await telemetryService.fetchStation(stationId)
  if (response.isFailure) response.throwError()

  return {
    station: response.body,
  }
}

export default StationMeasurementsSlot
