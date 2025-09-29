import { useLoaderData } from 'react-router'

import type { loader } from '@/app/routes/alerting/alarms-route'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'
import { AlarmsPageView } from './alarms-page-view'
import { useAlarmsPage } from './use-alarms-page'

export const AlarmsPage = () => {
  const { alarms, nextCursor, previousCursor, hasNextPage, hasPreviousPage } =
    useLoaderData<typeof loader>()

  const { selectedAlarm, handleEdit } = useAlarmsPage({
    alarms,
  })

  const { isLoading } = useUiProvider()

  return (
    <AlarmsPageView
      alarms={alarms}
      nextCursor={nextCursor}
      previousCursor={previousCursor}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      isLoading={isLoading}
      onEdit={handleEdit}
      selectedAlarm={selectedAlarm}
    />
  )
}
