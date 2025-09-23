import { Edit, Eye, Power } from 'lucide-react'
import type { AlarmRule } from '../types'
import { StatusPill } from '@/ui/shadcn/components/status-pill'
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from '@/ui/shadcn/components/table'
import { Button } from '@/ui/shadcn/components/button'
import { Dialog } from '@/ui/global/widgets/components/dialog'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { PaginationControl } from '@/ui/global/widgets/components/pagination-control'
import { AlarmTableSkeleton } from '../alarm-table-skeleton'

export type AlarmsTableViewProps = {
  alarms: AlarmRule[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  isLoading?: boolean
  selectedAlarm?: AlarmRule
  onViewAlarm?: (id: string) => void
  onEditAlarm?: (id: string) => void
  onToggleActive?: (id: string) => void
  onCloseModal?: () => void
}

export const AlarmsTableView = ({
  alarms,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  selectedAlarm,
  onViewAlarm,
  onEditAlarm,
  onToggleActive,
  onCloseModal,
}: AlarmsTableViewProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'alarm':
        return 'bg-yellow-100 text-yellow-800'
      case 'warning':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'Crítico'
      case 'alarm':
        return 'Alarme'
      case 'warning':
        return 'Aviso'
      default:
        return 'Desconhecido'
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Condição</TableHead>
          <TableHead>Severidade</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Alvo</TableHead>
          <TableHead className='text-center'>Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          Array.from({ length: 5 }, (_, index) => {
            const skeletonId = `alarm-skeleton-${Date.now()}-${index}`
            return <AlarmTableSkeleton key={skeletonId} />
          })
        ) : alarms.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className='text-center text-stone-500 py-10'>
              Nenhum alarme encontrado.
            </TableCell>
          </TableRow>
        ) : (
          alarms.map((alarm) => {
            return (
              <TableRow key={alarm.id}>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center'>
                      <span className='text-sm font-medium text-gray-600'>
                        {alarm.icon}
                      </span>
                    </div>
                    <div className='leading-tight'>
                      <div className='font-medium'>{alarm.name}</div>
                      <div className='text-sm text-stone-500'>{alarm.message}</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className='text-sm text-stone-700'>{alarm.condition}</div>
                </TableCell>

                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                      alarm.severity,
                    )}`}
                  >
                    {getSeverityLabel(alarm.severity)}
                  </span>
                </TableCell>

                <TableCell>
                  <StatusPill
                    active={alarm.status === 'active'}
                    activeText='Ativo'
                    inactiveText='Inativo'
                  />
                </TableCell>

                <TableCell>
                  <div className='text-sm text-stone-700'>{alarm.target}</div>
                </TableCell>

                <TableCell className='text-right'>
                  <div className='flex gap-2 justify-center'>
                    {onViewAlarm && (
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        onClick={() => onViewAlarm(String(alarm.id))}
                        className='h-8 w-8'
                        title='Visualizar alarme'
                      >
                        <Eye className='w-4 h-4' />
                      </Button>
                    )}
                    {onEditAlarm && (
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        onClick={() => onEditAlarm(String(alarm.id))}
                        className='h-8 w-8'
                        title='Editar alarme'
                      >
                        <Edit className='w-4 h-4' />
                      </Button>
                    )}
                    {onToggleActive && (
                      <AlertDialog
                        title={
                          alarm.status === 'active'
                            ? 'Confirmar Desativação'
                            : 'Confirmar Ativação'
                        }
                        description={
                          alarm.status === 'active'
                            ? 'Tem certeza que deseja desativar este alarme? Ele não enviará mais notificações.'
                            : 'Tem certeza que deseja ativar este alarme? Ele começará a enviar notificações.'
                        }
                        confirmText={
                          alarm.status === 'active' ? 'Desativar' : 'Ativar'
                        }
                        variant={alarm.status === 'active' ? 'destructive' : 'default'}
                        onConfirm={() => onToggleActive(String(alarm.id))}
                        trigger={
                          <Button
                            type='button'
                            variant={alarm.status === 'active' ? 'destructive' : 'default'}
                            size='icon'
                            className={`h-8 w-8 ${
                              alarm.status === 'active'
                                ? 'bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800'
                                : 'bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800'
                            }`}
                            title={
                              alarm.status === 'active'
                                ? 'Desativar alarme'
                                : 'Ativar alarme'
                            }
                          >
                            <Power className='w-4 h-4' />
                          </Button>
                        }
                      />
                    )}
                  </div>
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