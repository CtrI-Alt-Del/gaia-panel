import { useLoaderData } from 'react-router'
import { UserInfoView } from './user-info-view'
import type { loader } from '@/app/layouts/app-layout'

export const UserInfo = () => {
  const { user } = useLoaderData<typeof loader>()
  if (user) return <UserInfoView name={user.name} email={user.email} />
}
