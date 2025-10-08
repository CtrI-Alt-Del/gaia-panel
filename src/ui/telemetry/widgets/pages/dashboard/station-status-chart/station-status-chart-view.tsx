import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/components/card'
import { useStationStatusChart } from './use-station-status-chart'

export interface StationStatusChartViewProps {
  data: {
    active: number
    warning: number
    critical: number
    inactive: number
  }
  isLoading?: boolean
}

export const StationStatusChartView = ({ data, isLoading }: StationStatusChartViewProps) => {
  const { calculateChartData } = useStationStatusChart()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Status das Estações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const total = data.active + data.warning + data.critical + data.inactive
  const chartData = calculateChartData(data)

  const radius = 80
  const strokeWidth = 20
  const normalizedRadius = radius - strokeWidth * 2
  const circumference = normalizedRadius * 2 * Math.PI

  let cumulativePercentage = 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Status das Estações</CardTitle>
      </CardHeader>
    </Card>
  )
}
