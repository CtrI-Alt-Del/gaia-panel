import { ParameterFormView } from './parameter-form-view'
import { useRest } from '@/ui/global/hooks/use-rest'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'
import { useToastProvider } from '@/ui/global/hooks'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'

type ParameterFormProps = {
  onSuccess?: () => void
  onCancel: () => void
  parameterDto?: ParameterDto
}

export const ParameterForm = ({
  onSuccess,
  onCancel,
  parameterDto,
}: ParameterFormProps) => {
  const { telemetryService } = useRest()
  const uiProvider = useUiProvider()
  const toastProvider = useToastProvider()

  return (
    <ParameterFormView
      telemetryService={telemetryService}
      uiProvider={uiProvider}
      toastProvider={toastProvider}
      onSuccess={onSuccess}
      onCancel={onCancel}
      parameterDto={parameterDto}
    />
  )
}
