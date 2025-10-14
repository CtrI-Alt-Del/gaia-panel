import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react'
import type { AlertDto } from '@/core/alerts/dtos/alert-dto'
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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='pl-6'>Parâmetro</TableHead>
          <TableHead>Mensagem</TableHead>
          <TableHead>Nível</TableHead>
          <TableHead>Unidade</TableHead>
          <TableHead>Status</TableHead>
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
              </TableRow>
            )
          })
        ) : alerts.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className='text-center text-stone-500 py-10'>
              Nenhum alerta encontrado.
            </TableCell>
          </TableRow>
        ) : (
          alerts.map((alert) => {
            return (
              <TableRow key={alert.id}>
                <TableCell className='pl-6'>
                  <div className='flex items-center gap-2'>
                    <MeasurementUnitIcon
                      unit={String(alert.parameter.entity?.unitOfMeasure)}
                    />
                    <div className='text-sm font-bold text-stone-700'>
                      {alert.parameter.entity?.name}
                    </div>
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
                  <div className='text-sm text-stone-600'>
                    {alert.parameter.entity?.unitOfMeasure}
                  </div>
                </TableCell>

                <TableCell>
                  <div className='flex items-center gap-2'>
                    <CheckCircle className='w-4 h-4 text-green-600' />
                    <span className='text-sm text-stone-600'>Ativo</span>
                  </div>
                </TableCell>

                <TableCell className='text-sm text-stone-600'>
                  {alert.createdAt
                    ? new Date(alert.createdAt).toLocaleDateString('pt-BR')
                    : '-'}
                </TableCell>
              </TableRow>
            )
          })
        )}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>
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
