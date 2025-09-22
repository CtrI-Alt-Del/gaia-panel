import { AlarmFormView } from './alarm-form-view'
import { useAlarmForm } from './use-alarm-form'

type AlarmFormProps = {
  onSuccess?: () => void
  onCancel?: () => void
}

export const AlarmForm = ({ onSuccess, onCancel }: AlarmFormProps) => {
  const { register, handleSubmit, handleCancel, errors, isSubmitting } = useAlarmForm({
    onSuccess,
    onCancel,
  })

  return (
    <AlarmFormView
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  )
}
