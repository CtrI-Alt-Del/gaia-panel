import type { loader } from '@/app/routes/telemetry/parameters-route'
import { ParametersTableView, type Props } from './parameters-table-view'
import { useLoaderData } from 'react-router'

export const ParametersTable = (props: Omit<Props, 'isAuthenticated'>) => {
  const { user } = useLoaderData<typeof loader>()
  return <ParametersTableView {...props} isAuthenticated={Boolean(user)} />
}
