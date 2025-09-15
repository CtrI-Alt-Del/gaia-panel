import {
  ThermometerSun,
  Droplets,
  CloudRain,
  Wind,
  Gauge,
  Sun,
  Circle,
  AlertTriangle,
  Eye,
  Edit,
  Power,
  Plus,
} from 'lucide-react'
import type { AlarmRule } from '../../pages/use-alarms-page'
import { Button } from '@/ui/shadcn/components/button'
import { StatusPill } from '@/ui/shadcn/components/status-pill'
import { Modal, type ModalRef } from '@/ui/global/widgets/components/modal'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { CreateAlarmForm } from '../create-alarm-form'
import { EditAlarmForm } from '../edit-alarm-form'

const ICON_MAP = {
  thermometer: ThermometerSun,
  droplets: Droplets,
  'cloud-rain': CloudRain,
  wind: Wind,
  gauge: Gauge,
  sun: Sun,
}

const ICON_COLOR_MAP = {
  thermometer: 'text-orange-500',
  droplets: 'text-sky-500',
  'cloud-rain': 'text-blue-500',
  wind: 'text-teal-500',
  gauge: 'text-violet-500',
  sun: 'text-yellow-500',
}

const ICON_BG_COLOR_MAP = {
  thermometer: 'bg-orange-100 ring-orange-200',
  droplets: 'bg-sky-100 ring-sky-200',
  'cloud-rain': 'bg-blue-100 ring-blue-200',
  wind: 'bg-teal-100 ring-teal-200',
  gauge: 'bg-violet-100 ring-violet-200',
  sun: 'bg-yellow-100 ring-yellow-200',
}

const SEVERITY_ICON_MAP = {
  critical: <AlertTriangle className='w-3 h-3' />,
  alarm: <Circle className='w-3 h-3' />,
  warning: <Circle className='w-3 h-3' />,
}

const SEVERITY_COLOR_MAP = {
  critical: 'bg-red-100 text-red-800 ring-red-200',
  alarm: 'bg-yellow-100 text-yellow-800 ring-yellow-200',
  warning: 'bg-yellow-100 text-yellow-800 ring-yellow-200',
}

const getIcon = (iconName: string) => {
  const IconComponent = ICON_MAP[iconName as keyof typeof ICON_MAP] || ThermometerSun
  return <IconComponent className='w-4 h-4' />
}

const getIconColor = (iconName: string) => {
  return ICON_COLOR_MAP[iconName as keyof typeof ICON_COLOR_MAP] || 'text-orange-500'
}

const getIconBgColor = (iconName: string) => {
  return (
    ICON_BG_COLOR_MAP[iconName as keyof typeof ICON_BG_COLOR_MAP] ||
    'bg-orange-100 ring-orange-200'
  )
}

const getSeverityIcon = (severity: string) => {
  return (
    SEVERITY_ICON_MAP[severity as keyof typeof SEVERITY_ICON_MAP] || (
      <Circle className='w-3 h-3' />
    )
  )
}

const getSeverityColor = (severity: string) => {
  return (
    SEVERITY_COLOR_MAP[severity as keyof typeof SEVERITY_COLOR_MAP] ||
    'bg-yellow-100 text-yellow-800 ring-yellow-200'
  )
}

const TABLE_HEADERS = [
  'NOME',
  'CONDIÇÃO',
  'MENSAGEM',
  'SEVERIDADE',
  'ALVO',
  'STATUS',
  'AÇÕES',
]

const CENTERED_HEADERS = ['STATUS', 'AÇÕES', 'ALVO']

interface AlarmRowProps {
  alarm: AlarmRule
  onView: (alarmId: string) => void
  onEdit: (alarm: AlarmRule) => void
  onDeactivate: (alarm: AlarmRule) => void
  onToggleActive?: (alarmId: string) => void
}

const AlarmRow = ({
  alarm,
  onView,
  onEdit,
  onDeactivate,
  onToggleActive,
}: AlarmRowProps) => {
  return (
    <tr key={alarm.id} className='border-t border-stone-200 hover:bg-gray-50'>
      <td className='px-4 py-3'>
        <div className='flex items-center gap-3'>
          <div
            className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ring-1 ${getIconBgColor(alarm.icon)}`}
          >
            <div className={getIconColor(alarm.icon)}>{getIcon(alarm.icon)}</div>
          </div>
          <div className='text-sm font-medium text-gray-900'>{alarm.name}</div>
        </div>
      </td>

      <td className='px-4 py-3'>
        <div>
          <div className='text-sm text-gray-900'>{alarm.condition}</div>
          <div className='text-xs text-gray-500'>{alarm.conditionLabel}</div>
        </div>
      </td>

      <td className='px-4 py-3'>
        <div>
          <div className='text-sm text-gray-900'>{alarm.message}</div>
          <div className='text-xs text-gray-500'>{alarm.messageLabel}</div>
        </div>
      </td>

      <td className='px-4 py-3'>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ${getSeverityColor(alarm.severity)}`}
        >
          {getSeverityIcon(alarm.severity)}
          <span className='ml-1'>
            {alarm.severity === 'critical' ? 'Crítico' : 'Alarme'}
          </span>
        </span>
      </td>

      <td className='px-4 py-3 text-center'>
        <div className='flex flex-col items-center'>
          <div className='text-sm text-gray-900 font-medium'>{alarm.target}</div>
          <div className='text-xs text-gray-500'>{alarm.targetLabel}</div>
        </div>
      </td>

      <td className='px-4 py-3 text-center'>
        <StatusPill
          active={alarm.status === 'active'}
          activeText='Ativo'
          inactiveText='Inativo'
        />
      </td>

      <td className='px-4 py-3 text-center'>
        <div className='flex gap-2 justify-center'>
          <button
            type='button'
            onClick={() => onView(alarm.id)}
            className='inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 border border-blue-200'
            title='Visualizar alarme'
          >
            <Eye className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => onEdit(alarm)}
            className='inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 border border-gray-200'
            title='Editar alarme'
          >
            <Edit className='w-4 h-4' />
          </button>
          {alarm.status === 'active' ? (
            <button
              type='button'
              onClick={() => onDeactivate(alarm)}
              className='inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 border border-red-200'
              title='Desativar alarme'
            >
              <Power className='w-4 h-4' />
            </button>
          ) : (
            <button
              type='button'
              onClick={() => onToggleActive?.(alarm.id)}
              className='inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 border border-green-200'
              title='Ativar alarme'
            >
              <Power className='w-4 h-4' />
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

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

      <div className='overflow-x-auto border-stone-200'>
        <table className='min-w-full text-left text-sm'>
          <thead className='bg-stone-50 text-stone-700'>
            <tr>
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    CENTERED_HEADERS.includes(header) ? 'text-center' : 'text-left'
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alarms.map((alarm) => (
              <AlarmRow
                key={alarm.id}
                alarm={alarm}
                onView={onViewAlarm}
                onEdit={handleEditAlarm}
                onDeactivate={handleDeactivateClick}
                onToggleActive={onToggleActive}
              />
            ))}

            {alarms.length === 0 && (
              <tr>
                <td colSpan={7} className='px-4 py-8 text-center text-gray-500'>
                  Nenhum alarme configurado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
