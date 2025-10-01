import { useEffect, useState } from 'react'

type LeafletMapProps = {
  latitude: number
  longitude: number
  mapCenter: [number, number]
  onLocationChange: (lat: number, lng: number, address: string) => void
}

const MapClickHandler = ({
  useMapEvents,
  onLocationChange,
}: {
  useMapEvents: any
  onLocationChange: (lat: number, lng: number, address: string) => void
}) => {
  useMapEvents?.({
    click: (e: any) => {
      const { lat, lng } = e.latlng
      onLocationChange(lat, lng, `${lat.toFixed(6)}, ${lng.toFixed(6)}`)
    },
  })
  return null
}

export const LeafletMap = ({
  latitude,
  longitude,
  mapCenter,
  onLocationChange,
}: LeafletMapProps) => {
  const [MapContainer, setMapContainer] = useState<any>(null)
  const [TileLayer, setTileLayer] = useState<any>(null)
  const [Marker, setMarker] = useState<any>(null)
  const [useMapEvents, setUseMapEvents] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        await import('leaflet/dist/leaflet.css')

        const L = await import('leaflet')
        const ReactLeaflet = await import('react-leaflet')

        const customIcon = L.default.divIcon({
          html: `
            <div style="
              background: #10b981;
              border: 3px solid white;
              border-radius: 50%;
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              position: relative;
            ">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div style="
              position: absolute;
              bottom: -8px;
              left: 50%;
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 8px solid #10b981;
              transform: translateX(-50%);
              filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
            "></div>
          `,
          className: 'custom-marker',
          iconSize: [24, 32],
          iconAnchor: [12, 32],
        })

        setMapContainer(() => ReactLeaflet.MapContainer)
        setTileLayer(() => ReactLeaflet.TileLayer)
        setMarker(() => (props: any) => (
          <ReactLeaflet.Marker {...props} icon={customIcon} />
        ))
        setUseMapEvents(() => ReactLeaflet.useMapEvents)
        setIsLoaded(true)
      } catch (error) {
        console.error('Erro ao carregar Leaflet:', error)
      }
    }

    loadLeaflet()
  }, [])

  if (!isLoaded || !MapContainer || !TileLayer || !Marker) {
    return (
      <div className='h-64 bg-muted flex items-center justify-center text-muted-foreground'>
        Carregando mapa...
      </div>
    )
  }

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      style={{ height: '500px', width: '100%' }}
      className='z-0'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {latitude !== 0 && longitude !== 0 && <Marker position={[latitude, longitude]} />}

      <MapClickHandler useMapEvents={useMapEvents} onLocationChange={onLocationChange} />
    </MapContainer>
  )
}
