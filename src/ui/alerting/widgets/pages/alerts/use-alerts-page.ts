import { useCallback, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import type { AlertDto } from '@/core/alerts/dtos/alert-dto'

type UseAlertsPageProps = {
  alerts: AlertDto[]
}

export function useAlertsPage({ alerts }: UseAlertsPageProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const levelFilter = searchParams.get('level')
  const dateFilter = searchParams.get('date')
  const pageSize = searchParams.get('pageSize') || '10'

  const filteredAlerts = useMemo(() => {
    let filtered = alerts

    if (levelFilter) {
      filtered = filtered.filter((alert) => alert.level === levelFilter)
    }

    if (dateFilter) {
      const filterDate = new Date(dateFilter)
      filtered = filtered.filter((alert) => {
        const alertDate = new Date(alert.createdAt)
        return (
          alertDate.getDate() === filterDate.getDate() &&
          alertDate.getMonth() === filterDate.getMonth() &&
          alertDate.getFullYear() === filterDate.getFullYear()
        )
      })
    }

    return filtered
  }, [alerts, levelFilter, dateFilter])

  const alertsStats = useMemo(() => {
    const total = alerts.length
    const critical = alerts.filter((alert) => alert.level === 'critical').length
    const warning = alerts.filter((alert) => alert.level === 'warning').length
    const filtered = filteredAlerts.length

    return {
      total,
      critical,
      warning,
      filtered,
    }
  }, [alerts, filteredAlerts])

  const handleLevelFilter = useCallback(
    (level: string | null) => {
      const newSearchParams = new URLSearchParams(searchParams)
      if (level) {
        newSearchParams.set('level', level)
      } else {
        newSearchParams.delete('level')
      }
      navigate(`?${newSearchParams.toString()}`, { replace: true })
    },
    [navigate, searchParams],
  )

  const handleDateFilter = useCallback(
    (date: string | null) => {
      const newSearchParams = new URLSearchParams(searchParams)
      if (date) {
        newSearchParams.set('date', date)
      } else {
        newSearchParams.delete('date')
      }
      navigate(`?${newSearchParams.toString()}`, { replace: true })
    },
    [navigate, searchParams],
  )

  const handlePageSizeChange = useCallback(
    (newPageSize: string) => {
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set('pageSize', newPageSize)
      navigate(`?${newSearchParams.toString()}`, { replace: true })
    },
    [navigate, searchParams],
  )

  const clearFilters = useCallback(() => {
    const newSearchParams = new URLSearchParams()
    newSearchParams.set('pageSize', pageSize)
    navigate(`?${newSearchParams.toString()}`, { replace: true })
  }, [navigate, pageSize])

  return {
    alerts: filteredAlerts,
    alertsStats,
    filters: {
      level: levelFilter,
      date: dateFilter,
      pageSize,
    },
    handleLevelFilter,
    handleDateFilter,
    handlePageSizeChange,
    clearFilters,
  }
}
