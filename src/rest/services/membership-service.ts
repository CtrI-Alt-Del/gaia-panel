import type { RestClient } from '@/core/global/interfaces'
import type { UserDto } from '@/core/membership/dtos'
import type { MembershipService as IMembershipService } from '@/core/membership/interfaces'
import type { UsersListingParams } from '@/core/membership/types'

export const MembershipService = (restClient: RestClient): IMembershipService => {
  return {
    async fetchUsers(params: UsersListingParams) {
      if (params.name) restClient.setQueryParam('name', params.name)
      if (params.status) restClient.setQueryParam('status', params.status.toString())
      if (params.nextCursor) restClient.setQueryParam('nextCursor', params.nextCursor)
      if (params.previousCursor)
        restClient.setQueryParam('previousCursor', params.previousCursor)
      if (params.pageSize)
        restClient.setQueryParam('pageSize', params.pageSize.toString())
      return await restClient.get('/membership/users')
    },

    async createUser(userDto: UserDto) {
      return await restClient.post('/membership/users', userDto)
    },

    async updateUser(userDto: UserDto) {
      return await restClient.put(`/membership/users/${userDto.id}`, userDto)
    },

    async activateUser(userId: string) {
      return await restClient.patch(`/membership/users/${userId}/activate`)
    },

    async deactivateUser(userId: string) {
      return await restClient.delete(`/membership/users/${userId}/deactivate`)
    },
  }
}
