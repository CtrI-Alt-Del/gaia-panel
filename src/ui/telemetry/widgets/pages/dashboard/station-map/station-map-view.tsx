import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/components/card'
import { useStationMap } from './use-station-map'

export interface StationMapViewProps {
}

export const StationMapView = ({}: StationMapViewProps) => {
  useStationMap()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapa das Estações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='w-full h-64 bg-gradient-to-br from-blue-400 via-green-400 to-yellow-400 rounded-lg flex items-center justify-center'>
          <div className='text-white font-medium'>
            Mapa Interativo Em Breve
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
