import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/ui/shadcn/components/dialog'
import { UserFormView } from './user-form-view'
import type { UserFormData } from './user-form-schema'

type Props = {
  isOpen: boolean
  title?: string
  description?: string
  onClose: () => void
  onSuccess?: (data: UserFormData) => void
}

export const UserFormModal = ({
  isOpen,
  onClose,
  onSuccess,
  title = 'Novo Usuário',
  description = 'Preencha os dados para criar um novo usuário',
}: Props) => {
  function handleSuccess(data: UserFormData) {
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

        <UserFormView onSuccess={handleSuccess} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  )
}
