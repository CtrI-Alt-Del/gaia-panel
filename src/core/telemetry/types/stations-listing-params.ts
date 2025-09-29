import type { PaginationParams } from '@/core/global/types'

export type StationsListingParams = {
  name?: string
  status?: string
} & PaginationParams
