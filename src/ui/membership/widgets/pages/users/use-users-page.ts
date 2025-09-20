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

  return {
    selectedUser,
    handleEdit,
  }
}
