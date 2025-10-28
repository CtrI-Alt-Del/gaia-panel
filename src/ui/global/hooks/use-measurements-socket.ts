import { useEffect } from 'react'

import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'
import { CLIENT_ENV } from '@/core/global/constants'
import type { MeasurementsListingParams } from '@/core/telemetry/types'
import type { PaginationResponse } from '@/core/global/responses'

const URL = `${CLIENT_ENV.gaiaServerUrl}/telemetry/measurements`

type Params = {
  params: MeasurementsListingParams
  onFetchMeasurements: (measurements: PaginationResponse<MeasurementDto>) => void
}

export function useMeasurementsSocket({ params, onFetchMeasurements }: Params) {
  useEffect(() => {
    const searchParams = new URLSearchParams(
      Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== null)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: String(v) }), {}),
    ).toString()
    const es = new EventSource(`${URL}?${searchParams}`)

    function handleMessage(event: MessageEvent) {
      try {
        const payload = JSON.parse(event.data) as PaginationResponse<MeasurementDto>
        // console.log('handleMessage', payload)
        onFetchMeasurements(payload)
      } catch (error) {
        console.error('Failed to parse alerts stream payload', error)
      }
    }

    es.addEventListener('message', (event) => handleMessage(event))

    return () => {
      es.removeEventListener('message', (event) => handleMessage(event))
      es.close()
    }
  }, [params])
}
