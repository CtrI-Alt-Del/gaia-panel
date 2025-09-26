import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'
import type { TelemetryService } from '@/core/telemetry/interfaces'
import type { UiProvider } from '@/core/global/interfaces/ui-provider'
import type { ToastProvider } from '@/core/global/interfaces/toast-provider'
import { parameterSchema } from '@/validation/telemetry/parameter-schema'

type Props = {
  onSuccess?: () => void
  onCancel: () => void
  parameterDto?: ParameterDto
  telemetryService: TelemetryService
  uiProvider: UiProvider
  toastProvider: ToastProvider
}

export function useParameterForm({
  onSuccess,
  onCancel,
  parameterDto,
  telemetryService,
  uiProvider,
  toastProvider,
}: Props) {
  const form = useForm({
    resolver: zodResolver(parameterSchema),
    defaultValues: {
      name: parameterDto?.name || '',
      unitOfMeasure: parameterDto?.unitOfMeasure || '',
      factor: parameterDto?.factor || 1.0,
      offset: parameterDto?.offset || 0.0,
      isActive: parameterDto?.isActive ?? true,
    },
    mode: 'onSubmit',
  })

  const { formState } = form
  const isValid = formState.isValid

  function handleCancel() {
    onCancel()
  }

  async function handleSubmit(data: {
    name: string
    unitOfMeasure: string
    factor: number
    offset: number
    isActive: boolean
  }) {
    const isEdition = Boolean(parameterDto?.id)

    try {
      const response = isEdition
        ? await telemetryService.updateParameter({
            ...data,
            id: parameterDto?.id || '',
          })
        : await telemetryService.createParameter(data)

      if (response.isFailure) {
        toastProvider.showError('Erro ao salvar parâmetro')
        return
      }

      if (response.isSuccessful) {
        toastProvider.showSuccess(
          isEdition
            ? 'Parâmetro atualizado com sucesso!'
            : 'Parâmetro criado com sucesso!',
        )
        await uiProvider.reload()
        onSuccess?.()
      }
    } catch (error) {
      console.error('Erro ao salvar parâmetro:', error)
      toastProvider.showError('Erro ao salvar parâmetro')
    }
  }

  return {
    form,
    isValid,
    handleCancel,
    handleSubmit: form.handleSubmit(handleSubmit),
  }
}
