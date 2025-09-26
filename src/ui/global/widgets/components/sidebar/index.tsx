import { useLoaderData, useLocation } from 'react-router'

import { SidebarView } from './sidebar-view'
import type { loader } from '@/app/layouts/app-layout'

export const Sidebar = () => {
  const { user } = useLoaderData<typeof loader>()
  const location = useLocation()
  const currentPath = location.pathname
  const isUserOwner = user?.role === 'owner'

  return <SidebarView currentPath={currentPath} isUserOwner={isUserOwner} />
}
