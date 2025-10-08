import { StationStatusChartView, type StationStatusChartViewProps } from './station-status-chart-view'

export type StationStatusChartProps = StationStatusChartViewProps

export const StationStatusChart = (props: StationStatusChartProps) => {
  return <StationStatusChartView {...props} />
}

export default StationStatusChart
