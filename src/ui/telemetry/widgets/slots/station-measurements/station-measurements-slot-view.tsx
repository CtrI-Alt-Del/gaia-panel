import { MeasurementsTable } from './measurements-table'
import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'

type StationMeasurementsSlotViewProps = {
  station: any
  measurements: any[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export const StationMeasurementsSlotView = ({
  station,
  measurements = [],
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
}: StationMeasurementsSlotViewProps) => {
  const normalizedMeasurements: MeasurementDto[] = measurements.map((m: any) => ({
    ...m,
    station: m.station ?? station,
  }))

  return (
    <div className='p-6'>
      <div className='bg-white  border border-gray-200'>
        <MeasurementsTable
          measurements={normalizedMeasurements}
          nextCursor={nextCursor}
          previousCursor={previousCursor}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
        />
      </div>
    </div>
  )
}
