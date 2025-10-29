import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/components/card'
import { MeasurementsTable } from '../../../components/measurements-table'

export type Props = {
  measurements: MeasurementDto[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextCursor: string | null
  previousCursor: string | null
  isLoading?: boolean
}

export const MeasurementsView = ({
  measurements,
  hasNextPage,
  hasPreviousPage,
  nextCursor,
  previousCursor,
  isLoading,
}: Props) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-3'>
        <CardTitle className='text-lg font-bold'>Últimas Medições Registradas</CardTitle>
      </CardHeader>
      <CardContent>
        <MeasurementsTable
          measurements={measurements}
          nextCursor={nextCursor}
          previousCursor={previousCursor}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          isLoading={isLoading}
          hasStation={true}
        />
      </CardContent>
    </Card>
  )
}
