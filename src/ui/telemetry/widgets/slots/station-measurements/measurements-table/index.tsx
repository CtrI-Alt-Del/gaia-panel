import { useLoaderData } from 'react-router'
import { MeasurementsTableView } from './measurements-table-view'
import type { loader } from '@/app/routes/telemetry/station-measurements-route'

export const MeasurementsTable = () => {
  const { measurements, nextCursor, previousCursor, hasNextPage, hasPreviousPage } =
    useLoaderData<typeof loader>()
  return (
    <MeasurementsTableView
      measurements={measurements}
      nextCursor={nextCursor}
      previousCursor={previousCursor}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
    />
  )
}
