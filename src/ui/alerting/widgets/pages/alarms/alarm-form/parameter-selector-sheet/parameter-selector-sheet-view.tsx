import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/ui/shadcn/components/sheet'
import { Input } from '@/ui/shadcn/components/input'
import { Button } from '@/ui/shadcn/components/button'
import { Label } from '@/ui/shadcn/components/label'
import { Card, CardContent } from '@/ui/shadcn/components/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/shadcn/components/select'
import { Search, ChevronLeft, Loader2 } from 'lucide-react'
import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'
import type { TelemetryService } from '@/core/telemetry/interfaces'
import { StationParameters } from './station-parameters'

type ParameterSelectorSheetViewProps = {
  open: boolean
  view: 'stations' | 'parameters'
  selectedStation: StationDto | null
  searchTerm: string
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  stations: StationDto[]
  isLoading: boolean
  telemetryService: TelemetryService
  onCloseAndReset: () => void
  onSelectStation: (station: StationDto) => void
  onBackToStations: () => void
  onSelectParameter: (parameter: ParameterDto) => void
  onNameChange: (name: string) => void
  onPageSizeChange: (pageSize: number) => void
  onNextPage: () => void
  onPreviousPage: () => void
}

export function ParameterSelectorSheetView({
  open,
  view,
  selectedStation,
  searchTerm,
  pageSize,
  hasNextPage,
  hasPreviousPage,
  stations,
  isLoading,
  telemetryService,
  onCloseAndReset,
  onSelectStation,
  onBackToStations,
  onSelectParameter,
  onNameChange,
  onPageSizeChange,
  onNextPage,
  onPreviousPage,
}: ParameterSelectorSheetViewProps) {
  return (
    <Sheet open={open} onOpenChange={onCloseAndReset}>
      <SheetContent className='w-full sm:max-w-4xl flex flex-col'>
        {view === 'stations' && (
          <>
            <SheetHeader>
              <SheetTitle>Selecionar Estação</SheetTitle>
              <SheetDescription>
                Busque e selecione a estação para configurar o alarme.
              </SheetDescription>
            </SheetHeader>

            <Card className='mx-6 shadow-none'>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='search-name'>Buscar por nome</Label>
                    <div className='relative'>
                      <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                      <Input
                        id='search-name'
                        placeholder='Digite o nome da estação...'
                        value={searchTerm}
                        onChange={(e) => {
                          onNameChange(e.target.value)
                        }}
                        className='pl-10'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='page-size'>Itens por página</Label>
                    <Select
                      value={pageSize.toString()}
                      onValueChange={(value) => onPageSizeChange(Number(value))}
                    >
                      <SelectTrigger id='page-size'>
                        <SelectValue placeholder='Selecione a quantidade' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='5'>5 itens</SelectItem>
                        <SelectItem value='10'>10 itens</SelectItem>
                        <SelectItem value='20'>20 itens</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabela de Estações */}
            <div className='flex-grow overflow-auto'>
              {isLoading ? (
                <div className='flex items-center justify-center h-32'>
                  <Loader2 className='h-6 w-6 animate-spin' />
                  <span className='ml-2'>Carregando estações...</span>
                </div>
              ) : (
                <table className='w-full text-sm text-left'>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 sticky top-0'>
                    <tr>
                      <th scope='col' className='px-6 py-3'>
                        Nome da Estação
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        UID
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Status
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Última Leitura
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stations.length === 0 ? (
                      <tr>
                        <td colSpan={5} className='px-6 py-8 text-center text-gray-500'>
                          Nenhuma estação encontrada
                        </td>
                      </tr>
                    ) : (
                      stations.map((station) => (
                        <tr
                          key={station.id}
                          className='bg-white border-b hover:bg-gray-50'
                        >
                          <td className='px-6 py-4 font-medium text-gray-900'>
                            {station.name}
                          </td>
                          <td className='px-6 py-4 text-gray-600'>{station.uid}</td>
                          <td className='px-6 py-4'>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                station.isActive
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {station.isActive ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td className='px-6 py-4 text-gray-600'>
                            {station.lastReadAt
                              ? new Date(station.lastReadAt).toLocaleDateString('pt-BR')
                              : 'Nunca'}
                          </td>
                          <td className='px-6 py-4'>
                            <Button
                              variant='link'
                              size='sm'
                              onClick={() => onSelectStation(station)}
                              disabled={!station.isActive}
                            >
                              Parâmetros
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>

            <div className='flex items-center justify-end gap-2 p-4 border-t'>
              <Button
                variant='outline'
                size='sm'
                onClick={onPreviousPage}
                disabled={!hasPreviousPage || isLoading}
              >
                Anterior
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={onNextPage}
                disabled={!hasNextPage || isLoading}
              >
                Próxima
              </Button>
            </div>
          </>
        )}

        {view === 'parameters' && selectedStation && (
          <>
            <SheetHeader>
              <Button
                variant='ghost'
                size='sm'
                className='absolute left-2 top-2 w-fit px-2'
                onClick={onBackToStations}
              >
                <ChevronLeft className='h-4 w-4 mr-2' />
                Voltar
              </Button>
              <SheetTitle className='pt-8'>{selectedStation.name}</SheetTitle>
              <SheetDescription>
                Selecione o parâmetro que o alarme irá monitorar.
              </SheetDescription>
            </SheetHeader>
            <StationParameters
              telemetryService={telemetryService}
              station={selectedStation}
              onSelectParameter={onSelectParameter}
            />
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
