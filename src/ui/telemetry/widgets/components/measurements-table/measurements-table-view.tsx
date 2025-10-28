import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'

import { PaginationControl } from '@/ui/global/widgets/components/pagination-control'
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from '@/ui/shadcn/components/table'
import { MeasurementUnitIcon } from '@/ui/global/widgets/components/measurement-unit-icon'
import { MeasurementsTableSkeleton } from './measurements-table-skeleton'
import { Link } from 'react-router'

type Props = {
  measurements: MeasurementDto[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  isLoading?: boolean
  hasStation?: boolean
}

export const MeasurementsTableView = ({
  measurements,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  hasStation,
}: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {hasStation && <TableHead>Estação</TableHead>}
          <TableHead className='pl-6'>Parâmetro</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Unidade</TableHead>
          <TableHead>Data/Hora</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          Array.from({ length: 10 }, (_, index) => {
            const skeletonId = `measurement-skeleton-${Date.now()}-${index}`
            return <MeasurementsTableSkeleton key={skeletonId} hasStation={hasStation} />
          })
        ) : measurements.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={hasStation ? 5 : 4}
              className='text-center text-stone-500 py-10'
            >
              Nenhuma medição encontrada.
            </TableCell>
          </TableRow>
        ) : (
          measurements.map((measurement, index) => {
            const { parameter, value, createdAt } = measurement

            const displayParameterName = parameter?.entity?.name || '—'
            const formattedValue = typeof value === 'number' ? value.toFixed(2) : '—'
            const unit = parameter?.entity?.unitOfMeasure || '—'
            const date = createdAt
              ? new Date(createdAt).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '—'

            return (
              <TableRow
                key={String(index)}
                className='hover:bg-muted/40 transition-colors'
              >
                {hasStation && (
                  <TableCell>
                    <Link
                      to={`/stations/${measurement.parameter.entity?.stationId}/location`}
                      className='text-blue-500 hover:underline'
                    >
                      {measurement.parameter.entity?.stationName}
                    </Link>
                  </TableCell>
                )}
                <TableCell className='pl-6'>
                  <div className='flex items-center gap-3'>
                    <MeasurementUnitIcon unit={unit} />
                    <div className='leading-tight'>
                      <div className='font-medium'>{displayParameterName}</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className='tabular-nums font-medium'>
                  {formattedValue}
                </TableCell>

                <TableCell className='tabular-nums text-stone-700'>{unit}</TableCell>

                <TableCell className='text-stone-500'>{date}</TableCell>
              </TableRow>
            )
          })
        )}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>
            <PaginationControl
              previousCursor={previousCursor}
              nextCursor={nextCursor}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
