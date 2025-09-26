import { createLoader, parseAsString, parseAsInteger } from 'nuqs/server'

import type { Route } from './+types/parameters-route'
import { ParametersPage } from '@/ui/telemetry/widgets/pages/parameters'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { restContext } from '@/app/contexts/rest-context'
import { ApiErrorHandler } from '@/app/utils/error-handler'

export const searchParams = {
  name: parseAsString,
  unitOfMeasure: parseAsString,
  isActive: parseAsString.withDefault('all'),
  nextCursor: parseAsString,
  previousCursor: parseAsString,
  pageSize: parseAsInteger.withDefault(10),
}

export const loadSearchParams = createLoader(searchParams)

export const middleware = [RestMiddleware]

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const { telemetryService } = context.get(restContext)
  const { nextCursor, previousCursor, pageSize, name, unitOfMeasure, isActive } =
    loadSearchParams(request)

  const service = telemetryService

  // Converter o valor de string para boolean ou undefined
  let isActiveBoolean: boolean | undefined
  if (isActive === 'active') {
    isActiveBoolean = true
  } else if (isActive === 'inactive') {
    isActiveBoolean = false
  } else {
    isActiveBoolean = undefined // 'all' ou qualquer outro valor
  }

  const response = await service.fetchParameters({
    nextCursor,
    previousCursor,
    pageSize: Number(pageSize),
    name: name ?? undefined,
    unitOfMeasure: unitOfMeasure ?? undefined,
    isActive: isActiveBoolean,
  })

  // Usar o handler de erro para verificar e tratar falhas
  const data = ApiErrorHandler.ensureSuccess(response, 'buscar parâmetros')

  return {
    parameters: data.items,
    nextCursor: data.nextCursor,
    previousCursor: data.previousCursor,
    pageSize: data.pageSize,
    hasNextPage: data.hasNextPage,
    hasPreviousPage: data.hasPreviousPage,
    telemetryService,
  }
}

export default ParametersPage
