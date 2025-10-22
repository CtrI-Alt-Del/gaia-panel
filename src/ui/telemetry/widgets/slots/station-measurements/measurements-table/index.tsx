import { MeasurementsTableView } from "./measurements-table-view"
import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'

type MeasurementsTableProps = {
  measurements: MeasurementDto[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  isLoading?: boolean
}

export const MeasurementsTable = (props: MeasurementsTableProps) => {
  return <MeasurementsTableView {...props} />
}
