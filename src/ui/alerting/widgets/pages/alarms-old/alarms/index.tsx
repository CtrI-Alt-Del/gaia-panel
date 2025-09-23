import { useSearchParams } from 'react-router'
import { AlarmsPageView } from './alarms-page-view'
import { useAlarmsPage } from './use-alarms-page'
import { useAlarmsData } from './use-alarms-data'

export const AlarmsPage = () => {
  const { allAlarms, getPaginatedAlarms, filterAlarms } = useAlarmsData()
  const [searchParams] = useSearchParams()

  const search = searchParams.get('q') || ''
  const status = (searchParams.get('status') as 'all' | 'active' | 'inactive') || 'all'
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const cursor = searchParams.get('cursor')

  const filters = { search, status }

  const filteredAlarms = filterAlarms(allAlarms, filters)

  const { alarms, nextCursor, previousCursor } = getPaginatedAlarms(
    filteredAlarms,
    limit,
    cursor,
  )

  const pagination = {
    limit,
    cursor,
    nextCursor,
    previousCursor,
  }

  const {
    selectedAlarm,
    error,
    handleViewAlarm,
    handleEditAlarm,
    handleToggleActive,
    handleClearError,
    handleCloseModal,
  } = useAlarmsPage({
    alarms,
    filters,
    pagination,
  })

  return (
    <AlarmsPageView
      alarms={alarms}
      filters={filters}
      pagination={pagination}
      error={error}
      selectedAlarm={selectedAlarm}
      onViewAlarm={handleViewAlarm}
      onEditAlarm={handleEditAlarm}
      onToggleActive={handleToggleActive}
      onClearError={handleClearError}
      onCloseModal={handleCloseModal}
    />
  )
}
