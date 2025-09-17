import { Outlet } from 'react-router'

import { DashboardLayout } from '@/ui/global/widgets/layouts'

export default function AppLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}
