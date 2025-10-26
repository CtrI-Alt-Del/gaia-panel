import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/components/card'
import { MeasurementsTable } from '../../../components/measurements-table'

export type Props = {
  measurements: MeasurementDto[]
  isLoading?: boolean
}

export const MeasurementsView = ({ measurements, isLoading }: Props) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-3'>
        <CardTitle className='text-lg font-bold'>Últimas Medições Registradas</CardTitle>
      </CardHeader>
      <CardContent>
        <MeasurementsTable
          measurements={measurements}
          nextCursor={null}
          previousCursor={null}
          hasNextPage={false}
          hasPreviousPage={false}
          isLoading={isLoading}
          hasStation={true}
        />
      </CardContent>
    </Card>
  )
}
