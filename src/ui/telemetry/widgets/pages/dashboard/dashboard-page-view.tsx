import { Activity, AlertTriangle, RadioTower, Users, Zap } from 'lucide-react'
import type { DashboardStatsDto } from '@/core/telemetry/dtos/dashboard-dto'
import { StatsCard } from './stats-card'
import { RecentAlerts } from './recent-alerts'
import { LatestReadings } from './latest-readings'
import { StationMap } from './station-map'
import { AlertsEvolution } from './alerts-evolution'

export type DashboardPageViewProps = {
  dashboardData: DashboardStatsDto
  selectedStation?: string | null
  selectedPeriod: string
  selectedParameter: string
  isLoading?: boolean
  onStationChange?: (station: string) => void
  onPeriodChange?: (period: string) => void
  onParameterChange?: (parameter: string) => void
}

export const DashboardPageView = ({
  dashboardData,
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
          value={dashboardData.totalStations.toString()}
          icon={<RadioTower className="w-4 h-4" />}
          variant="default"
        />
        <StatsCard
          title="Estações Ativas"
          value={`${dashboardData.activeStations}%`}
          icon={<Activity className="w-4 h-4" />}
          variant="success"
        />
        <StatsCard
          title="Alertas de Avisos"
          value={dashboardData.alertsCount.toString()}
          icon={<AlertTriangle className="w-4 h-4" />}
          variant="warning"
        />
        <StatsCard
          title="Alertas Críticos"
          value={dashboardData.criticalIssues.toString()}
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
        <RecentAlerts 
          alerts={dashboardData.recentAlerts}
          isLoading={isLoading}
        />
        
        <LatestReadings 
          readings={dashboardData.latestReadings}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
