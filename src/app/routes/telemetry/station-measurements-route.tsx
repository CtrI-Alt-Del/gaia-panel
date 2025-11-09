import { restContext } from '@/app/contexts/rest-context'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { StationMeasurementsSlot } from '@/ui/telemetry/widgets/slots/station-measurements'
import type { Route as MeasurementsRoute } from './+types/station-route'
import { createLoader, parseAsInteger, parseAsIsoDate, parseAsString } from 'nuqs'

export const searchParams = {
  parameterId: parseAsString,
  nextCursor: parseAsString,
  previousCursor: parseAsString,
  date: parseAsIsoDate,
  pageSize: parseAsInteger.withDefault(20),
}

const loadSearchParams = createLoader(searchParams)

export const middleware = [RestMiddleware]

export const loader = async ({
  request,
  params,
  context,
}: MeasurementsRoute.ActionArgs) => {
  const { stationId } = params
  const { nextCursor, previousCursor, pageSize, parameterId, date } =
    loadSearchParams(request)
  const { telemetryService } = context.get(restContext)

  const stationResponse = await telemetryService.fetchStation(stationId)
  if (stationResponse.isFailure) stationResponse.throwError()

  const parametersResponse = await telemetryService.fetchParametersByStationId(stationId)

  return {
    station: stationResponse.body,
    parameterId,
    parameters: parametersResponse.body,
    date,
    nextCursor,
    previousCursor,
    pageSize,
  }
}

export default StationMeasurementsSlot
