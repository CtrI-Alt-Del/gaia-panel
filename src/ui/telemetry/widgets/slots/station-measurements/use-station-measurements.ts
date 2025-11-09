import { useState } from 'react'

import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'
import type { PaginationResponse } from '@/core/global/responses'

export function useStationMeasurements() {
  const [measurements, setMeasurements] =
    useState<PaginationResponse<MeasurementDto> | null>(null)

  function handleFetchMeasurements(measurements: PaginationResponse<MeasurementDto>) {
    console.log('handleFetchMeasurements', measurements)
    setMeasurements(measurements)
  }

  return {
    measurements: measurements?.items || [],
    nextCursor: measurements?.nextCursor || null,
    previousCursor: measurements?.previousCursor || null,
    hasNextPage: measurements?.hasNextPage || false,
    hasPreviousPage: measurements?.hasPreviousPage || false,
    handleFetchMeasurements,
  }
}
