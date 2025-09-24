import { type RouteConfig, index, route, layout } from '@react-router/dev/routes'
import { ROUTES } from '../core/global/constants/routes'

export default [
  index('routes/auth/sign-in-route.tsx'),
  route(ROUTES.auth.signUp, 'routes/auth/sign-up-route.tsx'),
  layout('layouts/app-layout.tsx', [
    route(ROUTES.dashboard, 'routes/telemetry/dashboard-route.tsx'),
    route(ROUTES.stations, 'routes/telemetry/stations-route.tsx'),
    route(ROUTES.station, 'routes/telemetry/station-route.tsx'),
    route(ROUTES.reports, 'routes/telemetry/reports-route.tsx'),
    route(ROUTES.configuration, 'routes/membership/configuration-route.tsx'),
    route(ROUTES.profile, 'routes/membership/profile-route.tsx'),
    route(ROUTES.parameters, 'routes/telemetry/parameters-route.tsx'),
    route(ROUTES.alarms, 'routes/alerting/alarms-route.tsx'),
    route(ROUTES.users, 'routes/membership/users-route.tsx'),
  ]),
] satisfies RouteConfig
