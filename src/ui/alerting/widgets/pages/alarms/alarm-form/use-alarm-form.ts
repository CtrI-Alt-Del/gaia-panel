import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { alarmFormSchema, type AlarmFormData } from './alarm-form-schema'
import type { AlertingService } from '@/core/alerting/interfaces/alerting-service'
import type { ToastProvider, UiProvider } from '@/core/global/interfaces'
import type { AlarmDto } from '@/core/alerting/dtos'

type UseAlarmFormProps = {
  alarmDto?: AlarmDto
  onSuccess?: () => void
  onCancel?: () => void
  uiProvider: UiProvider
  toastProvider: ToastProvider
  alertingService: AlertingService
}

export function useAlarmForm({
  alarmDto,
  onSuccess,
  onCancel,
  alertingService,
  uiProvider,
  toastProvider,
}: UseAlarmFormProps) {
  const isEditing = Boolean(alarmDto?.id)

  function getDefaultValues(): Partial<AlarmFormData> {
    if (alarmDto) {
      return {
        parameterId: alarmDto.parameter.id,
        message: alarmDto.message,
        level: alarmDto.level,
        operation: alarmDto.rule.operation,
        threshold: alarmDto.rule.threshold.toString(),
      }
    }

    return {
      parameterId: '',
      message: '',
      threshold: '',
    }
  }

  const form = useForm<AlarmFormData>({
    resolver: zodResolver(alarmFormSchema),
    defaultValues: getDefaultValues(),
  })

  function buildAlarmDto(data: AlarmFormData) {
    const dto = {
      message: data.message.trim(),
      parameter: {
        id: data.parameterId,
      },
      rule: {
        threshold: Number(data.threshold).valueOf(),
        operation: data.operation,
      },
      level: data.level,
      isActive: true,
    }

    if (isEditing && alarmDto?.id) {
      return {
        ...dto,
        id: alarmDto.id,
      }
    }

    return dto
  }

  async function onSubmit(data: AlarmFormData) {
    try {
      const dto = buildAlarmDto(data)

      // Por enquanto, só temos createAlarm no serviço
      // TODO: Implementar updateAlarm quando disponível
      const response = await alertingService.createAlarm(dto)

      if (response.isFailure) {
        toastProvider.showError(response.errorMessage)
        return
      }

      if (response.isSuccessful) {
        const successMessage = isEditing
          ? 'Alerta atualizado com sucesso!'
          : 'Alerta criado com sucesso!'

        toastProvider.showSuccess(successMessage)
        await uiProvider.reload()
        form.reset()
        onSuccess?.()
      }
    } catch (error) {
      const errorMessage = isEditing
        ? 'Erro ao atualizar alarme:'
        : 'Erro ao criar alarme:'

      console.error(errorMessage, error)
      toastProvider.showError('Ocorreu um erro inesperado')
    }
  }

  function handleCancel() {
    form.reset()
    onCancel?.()
  }

  return {
    form,
    isEditing,
    handleSubmit: form.handleSubmit(onSubmit),
    handleCancel,
  }
}
