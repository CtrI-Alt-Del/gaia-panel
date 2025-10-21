import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import { StatusPill } from '@/ui/shadcn/components/status-pill'

interface DetailsTabProps {
  station: StationDto
  timeAgo: (d: Date) => string
}

export function DetailsTab({ station, timeAgo }: DetailsTabProps) {
  return (
    <div className='space-y-6'>
      <div className='rounded-lg border p-4'>
        <div className='flex items-center justify-between'>
          <h2 className='font-medium'>Detalhes da Estação</h2>
          <StatusPill active={station.isActive || false} />
        </div>
        <div className='mt-3 grid grid-cols-2 gap-3 text-sm'>
          <div>
            <div className='text-xs text-muted-foreground'>Nome</div>
            <div className='mt-0.5'>{station.name}</div>
          </div>
          <div>
            <div className='text-xs text-muted-foreground'>Última Leitura</div>
            <div className='mt-0.5'>
              {station.lastReadAt ? timeAgo(station.lastReadAt) : '—'}
            </div>
          </div>
          <div>
            <div className='text-xs text-muted-foreground'>UID</div>
            <div className='mt-0.5'>{station.uid}</div>
          </div>
          <div>
            <div className='text-xs text-muted-foreground'>Status</div>
            <div className='mt-0.5'>{station.isActive ? 'Ativo' : 'Inativo'}</div>
          </div>
          <div>
            <div className='text-xs text-muted-foreground'>Latitude</div>
            <div className='mt-0.5'>{station.latitude.toFixed(6)}</div>
          </div>
          <div>
            <div className='text-xs text-muted-foreground'>Longitude</div>
            <div className='mt-0.5'>{station.longitude.toFixed(6)}</div>
          </div>
        </div>
      </div>

      <div className='rounded-lg border p-4'>
        <h2 className='font-medium mb-3'>Mapa da Estação</h2>
        <div className='h-64 w-full rounded-md bg-muted grid place-items-center text-sm text-muted-foreground'>
          Placeholder do mapa
        </div>
      </div>
    </div>
  )
}
