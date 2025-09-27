import type { ParameterDto } from '@/core/telemetry/dtos'
import { useRouter } from '@/ui/global/hooks/use-router'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'
import { StationParametersTabView } from '@/ui/telemetry/widgets/components/station/station-parameters-tab/station-parameters-tab'

type Props = {
  stationId: string
  parameters:ParameterDto[]
}
export const StationParametersTab = ({ stationId,parameters }: Props) => {
  const { isLoading } = useUiProvider()
  const { goTo } = useRouter()
  return (
    <StationParametersTabView
      parameters={parameters}
      isLoading={isLoading}
      navigate={goTo}
      stationId={stationId}
    />
  )
}
