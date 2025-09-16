import type { AlarmRule } from '../../pages/use-alarms-page'
import { AlarmRow } from './alarm-row'

interface TableBodyProps {
  alarms: AlarmRule[]
  onViewAlarm: (alarmId: string) => void
  onEditAlarm: (alarm: AlarmRule) => void
  onDeactivateClick: (alarm: AlarmRule) => void
  onToggleActive?: (alarmId: string) => void
}

export function TableBody({
  alarms,
  onViewAlarm,
  onEditAlarm,
  onDeactivateClick,
  onToggleActive,
}: TableBodyProps) {
  return (
    <tbody>
      {alarms.map((alarm) => (
        <AlarmRow
          key={alarm.id}
          alarm={alarm}
          onView={onViewAlarm}
          onEdit={onEditAlarm}
          onDeactivate={onDeactivateClick}
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
  )
}
