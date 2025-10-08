import { useLoaderData } from 'react-router'
import { useDashboardPage } from '@/ui/telemetry/widgets/pages/dashboard/use-dashboard-page'
import { DashboardPageView } from './dashboard-page-view'
import type { loader } from '@/app/routes/telemetry/dashboard-route'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'

export const DashboardPage = () => {
  const { dashboardData, selectedStation, selectedPeriod, selectedParameter } =
    useLoaderData<typeof loader>()
  
  const { handleStationChange, handlePeriodChange, handleParameterChange } = useDashboardPage()
  const { isLoading } = useUiProvider()

  return (
    <DashboardPageView
      dashboardData={dashboardData}
      selectedStation={selectedStation}
      selectedPeriod={selectedPeriod}
      selectedParameter={selectedParameter}
      isLoading={isLoading}
      onStationChange={handleStationChange}
      onPeriodChange={handlePeriodChange}
      onParameterChange={handleParameterChange}
    />
  )
}

export default DashboardPage
