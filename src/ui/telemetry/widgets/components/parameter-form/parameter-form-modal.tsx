import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/ui/shadcn/components/dialog'
import { ParameterFormView } from './parameter-form-view'
import type { ParameterFormData } from './parameter-form-schema'

type Props = {
  isOpen: boolean
  title?: string
  description?: string
  onClose: () => void
  onSuccess?: (data: ParameterFormData) => void
}

export const ParameterFormModal = ({
  isOpen,
  onClose,
  onSuccess,
  title = 'Novo Parâmetro',
  description = 'Preencha os dados para criar um novo parâmetro',
}: Props) => {
  function handleSuccess(data: ParameterFormData) {
    onSuccess?.(data)
    onClose()
  }

  function handleCancel() {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <ParameterFormView onSuccess={handleSuccess} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  )
}
