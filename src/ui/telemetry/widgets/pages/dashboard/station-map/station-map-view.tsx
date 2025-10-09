
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/components/card'
import { LocationPickerView } from '@/ui/global/widgets/components/location-picker'

export interface StationMapViewProps {}

export const StationMapView = ({}: StationMapViewProps) => {
  const latitude = -15.7801
  const longitude = -47.9292
  const address = ''

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapa das Estações</CardTitle>
      </CardHeader>
      <CardContent>
        <LocationPickerView
          latitude={latitude}
          longitude={longitude}
          address={address}
          onLocationChange={() => {}}
          readOnly
        />
      </CardContent>
    </Card>
  )
}
