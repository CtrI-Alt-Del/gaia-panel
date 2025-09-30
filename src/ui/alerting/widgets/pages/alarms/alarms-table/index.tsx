import { useLoaderData } from 'react-router'
import { AlarmsTableView, type AlarmsTableViewProps } from './alarms-table-view'
import type { loader } from '@/app/routes/alerting/alarms-route'

export const AlarmsTable = (props: Omit<AlarmsTableViewProps, 'isAuthenticated'>) => {
  const { user } = useLoaderData<typeof loader>()
  return <AlarmsTableView {...props} isAuthenticated={Boolean(user)} />
}
