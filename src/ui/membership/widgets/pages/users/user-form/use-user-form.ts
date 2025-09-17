import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { userFormSchema, type UserFormData } from './user-form-schema'

type UseUserFormProps = {
  onSuccess?: (data: UserFormData) => void
  onCancel: () => void
}

export function useUserForm({ onSuccess, onCancel }: UseUserFormProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const { formState } = form
  const isSubmitting = formState.isSubmitting
  const isValid = formState.isValid

  async function handleSubmit(data: UserFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Usuário salvo com sucesso!')

      form.reset()

      onSuccess?.(data)
    } catch (error) {
      console.error('Erro ao salvar usuário:', error)
      toast.error('Erro inesperado ao salvar usuário')
    }
  }

  function handleCancel() {
    form.reset()
    onCancel()
  }

  return {
    form,
    handleSubmit,
    handleCancel,
    isSubmitting,
    isValid,
  }
}
