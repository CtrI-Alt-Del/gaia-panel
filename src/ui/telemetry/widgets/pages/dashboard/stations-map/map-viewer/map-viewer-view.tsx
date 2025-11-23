import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import { MapEventsCapturer } from './map-events-capturer'

const MAP_CENTER: [number, number] = [-15.7801, -47.9292]

type Props = {
  stations: StationDto[]
  className?: string
  onChange: (
    northEastCoordinates: [number, number],
    southWestCoordinates: [number, number],
  ) => void
}

const MapViewerView = ({ stations, className, onChange }: Props) => {
  const [MapContainer, setMapContainer] = useState<any>(null)
  const [TileLayer, setTileLayer] = useState<any>(null)
  const [Marker, setMarker] = useState<any>(null)
  const [Popup, setPopup] = useState<any>(null)
  const [defaultIcon, setDefaultIcon] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const cleanupRef = useRef<(() => void) | null>(null)
  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const loadLeaflet = async () => {
      const ReactLeaflet = await import('react-leaflet')
      const leafletModule = await import('leaflet')
      const L = leafletModule.default ?? leafletModule

      const icon = L.icon({
        iconUrl: '/images/leaflet-marker-icon.png',
        iconRetinaUrl: '/images/leaflet-marker-icon-2x.png',
        shadowUrl: '/images/leaflet-marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })

      setDefaultIcon(icon)
      setMapContainer(() => ReactLeaflet.MapContainer)
      setTileLayer(() => ReactLeaflet.TileLayer)
      setMarker(() => ReactLeaflet.Marker)
      setPopup(() => ReactLeaflet.Popup)
      setIsLoaded(true)
    }

    loadLeaflet()
  }, [])

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [])

  if (!isLoaded || !MapContainer || !TileLayer || !Marker || !Popup || !defaultIcon) {
    return (
      <div
        className={`bg-muted flex items-center justify-center rounded-lg ${className || ''}`}
        style={{ height: '256px' }}
      >
        Carregando mapa...
      </div>
    )
  }

  return (
    <div className={className}>
      <MapContainer
        center={MAP_CENTER}
        zoom={5}
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        scrollWheelZoom={true}
      >
        <MapEventsCapturer onBoundsChange={onChange} />
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.latitude, station.longitude]}
            icon={defaultIcon}
          >
            <Popup>
              <div>
                <strong>{station.name}</strong>
                <br />
                Lat: {station.latitude}
                <br />
                Lng: {station.longitude}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapViewerView
