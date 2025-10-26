import { useLoaderData } from 'react-router'
import { ParametersSelectView } from './parameters-select-view'
import type { loader } from '@/app/routes/telemetry/station-measurements-route'

export const ParametersSelect = () => {
  const { parameters, parameterId } = useLoaderData<typeof loader>()

  return (
    <ParametersSelectView
      parameters={parameters}
      defaultValue={parameterId ?? undefined}
    />
  )
}
