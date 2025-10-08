export const useStationStatusChart = () => {
  const calculateChartData = (data: {
    active: number
    warning: number
    critical: number
    inactive: number
  }) => {
    const total = data.active + data.warning + data.critical + data.inactive
    return [
      { label: 'Ativas', value: data.active, color: 'bg-green-500', percentage: ((data.active / total) * 100).toFixed(1) },
      { label: 'Alerta', value: data.warning, color: 'bg-yellow-500', percentage: ((data.warning / total) * 100).toFixed(1) },
      { label: 'Críticas', value: data.critical, color: 'bg-red-500', percentage: ((data.critical / total) * 100).toFixed(1) },
      { label: 'Inativas', value: data.inactive, color: 'bg-gray-400', percentage: ((data.inactive / total) * 100).toFixed(1) },
    ].filter(item => item.value > 0)
  }

  return {
    calculateChartData,
  }
}
