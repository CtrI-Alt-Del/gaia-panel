import { AlarmFormView } from './alarm-form-view'
import { useAlarmForm } from './use-alarm-form'

type AlarmFormProps = {
  onSuccess?: () => void
  onCancel?: () => void
}

export const AlarmForm = ({ onSuccess, onCancel }: AlarmFormProps) => {
  const { form, handleSubmit, handleCancel } = useAlarmForm({
    onSuccess,
    onCancel,
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
