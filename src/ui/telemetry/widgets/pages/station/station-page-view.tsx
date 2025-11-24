import { Link, useLocation } from 'react-router'
import type { PropsWithChildren } from 'react'
import { MapPin, Activity, Calendar, Settings } from 'lucide-react'

import type { StationDto } from '@/core/telemetry/dtos/station-dto'

import { Badge } from '@/ui/shadcn/components/badge'
import { Dialog } from '@/ui/global/widgets/components/dialog'
import { useDateTimeProvider } from '@/ui/global/hooks/use-date-time-provider'
import { StationStatusButton } from '../stations/station-status-button'
import { StationForm } from '../stations/station-form'
import { StationReportDownload } from './station-pdf-download-button'

type Props = {
  station: StationDto
  isAuthenticated?: boolean
}

export const StationPageView = ({
  station,
  children,
  isAuthenticated,
}: PropsWithChildren<Props>) => {
  const { formatRelativeTime } = useDateTimeProvider()
  const location = useLocation()

  return (
    <div className='p-6'>
      <div className='mb-8'>
        <div className='text-sm text-muted-foreground mb-3'>
          <Link className='text-primary hover:text-primary/80 underline' to='/stations'>
            Estações
          </Link>
          <span className='mx-2 text-gray-400'>/</span>
          <span className='font-medium'>{station.uid}</span>
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-2'>
                <h1 className='text-2xl font-bold text-gray-900'>{station.name}</h1>
                <Badge color={station.isActive ? 'green' : 'stone'} tone='soft'>
                  <div
                    className={`w-2 h-2 rounded-full ${station.isActive ? 'bg-green-500' : 'bg-gray-400'}`}
                  />
                  {station.isActive ? 'Ativa' : 'Inativa'}
                </Badge>
              </div>

              <div className='grid grid-cols-[16px_1fr] items-center gap-2 mb-4'>
                <MapPin className='text-gray-500' size={16} />
                <p className='text-gray-600 text-sm'>{station.address}</p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 w-96'>
                <div className='flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg'>
                  <div className='w-8 h-8 bg-violet-50 rounded-full flex items-center justify-center'>
                    <Activity className='w-4 h-4 text-violet-600' />
                  </div>
                  <div>
                    <p className='text-xs text-gray-500'>Parâmetros</p>
                    <p className='text-sm font-medium text-gray-900'>
                      {station.quantityOfParameters || 0} monitorados
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg'>
                  <div className='w-8 h-8 bg-violet-50 rounded-full flex items-center justify-center'>
                    <Calendar className='w-4 h-4 text-violet-600' />
                  </div>
                  <div>
                    <p className='text-xs text-gray-500'>Última Leitura</p>
                    <p className='text-sm font-medium text-gray-900'>
                      {formatRelativeTime(station.lastReadAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {(station.id || isAuthenticated) && (
              <div className='flex gap-3 ml-6'>
                {station.id && (
                  <StationReportDownload
                    stationId={station.id}
                    stationName={station.name}
                    stationUid={station.uid}
                  />
                )}

                {isAuthenticated && (
                  <>
                    <Dialog
                      title='Editar Estação'
                      description='Edite as informações da estação'
                      size='2xl'
                      trigger={
                        <button
                          type='button'
                          className='flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer'
                        >
                          <Settings className='w-4 h-4' />
                          Editar
                        </button>
                      }
                    >
                      {(closeDialog) => (
                        <StationForm
                          onSuccess={closeDialog}
                          onCancel={closeDialog}
                          stationDto={station}
                        />
                      )}
                    </Dialog>

                    <StationStatusButton
                      stationId={station.id as string}
                      isActive={station.isActive || false}
                    >
                      <button
                        type='button'
                        className={`h-10 px-4 rounded-lg border transition-colors cursor-pointer ${
                          station.isActive
                            ? 'border-red-300 text-red-700 hover:bg-red-50'
                            : 'border-green-300 text-green-700 hover:bg-green-50'
                        }`}
                      >
                        {station.isActive ? 'Desativar' : 'Ativar'}
                      </button>
                    </StationStatusButton>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-gray-200 mb-6'>
        <div className='border-b border-gray-200 px-6'>
          <nav className='flex gap-8'>
            <Link
              to={`/stations/${station.id}/location`}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${location.pathname === `/stations/${station.id}/location` ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'}`}
            >
              Localização
            </Link>
            <Link
              to={`/stations/${station.id}/parameters`}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${location.pathname === `/stations/${station.id}/parameters` ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'}`}
            >
              Parâmetros
            </Link>
            <Link
              to={`/stations/${station.id}/measurements`}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${location.pathname === `/stations/${station.id}/measurements` ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'}`}
            >
              Medições
            </Link>
          </nav>
        </div>

        <div className='p-6'>{children}</div>
      </div>
    </div>
  )
}
