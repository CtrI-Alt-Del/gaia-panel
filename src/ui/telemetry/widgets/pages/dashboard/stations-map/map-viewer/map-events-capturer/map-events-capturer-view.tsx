import type * as Leaflet from 'leaflet'
import { useCallback, useEffect } from 'react'
import { useMap, useMapEvents } from 'react-leaflet'

type Props = {
  onBoundsChange: (
    northEastCoordinates: [number, number],
    southWestCoordinates: [number, number],
  ) => void
}

const MapEventsCapturerView = ({ onBoundsChange }: Props) => {
  const map = useMap()

  const handleBoundsChange = useCallback(
    (map: Leaflet.Map) => {
      const bounds = map.getBounds()
      const ne = bounds.getNorthEast()
      const sw = bounds.getSouthWest()

      const boundingBox = {
        ne: { lat: ne.lat, lng: ne.lng },
        sw: { lat: sw.lat, lng: sw.lng },
      }

      console.log(boundingBox)
      onBoundsChange([ne.lat, ne.lng], [sw.lat, sw.lng])
    },
    [onBoundsChange],
  )

  useEffect(() => {
    if (!map) return
    handleBoundsChange(map)
  }, [map, handleBoundsChange])

  useMapEvents({
    moveend() {
      handleBoundsChange(map)
    },
  })
  return null
}

export default MapEventsCapturerView
