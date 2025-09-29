import { Edit, AlertTriangle, AlertCircle } from 'lucide-react'

import type { AlarmDto } from '@/core/alerting/dtos/alarm-dto'
import { StatusPill } from '@/ui/shadcn/components/status-pill'
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
import { AlarmTableSkeleton } from '@/ui/alerting/widgets/pages/alarms/alarm-table-skeleton'
import { PaginationControl } from '@/ui/global/widgets/components/pagination-control'
import { Dialog } from '@/ui/global/widgets/components/dialog'
import { AlarmStatusButton } from '../alarm-status-button'
import { MeasurementUnitIcon } from '@/ui/global/widgets/components/measurement-unit-icon'

export type AlarmsTableViewProps = {
  alarms: AlarmDto[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  isLoading?: boolean
  selectedAlarm?: AlarmDto
  onEdit?: (id: string) => void
  onCloseModal?: () => void
  // onAlarmUpdated?: (alarm: AlarmDto) => void
}

export const AlarmsTableView = ({
  alarms,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  // selectedAlarm, // TODO: Usar quando implementar edição de alarms
  onEdit,
  onCloseModal,
}: AlarmsTableViewProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='pl-6'>Parâmetro</TableHead>
          <TableHead>Mensagem</TableHead>
          <TableHead>Nível</TableHead>
          <TableHead>Unidade</TableHead>
          <TableHead>Operação</TableHead>
          <TableHead>Limite</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Data de Criação</TableHead>
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
            <TableCell colSpan={9} className='text-center text-stone-500 py-10'>
              Nenhum alarm encontrado.
            </TableCell>
          </TableRow>
        ) : (
          alarms.map((alarm) => {
            return (
              <TableRow key={alarm.id}>
                <TableCell className='pl-6'>
                  <div className='flex items-center gap-2'>
                    <MeasurementUnitIcon
                      unit={String(alarm.parameter.entity?.unitOfMeasure)}
                    />
                    <div className='text-sm font-bold text-stone-700'>
                      {alarm.parameter.entity?.name}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div
                    className='text-sm text-stone-700 max-w-xs truncate'
                    title={alarm.message}
                  >
                    {alarm.message}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    color={alarm.level === 'critical' ? 'red' : 'yellow'}
                    tone='soft'
                  >
                    {alarm.level === 'critical' ? (
                      <>
                        <AlertTriangle className='w-3 h-3' />
                        Crítico
                      </>
                    ) : (
                      <>
                        <AlertCircle className='w-3 h-3' />
                        Alarme
                      </>
                    )}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className='text-sm text-stone-600'>
                    {alarm.parameter.entity?.unitOfMeasure}
                  </div>
                </TableCell>

                <TableCell>
                  <div className='text-sm font-mono text-stone-700'>
                    {alarm.rule.operation}
                  </div>
                </TableCell>

                <TableCell>
                  <div className='text-sm text-stone-700'>
                    {alarm.rule.threshold.toString()}
                  </div>
                </TableCell>

                <TableCell>
                  <StatusPill
                    active={alarm.isActive || false}
                    activeText='Ativo'
                    inactiveText='Inativo'
                  />
                </TableCell>

                <TableCell className='text-sm text-stone-600'>
                  {alarm.createdAt
                    ? new Date(alarm.createdAt).toLocaleDateString('pt-BR')
                    : '-'}
                </TableCell>

                <TableCell className='text-right'>
                  <div className='flex gap-2 justify-center'>
                    {onEdit && (
                      <Dialog
                        onClose={onCloseModal || (() => {})}
                        title='Editar Alarm'
                        description='Edite as informações do alarm'
                        size='lg'
                        trigger={
                          <button
                            type='button'
                            onClick={() => onEdit(String(alarm.id))}
                            className='inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 border border-gray-200'
                            title='Editar alarm'
                          >
                            <Edit className='w-4 h-4' />
                          </button>
                        }
                      >
                        {(closeDialog) => (
                          <div className='p-4'>
                            <p className='text-sm text-stone-600'>
                              Formulário de edição será implementado em breve.
                            </p>
                            <div className='flex justify-end mt-4'>
                              <button
                                type='button'
                                onClick={closeDialog}
                                className='px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md'
                              >
                                Fechar
                              </button>
                            </div>
                          </div>
                        )}
                      </Dialog>
                    )}
                    <AlarmStatusButton
                      alarmId={String(alarm.id)}
                      isActive={alarm.isActive || false}
                    />
                  </div>
                </TableCell>
              </TableRow>
            )
          })
        )}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={9}>
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
