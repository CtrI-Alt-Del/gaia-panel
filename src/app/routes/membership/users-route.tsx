import { createLoader, parseAsString, parseAsInteger } from 'nuqs/server'
import type { Route } from './+types/users'

import { AxiosRestClient } from '@/rest/axios/axios-rest-client'
import { MembershipService } from '@/rest/services/membership-service'
import { UsersPage } from '@/ui/membership/widgets/pages/users'
import { ENV } from '@/core/global/constants'


export const searchParams = {
  name: parseAsString,
  status: parseAsString,
  nextCursor: parseAsString,
  previousCursor: parseAsString,
  pageSize: parseAsInteger.withDefault(10),
}

export const loadSearchParams = createLoader(searchParams)

export const loader = async ({ request }: Route.ActionArgs) => {
  const { nextCursor, previousCursor, pageSize, name, status } = loadSearchParams(request)

  const restClient = AxiosRestClient()
  restClient.setBaseUrl(ENV.serverAppUrl)
  const service = MembershipService(restClient)
  const response = await service.fetchUsers({
    nextCursor,
    previousCursor,
    pageSize: Number(pageSize),
    name: name ?? undefined,
    status: status ?? undefined,
  })

  console.log('response', response)

  return {
    users: response.body.items,
    nextCursor: response.body.nextCursor,
    previousCursor: response.body.previousCursor,
    pageSize: response.body.pageSize,
    hasNextPage: response.body.hasNextPage,
    hasPreviousPage: response.body.hasPreviousPage,
  }
}

export default UsersPage
