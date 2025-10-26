export type MeasurementsListingParams = {
  stationId?: string
  parameterId?: string
  date?: Date
  nextCursor?: string | null
  previousCursor?: string | null
  pageSize?: number
}
