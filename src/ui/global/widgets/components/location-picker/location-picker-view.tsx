import { useState, useEffect } from 'react'
import { Label } from '@/ui/shadcn/components/label'
import { LocationPickerClient } from './location-picker-client'

type LocationPickerViewProps = {
  latitude: number
  longitude: number
  address: string
  onLocationChange: (lat: number, lng: number, address: string) => void
  className?: string
}

export const LocationPickerView = (props: LocationPickerViewProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Verificar se estamos no cliente e se o window existe
    if (typeof window !== 'undefined') {
      setIsClient(true)
    }
  }, [])

  if (!isClient) {
    // Fallback para SSR - mostrar campos básicos sem mapa
    return (
      <div className={`space-y-4 ${props.className || ''}`}>
        <div className="space-y-4">
          <Label>Localização</Label>

          {/* Endereço */}
          <div className="space-y-1">
            <Label htmlFor="address-ssr">Endereço</Label>
            <input
              id="address-ssr"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={props.address}
              onChange={(e) => props.onLocationChange(props.latitude, props.longitude, e.target.value)}
              placeholder="Ex.: Av. Paulista, 1000 - São Paulo, SP"
            />
          </div>

          {/* Coordenadas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="latitude-ssr">Latitude</Label>
              <input
                id="latitude-ssr"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                step="any"
                value={props.latitude || ''}
                onChange={(e) => {
                  const lat = parseFloat(e.target.value) || 0
                  props.onLocationChange(lat, props.longitude, props.address)
                }}
                placeholder="Ex.: -23.5505"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="longitude-ssr">Longitude</Label>
              <input
                id="longitude-ssr"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                step="any"
                value={props.longitude || ''}
                onChange={(e) => {
                  const lng = parseFloat(e.target.value) || 0
                  props.onLocationChange(props.latitude, lng, props.address)
                }}
                placeholder="Ex.: -46.6333"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="map-placeholder">Localização no mapa</Label>
          <div className="border rounded-lg overflow-hidden">
            <div id="map-placeholder" className="h-64 bg-muted flex items-center justify-center text-muted-foreground">
              Carregando mapa...
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <LocationPickerClient {...props} />
}
