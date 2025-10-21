import { useLocalStorage } from 'usehooks-ts'

import type { AlertDto } from '@/core/alerts/dtos'

function getAlertKey(alert: AlertDto) {
  const createdAt = new Date(alert.createdAt)
  const createdAtKey = Number.isNaN(createdAt.getTime())
    ? String(alert.createdAt)
    : createdAt.toISOString()

  return [
    alert.message,
    alert.parameterName,
    alert.parameterStationName,
    createdAtKey,
  ].join('|')
}

export function useAlertsPopover() {
  const [alerts, setAlerts] = useLocalStorage<AlertDto[]>('alerts', [])
  const [newAlertCount, setNewAlertCount] = useLocalStorage<number>('newAlertCount', 0)

  function handleLastAlerts(lastAlerts: AlertDto[]) {
    const existingAlertsKeys = new Set(alerts.map(getAlertKey))
    const newAlerts = lastAlerts.filter(
      (alert) => !existingAlertsKeys.has(getAlertKey(alert))
    )

    if (newAlerts.length > 0) {
      setNewAlertCount((current) => current + newAlerts.length)
    }

    setAlerts(lastAlerts)
  }

  return {
    alerts,
    newAlertCount,
    handleLastAlerts,
  }
}
