import type { Route } from './+types/station-route'
import { StationParametersSlot } from '@/ui/telemetry/widgets/slots/station-parameters'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { restContext } from '@/app/contexts/rest-context'

export const middleware = [RestMiddleware]

export const loader = async ({ params, context }: Route.ActionArgs) => {
  const { stationId } = params
  const { telemetryService } = context.get(restContext)
  const response = await telemetryService.fetchParametersByStationId(stationId)
  return {
    parameters: response.body,
    stationId: stationId,
  }
}

export default StationParametersSlot
