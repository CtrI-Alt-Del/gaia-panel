
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/components/card'
import { StationsMap } from '@/ui/global/widgets/components/stations-map/stations-map'
import type { StationMapMarker } from '@/ui/global/widgets/components/stations-map/stations-map'

export interface StationMapViewProps {}

export function StationMapView(props: StationMapViewProps) {
  const stations: StationMapMarker[] = [
    { id: '001', name: 'São Paulo Central', latitude: -23.5505, longitude: -46.6333 },
    { id: '045', name: 'Rio Sul', latitude: -22.9068, longitude: -43.1729 },
    { id: '023', name: 'Brasília Norte', latitude: -15.7801, longitude: -47.9292 },
    { id: '089', name: 'Belo Horizonte', latitude: -19.9191, longitude: -43.9386 },
    { id: '067', name: 'Curitiba Centro', latitude: -25.4284, longitude: -49.2733 },
  ]

  return (
    <Card className='w-full h-[430px]'>
      <CardHeader>
        <CardTitle>Mapa das Estações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='w-full h-80'>
          <StationsMap stations={stations} className='w-full h-full' />
        </div>
      </CardContent>
    </Card>
  )
}
