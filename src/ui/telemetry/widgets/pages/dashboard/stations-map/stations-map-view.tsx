import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/components/card'
import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import { MapViewer } from './map-viewer'

type Props = {
  stations: StationDto[]
  onMapChange: (
    northEastCoordinates: [number, number],
    southWestCoordinates: [number, number],
  ) => void
}

export function StationsMapView({ stations, onMapChange }: Props) {
  return (
    <Card className='w-full h-[430px]'>
      <CardHeader>
        <CardTitle>Mapa das Estações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='w-full h-80'>
          <MapViewer
            stations={stations}
            className='w-full h-full'
            onChange={onMapChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}
