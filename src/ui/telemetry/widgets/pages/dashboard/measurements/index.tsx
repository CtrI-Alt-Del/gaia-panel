import { useUiProvider } from '@/ui/global/hooks'
import { useMeasurementsSocket } from '@/ui/global/hooks/use-measurements-socket'
import { MeasurementsView } from './measurements-view'
import { useMeasurements } from './use-measurements'

export const Measurements = () => {
  const { isLoading } = useUiProvider()
  const {
    measurements,
    hasNextPage,
    hasPreviousPage,
    nextCursor,
    previousCursor,
    handleFetchMeasurements,
  } = useMeasurements()
  useMeasurementsSocket({
    params: {
      pageSize: 10,
    },
    onFetchMeasurements: handleFetchMeasurements,
  })

  return (
    <MeasurementsView
      isLoading={isLoading}
      measurements={measurements}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      nextCursor={nextCursor}
      previousCursor={previousCursor}
    />
  )
}

export default Measurements
