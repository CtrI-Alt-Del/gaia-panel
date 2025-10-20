import type { PaginationParams } from '@/core/global/types'

export type AlertListingParams = {
  level?: string
  date?: string
} & PaginationParams
