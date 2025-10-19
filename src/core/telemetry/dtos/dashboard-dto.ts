export type DashboardAlertDto = {
  id: string
  type: string
  title: string
  station: string
  severity: 'critical' | 'warning' | 'info'
  timestamp: Date
}

export type DashboardStationReadingDto = {
  code: string
  name: string
  status: 'active' | 'warning' | 'critical' | 'inactive'
  lastReading: Date
  value: string
}

export type DashboardStatsDto = {
  totalStations: number
  activeStationsPercentage: number
  warningAlerts: number
  criticalAlerts: number
  stationStatusDistribution: {
    active: number
    warning: number
    critical: number
    inactive: number
  }
  recentAlerts: DashboardAlertDto[]
  latestReadings: DashboardStationReadingDto[]
}
