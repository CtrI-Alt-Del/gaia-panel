import type { AlarmRule } from '../../pages/use-alarms-page'
import { TableBody } from './table-body'

interface AlarmsTableProps {
  alarms: AlarmRule[]
  onEditAlarm: (alarm: AlarmRule) => void
  onDeactivateClick: (alarm: AlarmRule) => void
  onToggleActive?: (alarmId: string) => void
}

export function AlarmsTable({
  alarms,
  onEditAlarm,
  onDeactivateClick,
  onToggleActive,
}: AlarmsTableProps) {
  return (
    <div className='overflow-x-auto border-stone-200'>
      <table className='min-w-full text-left text-sm'>
        <TableBody
          alarms={alarms}
          onEditAlarm={onEditAlarm}
          onDeactivateClick={onDeactivateClick}
          onToggleActive={onToggleActive}
        />
      </table>
    </div>
  )
}
