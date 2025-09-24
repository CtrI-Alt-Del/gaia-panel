import { useState } from 'react'
import type { StationDto } from '@/core/telemetry/dtos/station-dto'

type UseStationsPageProps = {
  stations: StationDto[]
}

export function useStationsPage({ stations }: UseStationsPageProps) {
  const [selectedStation, setSelectedStation] = useState<StationDto | undefined>(
    undefined,
  )

  function handleEdit(id: string) {
    const station = stations.find((s) => String(s.id) === id)
    if (station) {
      setSelectedStation(station)
    }
  }

  return {
    selectedStation,
    handleEdit,
  }
}
