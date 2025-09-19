import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useParameterIcon } from './use-parameter-icon'
import { parameterFormSchema, type ParameterFormData } from './parameter-form-schema'

type UseParameterFormProps = {
  onSuccess?: (data: ParameterFormData) => void
  onCancel: () => void
}

export function useParameterForm({ onSuccess, onCancel }: UseParameterFormProps) {
  const form = useForm<ParameterFormData>({
    resolver: zodResolver(parameterFormSchema),
    defaultValues: {
      name: '',
      unitOfMeasure: '',
      factor: 1.0,
      offset: 0.0,
      isActive: true,
    },
  })

  const { formState } = form
  const isSubmitting = formState.isSubmitting
  const isValid = formState.isValid

  const watchedUnit = form.watch('unitOfMeasure')
  const { iconInfo: selectedIcon } = useParameterIcon(watchedUnit || '')

  async function handleSubmit(data: ParameterFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Parâmetro salvo com sucesso!')

      form.reset()

      onSuccess?.(data)
    } catch (error) {
      console.error('Erro ao salvar parâmetro:', error)
      toast.error('Erro inesperado ao salvar parâmetro')
    }
  }

  function handleCancel() {
    form.reset()
    onCancel()
  }

  return {
    form,
    selectedIcon,
    handleSubmit,
    handleCancel,
    isSubmitting,
    isValid,
  }
}
