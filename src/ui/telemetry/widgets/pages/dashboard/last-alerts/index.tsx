import { useLastAlertsSocket } from '@/ui/global/hooks/use-last-alerts-socket'
import { LastAlertsView } from './last-alerts-view'
import { useLastAlerts } from './use-last-alerts'

type Props = {
  isLoading?: boolean
}

export const LastAlerts = ({ isLoading }: Props) => {
  const {
    alerts,
    handleLastAlerts,
    getSeverityIcon,
    getSeverityColor,
    getSeverityLabel,
    formatTimeAgo,
  } = useLastAlerts()
  useLastAlertsSocket({ onGetLastAlerts: handleLastAlerts })

  return (
    <LastAlertsView
      alerts={alerts}
      isLoading={isLoading}
      getSeverityIcon={getSeverityIcon}
      getSeverityColor={getSeverityColor}
      getSeverityLabel={getSeverityLabel}
      formatTimeAgo={formatTimeAgo}
    />
  )
}

export default LastAlerts
