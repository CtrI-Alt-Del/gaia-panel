import { useLocation } from 'react-router'
import { SidebarView } from './sidebar-view'

export const Sidebar = () => {
  const location = useLocation()
  const currentPath = location.pathname
  return <SidebarView currentPath={currentPath} />
}
