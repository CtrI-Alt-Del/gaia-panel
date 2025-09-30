import { useAuthProvider } from '@/ui/global/hooks'
import { AlarmsTableView, type AlarmsTableViewProps } from './alarms-table-view'

export const AlarmsTable = (props: AlarmsTableViewProps) => {
  const { isAuthenticated } = useAuthProvider()
  return <AlarmsTableView {...props} isAuthenticated={isAuthenticated} />
}
