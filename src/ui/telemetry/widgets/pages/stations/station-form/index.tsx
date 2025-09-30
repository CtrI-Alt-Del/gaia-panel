import { StationFormView } from './station-form-view'
import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import { useRest, useToastProvider, useUiProvider } from '@/ui/global/hooks'

type StationFormProps = {
  onSuccess: () => void
  onCancel: () => void
  stationDto?: StationDto
}

export const StationForm = (props: StationFormProps) => {
  const { telemetryService } = useRest()
  const uiProvider = useUiProvider()
  const toastProvider = useToastProvider()

  return (
    <StationFormView
      {...props}
      telemetryService={telemetryService}
      uiProvider={uiProvider}
      toastProvider={toastProvider}
    />
  )
}
