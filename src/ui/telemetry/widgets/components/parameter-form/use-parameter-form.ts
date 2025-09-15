import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRevalidator } from 'react-router'
import { toast } from 'sonner'
import { useParameterIcon } from './use-parameter-icon'
import { TelemetryService } from '@/rest/services/telemetry-service'
import type { ParameterDto } from '@/core/dtos/parameter-dto'

const parameterSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  unit: z.string().min(1, 'Unidade é obrigatória'),
  factor: z
    .number("Fator deve ser um número")
    .min(0.001, 'Fator deve ser maior que 0')
    .max(1000, 'Fator deve ser menor que 1000'),
  offset: z
    .number("Offset deve ser um número")
    .min(-1000, 'OffsetInvalid input: deve ser maior que -1000')
    .max(1000, 'Offset deve ser menor que 1000'),
  active: z.boolean(),
})

export type ParameterFormData = z.infer<typeof parameterSchema>

type UseParameterFormProps = {
  parameter?: ParameterDto
  onUpdated?: (parameter: ParameterDto) => void
  onCancel: () => void
}

export function useParameterForm({
  parameter,
  onUpdated,
  onCancel,
}: UseParameterFormProps) {
  const revalidator = useRevalidator()
  const isEditMode = !!parameter

  const form = useForm<ParameterFormData>({
    resolver: zodResolver(parameterSchema),
    defaultValues: {
      name: parameter?.name || '',
      unit: parameter?.unitOfMeasure || '',
      factor: parameter?.factor || 1,
      offset: parameter?.offset || 0,
      active: parameter?.isActive ?? true,
    },
  })

  const watchedUnit = form.watch('unit')
  const { iconInfo: selectedIcon } = useParameterIcon(watchedUnit || '')

  async function handleSubmit(data: ParameterFormData) {
    try {
      let response: any

      if (isEditMode && parameter?.id) {
        response = await TelemetryService.updateParameter(parameter.id, {
          name: data.name,
          unitOfMeasure: data.unit,
          factor: data.factor,
          offset: data.offset,
          isActive: data.active,
        })
      } else {
        response = await TelemetryService.createParameter({
          name: data.name,
          unitOfMeasure: data.unit,
          factor: data.factor,
          offset: data.offset,
          isActive: data.active,
        })
      }

      if (response.isFailure) {
        toast.error(response.errorMessage)
        return
      }

      const savedParameter = response.body
      toast.success(isEditMode ? 'Parâmetro atualizado!' : 'Parâmetro criado!')

      revalidator.revalidate()

      onUpdated?.(savedParameter)

      onCancel()
    } catch (error) {
      console.error('Erro ao salvar parâmetro:', error)
      toast.error('Erro inesperado ao salvar parâmetro')
    }
  }

  return {
    form,
    selectedIcon,
    handleSubmit,
    isEditMode,
  }
}
