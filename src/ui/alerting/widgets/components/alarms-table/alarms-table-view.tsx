import { Plus, AlertTriangle } from 'lucide-react'
import type { AlarmRule } from '../../pages/use-alarms-page'
import { Button } from '@/ui/shadcn/components/button'
import { Modal, type ModalRef } from '@/ui/global/widgets/components/modal'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { CreateAlarmForm } from '../create-alarm-form'
import { EditAlarmForm } from '../edit-alarm-form'
import { AlarmsTable } from './alarms-table'

export interface AlarmsTableViewProps {
  alarms: AlarmRule[]
  onViewAlarm: (alarmId: string) => void
  onToggleActive?: (alarmId: string) => void
  modalRef: React.RefObject<ModalRef | null>
  editModalRef: React.RefObject<ModalRef | null>
  selectedAlarm: AlarmRule | null
  deactivateDialogOpen: boolean
  alarmToDeactivate: AlarmRule | null
  handleCreateAlarm: () => void
  handleEditAlarm: (alarm: AlarmRule) => void
  handleSaveEdit: (data: Partial<AlarmRule>) => void
  handleDeactivateClick: (alarm: AlarmRule) => void
  handleConfirmDeactivate: () => void
  setDeactivateDialogOpen: (open: boolean) => void
}

export function AlarmsTableView({
  alarms,
  onViewAlarm,
  onToggleActive,
  modalRef,
  editModalRef,
  selectedAlarm,
  deactivateDialogOpen,
  alarmToDeactivate,
  handleCreateAlarm,
  handleEditAlarm,
  handleSaveEdit,
  handleDeactivateClick,
  handleConfirmDeactivate,
  setDeactivateDialogOpen,
}: AlarmsTableViewProps) {
  return (
    <div className='bg-white rounded-lg shadow-sm border'>
      <div className='px-6 py-4 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-gray-900'>Regras de Alarme</h2>
          <Button
            onClick={handleCreateAlarm}
            className='bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer'
          >
            <Plus className='w-4 h-4' />
            Novo Alarme
          </Button>
        </div>
      </div>

      <AlarmsTable
        alarms={alarms}
        onViewAlarm={onViewAlarm}
        onEditAlarm={handleEditAlarm}
        onDeactivateClick={handleDeactivateClick}
        onToggleActive={onToggleActive}
      />

      <Modal
        ref={modalRef}
        title='Criar Novo Alarme'
        size='lg'
        hideScrollbar={true}
        onOpen={() => console.log('Modal de novo alarme aberto')}
        onClose={() => console.log('Modal de novo alarme fechado')}
      >
        {(close) => <CreateAlarmForm onClose={close} />}
      </Modal>

      <Modal
        ref={editModalRef}
        title='Editar Alarme'
        size='lg'
        hideScrollbar={true}
        onOpen={() => console.log('Modal de edição aberto')}
        onClose={() => console.log('Modal de edição fechado')}
      >
        {(close) =>
          selectedAlarm && (
            <EditAlarmForm
              alarm={selectedAlarm}
              onClose={close}
              onSave={handleSaveEdit}
            />
          )
        }
      </Modal>

      <AlertDialog
        open={deactivateDialogOpen}
        onOpenChange={setDeactivateDialogOpen}
        title='Confirmar Desativação'
        description='O alarme será desativado e não enviará mais notificações.'
        confirmText='Desativar Alarme'
        variant='destructive'
        icon={<AlertTriangle className='w-5 h-5' />}
        onConfirm={handleConfirmDeactivate}
      >
        {alarmToDeactivate && (
          <>
            <div className='bg-gray-50 rounded-lg p-4 border'>
              <h4 className='font-medium text-gray-900 mb-2'>Alarme a ser desativado:</h4>
              <div className='space-y-2 text-sm text-gray-600'>
                <div>
                  <span className='font-medium'>Nome:</span> {alarmToDeactivate.name}
                </div>
                <div>
                  <span className='font-medium'>Condição:</span>{' '}
                  {alarmToDeactivate.condition}
                </div>
                <div>
                  <span className='font-medium'>Severidade:</span>{' '}
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      alarmToDeactivate.severity === 'critical'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {alarmToDeactivate.severity === 'critical' ? '▲ Crítico' : '○ Alarme'}
                  </span>
                </div>
                <div>
                  <span className='font-medium'>Status:</span>{' '}
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      alarmToDeactivate.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {alarmToDeactivate.status === 'active' ? '○ Ativo' : '• Inativo'}
                  </span>
                </div>
              </div>
            </div>

            <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
              <p className='text-sm text-red-800'>
                <strong>Atenção:</strong> Ao desativar este alarme, ele não enviará mais
                notificações, mas as configurações serão mantidas e poderá ser reativado
                posteriormente.
              </p>
            </div>
          </>
        )}
      </AlertDialog>
    </div>
  )
}
