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
  Trash2,
  Plus,
} from 'lucide-react'
import type { AlarmRule, AlarmStats } from '../pages/use-alarms'
import { Button } from '@/ui/shadcn/components/button'
import { StatusPill } from '@/ui/shadcn/components/status-pill'
import { Modal, type ModalRef } from '@/ui/global/widgets/components/modal'
import { useRef, useState } from 'react'
import { CreateAlarmForm } from './create-alarm-form'
import { EditAlarmForm } from './edit-alarm-form'
import { DeleteAlarmDialog } from './delete-alarm-dialog'

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
  onDelete: (alarm: AlarmRule) => void
}

const AlarmRow = ({ alarm, onView, onEdit, onDelete }: AlarmRowProps) => {
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
        <div className='flex space-x-3 justify-center'>
          <button
            type='button'
            onClick={() => onView(alarm.id)}
            className='bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-900 rounded p-1 transition-colors cursor-pointer'
          >
            <Eye className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => onEdit(alarm)}
            className='bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 rounded p-1 transition-colors cursor-pointer'
          >
            <Edit className='w-4 h-4' />
          </button>
          {alarm.status === 'active' && (
            <button
              type='button'
              onClick={() => onDelete(alarm)}
              className='bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-900 rounded p-1 transition-colors cursor-pointer'
            >
              <Trash2 className='w-4 h-4' />
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

interface AlarmsTableProps {
  alarms: AlarmRule[]
  stats: AlarmStats
  onViewAlarm: (alarmId: string) => void
  onEditAlarm: (alarmId: string, data: Partial<AlarmRule>) => void
  onDeleteAlarm: (alarmId: string) => void
}

export const AlarmsTable = ({
  alarms,
  stats,
  onViewAlarm,
  onEditAlarm,
  onDeleteAlarm,
}: AlarmsTableProps) => {
  const modalRef = useRef<ModalRef>(null)
  const editModalRef = useRef<ModalRef>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedAlarm, setSelectedAlarm] = useState<AlarmRule | null>(null)

  const handleCreateAlarm = () => {
    modalRef.current?.open()
  }

  const handleEditAlarm = (alarm: AlarmRule) => {
    setSelectedAlarm(alarm)
    editModalRef.current?.open()
  }

  const handleDeleteAlarm = (alarm: AlarmRule) => {
    setSelectedAlarm(alarm)
    setDeleteDialogOpen(true)
  }

  const handleSaveEdit = (data: Partial<AlarmRule>) => {
    if (selectedAlarm) {
      onEditAlarm(selectedAlarm.id, data)
      editModalRef.current?.close()
      setSelectedAlarm(null)
    }
  }

  const handleConfirmDelete = () => {
    if (selectedAlarm) {
      onDeleteAlarm(selectedAlarm.id)
      setDeleteDialogOpen(false)
      setSelectedAlarm(null)
    }
  }

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

        <div className='mt-2 flex gap-4 text-xs text-gray-600'>
          <span>Total: {stats.total}</span>
          <span>Ativos: {stats.active}</span>
          <span>Críticos: {stats.critical}</span>
          <span>Alarmes: {stats.bySeverity.alarm || 0}</span>
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
                    CENTERED_HEADERS.includes(header as any) ? 'text-center' : 'text-left'
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
                onDelete={handleDeleteAlarm}
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

      {/* Modal de Edição */}
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

      {/* Dialog de Confirmação de Exclusão */}
      <DeleteAlarmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        alarm={selectedAlarm}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
