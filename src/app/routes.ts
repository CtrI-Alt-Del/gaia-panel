import { type RouteConfig, index, route, layout } from '@react-router/dev/routes'
import { ROUTES } from '../core/global/constants/routes'

export default [
  index('routes/index-route.tsx'),
  route(ROUTES.auth.signUp, 'routes/auth/sign-up-route.tsx'),
  route(ROUTES.auth.signIn, 'routes/auth/sign-in-route.tsx'),
  route(ROUTES.auth.changePassword, 'routes/auth/change-password-route.tsx'),
  layout('layouts/app-layout.tsx', [
    route(ROUTES.dashboard, 'routes/telemetry/dashboard-route.tsx'),
    route(ROUTES.stations, 'routes/telemetry/stations-route.tsx'),
    route(ROUTES.station, 'routes/telemetry/station-route.tsx', [
      route(ROUTES.stationLocation, 'routes/telemetry/station-location-route.tsx'),
      route(ROUTES.stationParameters, 'routes/telemetry/station-parameters-route.tsx'),
      route(
        ROUTES.stationMeasurements,
        'routes/telemetry/station-measurements-route.tsx',
      ),
    ]),
    route(ROUTES.reports, 'routes/telemetry/reports-route.tsx'),
    route(ROUTES.configuration, 'routes/membership/configuration-route.tsx'),
    route(ROUTES.profile, 'routes/membership/profile-route.tsx'),
    route(ROUTES.parameters, 'routes/telemetry/parameters-route.tsx'),
    route(ROUTES.alarms, 'routes/alerting/alarms-route.tsx'),
    route(ROUTES.alerts, 'routes/alerting/alerts/alerts-route.tsx'),
    route(ROUTES.users, 'routes/membership/users-route.tsx'),
    layout('layouts/help-center-layout.tsx', [
      route(ROUTES.helpCenter.index, 'routes/help-center/help-center-route.tsx', [
        index('routes/help-center/index-route.tsx'),
        route(ROUTES.helpCenter.dashboard, 'routes/help-center/dashboard-route.tsx'),
        route(ROUTES.helpCenter.notifications, 'routes/help-center/notifications-route.tsx'),
        route(ROUTES.helpCenter.stations, 'routes/help-center/stations-route.tsx'),
        route(ROUTES.helpCenter.parameters, 'routes/help-center/parameters-route.tsx'),
        route(ROUTES.helpCenter.alarms, 'routes/help-center/alarms-route.tsx'),
        route(ROUTES.helpCenter.alerts, 'routes/help-center/alerts-route.tsx'),
        route(ROUTES.helpCenter.users, 'routes/help-center/users-route.tsx'),
      ]),
    ]),
    route('*', 'routes/404.tsx'),
  ]),
] satisfies RouteConfig
