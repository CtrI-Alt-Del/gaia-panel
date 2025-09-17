import { useState } from 'react'
import type { UserDto } from '@/core/membership/dtos/user-dto'
import type { UserFormData } from './user-form'

const mockUsers: UserDto[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    isActive: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    isActive: true,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@email.com',
    isActive: false,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    isActive: true,
    createdAt: new Date('2024-02-10'),
  },
  {
    id: '5',
    name: 'Carlos Ferreira',
    email: 'carlos.ferreira@email.com',
    isActive: true,
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '6',
    name: 'Lucia Almeida',
    email: 'lucia.almeida@email.com',
    isActive: false,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '7',
    name: 'Roberto Lima',
    email: 'roberto.lima@email.com',
    isActive: true,
    createdAt: new Date('2024-03-01'),
  },
  {
    id: '8',
    name: 'Fernanda Rocha',
    email: 'fernanda.rocha@email.com',
    isActive: true,
    createdAt: new Date('2024-03-05'),
  },
]

export function useUsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserDto | undefined>(undefined)

  function handleEdit(id: string) {
    const user = mockUsers.find((u) => u.id === id)
    if (user) {
      setSelectedUser(user)
      setIsModalOpen(true)
    }
  }

  function handleNewUser() {
    setSelectedUser(undefined)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setSelectedUser(undefined)
  }

  function handleUserUpdated(updatedUser: UserDto) {
    console.log('Usuário atualizado:', updatedUser)
  }

  function handleUserCreated(userData: UserFormData) {
    console.log('Novo usuário criado:', userData)
  }

  return {
    isModalOpen,
    selectedUser,
    handleEdit,
    handleNewUser,
    handleCloseModal,
    handleUserUpdated,
    handleUserCreated,
  }
}
