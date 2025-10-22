import { AlertTriangle, AlertCircle } from 'lucide-react'
import type { AlertDto } from '@/core/alerting/alerts/dtos/alert-dto'
import { Badge } from '@/ui/shadcn/components/badge'
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from '@/ui/shadcn/components/table'
import { PaginationControl } from '@/ui/global/widgets/components/pagination-control'
import { MeasurementUnitIcon } from '@/ui/global/widgets/components/measurement-unit-icon'
import { useFormatDateTime } from '@/ui/global/hooks/use-format-date-time'

export type AlertsTableViewProps = {
  alerts: AlertDto[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  isLoading?: boolean
}

export const AlertsTableView = ({
  alerts,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  isLoading,
}: AlertsTableViewProps) => {
  const { formatDateTime } = useFormatDateTime()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='pl-6'>Parâmetro</TableHead>
          <TableHead>Estação</TableHead>
          <TableHead>Mensagem</TableHead>
          <TableHead>Nível</TableHead>
          <TableHead>Medição</TableHead>
          <TableHead>Unidade</TableHead>
          <TableHead>Data de Criação</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          Array.from({ length: 5 }, (_, index) => {
            const skeletonId = `alert-skeleton-${Date.now()}-${index}`
            return (
              <TableRow key={skeletonId}>
                <TableCell className='pl-6'>
                  <div className='h-4 bg-gray-200 rounded animate-pulse' />
                </TableCell>
                <TableCell>
                  <div className='h-4 bg-gray-200 rounded animate-pulse' />
                </TableCell>
                <TableCell>
                  <div className='h-4 bg-gray-200 rounded animate-pulse' />
                </TableCell>
                <TableCell>
                  <div className='h-4 bg-gray-200 rounded animate-pulse' />
                </TableCell>
                <TableCell>
                  <div className='h-4 bg-gray-200 rounded animate-pulse' />
                </TableCell>
                <TableCell>
                  <div className='h-4 bg-gray-200 rounded animate-pulse' />
                </TableCell>
                <TableCell>
                  <div className='h-4 bg-gray-200 rounded animate-pulse' />
                </TableCell>
              </TableRow>
            )
          })
        ) : alerts.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className='text-center text-stone-500 py-10'>
              Nenhum alerta encontrado.
            </TableCell>
          </TableRow>
        ) : (
          alerts.map((alert, index) => {
          alerts.map((alert, index) => {
            return (
              <TableRow
                key={`${alert.parameterName}-${alert.parameterStationName}-${index}`}
              >
                <TableCell className='pl-6'>
                  <div className='flex items-center gap-2'>
                    <MeasurementUnitIcon unit={String(alert.parameterUnitOfMeasure)} />
                    <div className='text-sm font-bold text-stone-700'>
                      {alert.parameterName}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className='text-sm font-medium text-stone-700'>
                    {alert.parameterStationName || '-'}
                  </div>
                </TableCell>

                <TableCell>
                  <div
                    className='text-sm text-stone-700 max-w-xs truncate'
                    title={alert.message}
                  >
                    {alert.message}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    color={alert.level === 'critical' ? 'red' : 'yellow'}
                    tone='soft'
                  >
                    {alert.level === 'critical' ? (
                      <>
                        <AlertTriangle className='w-3 h-3' />
                        Crítico
                      </>
                    ) : (
                      <>
                        <AlertCircle className='w-3 h-3' />
                        Aviso
                      </>
                    )}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-stone-600'>
                      {alert.measurementValue}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className='text-sm text-stone-600'>
                    {alert.parameterUnitOfMeasure}
                  </div>
                </TableCell>

                <TableCell className='text-sm text-stone-600'>
                  {alert.createdAt ? (
                    <div className='flex flex-col'>
                      <span>{formatDateTime(alert.createdAt).formattedDate}</span>
                      <span className='text-xs text-stone-500'>
                        {formatDateTime(alert.createdAt).formattedTime}
                      </span>
                    </div>
                  ) : (
                    '-'
                  )}
                </TableCell>
              </TableRow>
            )
          })
        )}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>
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
