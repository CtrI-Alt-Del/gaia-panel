import { redirect } from 'react-router'
import { createLoader, parseAsString } from 'nuqs/server'
import type { Route } from './+types/dashboard-route'

import type { StationsCountDto } from '@/core/telemetry/dtos/stations-count-dto'
import type { AlertsCountDto } from '@/core/alerting/alerts/dtos/alerts-count-dto'
import { ROUTES } from '@/core/global/constants/routes'

import { DashboardPage } from '@/ui/telemetry/widgets/pages/dashboard'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { restContext } from '@/app/contexts/rest-context'
import { authContext } from '@/app/contexts/auth-context'

export const searchParams = {
  station: parseAsString,
  period: parseAsString.withDefault('7'),
  parameter: parseAsString.withDefault('temperature'),
}

export const loadSearchParams = createLoader(searchParams)

export const middleware = [AuthMiddleware, RestMiddleware]

export const loader = async ({ context, request }: Route.ActionArgs) => {
  const { station, period, parameter } = loadSearchParams(request)
  const { userId } = context.get(authContext)
  const { telemetryService, alertingService } = context.get(restContext)

  const url = new URL(request.url)
  const isVisitor = url.searchParams.get('visitor') === 'true'

  if (!isVisitor && !userId) {
    return redirect(ROUTES.auth.signIn)
  }

  const [stationsResponse, measurementsResponse, alertsCountResponse] = await Promise.all([
    telemetryService.fetchStationsCount(),
    telemetryService.fetchMeasurements({
      pageSize: 10,
    }),
    alertingService.fetchAlertsCount(),
  ])

  const stationsData: StationsCountDto = stationsResponse.body ?? {
    totalStations: 0,
    activeStationsPercentage: 0,
  }

  const alertsData: AlertsCountDto = alertsCountResponse.body ?? {
    criticalAlerts: 0,
    warningAlerts: 0,
  }

  return {
    stationsData,
    alertsData,
    measurements: measurementsResponse.body.items,
    selectedStation: station,
    selectedPeriod: period,
    selectedParameter: parameter,
  }
}

export default DashboardPage
