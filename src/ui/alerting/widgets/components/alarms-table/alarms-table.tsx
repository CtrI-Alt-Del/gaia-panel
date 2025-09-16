import type { AlarmRule } from '../../pages/use-alarms-page'
import { TableBody } from './table-body'

interface AlarmsTableProps {
  alarms: AlarmRule[]
  onViewAlarm: (alarmId: string) => void
  onEditAlarm: (alarm: AlarmRule) => void
  onDeactivateClick: (alarm: AlarmRule) => void
  onToggleActive?: (alarmId: string) => void
}

export function AlarmsTable({
  alarms,
  onViewAlarm,
  onEditAlarm,
  onDeactivateClick,
  onToggleActive,
}: AlarmsTableProps) {
  return (
    <div className='overflow-x-auto border-stone-200'>
      <table className='min-w-full text-left text-sm'>
        <TableBody
          alarms={alarms}
          onViewAlarm={onViewAlarm}
          onEditAlarm={onEditAlarm}
          onDeactivateClick={onDeactivateClick}
          onToggleActive={onToggleActive}
        />
      </table>
    </div>
  )
}
