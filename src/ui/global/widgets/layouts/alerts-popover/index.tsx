import { AlertsPopoverView } from './alerts-popover-view'
import { useAlertsPopover } from './use-alerts-popover'
import { useLastAlertsSocket } from './use-last-alerts-socket'

export const AlertsPopover = () => {
  const { alerts, handleLastAlerts, newAlertCount } = useAlertsPopover()
  useLastAlertsSocket({ onGetLastAlerts: handleLastAlerts })
  return <AlertsPopoverView alerts={alerts} newAlertCount={newAlertCount} />
}
