import { BarChart2 } from 'lucide-react'
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
import { MeasurementsTableSkeleton } from '../measurements-table-skeleton'
import { MeasurementUnitIcon } from '@/ui/global/widgets/components/measurement-unit-icon'

type MeasurementsTableViewProps = {
  measurements: MeasurementDto[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  isLoading?: boolean
}

export const MeasurementsTableView = ({
  measurements,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  isLoading,
}: MeasurementsTableViewProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-6">Parâmetro</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Unidade</TableHead>
          <TableHead>Data/Hora</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          Array.from({ length: 10 }, (_, index) => {
            const skeletonId = `measurement-skeleton-${Date.now()}-${index}`
            return <MeasurementsTableSkeleton key={skeletonId} />
          })
        ) : measurements.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center text-stone-500 py-10"
            >
              Nenhuma medição encontrada.
            </TableCell>
          </TableRow>
        ) : (
          measurements.map((measurement) => {
            const {
              id,
              parameter,
              parameterName,
              value,
              unitOfMeasure,
              createdAt,
            } = measurement

            const displayParameterName = parameterName || parameter?.name || '—'
            const formattedValue =
              typeof value === 'number' ? value.toFixed(2) : '—'
            const unit = unitOfMeasure || parameter?.unitOfMeasure || '—'
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
              <TableRow key={id} className="hover:bg-muted/40 transition-colors">
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <MeasurementUnitIcon unit={unit} />
                    <div className="leading-tight">
                      <div className="font-medium">{displayParameterName}</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="tabular-nums font-medium">
                  {formattedValue}
                </TableCell>

                <TableCell className="tabular-nums text-stone-700">
                  {unit}
                </TableCell>

                <TableCell className="text-stone-500">{date}</TableCell>
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
