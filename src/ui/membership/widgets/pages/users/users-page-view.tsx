import { Form } from 'react-router'

import type { UserDto } from '@/core/membership/dtos/user-dto'
import { Button } from '@/ui/shadcn/components/button'
import { Plus } from 'lucide-react'
import { PageSizeSelect } from '@/ui/global/widgets/components/page-size-select'
import { StatusSelect } from '@/ui/global/widgets/components/status-select'
import { UserNameSearchInput } from './user-name-search-input'
import { UserForm } from './user-form'
import { Dialog } from '@/ui/global/widgets/components/dialog'
import { UsersTable } from './users-table'

export type UsersPageViewProps = {
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

export const UsersPageView = ({
  users,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  selectedUser,
  onEdit,
  onCloseModal,
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
            <Form
              preventScrollReset
              method='get'
              className='flex flex-wrap items-end gap-2'
            >
              <UserNameSearchInput label='Filtrar por nome' />
              <StatusSelect />
              <PageSizeSelect />
              <Button type='submit' className='h-9'>
                Aplicar
              </Button>
            </Form>
          </div>
        </div>
      </div>

      <div className='rounded-lg border border-stone-200'>
        <div className='flex items-center justify-between p-4 border-b border-stone-200'>
          <h2 className='text-lg font-medium'>Usuários</h2>
          <Dialog
            onClose={onCloseModal || (() => {})}
            title='Novo Usuário'
            description='Preencha os dados para criar um novo usuário'
            size='md'
            trigger={
              <Button className='flex items-center gap-2 h-9'>
                <Plus className='w-4 h-4' />
                Novo Usuário
              </Button>
            }
          >
            {(closeDialog) => <UserForm onSuccess={closeDialog} onCancel={closeDialog} />}
          </Dialog>
        </div>

        <UsersTable
          users={users}
          nextCursor={nextCursor}
          previousCursor={previousCursor}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          isLoading={isLoading}
          selectedUser={selectedUser}
          onEdit={onEdit}
          onCloseModal={onCloseModal}
        />
      </div>
    </section>
  )
}
