import { useState, useEffect } from 'react'

export interface StationData {
  id: string
  name: string
  latitude: number
  longitude: number
  status: 'active' | 'warning' | 'critical' | 'inactive'
  lastReading: Date
  parameters: {
    temperature?: number
    humidity?: number
    pressure?: number
    airQuality?: number
  }
}

export const useStationMap = () => {
  // Dados mockados das estações
  const mockStations: StationData[] = [
    {
      id: '001',
      name: 'São Paulo Central',
      latitude: -23.5505,
      longitude: -46.6333,
      status: 'active',
      lastReading: new Date(Date.now() - 2 * 60 * 1000),
      parameters: {
        temperature: 24.5,
        humidity: 65,
        pressure: 1013.2,
        airQuality: 45
      }
    },
    {
      id: '045',
      name: 'Rio Sul',
      latitude: -22.9068,
      longitude: -43.1729,
      status: 'critical',
      lastReading: new Date(Date.now() - 5 * 60 * 1000),
      parameters: {
        temperature: 35.2,
        humidity: 78,
        pressure: 1008.1,
        airQuality: 85
      }
    },
    {
      id: '023',
      name: 'Brasília Norte',
      latitude: -15.7801,
      longitude: -47.9292,
      status: 'warning',
      lastReading: new Date(Date.now() - 8 * 60 * 1000),
      parameters: {
        temperature: 22.1,
        humidity: 42,
        pressure: 1018.5,
        airQuality: 65
      }
    },
    {
      id: '089',
      name: 'Belo Horizonte',
      latitude: -19.9191,
      longitude: -43.9386,
      status: 'active',
      lastReading: new Date(Date.now() - 3 * 60 * 1000),
      parameters: {
        temperature: 26.8,
        humidity: 58,
        pressure: 1015.7,
        airQuality: 32
      }
    },
    {
      id: '067',
      name: 'Curitiba Centro',
      latitude: -25.4284,
      longitude: -49.2733,
      status: 'active',
      lastReading: new Date(Date.now() - 1 * 60 * 1000),
      parameters: {
        temperature: 18.9,
        humidity: 72,
        pressure: 1019.3,
        airQuality: 28
      }
    }
  ]

  const [stations] = useState<StationData[]>(mockStations)
  const [selectedStation, setSelectedStation] = useState<StationData | null>(null)

  // Centro do Brasil como ponto inicial
  const mapCenter: [number, number] = [-15.7801, -47.9292]

  const getStationStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981' // green
      case 'warning':
        return '#f59e0b' // yellow
      case 'critical':
        return '#ef4444' // red
      case 'inactive':
        return '#6b7280' // gray
      default:
        return '#10b981'
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
    stations,
    selectedStation,
    setSelectedStation,
    mapCenter,
    getStationStatusColor,
    formatTimeAgo,
  }
}
