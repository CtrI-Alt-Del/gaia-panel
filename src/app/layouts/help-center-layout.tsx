import { Outlet } from 'react-router'
import { HelpCenterSidebar } from '@/ui/help-center/widgets/layouts/help-center-sidebar'

export default function HelpCenterLayout() {
  return (
    <div className="help-center-layout flex h-screen">
      <HelpCenterSidebar />
      <main className="help-center-content flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}
