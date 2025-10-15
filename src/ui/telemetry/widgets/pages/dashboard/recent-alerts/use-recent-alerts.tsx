import type { DashboardStatsDto } from '@/core/telemetry/dtos'

export const useRecentAlerts = () => {
  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'AlertCircle'
      case 'warning':
        return 'AlertTriangle'
      default:
        return 'Info'
    }
  }

  const getSeverityColor = (severity: string): 'red' | 'yellow' | 'blue' => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'red'
      case 'warning':
        return 'yellow'
      default:
        return 'blue'
    }
  }

  const getSeverityLabel = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'Crítico'
      case 'warning':
        return 'Alerta'
      default:
        return 'Info'
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Agora mesmo'
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h atrás`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d atrás`
  }

  return {
    getSeverityIcon,
    getSeverityColor,
    getSeverityLabel,
    formatTimeAgo,
  }
}
