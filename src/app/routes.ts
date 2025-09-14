import { type RouteConfig, index, route, layout } from '@react-router/dev/routes'
import { ROUTES } from '../core/constants/ROUTES'

export default [
  index('routes/auth/login.tsx'),
  layout('layouts/AppLayout.tsx', [
    route(ROUTES.dashboard, 'routes/telemetry/dashboard.tsx'),
    route(ROUTES.stations, 'routes/telemetry/stations.tsx'),
    route(ROUTES.reports, 'routes/telemetry/reports.tsx'),
    route(ROUTES.configuration, 'routes/membership/configuration.tsx'),
    route(ROUTES.profile, 'routes/membership/profile.tsx'),
    route(ROUTES.parameters, 'routes/telemetry/parameters.tsx'),
    route(ROUTES.alerts, 'routes/alerting/alarms.tsx'),
  ]),
] satisfies RouteConfig
