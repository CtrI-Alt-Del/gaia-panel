import { useAlertsEvolution } from './use-alerts-evolution-chart'
import { AlertsEvolutionView } from './alerts-evolution-chart-view'

export const AlertsEvolutionChart = () => {
  const { type, setType, data } = useAlertsEvolution()
  return <AlertsEvolutionView type={type} setType={setType} data={data} />
}
