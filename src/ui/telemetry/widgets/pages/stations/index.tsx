import { useLoaderData } from 'react-router'

import { useStationsPage } from './use-stations-page'
import { StationsPageView } from './stations-page-view'
import type { loader as StationsLoader } from '@/app/routes/telemetry/stations-route'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'

export const StationsPage = () => {
  const { user, stations, nextCursor, previousCursor, hasNextPage, hasPreviousPage } =
    useLoaderData<typeof StationsLoader>()
  const { selectedStation, handleEdit } = useStationsPage({
    stations,
  })
  const { isLoading } = useUiProvider()

  return (
    <StationsPageView
      stations={stations}
      nextCursor={nextCursor}
      previousCursor={previousCursor}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      isLoading={isLoading}
      onEdit={handleEdit}
      selectedStation={selectedStation}
      isAuthenticated={Boolean(user)}
    />
  )
}
