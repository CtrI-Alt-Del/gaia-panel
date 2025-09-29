import type { TelemetryService } from '@/core/telemetry/interfaces'
import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'
import { useCache } from '@/ui/global/hooks/use-cache'

type Params = {
  telemetryService: TelemetryService
  station: StationDto
  onSelectParameter: (parameter: ParameterDto) => void
}

export function useStationParameters({
  telemetryService,
  station,
  onSelectParameter,
}: Params) {
  const { data, isLoading } = useCache({
    key: `station-parameters-${station.id}`,
    fetcher: () => telemetryService.fetchParametersByStationId(station.id as string),
    dependencies: [station.id],
  })

  const parameters = data || []

  function handleParameterSelect(parameter: ParameterDto) {
    onSelectParameter(parameter)
  }

  return {
    parameters,
    isLoading,
    handleParameterSelect,
  }
}
