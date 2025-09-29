import { useEffect, useState, useCallback } from 'react'
import { Button } from '@/ui/shadcn/components/button'
import { Input } from '@/ui/shadcn/components/input'
import { Label } from '@/ui/shadcn/components/label'
import { Navigation } from 'lucide-react'
import { LeafletMap } from './leaflet-map'
// import { LeafletMap } from './leaflet-map'

type LocationPickerClientProps = {
  latitude: number
  longitude: number
  address: string
  onLocationChange: (lat: number, lng: number, address: string) => void
  className?: string
  readOnly?: boolean
}

export const LocationPickerClient = ({
  latitude,
  longitude,
  address,
  onLocationChange,
  className = '',
  readOnly = false,
}: LocationPickerClientProps) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    latitude || -23.5505,
    longitude || -46.6333,
  ])
  const [isLoadingAddress, setIsLoadingAddress] = useState(false)
  const [isLoadingCoords, setIsLoadingCoords] = useState(false)

  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      // Geocodificação reversa para obter endereço
      setIsLoadingAddress(true)
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      )
        .then((response) => response.json())
        .then((data) => {
          const fullAddress = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`
          onLocationChange(lat, lng, fullAddress)
        })
        .catch((error) => {
          console.error('Erro ao obter endereço:', error)
          onLocationChange(lat, lng, `${lat.toFixed(6)}, ${lng.toFixed(6)}`)
        })
        .finally(() => {
          setIsLoadingAddress(false)
        })
    },
    [onLocationChange],
  )

  // Atualizar centro do mapa quando coordenadas mudam
  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      setMapCenter([latitude, longitude])
    }
  }, [latitude, longitude])

  // Geocodificar quando o endereço muda (com debounce)
  const geocodeAddress = useCallback(
    async (addressToGeocode: string) => {
      if (
        !addressToGeocode.trim() ||
        addressToGeocode === `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
      ) {
        return
      }

      setIsLoadingCoords(true)

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressToGeocode)}&limit=1&countrycodes=br`,
        )
        const data = await response.json()

        if (data && data.length > 0) {
          const result = data[0]
          const lat = parseFloat(result.lat)
          const lng = parseFloat(result.lon)

          // Só atualizar se as coordenadas são significativamente diferentes
          if (Math.abs(lat - latitude) > 0.0001 || Math.abs(lng - longitude) > 0.0001) {
            onLocationChange(lat, lng, addressToGeocode)
            setMapCenter([lat, lng])
          }
        }
      } catch (error) {
        console.error('Erro ao geocodificar endereço:', error)
      } finally {
        setIsLoadingCoords(false)
      }
    },
    [latitude, longitude, onLocationChange],
  )

  // Debounce para geocodificação
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (address && address !== `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`) {
        geocodeAddress(address)
      }
    }, 1000) // 1 segundo de delay

    return () => clearTimeout(timeoutId)
  }, [address, geocodeAddress, latitude, longitude])

  const getCurrentLocation = () => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          onLocationChange(lat, lng, `${lat.toFixed(6)}, ${lng.toFixed(6)}`)
          setMapCenter([lat, lng])
        },
        (error) => {
          console.error('Erro ao obter localização:', error)
          alert('Não foi possível obter sua localização atual')
        },
      )
    } else {
      alert('Geolocalização não é suportada neste navegador')
    }
  }

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lat = parseFloat(e.target.value) || 0
    // Limitar latitude entre -90 e 90
    const clampedLat = Math.max(-90, Math.min(90, lat))
    onLocationChange(clampedLat, longitude, address)
  }

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lng = parseFloat(e.target.value) || 0
    // Limitar longitude entre -180 e 180
    const clampedLng = Math.max(-180, Math.min(180, lng))
    onLocationChange(latitude, clampedLng, address)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {!readOnly && (
        <div className='space-y-4'>
          {/* Endereço */}
          <div className='space-y-1'>
            <Label htmlFor='address'>Endereço</Label>
            <Input
              id='address'
              value={address}
              onChange={(e) => onLocationChange(latitude, longitude, e.target.value)}
              placeholder='Ex.: Av. Paulista, 1000 - São Paulo, SP'
              disabled={isLoadingAddress}
            />
          </div>

          {/* Coordenadas */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1'>
              <Label htmlFor='latitude'>Latitude</Label>
              <Input
                id='latitude'
                type='number'
                step='any'
                value={latitude || ''}
                onChange={handleLatitudeChange}
                placeholder='Ex.: -23.5505'
                disabled={isLoadingCoords}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='longitude'>Longitude</Label>
              <Input
                id='longitude'
                type='number'
                step='any'
                value={longitude || ''}
                onChange={handleLongitudeChange}
                placeholder='Ex.: -46.6333'
                disabled={isLoadingCoords}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mapa */}
      <div className='space-y-2'>
        <div className='border rounded-lg overflow-hidden relative'>
          <LeafletMap
            latitude={latitude}
            longitude={longitude}
            mapCenter={mapCenter}
            onLocationChange={readOnly ? () => {} : handleMapClick}
          />
        </div>
        {!readOnly && (
          <p className='text-xs text-start text-muted-foreground'>
            Clique no mapa para selecionar a localização
          </p>
        )}
      </div>
    </div>
  )
}
