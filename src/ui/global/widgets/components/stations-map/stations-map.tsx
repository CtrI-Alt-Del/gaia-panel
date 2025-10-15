import { useEffect, useState } from 'react'

export type StationMapMarker = {
  id: string
  name: string
  latitude: number
  longitude: number
  status?: 'active' | 'warning' | 'critical' | 'inactive'
}

export interface StationsLeafletMapProps {
  stations: StationMapMarker[]
  mapCenter?: [number, number]
  className?: string
}

export const StationsMap = ({ stations, mapCenter = [-15.7801, -47.9292], className }: StationsLeafletMapProps) => {
  const [MapContainer, setMapContainer] = useState<any>(null)
  const [TileLayer, setTileLayer] = useState<any>(null)
  const [Marker, setMarker] = useState<any>(null)
  const [Popup, setPopup] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadLeaflet = async () => {
      await import('leaflet/dist/leaflet.css')
      const ReactLeaflet = await import('react-leaflet')
      setMapContainer(() => ReactLeaflet.MapContainer)
      setTileLayer(() => ReactLeaflet.TileLayer)
      setMarker(() => ReactLeaflet.Marker)
      setPopup(() => ReactLeaflet.Popup)
      setIsLoaded(true)
    }
    loadLeaflet()
  }, [])

  if (!isLoaded || !MapContainer || !TileLayer || !Marker || !Popup) {
    return <div className={`bg-muted flex items-center justify-center rounded-lg ${className || ''}`} style={{height: '256px'}}>Carregando mapa...</div>
  }

  return (
    <div className={className}>
      <MapContainer center={mapCenter} zoom={5} style={{height: '100%', width: '100%', borderRadius: '0.5rem'}} scrollWheelZoom={true}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {stations.map(station => (
          <Marker key={station.id} position={[station.latitude, station.longitude]}>
            <Popup>
              <div>
                <strong>{station.name}</strong><br />
                Lat: {station.latitude}<br />
                Lng: {station.longitude}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
