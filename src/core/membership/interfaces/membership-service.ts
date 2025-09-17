import type { PaginationResponse, RestResponse } from '@/core/global/responses'
import type { UserDto } from '../dtos/user-dto'
import type { UsersListingParams } from '../types'

export interface MembershipService {
  fetchUsers(
    params: UsersListingParams,
  ): Promise<RestResponse<PaginationResponse<UserDto>>>
}
