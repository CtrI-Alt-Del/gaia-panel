import { Link, useLocation } from 'react-router'
import type { PropsWithChildren } from 'react'
import { MapPin, Activity, Calendar, Settings } from 'lucide-react'

import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import { Badge } from '@/ui/shadcn/components/badge'
import { useDateTimeProvider } from '@/ui/global/hooks/use-date-provider'

type Props = {
  station: StationDto
}

export const StationPageView = ({ station, children }: PropsWithChildren<Props>) => {
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
              <div className='flex items-center gap-3 mb-2'>
                <div className={`w-3 h-3 rounded-full ${station.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                <h1 className='text-2xl font-bold text-gray-900'>{station.name}</h1>
                <Badge color={station.isActive ? 'green' : 'stone'} tone="soft">
                  {station.isActive ? 'Ativa' : 'Inativa'}
                </Badge>
              </div>
              
              <div className='flex items-center gap-1 mb-4'>
                <MapPin className='w-4 h-4 text-gray-500' />
                <p className='text-gray-600'>{station.address}</p>
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-4'>
                
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
                    <p className='text-sm font-medium text-gray-900'>{formatRelativeTime(station.lastReadAt)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='flex gap-3 ml-6'>
              <button
                type='button'
                className='flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors'
              >
                <Settings className='w-4 h-4' />
                Editar
              </button>
              <button
                type='button'
                className={`h-10 px-4 rounded-lg border transition-colors ${
                  station.isActive
                    ? 'border-red-300 text-red-700 hover:bg-red-50'
                    : 'border-green-300 text-green-700 hover:bg-green-50'
                }`}
              >
                {station.isActive ? 'Desativar' : 'Ativar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-gray-200 mb-6'>
        <div className='border-b border-gray-200 px-6'>
          <nav className='flex gap-8'>
            <Link to={`/stations/${station.id}/location`} className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${location.pathname === `/stations/${station.id}/location` ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'}`}>
              Localização
            </Link>
            <Link to={`/stations/${station.id}/parameters`} className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${location.pathname === `/stations/${station.id}/parameters` ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'}`}>
              Parâmetros
            </Link>
            <Link to={`/stations/${station.id}/measurements`} className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${location.pathname === `/stations/${station.id}/measurements` ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'}`}>
              Medições
            </Link>
          </nav>
        </div>
        
        <div className='p-6'>
          {children}
        </div>
      </div>
    </div>
  )
}
