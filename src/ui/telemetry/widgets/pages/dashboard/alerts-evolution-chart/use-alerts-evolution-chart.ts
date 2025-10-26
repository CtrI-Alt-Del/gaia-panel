import { useState } from 'react'

export type AlertEvolutionType = 'week' | 'month'
export type AlertCategory = 'critical' | 'warning' | 'info'

export interface AlertEvolutionData {
  period: string
  critical: number
  warning: number
  info: number
}

const mockWeekData: AlertEvolutionData[] = [
  { period: 'Segunda', critical: 2, warning: 5, info: 1 },
  { period: 'Terça', critical: 1, warning: 3, info: 2 },
  { period: 'Quarta', critical: 0, warning: 4, info: 3 },
  { period: 'Quinta', critical: 3, warning: 2, info: 1 },
  { period: 'Sexta', critical: 4, warning: 1, info: 0 },
  { period: 'Sábado', critical: 1, warning: 2, info: 2 },
  { period: 'Domingo', critical: 0, warning: 1, info: 1 },
]

const mockMonthData: AlertEvolutionData[] = [
  { period: 'Janeiro', critical: 10, warning: 20, info: 5 },
  { period: 'Fevereiro', critical: 8, warning: 15, info: 7 },
  { period: 'Março', critical: 12, warning: 18, info: 6 },
  { period: 'Abril', critical: 7, warning: 14, info: 4 },
  { period: 'Maio', critical: 9, warning: 16, info: 8 },
  { period: 'Junho', critical: 11, warning: 19, info: 5 },
  { period: 'Julho', critical: 13, warning: 17, info: 6 },
  { period: 'Agosto', critical: 6, warning: 12, info: 3 },
  { period: 'Setembro', critical: 14, warning: 21, info: 9 },
  { period: 'Outubro', critical: 15, warning: 22, info: 10 },
  { period: 'Novembro', critical: 8, warning: 13, info: 4 },
  { period: 'Dezembro', critical: 10, warning: 18, info: 7 },
]

export const useAlertsEvolution = () => {
  const [type, setType] = useState<AlertEvolutionType>('week')
  const data = type === 'week' ? mockWeekData : mockMonthData

  return {
    type,
    data,
    setType,
  }
}
