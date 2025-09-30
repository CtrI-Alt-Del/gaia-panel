import type { Route } from './+types/station-route'

import { restContext } from '@/app/contexts/rest-context'
import { StationPage } from '@/ui/telemetry/widgets/pages/station'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { membershipContext } from '@/app/contexts/membership-context'

export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

export const loader = async ({ params, context }: Route.ActionArgs) => {
  const { stationId } = params
  const { telemetryService } = context.get(restContext)
  const { user } = context.get(membershipContext)

  const response = await telemetryService.fetchStation(stationId)
  if (response.isFailure) response.throwError()

  return {
    user,
    station: response.body,
  }
}

export default StationPage
