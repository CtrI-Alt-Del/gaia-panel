import type { RestClient } from '@/core/global/interfaces'
import type { MembershipService as IMembershipService } from '@/core/membership/interfaces'
import type { UsersListingParams } from '@/core/membership/types'

export const MembershipService = (restClient: RestClient): IMembershipService => {
  return {
    async fetchUsers(params: UsersListingParams) {
      if (params.name) restClient.setQueryParam('name', params.name)
      if (params.status) restClient.setQueryParam('status', params.status.toString())
      if (params.nextCursor) restClient.setQueryParam('nextCursor', params.nextCursor)
      if (params.previousCursor) restClient.setQueryParam('previousCursor', params.previousCursor)
      if (params.pageSize) restClient.setQueryParam('pageSize', params.pageSize.toString())
      return await restClient.get('/membership/users')
    },
  }
}
