import { useAlertsEvolution } from './use-alerts-evolution'
import { AlertsEvolutionView } from './alerts-evolution-view'

export const AlertsEvolution = () => {
  const { type, setType, data } = useAlertsEvolution()
  return <AlertsEvolutionView type={type} setType={setType} data={data} />
}

export default AlertsEvolution
