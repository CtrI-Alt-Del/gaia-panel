import { useLoaderData } from 'react-router'
import { useUsersPage } from './use-users-page'
import { UsersPageView } from './users-page-view'
import type { loader } from '@/app/routes/membership/users-route'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'

export const UsersPage = () => {
  const {
    users,
    nextCursor,
    previousCursor,
    hasNextPage,
    hasPreviousPage,
    membershipService,
  } = useLoaderData<typeof loader>()
  const { selectedUser, handleEdit, handleCloseModal, handleUserUpdated } = useUsersPage({
    users,
  })

  const { isLoading } = useUiProvider()

  return (
    <UsersPageView
      users={users}
      nextCursor={nextCursor}
      previousCursor={previousCursor}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      isLoading={isLoading}
      onEdit={handleEdit}
      onCloseModal={handleCloseModal}
      onUserUpdated={handleUserUpdated}
      selectedUser={selectedUser}
      membershipService={membershipService}
    />
  )
}
