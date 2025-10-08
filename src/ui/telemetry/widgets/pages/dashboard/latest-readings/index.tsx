import { LatestReadingsView, type LatestReadingsViewProps } from './latest-readings-view'

export type LatestReadingsProps = LatestReadingsViewProps

export const LatestReadings = (props: LatestReadingsProps) => {
  return <LatestReadingsView {...props} />
}

export default LatestReadings
