import { useMemo, useState } from 'react'

import type { AlertsCountByPeriodTimeDto } from '@/core/alerting/dtos'
import { useCache, useRest } from '@/ui/global/hooks'

export type AlertEvolutionType = 'week' | 'month'
export type AlertCategory = 'critical' | 'warning'

export interface AlertEvolutionData {
  period: string
  critical: number
  warning: number
}

const TIME_PERIOD_LABEL: Record<AlertEvolutionType, string> = {
  week: 'WEEKLY',
  month: 'MONTHLY',
}

const mapDtoToChartData = (
  alertsCount: AlertsCountByPeriodTimeDto[] | null,
): AlertEvolutionData[] => {
  if (!alertsCount) return []

  return alertsCount.map((item) => ({
    period: item.time,
    critical: item.criticalCount,
    warning: item.warningCount,
  }))
}

export function useAlertsCountChart() {
  const [type, setType] = useState<AlertEvolutionType>('week')
  const { alertingService } = useRest()

  const { data } = useCache({
    key: 'alerts-evolution',
    dependencies: [type],
    fetcher: () => alertingService.fetchAlertsCountByTimePeriod(TIME_PERIOD_LABEL[type]),
  })

  const chartData = useMemo(() => mapDtoToChartData(data), [data])

  return {
    type,
    data: chartData,
    setType,
  }
}
