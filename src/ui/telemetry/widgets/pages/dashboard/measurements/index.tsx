import { useLoaderData } from 'react-router'
import type { loader } from '@/app/routes/telemetry/dashboard-route'
import { MeasurementsView } from './measurements-view'
import { useUiProvider } from '@/ui/global/hooks'

export const Measurements = () => {
  const { measurements } = useLoaderData<typeof loader>()
  const { isLoading } = useUiProvider()

  return <MeasurementsView measurements={measurements} isLoading={isLoading} />
}

export default Measurements
