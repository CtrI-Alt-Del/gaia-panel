import { useLocation } from 'react-router'
import { useState } from 'react'
import type { UserDto } from '@/core/dtos/user-dto'

// ‼️‼️‼️‼️ ESSA PAGINA ESTA MOCKADA APENAS POR DEMONSTRAÇÃO, NADA DISSO VAI ESTAR AQUI.

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

export type UsersPageProps = {
  items: UserDto[]
  nextCursor: string | null
  prevCursor: string | null
  limit: number
  q: string
  isActive: string
}

export function useUsersPage() {
  const { search } = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserDto | undefined>(undefined)

  const searchParams = new URLSearchParams(search)
  const q = searchParams.get('q') || ''
  const isActive = searchParams.get('isActive') || 'all'
  const limit = parseInt(searchParams.get('limit') || '10')
  const cursor = searchParams.get('cursor')

  const filteredItems = mockUsers.filter((item) => {
    const matchesName =
      item.name.toLowerCase().includes(q.toLowerCase()) ||
      item.email.toLowerCase().includes(q.toLowerCase())
    const matchesisActive =
      isActive === 'all' ||
      (isActive === 'active' && item.isActive === true) ||
      (isActive === 'inactive' && item.isActive === false)
    return matchesName && matchesisActive
  })

  const startIndex = cursor ? parseInt(cursor) : 0
  const endIndex = startIndex + limit
  const items = filteredItems.slice(startIndex, endIndex)
  const nextCursor = endIndex < filteredItems.length ? String(endIndex) : null
  const prevCursor = startIndex > 0 ? String(Math.max(0, startIndex - limit)) : null

  function handleEdit(id: string) {
    const user = mockUsers.find((u) => u.id === id)
    if (user) {
      setSelectedUser(user)
      setIsModalOpen(true)
    }
  }

  function handleToggleisActive(id: string) {
    console.log('Alternar isActive do usuário:', id)
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

  return {
    items,
    nextCursor,
    prevCursor,
    limit,
    q,
    isActive,
    searchParams,
    isModalOpen,
    selectedUser,
    onEdit: handleEdit,
    onToggleisActive: handleToggleisActive,
    onNewUser: handleNewUser,
    onCloseModal: handleCloseModal,
    onUserUpdated: handleUserUpdated,
  }
}
