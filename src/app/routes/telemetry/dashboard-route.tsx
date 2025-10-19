import { createLoader, parseAsString } from "nuqs/server";
import type { Route } from "./+types/dashboard-route";
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
};

export const loadSearchParams = createLoader(searchParams);

export const middleware = [AuthMiddleware, RestMiddleware]

export const loader = async ({ context, request }: Route.ActionArgs) => {
  const { station, period, parameter } = loadSearchParams(request)
  const { userId } = context.get(authContext)
  const { telemetryService, alertsService } = context.get(restContext)

  if (!userId) return redirect(ROUTES.auth.signIn)

  const [stationsResponse, alertsResponse] = await Promise.all([
    telemetryService.fetchStationsCount(),
    alertsService.fetchAlertsCount()
  ])

  const stationsData: StationsCountDto = stationsResponse.body ?? {
    totalStations: 0,
    activeStationsPercentage: 0
  }

  const alertsData: AlertsCountDto = alertsResponse.body ?? {
    criticalAlertsCount: 0,
    warningAlertsCount: 0
  }

  return {
    stationsData,
    alertsData,
    selectedStation: station,
    selectedPeriod: period,
    selectedParameter: parameter
  }
};

export default DashboardPage;
