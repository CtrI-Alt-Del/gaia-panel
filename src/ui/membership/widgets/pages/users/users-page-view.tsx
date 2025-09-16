import { Link, Form } from 'react-router'
import type { UserDto } from '@/core/dtos/user-dto'
import { Input } from '@/ui/shadcn/components/input'
import { Button } from '@/ui/shadcn/components/button'
import { StatusPill } from '@/ui/shadcn/components/status-pill'
import { useUsersFilters } from './use-users-filters'
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

export type UsersPageViewProps = {
  items: UserDto[]
  nextCursor: string | null
  prevCursor: string | null
  limit: number
  q: string
  isActive?: string
  searchParams: URLSearchParams
  isModalOpen: boolean
  selectedUser?: UserDto
  onEdit?: (id: string) => void
  onToggleisActive?: (id: string) => void
  onNewUser?: () => void
  onCloseModal?: () => void
  onUserUpdated?: (user: UserDto) => void
}

// ‼️‼️‼️‼️ ESSA PAGINA ESTA MOCKADA APENAS POR DEMONSTRAÇÃO, NADA DISSO VAI ESTAR AQUI.

const urlWith = (params: Record<string, string>) => {
  const searchParams = new URLSearchParams(window.location.search)
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value)
    } else {
      searchParams.delete(key)
    }
  })
  return `?${searchParams.toString()}`
}

export const UsersPageView = ({
  items,
  nextCursor,
  prevCursor,
  limit,
  q,
  isActive,
  isModalOpen,
  selectedUser,
  onEdit,
  onToggleisActive,
  onNewUser,
  onCloseModal,
}: UsersPageViewProps) => {
  const { register, errors } = useUsersFilters({
    initialValues: {
      q,
      isActive: isActive || 'all',
      limit,
    },
  })

  return (
    <section className='container mx-auto px-4 py-2'>
      <header className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <h1 className='text-xl font-semibold'>Usuários</h1>
          <p className='text-sm text-stone-600'>Filtros por nome, email e status</p>
        </div>
      </header>

      <div className='mb-6'>
        <div className='w-full'>
          <div className='rounded-lg border border-gray-200 bg-white p-4'>
            <Form method='get' replace className='flex flex-wrap items-end gap-2'>
              <div className='flex flex-col'>
                <label htmlFor='q' className='text-xs text-stone-600'>
                  Filtrar por nome
                </label>
                <Input
                  id='q'
                  {...register('q')}
                  placeholder='Ex.: João Silva ou joao@email.com'
                  className='h-9 w-64'
                />
                {errors.q && <p className='text-xs text-red-500'>{errors.q.message}</p>}
              </div>
              <div className='flex flex-col'>
                <label htmlFor='isActive' className='text-xs text-stone-600'>
                  Status
                </label>
                <select
                  id='isActive'
                  {...register('isActive')}
                  className='h-9 rounded-md border border-stone-300 px-2 text-sm outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='all'>Todos</option>
                  <option value='active'>Ativos</option>
                  <option value='inactive'>Inativos</option>
                </select>
                {errors.isActive && (
                  <p className='text-xs text-red-500'>{errors.isActive.message}</p>
                )}
              </div>
              <div className='flex flex-col'>
                <label htmlFor='limit' className='text-xs text-stone-600'>
                  Itens por página
                </label>
                <select
                  id='limit'
                  {...register('limit', { valueAsNumber: true })}
                  className='h-9 rounded-md border border-stone-300 px-2 text-sm outline-none focus:ring-2 focus:ring-gray-500'
                >
                  {[5, 10, 20, 50].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                {errors.limit && (
                  <p className='text-xs text-red-500'>{errors.limit.message}</p>
                )}
              </div>
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
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className='text-center text-stone-500 py-10'>
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            )}

            {items.map((user) => {
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
              <TableCell colSpan={3} className='text-xs text-stone-600'>
                Mostrando até {limit} itens • Busca: {q ? `"${q}"` : 'nenhuma'} • Status:{' '}
                {isActive === 'all'
                  ? 'todos'
                  : isActive === 'active'
                    ? 'ativos'
                    : 'inativos'}
              </TableCell>
              <TableCell colSpan={2} className='text-right'>
                <nav className='inline-flex items-center gap-2'>
                  <Link
                    to={prevCursor ? urlWith({ cursor: prevCursor }) : '#'}
                    aria-disabled={!prevCursor}
                    className={`rounded-full border px-3 py-1.5 text-sm ${
                      prevCursor ? 'hover:bg-stone-50' : 'pointer-events-none opacity-50'
                    }`}
                  >
                    Anterior
                  </Link>
                  <Link
                    to={nextCursor ? urlWith({ cursor: nextCursor }) : '#'}
                    aria-disabled={!nextCursor}
                    className={`rounded-full border px-3 py-1.5 text-sm ${
                      nextCursor ? 'hover:bg-stone-50' : 'pointer-events-none opacity-50'
                    }`}
                  >
                    Próxima
                  </Link>
                </nav>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Modal placeholder - será implementado futuramente */}
      {isModalOpen && onCloseModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4'>
            <h3 className='text-lg font-semibold mb-4'>
              {selectedUser ? 'Editar Usuário' : 'Novo Usuário'}
            </h3>
            <p className='text-sm text-stone-600 mb-4'>
              Formulário de usuário será implementado futuramente.
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
