import { StationParametersView } from './station-parameters-view'
import { useStationParameters } from './use-station-parameters'
import type { TelemetryService } from '@/core/telemetry/interfaces'
import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'

type StationParametersProps = {
  telemetryService: TelemetryService
  station: StationDto
  onSelectParameter: (parameter: ParameterDto) => void
}

export const StationParameters = ({
  telemetryService,
  station,
  onSelectParameter,
}: StationParametersProps) => {
  const {
    parameters,
    isLoading,
    handleParameterSelect,
  } = useStationParameters({
    telemetryService,
    station,
    onSelectParameter,
  })

  return (
    <StationParametersView
      station={station}
      parameters={parameters}
      isLoading={isLoading}
      onParameterSelect={handleParameterSelect}
    />
  )
}
