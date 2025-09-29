import { useRest } from '@/ui/global/hooks/use-rest'
import { AlarmFormView } from './alarm-form-view'
import { useAlarmForm } from './use-alarm-form'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'
import { useToastProvider } from '@/ui/global/hooks'
import type { AlarmDto } from '@/core/alerting/dtos'

type AlarmFormProps = {
  onSuccess?: () => void
  onCancel?: () => void
  alarmDto?: AlarmDto
}

export const AlarmForm = ({ onSuccess, onCancel, alarmDto }: AlarmFormProps) => {
  const {alertingService} = useRest()
  const uiProvider = useUiProvider()
  const toastProvider = useToastProvider()

  const { form, handleSubmit, handleCancel } = useAlarmForm({
    onSuccess,
    onCancel,
    alertingService,
    uiProvider,
    toastProvider,
    alarmDto
  })

  return (
    <AlarmFormView
      form={form}
      isSubmitting={form.formState.isSubmitting}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  )
}
