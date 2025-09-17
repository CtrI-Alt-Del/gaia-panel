import { Edit, Power } from 'lucide-react'
import type { AlarmRule } from '../../pages/use-alarms-page'
import { StatusPill } from '@/ui/shadcn/components/status-pill'
import {
  getIcon,
  getIconColor,
  getIconBgColor,
  getSeverityIcon,
  getSeverityColor,
} from './utils/icon-utils'

const TableHeaders = [
  'Nome',
  'Condição',
  'Mensagem',
  'Severidade',
  'Alvo',
  'Status',
  'Ações',
]

const CenteredHeaders = ['Status', 'Ações', 'Alvo']

interface TableBodyProps {
  alarms: AlarmRule[]
  onEditAlarm: (alarm: AlarmRule) => void
  onDeactivateClick: (alarm: AlarmRule) => void
  onToggleActive?: (alarmId: string) => void
}

export function TableBody({
  alarms,
  onEditAlarm,
  onDeactivateClick,
  onToggleActive,
}: TableBodyProps) {
  return (
    <>
      <thead className='bg-stone-50 text-stone-700'>
        <tr>
          {TableHeaders.map((header) => (
            <th
              key={header}
              className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                CenteredHeaders.includes(header) ? 'text-center' : 'text-left'
              }`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {alarms.map((alarm) => (
          <tr key={alarm.id} className='border-t border-stone-200 hover:bg-gray-50'>
            <td className='px-4 py-3'>
              <div className='flex items-center gap-3'>
                <div
                  className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ring-1 ${getIconBgColor(alarm.icon)}`}
                >
                  <div className={getIconColor(alarm.icon)}>
                    {(() => {
                      const IconComponent = getIcon(alarm.icon)
                      return <IconComponent className='w-4 h-4' />
                    })()}
                  </div>
                </div>
                <div className='text-sm font-medium text-gray-900'>{alarm.name}</div>
              </div>
            </td>

            <td className='px-4 py-3'>
              <div className='text-sm text-gray-900'>{alarm.condition}</div>
            </td>

            <td className='px-4 py-3'>
              <div className='text-sm text-gray-900'>{alarm.message}</div>
            </td>

            <td className='px-4 py-3'>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ${getSeverityColor(alarm.severity)}`}
              >
                {(() => {
                  const SeverityIcon = getSeverityIcon(alarm.severity)
                  return <SeverityIcon className='w-3 h-3' />
                })()}
                <span className='ml-1'>
                  {alarm.severity === 'critical' ? 'Crítico' : 'Alarme'}
                </span>
              </span>
            </td>

            <td className='px-4 py-3 text-center'>
              <div className='text-sm text-gray-900 font-medium'>{alarm.target}</div>
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
                  onClick={() => onEditAlarm(alarm)}
                  className='inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 border border-gray-200'
                  title='Editar alarme'
                >
                  <Edit className='w-4 h-4' />
                </button>
                {alarm.status === 'active' ? (
                  <button
                    type='button'
                    onClick={() => onDeactivateClick(alarm)}
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
        ))}

        {alarms.length === 0 && (
          <tr>
            <td colSpan={7} className='px-4 py-8 text-center text-gray-500'>
              Nenhum alarme configurado
            </td>
          </tr>
        )}
      </tbody>
    </>
  )
}
