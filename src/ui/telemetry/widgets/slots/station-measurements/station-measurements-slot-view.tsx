import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'

import { ParametersSelect } from './parameters-select'
import { MeasurementsTable } from '../../components/measurements-table'
import { Button } from '@/ui/shadcn/components/button'
import { DatePicker } from '@/ui/shadcn/components/date-picker'

type Params = {
  defaultDate?: Date
  measurements: MeasurementDto[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
}

export const StationMeasurementsSlotView = ({
  defaultDate,
  measurements,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
}: Params) => {
  return (
    <div className='px-6'>
      <form className='flex items-end gap-2'>
        <ParametersSelect />
        <DatePicker name='date' defaultValue={defaultDate} />
        <Button type='submit'>filtrar</Button>
      </form>
      <div className='mt-6 bg-white border border-gray-200'>
        <MeasurementsTable
          measurements={measurements}
          nextCursor={nextCursor}
          previousCursor={previousCursor}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
        />
      </div>
    </div>
  )
}
