import type { UserDto } from '@/core/membership/dtos/user-dto'
import { Button } from '@/ui/shadcn/components/button'
import { StatusPill } from '@/ui/shadcn/components/status-pill'
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from '@/ui/shadcn/components/table'
import { Power, Edit, Plus } from 'lucide-react'
import { UserAvatar } from '@/ui/global/widgets/components/user-avatar'
import { PageSizeSelect } from '@/ui/global/widgets/components/page-size-select'
import { StatusSelect } from '@/ui/global/widgets/components/status-select'
import { PaginationControl } from '@/ui/global/widgets/components/pagination-control'
import { UserNameSearchInput } from './user-name-search-input'
import { UserFormModal } from './user-form'
import type { UserFormData } from './user-form'

export type UsersPageViewProps = {
  users: UserDto[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  isModalOpen: boolean
  selectedUser?: UserDto
  onEdit?: (id: string) => void
  onToggleisActive?: (id: string) => void
  onNewUser?: () => void
  onCloseModal?: () => void
  onUserUpdated?: (user: UserDto) => void
  onUserCreated?: (user: UserFormData) => void
}

export const UsersPageView = ({
  users,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  isModalOpen,
  selectedUser,
  onEdit,
  onToggleisActive,
  onNewUser,
  onCloseModal,
  onUserCreated,
}: UsersPageViewProps) => {
  return (
    <section className='container mx-auto px-4 py-2'>
      <header className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <h1 className='text-xl font-semibold'>Usuários</h1>
        </div>
      </header>

      <div className='mb-6'>
        <div className='w-full'>
          <div className='rounded-lg border border-gray-200 bg-white p-4'>
            <form method='get' className='flex flex-wrap items-end gap-2'>
              <UserNameSearchInput label='Filtrar por nome' />
              <StatusSelect />
              <PageSizeSelect />
              <Button type='submit' className='h-9'>
                Aplicar
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className='rounded-lg border border-stone-200'>
        <div className='flex items-center justify-between p-4 border-b border-stone-200'>
          <h2 className='text-lg font-medium'>Usuários</h2>
          {onNewUser && (
            <Button onClick={onNewUser} className='flex items-center gap-2 h-9'>
              <Plus className='w-4 h-4' />
              Novo Usuário
            </Button>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead className='text-center'>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className='text-center text-stone-500 py-10'>
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            )}

            {users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <UserAvatar name={user.name} size='md' />
                      <div className='leading-tight'>
                        <div className='font-medium'>{user.name}</div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className='text-sm text-stone-700'>{user.email}</div>
                  </TableCell>

                  <TableCell>
                    <StatusPill
                      active={user.isActive || false}
                      activeText='Ativo'
                      inactiveText='Inativo'
                    />
                  </TableCell>

                  <TableCell className='text-sm text-stone-600'>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('pt-BR')
                      : '-'}
                  </TableCell>

                  <TableCell className='text-right'>
                    <div className='flex gap-2 justify-center'>
                      {onEdit && (
                        <button
                          type='button'
                          onClick={() => onEdit(user.id || '')}
                          className='inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 border border-gray-200'
                          title='Editar usuário'
                        >
                          <Edit className='w-4 h-4' />
                        </button>
                      )}
                      {onToggleisActive && (
                        <button
                          type='button'
                          onClick={() => onToggleisActive(user.id || '')}
                          className={`inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
                            user.isActive
                              ? 'bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 border border-red-200'
                              : 'bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 border border-green-200'
                          }`}
                          title={user.isActive ? 'Desativar usuário' : 'Ativar usuário'}
                        >
                          <Power className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <PaginationControl
                  previousCursor={previousCursor}
                  nextCursor={nextCursor}
                  hasNextPage={hasNextPage}
                  hasPreviousPage={hasPreviousPage}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {!selectedUser && (
        <UserFormModal
          isOpen={isModalOpen}
          onClose={onCloseModal || (() => {})}
          onSuccess={(data) => {
            onUserCreated?.(data)
          }}
          title='Novo Usuário'
          description='Preencha os dados para criar um novo usuário'
        />
      )}

      {selectedUser && isModalOpen && onCloseModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4'>
            <h3 className='text-lg font-semibold mb-4'>Editar Usuário</h3>
            <p className='text-sm text-stone-600 mb-4'>
              Edição de usuário será implementada futuramente.
            </p>
            <div className='flex gap-2 justify-end'>
              <Button variant='outline' onClick={onCloseModal}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
