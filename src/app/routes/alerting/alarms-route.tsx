import { createLoader, parseAsString, parseAsInteger } from 'nuqs/server'

import { AlarmsFaker } from '@/core/alerting/dtos/fakers/alarms-faker'
import { PaginationResponse } from '@/core/global/responses/pagination-response'
import { RestResponse } from '@/core/global/responses/rest-response'

import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { restContext } from '@/app/contexts/rest-context'
import { AlarmsPage } from '@/ui/alerting/widgets/pages/alarms'
import type { Route } from '../membership/+types/users-route'

export const searchParams = {
  level: parseAsString,
  isActive: parseAsString,
  nextCursor: parseAsString,
  previousCursor: parseAsString,
  pageSize: parseAsInteger.withDefault(10),
}

export const loadSearchParams = createLoader(searchParams)

export const middleware = [RestMiddleware]

export const loader = async ({ context }: Route.LoaderArgs) => {
  const { telemetryService } = context.get(restContext)

  const mockAlarms = AlarmsFaker.fakeMany(15)
  const mockPaginationResponse = new PaginationResponse({
    items: mockAlarms,
    pageSize: 10,
    nextCursor: 'mock-next-cursor',
    previousCursor: null,
    hasNextPage: true,
    hasPreviousPage: false,
  })

  const mockResponse = new RestResponse({
    body: mockPaginationResponse,
  })

  return {
    alarms: mockResponse.body.items,
    nextCursor: mockResponse.body.nextCursor,
    previousCursor: mockResponse.body.previousCursor,
    pageSize: mockResponse.body.pageSize,
    hasNextPage: mockResponse.body.hasNextPage,
    hasPreviousPage: mockResponse.body.hasPreviousPage,
    telemetryService,
  }
}

export default AlarmsPage
