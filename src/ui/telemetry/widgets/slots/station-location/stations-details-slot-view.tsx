import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import { LocationPickerView } from '@/ui/global/widgets/components/location-picker'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/shadcn/components/card'

type Props = {
  station: StationDto
}

export const StationLocationSlotView = ({ station }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapa da Estação</CardTitle>
        <CardDescription>
          Latitude: {station.latitude}, Longitude: {station.longitude}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LocationPickerView
          latitude={station.latitude}
          longitude={station.longitude}
          address={station.address}
          onLocationChange={() => {}}
          readOnly
        />
      </CardContent>
    </Card>
  )
}
