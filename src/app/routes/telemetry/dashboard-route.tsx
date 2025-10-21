import { createLoader, parseAsString } from 'nuqs/server'
import type { Route } from './+types/dashboard-route'
import type { DashboardStatsDto } from '@/core/telemetry/dtos'

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

  if (!userId) return redirect(ROUTES.auth.signIn)

  const mockDashboardData: DashboardStatsDto = {
    totalStations: 128,
    activeStations: 94,
    alertsCount: 7,
    criticalIssues: 2,
    stationStatusDistribution: {
      active: 93.8,
      warning: 4.7,
      critical: 1.6,
      inactive: 0.0,
    },
    LastAlerts: [
      {
        id: '1',
        type: 'temperature',
        title: 'High Temperature Alert',
        station: 'Station 045 - São Paulo',
        severity: 'critical' as const,
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
      },
      {
        id: '2',
        type: 'humidity',
        title: 'Humidity Level Warning',
        station: 'Station 023 - Rio de Janeiro',
        severity: 'warning' as const,
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
      },
      {
        id: '3',
        type: 'air_quality',
        title: 'Air Quality Index',
        station: 'Station 089 - Belo Horizonte',
        severity: 'warning' as const,
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
      },
    ],
    latestReadings: [
      {
        code: '001',
        name: 'São Paulo Central',
        status: 'active' as const,
        lastReading: new Date(Date.now() - 2 * 60 * 1000),
        value: '24.5°C',
      },
      {
        code: '045',
        name: 'Rio Sul',
        status: 'critical' as const,
        lastReading: new Date(Date.now() - 5 * 60 * 1000),
        value: '35.2°C',
      },
      {
        code: '023',
        name: 'Brasília Norte',
        status: 'warning' as const,
        lastReading: new Date(Date.now() - 8 * 60 * 1000),
        value: '22.1°C',
      },
    ],
  }

  return {
    dashboardData: mockDashboardData,
    selectedStation: station,
    selectedPeriod: period,
    selectedParameter: parameter,
  }
}

export default DashboardPage
