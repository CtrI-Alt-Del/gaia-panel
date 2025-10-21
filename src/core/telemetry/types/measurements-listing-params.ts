export type MeasurementsListingParams = {
  status?: string
  date?: string
  parameterName?: string
  stationName?: string
  stationId?: string
  nextCursor?: string | null
  previousCursor?: string | null
  pageSize?: number
}
