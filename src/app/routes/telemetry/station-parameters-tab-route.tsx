import { TelemetryService } from '@/rest/services'
import type { Route } from './+types/station-route'
import { AxiosRestClient } from '@/rest/axios/axios-rest-client'
import { ENV } from '@/core/global/constants'
import { StationParametersTab } from '@/ui/telemetry/widgets/components/station/station-parameters-tab'
import { useLoaderData } from 'react-router'

export const loader = async ({ params }: Route.ActionArgs) => {
  const restClient = AxiosRestClient()
  restClient.setBaseUrl(ENV.serverAppUrl)
  const service = TelemetryService(restClient)
  const response = await service.fetchParametersByStationId(params.id)
  console.log('response', response)
  return {
    parameters: response.body,
    stationId: params.id,
  }
}
export default function StationParametersRoute() {
  const { parameters, stationId } = useLoaderData<typeof loader>()

  return <StationParametersTab stationId={stationId} parameters={parameters} />
}
