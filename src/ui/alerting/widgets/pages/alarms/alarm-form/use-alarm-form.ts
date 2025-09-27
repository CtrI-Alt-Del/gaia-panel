import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AlarmDto } from '@/core/alerting/dtos/alarm-dto'
import { alarmFormSchema, type AlarmFormData } from './alarm-form-schema'

type UseAlarmFormProps = {
  onSuccess?: () => void
  onCancel?: () => void
}

export function useAlarmForm({ onSuccess, onCancel }: UseAlarmFormProps = {}) {
  const form = useForm<AlarmFormData>({
    resolver: zodResolver(alarmFormSchema),
    defaultValues: {
      stationId: '',
      parameterId: '',
      message: '',
      level: undefined,
      operation: undefined,
      threshold: '',
    },
  })

  function buildAlarmDto(data: AlarmFormData) {
    console.log('Dados do formulário para DTO:', data)
    return {
      message: data.message.trim(),
      parameterId: data.parameterId,
      stationId: data.stationId,
      rule: {
        threshold: data.threshold,
        operation: data.operation,
      },
      level: data.level,
      isActive: true,
    }
  }

  async function onSubmit(data: AlarmFormData) {
    try {
      const alarmDto = buildAlarmDto(data)
      console.log('Criando alarme:', alarmDto)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      form.reset()
      onSuccess?.()
    } catch (error) {
      console.error('Erro ao criar alarme:', error)
    }
  }

  function handleCancel() {
    form.reset()
    onCancel?.()
  }

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    handleCancel,
  }
}
