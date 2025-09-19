import { createLoader, parseAsString, parseAsInteger, parseAsBoolean } from 'nuqs/server'
import type { LoaderFunctionArgs } from 'react-router'

import { AxiosRestClient } from '@/rest/axios/axios-rest-client'
import { TelemetryService } from '@/rest/services/telemetry-service'
import { ParametersPage } from '@/ui/telemetry/widgets/pages/parameters'
import { ENV } from '@/core/global/constants'

export const searchParams = {
  name: parseAsString,
  unitOfMeasure: parseAsString,
  isActive: parseAsBoolean,
  nextCursor: parseAsString,
  previousCursor: parseAsString,
  pageSize: parseAsInteger.withDefault(10),
}

export const loadSearchParams = createLoader(searchParams)

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { nextCursor, previousCursor, pageSize, name, unitOfMeasure, isActive } =
    loadSearchParams(request)

  const restClient = AxiosRestClient()
  restClient.setBaseUrl(ENV.serverAppUrl)
  const service = TelemetryService(restClient)
  const response = await service.fetchParameters({
    nextCursor,
    previousCursor,
    pageSize: Number(pageSize),
    name: name ?? undefined,
    unitOfMeasure: unitOfMeasure ?? undefined,
    isActive: isActive ?? undefined,
  })

  console.log('response', response)

  return {
    parameters: response.body.items,
    nextCursor: response.body.nextCursor,
    previousCursor: response.body.previousCursor,
    pageSize: response.body.pageSize,
    hasNextPage: response.body.hasNextPage,
    hasPreviousPage: response.body.hasPreviousPage,
  }
}

export default ParametersPage
