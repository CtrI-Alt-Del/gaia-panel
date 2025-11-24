import { useEffect, useState } from 'react'

import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'
import { CLIENT_ENV } from '@/core/global/constants/client-env'
import type { MeasurementsListingParams } from '@/core/telemetry/types'
import type { PaginationResponse } from '@/core/global/responses'

const URL = `${CLIENT_ENV.gaiaServerUrl}/telemetry/measurements`

type Params = {
  params: MeasurementsListingParams
  onFetchMeasurements: (measurements: PaginationResponse<MeasurementDto>) => void
}

export function useMeasurementsSocket({ params, onFetchMeasurements }: Params) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const searchParams = new URLSearchParams(
      Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== null)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: String(v) }), {}),
    ).toString()
    const es = new EventSource(`${URL}?${searchParams}`)

    const handleMessage = (event: MessageEvent) => {
      try {
        const payload = JSON.parse(event.data) as PaginationResponse<MeasurementDto>
        onFetchMeasurements(payload)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to parse alerts stream payload', error)
        setIsLoading(false)
      }
    }

    const handleError = () => setIsLoading(false)

    es.addEventListener('message', handleMessage)
    es.addEventListener('error', handleError)

    return () => {
      es.removeEventListener('message', handleMessage)
      es.removeEventListener('error', handleError)
      es.close()
    }
  }, [params])

  return { isLoading }
}
