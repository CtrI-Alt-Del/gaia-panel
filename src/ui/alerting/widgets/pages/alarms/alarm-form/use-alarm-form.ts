import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AlarmDto } from '@/core/alerting/dtos/alarm-dto'
import { alarmFormSchema, type AlarmFormData } from './alarm-form-schema'
import type { AlertingService } from '@/core/alerting/interfaces/alerting-service'
import type { ToastProvider, UiProvider } from '@/core/global/interfaces'

type UseAlarmFormProps = {
  onSuccess?: () => void
  onCancel?: () => void
  uiProvider: UiProvider
  toastProvider: ToastProvider
  alertingService: AlertingService
}

export function useAlarmForm({ onSuccess, onCancel, alertingService, uiProvider, toastProvider }: UseAlarmFormProps) {
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
      parameter:{
        id:data.parameterId
      },
      rule: {
        threshold: Number(data.threshold).valueOf(),
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
      
      const response = await alertingService.createAlarm(alarmDto)

      if (response.isFailure) {
        toastProvider.showError(response.errorMessage)
      }

      if (response.isSuccessful) {
        toastProvider.showSuccess( 'Alerta criado com sucesso!',)
        await uiProvider.reload()
        onSuccess?.()
      }

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
