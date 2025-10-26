import { useCallback, useState } from 'react'

import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import type { TelemetryService } from '@/core/telemetry/interfaces'
import { useCache } from '@/ui/global/hooks'

type Params = {
  telemetryService: TelemetryService
}

export function useStationsMap({ telemetryService }: Params) {
  const [selectedStation, setSelectedStation] = useState<StationDto | null>(null)
  const [bounds, setBounds] = useState<{
    northEast: [number, number]
    southWest: [number, number]
  } | null>(null)

  const { data } = useCache({
    fetcher: () =>
      telemetryService.fetchStationsMap(
        {
          latitude: bounds?.northEast[0] ?? 0,
          longitude: bounds?.northEast[1] ?? 0,
        },
        {
          latitude: bounds?.southWest[0] ?? 0,
          longitude: bounds?.southWest[1] ?? 0,
        },
      ),
    key: 'stations-map',
    dependencies: bounds
      ? [
          bounds.northEast[0],
          bounds.northEast[1],
          bounds.southWest[0],
          bounds.southWest[1],
        ]
      : undefined,
    isEnabled: Boolean(bounds),
  })

  const handleMapChange = useCallback(
    (northEastCoordinates: [number, number], southWestCoordinates: [number, number]) => {
      setBounds((currentBounds) => {
        if (
          currentBounds &&
          currentBounds.northEast[0] === northEastCoordinates[0] &&
          currentBounds.northEast[1] === northEastCoordinates[1] &&
          currentBounds.southWest[0] === southWestCoordinates[0] &&
          currentBounds.southWest[1] === southWestCoordinates[1]
        ) {
          return currentBounds
        }

        return {
          northEast: northEastCoordinates,
          southWest: southWestCoordinates,
        }
      })
    },
    [],
  )

  const getStationStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981'
      case 'warning':
        return '#f59e0b'
      case 'critical':
        return '#ef4444'
      case 'inactive':
        return '#6b7280'
      default:
        return '#10b981'
    }
  }

  return {
    stations: data ?? [],
    selectedStation,
    setSelectedStation,
    getStationStatusColor,
    handleMapChange,
  }
}
