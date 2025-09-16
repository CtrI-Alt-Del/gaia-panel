import { UsersPageView } from './users-page-view'
import { useUsersPage } from './use-users-page'

export const UsersPage = () => {
  const usersData = useUsersPage()

  return <UsersPageView {...usersData} />
}
