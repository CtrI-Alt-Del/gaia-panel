import { useState } from 'react'
import type { UserDto } from '@/core/membership/dtos/user-dto'

type UseUsersPageProps = {
  users: UserDto[]
}

export function useUsersPage({ users }: UseUsersPageProps) {
  const [selectedUser, setSelectedUser] = useState<UserDto | undefined>(undefined)

  function handleEdit(id: string) {
    const user = users.find((u) => String(u.id) === id)
    if (user) {
      setSelectedUser(user)
    }
  }

  function handleUserUpdated(updatedUser: UserDto) {
    console.log('Usuário atualizado:', updatedUser)
  }

  function handleUserCreated(userData: UserDto) {
    console.log('Novo usuário criado:', userData)
  }

  function handleCloseModal() {}

  return {
    selectedUser,
    handleEdit,
    handleCloseModal,
    handleUserUpdated,
    handleUserCreated,
  }
}
