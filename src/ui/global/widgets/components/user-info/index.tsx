import { useLoaderData } from 'react-router'
import { UserInfoView } from './user-info-view'
import type { loader } from '@/app/layouts/app-layout'
import { VisitorInfoView } from './visitor-info-view'

export const UserInfo = () => {
  const { user, isVisitor } = useLoaderData<typeof loader>()

  if (isVisitor) {
    return <VisitorInfoView isVisitor={isVisitor} />
  }

  if (user) {
    return <UserInfoView name={user.name} email={user.email} />
  }
}
