import { AlarmsTableView } from './alarms-table-view'
import { useAlarmsTable } from './use-alarms-table'
import { AlarmsTable } from './alarms-table'
import { TableBody } from './table-body'
import type { AlarmRule } from '../../pages/alarms-old/use-alarms-page'

interface AlarmsTableContainerProps {
  alarms: AlarmRule[]
  onViewAlarm: (alarmId: string) => void
  onEditAlarm: (alarmId: string, data: Partial<AlarmRule>) => void
  onToggleActive?: (alarmId: string) => void
}

export function AlarmsTableContainer({
  alarms,
  onViewAlarm,
  onEditAlarm,
  onToggleActive,
}: AlarmsTableContainerProps) {
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

export { AlarmsTable, TableBody }
