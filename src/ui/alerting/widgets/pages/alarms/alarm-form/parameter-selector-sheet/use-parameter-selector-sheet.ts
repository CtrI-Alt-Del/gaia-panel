import { useState } from 'react'

import type { TelemetryService } from '@/core/telemetry/interfaces'
import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'
import { useCache } from '@/ui/global/hooks/use-cache'
import { CACHE } from '@/core/global/constants'

type Params = {
  telemetryService: TelemetryService
  onOpenChange: (open: boolean) => void
  onSelect: (station: StationDto, parameter: ParameterDto) => void
}

export function useParameterSelectorSheet({
  telemetryService,
  onOpenChange,
  onSelect,
}: Params) {
  const [view, setView] = useState<'stations' | 'parameters'>('stations')
  const [selectedStation, setSelectedStation] = useState<StationDto | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [previousCursor, setPreviousCursor] = useState<string | null>(null)
  const [pageSize, setPageSize] = useState(5)

  const { data, isLoading } = useCache({
    key: CACHE.stationParameters.key,
    fetcher: async () =>
      await telemetryService.fetchStations({
        nextCursor,
        previousCursor,
        pageSize,
        status: 'active',
        name: searchTerm,
      }),
    dependencies: [pageSize, searchTerm, nextCursor, previousCursor],
  })

  function handleSelectStation(station: StationDto) {
    setSelectedStation(station)
    setView('parameters')
  }

  function handleBackToStations() {
    setSelectedStation(null)
    setView('stations')
  }

  function handleCloseAndReset() {
    onOpenChange(false)
    setTimeout(() => {
      setView('stations')
      setSelectedStation(null)
      setSearchTerm('')
      setNextCursor(null)
      setPreviousCursor(null)
    }, 300)
  }

  function handleSelectParameter(parameter: ParameterDto) {
    if (selectedStation) {
      onSelect(selectedStation, parameter)
      handleCloseAndReset()
    }
  }

  function handleNameChange(newName: string) {
    setSearchTerm(newName)
    setNextCursor(null)
    setPreviousCursor(null)
  }

  function handlePageSizeChange(newPageSize: number) {
    setPageSize(newPageSize)
    setNextCursor(null)
    setPreviousCursor(null)
  }

  function handleNextPage() {
    setNextCursor(data?.nextCursor ?? null)
    setPreviousCursor(null)
  }

  function handlePreviousPage() {
    setPreviousCursor(data?.previousCursor ?? null)
    setNextCursor(null)
  }

  return {
    view,
    selectedStation,
    searchTerm,
    pageSize: data?.pageSize ?? pageSize,
    hasNextPage: data?.hasNextPage ?? false,
    hasPreviousPage: data?.hasPreviousPage ?? false,
    stations: data?.items ?? [],
    isLoading,
    handleSelectStation,
    handleBackToStations,
    handleSelectParameter,
    handleCloseAndReset,
    handleNameChange,
    handlePageSizeChange,
    handleNextPage,
    handlePreviousPage,
    setSearchTerm,
  }
}
