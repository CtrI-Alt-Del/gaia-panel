import { AlarmsTableView } from './alarms-table-view'
import { useAlarmsTable } from './use-alarms-table'
import type { AlarmRule } from '../../pages/use-alarms-page'

interface AlarmsTableProps {
  alarms: AlarmRule[]
  onViewAlarm: (alarmId: string) => void
  onEditAlarm: (alarmId: string, data: Partial<AlarmRule>) => void
  onToggleActive?: (alarmId: string) => void
}

export function AlarmsTable({
  alarms,
  onViewAlarm,
  onEditAlarm,
  onToggleActive,
}: AlarmsTableProps) {
  const tableData = useAlarmsTable({
    onEditAlarm,
    onToggleActive,
  })

  return (
    <AlarmsTableView
      {...tableData}
      alarms={alarms}
      onViewAlarm={onViewAlarm}
      onToggleActive={onToggleActive}
    />
  )
}
