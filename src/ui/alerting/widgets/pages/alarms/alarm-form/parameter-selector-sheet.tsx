import { useState, useMemo } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/ui/shadcn/components/sheet'
import { Input } from '@/ui/shadcn/components/input'
import { Button } from '@/ui/shadcn/components/button'
import { Search, ChevronLeft } from 'lucide-react'
import type { StationDto as BaseStationDto } from '@/core/dtos/telemetry/station-dto'
import type { ParameterDto as BaseParameterDto } from '@/core/dtos/telemetry/parameter-dto'
import { useParameterSelector } from './useParameterSelector'

export type ParameterDto = BaseParameterDto
export type StationDto = BaseStationDto

// Função para gerar dados mockados consistentes
const generateMockData = (): StationDto[] => {
  const stations: StationDto[] = []
  for (let i = 1; i <= 100; i++) {
    stations.push({
      id: `st_${i}`,
      name: `Estação Padrão #${i}`,
      UID: `UID-2025-${i.toString().padStart(4, '0')}`,
      latitude: -23.1791 + (Math.random() - 0.5) * 0.1,
      longitude: -45.8872 + (Math.random() - 0.5) * 0.1,
      lastReadAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24),
      parameters: [
        { id: `p_${i}_1`, name: 'Temperatura', unitOfMeasure: '°C', factor: 1, offset: 0 },
        { id: `p_${i}_2`, name: 'Umidade do Ar', unitOfMeasure: '%', factor: 1, offset: 0 },
        { id: `p_${i}_3`, name: 'Pressão Atmosférica', unitOfMeasure: 'hPa', factor: 1, offset: 0 },
        { id: `p_${i}_4`, name: 'Velocidade do Vento', unitOfMeasure: 'km/h', factor: 1, offset: 0 },
      ],
      isActive: Math.random() > 0.1,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
  return stations
}

const MOCK_STATIONS = generateMockData()
const ITEMS_PER_PAGE = 8

type ParameterSelectorSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (station: StationDto, parameter: ParameterDto) => void
}

export function ParameterSelectorSheet({
  open,
  onOpenChange,
  onSelect,
}: ParameterSelectorSheetProps) {
  const {
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
  } = useParameterSelector({
    stations: MOCK_STATIONS,
    itemsPerPage: ITEMS_PER_PAGE,
    onOpenChange,
    onSelect,
  })

  return (
    <Sheet open={open} onOpenChange={handleCloseAndReset}>
      <SheetContent className='w-full sm:max-w-2xl flex flex-col'>
        {/* Visualização de Estações */}
        {view === 'stations' && (
          <>
            <SheetHeader>
              <SheetTitle>Selecionar Estação</SheetTitle>
              <SheetDescription>
                Busque e selecione a estação para configurar o alarme.
              </SheetDescription>
            </SheetHeader>
            <div className='py-4'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input
                  placeholder='Buscar por nome...'
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1) 
                  }}
                  className='pl-10'
                />
              </div>
            </div>
            <div className='flex-grow overflow-auto'>
              <table className='w-full text-sm text-left'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>Nome da Estação</th>
                    <th scope='col' className='px-6 py-3'>UID</th>
                    <th scope='col' className='px-6 py-3'>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStations.map((station) => (
                    <tr key={station.id} className='bg-white border-b hover:bg-gray-50'>
                      <td className='px-6 py-4 font-medium text-gray-900'>{station.name}</td>
                      <td className='px-6 py-4 text-gray-600'>{station.UID}</td>
                      <td className='px-6 py-4'>
                        <Button variant='link' size='sm' onClick={() => handleSelectStation(station)}>
                          Parâmetros
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Controles de Paginação */}
            <div className='flex items-center justify-between pt-4'>
              <span className='text-sm text-gray-700'>
                Página {currentPage} de {totalPages}
              </span>
              <div className='inline-flex items-center gap-2'>
                <Button variant='outline' size='sm' onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>
                  Anterior
                </Button>
                <Button variant='outline' size='sm' onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>
                  Próxima
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Visualização de Parâmetros */}
        {view === 'parameters' && selectedStation && (
          <>
            <SheetHeader>
              <Button variant="ghost" size="sm" className="absolute left-2 top-2 w-fit px-2" onClick={handleBackToStations}>
                <ChevronLeft className='h-4 w-4 mr-2' />
                Voltar
              </Button>
              <SheetTitle className="pt-8">{selectedStation.name}</SheetTitle>
              <SheetDescription>
                Selecione o parâmetro que o alarme irá monitorar.
              </SheetDescription>
            </SheetHeader>
            <div className='flex-grow overflow-auto py-4'>
              <div className='space-y-2'>
                {selectedStation.parameters.map((param) => (
                  <button
                    key={param.id}
                    onClick={() => handleSelectParameter(param)}
                    className='w-full text-left p-3 rounded-md hover:bg-gray-100'
                  >
                    <p className='font-medium'>{param.name}</p>
                    <p className='text-sm text-gray-500'>Unidade: {param.unitOfMeasure}</p>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}