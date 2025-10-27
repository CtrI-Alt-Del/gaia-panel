import { MeasurementsTableView } from './measurements-table-view'
import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'

type MeasurementsTableProps = {
  measurements: MeasurementDto[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  isLoading?: boolean
  hasStation?: boolean
}

export const MeasurementsTable = ({
  measurements,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  hasStation,
  isLoading,
}: MeasurementsTableProps) => {
  return (
    <MeasurementsTableView
      measurements={measurements}
      nextCursor={nextCursor}
      previousCursor={previousCursor}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      hasStation={hasStation}
      isLoading={isLoading}
    />
  )
}
