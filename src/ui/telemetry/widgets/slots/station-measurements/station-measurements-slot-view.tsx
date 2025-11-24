import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'

import { ParametersSelect } from './parameters-select'
import { MeasurementsTable } from '../../components/measurements-table'
import { Button } from '@/ui/shadcn/components/button'
import { DatePicker } from '@/ui/shadcn/components/date-picker'
import { PageSizeSelect } from '@/ui/global/widgets/components/page-size-select'

type Params = {
  defaultDate?: Date
  measurements: MeasurementDto[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  isLoading?: boolean
}

export const StationMeasurementsSlotView = ({
  defaultDate,
  measurements,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  isLoading,
}: Params) => {
  return (
    <div className='px-6'>
      <form className='flex items-end gap-2'>
        <ParametersSelect />
        <DatePicker name='date' defaultValue={defaultDate} />
        <PageSizeSelect />
        <Button type='submit'>filtrar</Button>
      </form>
      <div className='mt-6 bg-white border border-gray-200'>
        <MeasurementsTable
          measurements={measurements}
          nextCursor={nextCursor}
          previousCursor={previousCursor}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
