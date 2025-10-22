import { useRef } from 'react'

import { useRest, useRouter } from '@/ui/global/hooks'
import { AlertsPopoverView } from './alerts-popover-view'
import { useAlertsPopover } from './use-alerts-popover'
import { useLastAlertsSocket } from '../../../hooks/use-last-alerts-socket'
import type { AlertDialogRef } from '../../components/alert-dialog'
import { useToastProvider } from '@/ui/global/hooks/use-toast-provider'

export const AlertsPopover = () => {
  const alertDialogRef = useRef<AlertDialogRef | null>(null)
  const { alertingService } = useRest()
  const toastProvider = useToastProvider()
  const {
    alerts,
    isOpen,
    unreadAlertCount,
    handleLastAlerts,
    handleNavigate,
    handleOpenChange,
    handleReadAlertButtonClick,
  } = useAlertsPopover({
    alertDialogRef,
    alertingService,
    toastProvider,
  })
  useLastAlertsSocket({ onGetLastAlerts: handleLastAlerts })
  useRouter({ onNavigate: handleNavigate })

  return (
    <AlertsPopoverView
      alerts={alerts}
      isOpen={isOpen}
      unreadAlertCount={unreadAlertCount}
      alertDialogRef={alertDialogRef}
      onOpenChange={handleOpenChange}
      onReadAlertButtonClick={handleReadAlertButtonClick}
    />
  )
}
