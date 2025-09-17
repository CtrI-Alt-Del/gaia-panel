import { useLoaderData } from 'react-router'
import { useUsersPage } from './use-users-page'
import { UsersPageView } from './users-page-view'
import type { loader } from '@/app/routes/membership/users-route'

export const UsersPage = () => {
  const { users, nextCursor, previousCursor, pageSize, hasNextPage, hasPreviousPage } = useLoaderData<typeof loader>()
  const { isModalOpen, selectedUser, handleEdit, handleNewUser, handleCloseModal, handleUserUpdated, handleUserCreated } = useUsersPage()

  
  return (
    <UsersPageView 
      users={users} 
      nextCursor={nextCursor} 
      previousCursor={previousCursor} 
      pageSize={pageSize}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      isModalOpen={isModalOpen}
      selectedUser={selectedUser}
      onEdit={handleEdit}
      onNewUser={handleNewUser}
      onCloseModal={handleCloseModal}
      onUserUpdated={handleUserUpdated}
      onUserCreated={handleUserCreated}
    />
  )
}
