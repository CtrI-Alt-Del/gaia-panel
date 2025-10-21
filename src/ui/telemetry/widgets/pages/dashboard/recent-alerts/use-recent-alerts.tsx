import type { DashboardStatsDto } from '@/core/telemetry/dtos'

export const useRecentAlerts = () => {
  const getSeverityIcon = (severity?: string) => {
    if (!severity) return 'Info'
    try {
      switch (severity.toLowerCase()) {
        case 'critical':
          return 'AlertCircle'
        case 'warning':
          return 'AlertTriangle'
        default:
          return 'Info'
      }
    } catch {
      return 'Info'
    }
  }

  const getSeverityColor = (severity?: string): 'red' | 'yellow' | 'blue' => {
    if (!severity) return 'blue'
    try {
      switch (severity.toLowerCase()) {
        case 'critical':
          return 'red'
        case 'warning':
          return 'yellow'
        default:
          return 'blue'
      }
    } catch {
      return 'blue'
    }
  }

  const getSeverityLabel = (severity?: string) => {
    if (!severity) return 'Info'
    try {
      switch (severity.toLowerCase()) {
        case 'critical':
          return 'Crítico'
        case 'warning':
          return 'Alerta'
        default:
          return 'Info'
      }
    } catch {
      return 'Info'
    }
  }

  const formatTimeAgo = (date?: Date | string) => {
    if (!date) return '-'
    let targetDate: Date
    if (typeof date === 'string') {
      targetDate = new Date(date)
    } else if (date instanceof Date) {
      targetDate = date
    } else {
      return '-'
    }
    if (!targetDate || Number.isNaN(targetDate.getTime())) return '-'
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - targetDate.getTime()) / (1000 * 60))
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
