import { Activity, AlertTriangle, RadioTower, Zap } from 'lucide-react'
import type { StationsCountDto } from '@/core/telemetry/dtos/stations-count-dto'
import type { AlertsCountDto } from '@/core/alerting/alerts/dtos/alerts-count-dto'
import { StatsCard } from './stats-card'
import { LastAlerts } from './last-alerts'
import { LatestReadings } from './latest-readings'
import { StationMap } from './station-map'
import { AlertsEvolution } from './alerts-evolution'

export type DashboardPageViewProps = {
  stationsData: StationsCountDto
  alertsData: AlertsCountDto
  selectedStation?: string | null
  selectedPeriod: string
  selectedParameter: string
  isLoading?: boolean
  onStationChange?: (station: string) => void
  onPeriodChange?: (period: string) => void
  onParameterChange?: (parameter: string) => void
}

export const DashboardPageView = ({
  stationsData,
  alertsData,
  selectedStation,
  selectedPeriod,
  selectedParameter,
  isLoading,
  onStationChange,
  onPeriodChange,
  onParameterChange,
}: DashboardPageViewProps) => {
  return (
    <div className='container mx-auto px-4 py-2'>
      {/* Header */}
      {/* <div className='mb-6'>
        <DashboardFilters
          selectedStation={selectedStation}
          selectedPeriod={selectedPeriod}
          selectedParameter={selectedParameter}
          onStationChange={onStationChange}
          onPeriodChange={onPeriodChange}
          onParameterChange={onParameterChange}
        />
      </div> */}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        <StatsCard
          title="Total de Estações"
          value={stationsData.totalStations?.toString() ?? '0'}
          icon={<RadioTower className="w-4 h-4" />}
          variant="default"
        />
        <StatsCard
          title="% Estações Ativas"
          value={`${stationsData.activeStationsPercentage ?? 0}%`}
          icon={<Activity className="w-4 h-4" />}
          variant="success"
        />
        <StatsCard
          title="Alertas de Avisos"
          value={alertsData.warningAlerts?.toString() ?? '0'}
          icon={<AlertTriangle className="w-4 h-4" />}
          variant="warning"
        />
        <StatsCard
          title="Alertas Críticos"
          value={alertsData.criticalAlerts?.toString() ?? '0'}
          icon={<Zap className="w-4 h-4" />}
          variant="destructive"
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
        <div className='mb-6'>
          <AlertsEvolution />
        </div>
        <StationMap />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <LastAlerts 
          isLoading={isLoading}
        />
        
        <LatestReadings 
          readings={[]}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
