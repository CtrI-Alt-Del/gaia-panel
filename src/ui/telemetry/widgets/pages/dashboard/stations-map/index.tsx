import { useRest } from '@/ui/global/hooks'
import { StationsMapView } from './stations-map-view'
import { useStationsMap } from './use-stations-map'

export const StationsMap = () => {
  const { telemetryService } = useRest()
  const { stations, handleMapChange } = useStationsMap({
    telemetryService,
  })
  return <StationsMapView stations={stations} onMapChange={handleMapChange} />
}
