import { useLoaderData } from 'react-router'
import { DashboardPageView } from './dashboard-page-view'
import type { loader } from '@/app/routes/telemetry/dashboard-route'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'

export const DashboardPage = () => {
  const { stationsData, alertsData } = useLoaderData<typeof loader>()
  const { isLoading } = useUiProvider()

  return (
    <DashboardPageView
      stationsData={stationsData}
      alertsData={alertsData}
      isLoading={isLoading}
    />
  )
}

export default DashboardPage
