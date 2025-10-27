import { ParametersSelect } from './parameters-select'
import { MeasurementsTable } from './measurements-table'
import { Button } from '@/ui/shadcn/components/button'
import { DatePicker } from '@/ui/shadcn/components/date-picker'

type Params = {
  defaultDate?: Date
}

export const StationMeasurementsSlotView = ({ defaultDate }: Params) => {
  return (
    <div className='px-6'>
      <form className='flex items-end gap-2'>
        <ParametersSelect />
        <DatePicker name='date' defaultValue={defaultDate} />
        <Button type='submit'>filtrar</Button>
      </form>
      <div className='mt-6 bg-white border border-gray-200'>
        <MeasurementsTable />
      </div>
    </div>
  )
}
