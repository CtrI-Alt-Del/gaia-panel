import { useEffect, useState } from 'react'

import type { AlertDto } from '@/core/alerting/alerts/dtos'
import type { AlertingService } from '@/core/alerting/interfaces/alerting-service'
import type { ToastProvider } from '@/core/global/interfaces'

import type { AlertDialogRef } from '../../components/alert-dialog'

type Params = {
  alertDialogRef: React.RefObject<AlertDialogRef | null>
  alertingService: AlertingService
  toastProvider: ToastProvider
}

export function useAlertsPopover({
  alertDialogRef,
  alertingService,
  toastProvider,
}: Params) {
  const [isOpen, setIsOpen] = useState(false)
  const [alerts, setAlerts] = useState<AlertDto[]>([])
  const [unreadAlertCount, setUnreadAlertCount] = useState(0)

  function handleLastAlerts(lastAlerts: AlertDto[]) {
    const unreadAlerts = lastAlerts.filter((alert) => !alert.isRead)
    setUnreadAlertCount(unreadAlerts.length)
    setAlerts(lastAlerts)
  }

  function handleNavigate() {
    setIsOpen(false)
  }

  function handleOpenChange(isOpen: boolean) {
    setIsOpen(isOpen)
  }

  async function handleReadAlertButtonClick(alertId: string) {
    const response = await alertingService.readAlert(alertId)

    console.log(response)

    if (response.isFailure) {
      toastProvider.showError(response.errorMessage)
    }
  }

  useEffect(() => {
    const isCriticalAlert = (alert: AlertDto) =>
      !alert.isRead && alert.level?.toLowerCase() === 'critical'

    const currentCriticalAlertTimestamps = new Set(
      alerts.filter(isCriticalAlert).map((alert) => new Date(alert.createdAt).getTime()),
    )

    const hasNewCriticalAlerts = alerts.some((alert) => {
      if (!isCriticalAlert(alert)) {
        return false
      }

      const alertTimestamp = new Date(alert.createdAt).getTime()

      return !currentCriticalAlertTimestamps.has(alertTimestamp)
    })

    if (hasNewCriticalAlerts) {
      alertDialogRef.current?.open()
    }
  }, [alerts, alertDialogRef])

  return {
    alerts,
    unreadAlertCount,
    isOpen,
    handleOpenChange,
    handleLastAlerts,
    handleNavigate,
    handleReadAlertButtonClick,
  }
}
