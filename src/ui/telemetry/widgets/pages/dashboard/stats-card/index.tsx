import { StatsCardView, type StatsCardViewProps } from './stats-card-view'
import { useStatsCard } from './use-stats-card'

export type StatsCardProps = StatsCardViewProps

export const StatsCard = (props: StatsCardProps) => {
  useStatsCard()
  
  return <StatsCardView {...props} />
}

export default StatsCard
