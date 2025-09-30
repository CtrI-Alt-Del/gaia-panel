import { Outlet, useLoaderData } from 'react-router'

import type { loader } from '@/app/routes/telemetry/station-route'
import { StationPageView } from './station-page-view'

export const StationPage = () => {
  const { station, user } = useLoaderData<typeof loader>()
  return (
    <StationPageView station={station} isAuthenticated={Boolean(user)}>
      <Outlet />
    </StationPageView>
  )
}
