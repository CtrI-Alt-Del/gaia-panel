import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { ParameterDto } from '@/core/dtos/telemetry/parameter-dto'
import type { UiProvider } from '@/core/global/interfaces/ui-provider'
import type { ToastProvider } from '@/core/global/interfaces/toast-provider'
import { parameterSchema } from '@/validation/telemetry/parameter-schema'

type Props = {
  onSuccess?: () => void
  onCancel: () => void
  parameterDto?: ParameterDto
  uiProvider: UiProvider
  toastProvider: ToastProvider
}

export function useParameterForm({
  onSuccess,
  onCancel,
  parameterDto,
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

    // TODO: Implementar updateParameter/createParameter quando o serviço estiver disponível
    console.log(isEdition ? 'Atualizando parâmetro:' : 'Criando parâmetro:', data)

    // Simulando resposta de sucesso por enquanto
    const response = { isSuccessful: true, isFailure: false } as any

    if (response.isFailure) {
      toastProvider.showError('Erro ao salvar parâmetro')
    }

    if (response.isSuccessful) {
      toastProvider.showSuccess(
        isEdition ? 'Parâmetro atualizado com sucesso!' : 'Parâmetro criado com sucesso!',
      )
      await uiProvider.reload()
      onSuccess?.()
    }
  }

  return {
    form,
    isValid,
    handleCancel,
    handleSubmit: form.handleSubmit(handleSubmit),
  }
}
