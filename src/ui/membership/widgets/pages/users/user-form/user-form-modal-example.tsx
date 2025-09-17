import { useState } from 'react'
import { Button } from '@/ui/shadcn/components/button'
import { UserFormModal } from './user-form-modal'
import type { UserFormData } from './user-form-schema'

/**
 * Exemplo de uso do UserFormModal
 * Este arquivo demonstra como usar o modal de formulário de usuário
 */
export const UserFormModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  function handleUserCreated(data: UserFormData) {
    console.log('Usuário criado com sucesso:', data)
    // Aqui você pode implementar a lógica de redirecionamento
    // ou outras ações após o sucesso
  }

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-6'>Exemplo de Modal de Usuário</h2>

      <Button onClick={handleOpenModal}>Abrir Modal de Novo Usuário</Button>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleUserCreated}
        title='Criar Novo Usuário'
        description='Preencha os dados abaixo para criar um novo usuário no sistema'
      />
    </div>
  )
}
