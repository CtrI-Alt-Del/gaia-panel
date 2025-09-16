import type { RestClient } from '@/core/interfaces'

export const MembershipService = (restClient: RestClient) => {
  return {
    async fetchUsers() {
      return await restClient.get('/users')
    },
  }
}
