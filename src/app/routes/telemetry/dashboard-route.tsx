import { createLoader, parseAsString } from 'nuqs/server'
import type { Route } from './+types/dashboard-route'
import type { StationsCountDto } from '@/core/telemetry/dtos/stations-count-dto'
import type { AlertsCountDto } from '@/core/alerts/dtos/alerts-count-dto'

import { DashboardPage } from '@/ui/telemetry/widgets/pages/dashboard'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { restContext } from '@/app/contexts/rest-context'
import { authContext } from '@/app/contexts/auth-context'
import { redirect } from 'react-router'
import { ROUTES } from '@/core/global/constants/routes'

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

  if (!userId) return redirect(ROUTES.auth.signIn)

  const [stationsResponse, alertsCountResponse, recentAlertsResponse]: [
    { body?: StationsCountDto },
    { body?: AlertsCountDto },
    { body?: { items?: any[] } },
  ] = await Promise.all([
    telemetryService.fetchStationsCount(),
    alertingService.fetchAlertsCount(),
    alertingService.fetchAlerts({
      pageSize: 5,
      nextCursor: null,
      previousCursor: null,
    }),
  ])

  const stationsData: StationsCountDto = stationsResponse.body ?? {
    totalStations: 0,
    activeStationsPercentage: 0,
  }

  const alertsData: AlertsCountDto = alertsCountResponse.body ?? {
    criticalAlerts: 0,
    warningAlerts: 0,
  }

  let recentAlerts: any[] = []
  try {
    const items = recentAlertsResponse.body?.items ?? []
    recentAlerts = items.map((alert, idx) => ({
      id: String(idx),
      type: 'alert',
      title: alert.message ?? '',
      station: alert.parameterStationName ?? '',
      severity: alert.level ?? 'info',
      timestamp: alert.createdAt ? new Date(alert.createdAt) : new Date(),
    }))
  } catch {
    recentAlerts = []
  }

  return {
    stationsData,
    alertsData,
    recentAlerts,
    selectedStation: station,
    selectedPeriod: period,
    selectedParameter: parameter,
  }
}

export default DashboardPage
