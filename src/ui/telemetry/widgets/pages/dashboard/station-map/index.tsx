import { StationMapView, type StationMapViewProps } from './station-map-view'

export type StationMapProps = StationMapViewProps

export const StationMap = (props: StationMapProps) => {
  return <StationMapView {...props} />
}

export default StationMap
