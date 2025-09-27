// src/ui/alerting/widgets/pages/alarms/alarm-form/useParameterSelector.ts

import { useState, useMemo } from 'react'
import type { StationDto, ParameterDto } from './parameter-selector-sheet'

type UseParameterSelectorProps = {
  stations: StationDto[]
  itemsPerPage: number
  onOpenChange: (open: boolean) => void
  onSelect: (station: StationDto, parameter: ParameterDto) => void
}

export const useParameterSelector = ({
  stations,
  itemsPerPage,
  onOpenChange,
  onSelect,
}: UseParameterSelectorProps) => {
  const [view, setView] = useState<'stations' | 'parameters'>('stations')
  const [selectedStation, setSelectedStation] = useState<StationDto | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Memoiza a filtragem para evitar recálculos desnecessários
  const filteredStations = useMemo(
    () =>
      stations.filter((station) =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [stations, searchTerm],
  )

  // Lógica de Paginação
  const totalPages = Math.ceil(filteredStations.length / itemsPerPage)
  const paginatedStations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredStations.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredStations, currentPage, itemsPerPage])

  const handleSelectStation = (station: StationDto) => {
    setSelectedStation(station)
    setView('parameters')
  }

  const handleBackToStations = () => {
    setSelectedStation(null)
    setView('stations')
  }

  const handleCloseAndReset = () => {
    onOpenChange(false)
    // Usamos um timeout para que o estado seja resetado após a animação de fechar
    setTimeout(() => {
      setView('stations')
      setSelectedStation(null)
      setSearchTerm('')
      setCurrentPage(1)
    }, 300)
  }

  const handleSelectParameter = (parameter: ParameterDto) => {
    if (selectedStation) {
      onSelect(selectedStation, parameter)
      handleCloseAndReset()
    }
  }

  // Retornamos todos os estados e funções que o componente precisa para renderizar
  return {
    view,
    selectedStation,
    searchTerm,
    currentPage,
    totalPages,
    paginatedStations,
    setSearchTerm,
    setCurrentPage,
    handleSelectStation,
    handleBackToStations,
    handleSelectParameter,
    handleCloseAndReset,
  }
}