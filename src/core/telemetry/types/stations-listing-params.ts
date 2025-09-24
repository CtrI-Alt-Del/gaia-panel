import type { PaginationParams } from '@/core/global/types'

export type StationsListingParams = {
  name?: string
  isActive?: boolean
  status?: string
} & PaginationParams
