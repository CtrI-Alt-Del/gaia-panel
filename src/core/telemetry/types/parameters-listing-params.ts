import type { PaginationParams } from '@/core/global/types'

export type ParametersListingParams = {
  name?: string
  status?: string
} & PaginationParams
