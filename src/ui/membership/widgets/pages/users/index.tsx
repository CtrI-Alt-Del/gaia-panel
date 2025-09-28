import { useLoaderData } from 'react-router'
import { useUsersPage } from './use-users-page'
import { UsersPageView } from './users-page-view'
import type { loader } from '@/app/routes/membership/users-route'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'

export const UsersPage = () => {
  const { users, user, nextCursor, previousCursor, hasNextPage, hasPreviousPage } =
    useLoaderData<typeof loader>()
  const { selectedUser, handleEdit } = useUsersPage({
    users,
  })
  const { isLoading } = useUiProvider()

  console.log('UsersPage', { user })

  return (
    <UsersPageView
      users={users}
      nextCursor={nextCursor}
      previousCursor={previousCursor}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      isLoading={isLoading}
      onEdit={handleEdit}
      selectedUser={selectedUser}
    />
  )
}
