import type { AlertDto } from '@/core/alerts/dtos'
import type { Color } from '@/ui/shadcn/components/badge'
import { useState } from 'react'

export function useLastAlerts() {
  const [alerts, setAlerts] = useState<AlertDto[]>([])

  function handleLastAlerts(lastAlerts: AlertDto[]) {
    setAlerts(lastAlerts)
  }

  function getSeverityIcon(severity: string) {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'AlertCircle'
      case 'warning':
        return 'AlertTriangle'
      default:
        return 'Info'
    }
  }

  function getSeverityColor(severity: string): Color {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'red'
      case 'warning':
        return 'yellow'
      default:
        return 'blue'
    }
  }

  function getSeverityLabel(severity: string) {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'Crítico'
      case 'warning':
        return 'Aviso'
      default:
        return 'Info'
    }
  }

  function formatTimeAgo(date: Date) {
    const now = new Date()
    const diffInMinutes = Math.floor(
      (now.getTime() - new Date(date).getTime()) / (1000 * 60),
    )

    if (diffInMinutes < 1) return 'Agora mesmo'
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h atrás`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d atrás`
  }

  return {
    alerts,
    getSeverityIcon,
    getSeverityColor,
    getSeverityLabel,
    formatTimeAgo,
    handleLastAlerts,
  }
}
