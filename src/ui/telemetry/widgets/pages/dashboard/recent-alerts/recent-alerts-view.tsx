import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/components/card'
import { Badge } from '@/ui/shadcn/components/badge'
import { Button } from '@/ui/shadcn/components/button'
import { AlertTriangle, AlertCircle, Info } from 'lucide-react'
import type { DashboardStatsDto } from '@/core/telemetry/dtos'
import { useRecentAlerts } from './use-recent-alerts'

export interface RecentAlertsViewProps {
  alerts: DashboardStatsDto['recentAlerts']
  isLoading?: boolean
}

export const RecentAlertsView = ({ alerts, isLoading }: RecentAlertsViewProps) => {
  const { getSeverityIcon, getSeverityColor, getSeverityLabel, formatTimeAgo } = useRecentAlerts()

  const renderSeverityIcon = (severity: string) => {
    const iconType = getSeverityIcon(severity)
    switch (iconType) {
      case 'AlertCircle':
        return <AlertCircle className="h-4 w-4" />
      case 'AlertTriangle':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Alertas Recentes (Últimas 24h)</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          Ver Todos
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-muted-foreground">Carregando alertas...</div>
          </div>
        ) : alerts.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhum alerta encontrado nas últimas 24 horas
          </p>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className={`p-1 rounded-full ${
                alert.severity === 'critical' ? 'text-red-600 bg-red-50' :
                alert.severity === 'warning' ? 'text-yellow-600 bg-yellow-50' :
                'text-blue-600 bg-blue-50'
              }`}>
                {renderSeverityIcon(alert.severity)}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  <Badge color={getSeverityColor(alert.severity)}>
                    {getSeverityLabel(alert.severity)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{alert.station}</p>
                <p className="text-xs text-muted-foreground">
                  {formatTimeAgo(alert.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
