import { Edit } from 'lucide-react'

import type { UserDto } from '@/core/membership/dtos/user-dto'
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
import { UserAvatar } from '@/ui/global/widgets/components/user-avatar'
import { UserTableSkeleton } from '@/ui/membership/widgets/pages/users/user-table-skeleton'
import { PaginationControl } from '@/ui/global/widgets/components/pagination-control'
import { Dialog } from '@/ui/global/widgets/components/dialog'
import { UserForm } from '../user-form'
import { UserStatusButton } from '../user-status-button'

export type UsersTableViewProps = {
  users: UserDto[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  isLoading?: boolean
  selectedUser?: UserDto
  onEdit?: (id: string) => void
  onCloseModal?: () => void
  onUserUpdated?: (user: UserDto) => void
}

export const UsersTableView = ({
  users,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  selectedUser,
  onEdit,
  onCloseModal,
}: UsersTableViewProps) => {
  return (
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
        {isLoading ? (
          Array.from({ length: 5 }, (_, index) => {
            const skeletonId = `user-skeleton-${Date.now()}-${index}`
            return <UserTableSkeleton key={skeletonId} />
          })
        ) : users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className='text-center text-stone-500 py-10'>
              Nenhum usuário encontrado.
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => {
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
                      <Dialog
                        onClose={onCloseModal || (() => {})}
                        title='Editar Usuário'
                        description='Edite as informações do usuário'
                        size='md'
                        trigger={
                          <button
                            type='button'
                            onClick={() => onEdit(String(user.id))}
                            className='inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 border border-gray-200'
                            title='Editar usuário'
                          >
                            <Edit className='w-4 h-4' />
                          </button>
                        }
                      >
                        {(closeDialog) => (
                          <UserForm
                            onSuccess={closeDialog}
                            onCancel={closeDialog}
                            userDto={selectedUser}
                          />
                        )}
                      </Dialog>
                    )}
                    <UserStatusButton
                      userId={String(user.id)}
                      isActive={user.isActive || false}
                    />
                  </div>
                </TableCell>
              </TableRow>
            )
          })
        )}
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
  )
}
