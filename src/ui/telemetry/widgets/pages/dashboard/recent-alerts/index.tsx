import { RecentAlertsView, type RecentAlertsViewProps } from './recent-alerts-view'

export type RecentAlertsProps = RecentAlertsViewProps

export const RecentAlerts = (props: RecentAlertsProps) => {
  return <RecentAlertsView {...props} />
}

export default RecentAlerts
