import type { AlertDto } from '@/core/alerting/alerts/dtos'
import type { Color } from '@/ui/shadcn/components/badge'
import { useState } from 'react'

<<<<<<< HEAD:src/ui/telemetry/widgets/pages/dashboard/recent-alerts/use-recent-alerts.tsx
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
=======
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

>>>>>>> main:src/ui/telemetry/widgets/pages/dashboard/last-alerts/use-last-alerts.ts
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
