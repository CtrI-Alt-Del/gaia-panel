import type { PaginationParams } from '@/core/global/types'

export type UsersListingParams = {
  name?: string
  status?: string
} & PaginationParams
