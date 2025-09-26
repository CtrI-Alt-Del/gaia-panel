import type { PaginationParams } from '@/core/global/types'

export type ParametersListingParams = {
  name?: string
  unitOfMeasure?: string
  isActive?: boolean
} & PaginationParams
