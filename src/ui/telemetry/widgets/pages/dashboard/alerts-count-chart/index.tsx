import { useAlertsCountChart } from './use-alerts-count-chart'
import { AlertsCountChartView } from './alerts-count-chart-view'

export const AlertsCountChart = () => {
  const { type, setType, data } = useAlertsCountChart()

  return <AlertsCountChartView type={type} setType={setType} data={data} />
}
