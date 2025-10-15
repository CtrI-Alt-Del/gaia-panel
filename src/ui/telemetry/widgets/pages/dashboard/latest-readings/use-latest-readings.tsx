export const useLatestReadings = () => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'green'
      case 'warning':
        return 'yellow'
      case 'critical':
        return 'red'
      default:
        return 'blue'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'Ativo'
      case 'warning':
        return 'Alerta'
      case 'critical':
        return 'Crítico'
      default:
        return status
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
    getStatusColor,
    getStatusLabel,
    formatTimeAgo,
  }
}
