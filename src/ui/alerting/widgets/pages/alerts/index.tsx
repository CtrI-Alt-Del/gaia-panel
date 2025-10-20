import type { loader } from '@/app/routes/alerting/alerts/alerts-route'
import { AlertsPageView } from './alerts-page-view'
import { useAlertsPage } from './use-alerts-page'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'
import { useLoaderData } from 'react-router'

export const AlertsPage = () => {
  const { alerts, nextCursor, previousCursor, hasNextPage, hasPreviousPage } =
    useLoaderData<typeof loader>()
  const {
    alerts: filteredAlerts,
    alertsStats,
    filters,
    handleLevelFilter,
    handleDateFilter,
    handlePageSizeChange,
    clearFilters,
  } = useAlertsPage({ alerts })
  const { isLoading } = useUiProvider()

  return (
    <AlertsPageView
      alerts={filteredAlerts}
      nextCursor={nextCursor}
      previousCursor={previousCursor}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      isLoading={isLoading}
      alertsStats={alertsStats}
      filters={filters}
      onLevelFilter={handleLevelFilter}
      onDateFilter={handleDateFilter}
      onPageSizeChange={handlePageSizeChange}
      onClearFilters={clearFilters}
    />
  )
}
