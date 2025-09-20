import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AlarmDto } from '@/core/alerting/dtos/alarm-dto'
import { alarmFormSchema, type AlarmFormData } from './alarm-form-schema'

type UseAlarmFormProps = {
  onSuccess?: () => void
  onCancel?: () => void
}

export function useAlarmForm({ onSuccess, onCancel }: UseAlarmFormProps = {}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AlarmFormData>({
    resolver: zodResolver(alarmFormSchema),
    defaultValues: {
      message: '',
      level: 'warning',
      operation: '>',
      threshold: '',
    },
  })

  function buildAlarmDto(data: AlarmFormData): AlarmDto {
    return {
      message: data.message.trim(),
      parameter: {
        id: 'temp-parameter-id', // TODO: Implementar seleção de parâmetro
        entity: {
          name: 'temp-entity', // TODO: Implementar seleção de entidade
          unitOfMeasure: 'temp-unit', // TODO: Implementar seleção de unidade
        },
      },
      rule: {
        threshold: BigInt(Math.round(parseFloat(data.threshold) * 100)), // Convert to cents for precision
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

      // TODO: Implementar criação de alarme via RPC
      // await createAlarmAction(alarmDto)

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      reset()
      onSuccess?.()
    } catch (error) {
      console.error('Erro ao criar alarme:', error)
    }
  }

  function handleCancel() {
    reset()
    onCancel?.()
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    handleCancel,
    errors,
    isSubmitting,
  }
}
