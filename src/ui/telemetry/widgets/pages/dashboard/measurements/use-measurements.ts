import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'
import type { PaginationResponse } from '@/core/global/responses'
import { useState } from 'react'

export function useMeasurements() {
  const [measurements, setMeasurements] =
    useState<PaginationResponse<MeasurementDto> | null>(null)

  function handleFetchMeasurements(measurements: PaginationResponse<MeasurementDto>) {
    setMeasurements(measurements)
  }

  return {
    measurements: measurements?.items || [],
    hasNextPage: measurements?.hasNextPage || false,
    hasPreviousPage: measurements?.hasPreviousPage || false,
    nextCursor: measurements?.nextCursor || null,
    previousCursor: measurements?.previousCursor || null,
    handleFetchMeasurements,
  }
}
