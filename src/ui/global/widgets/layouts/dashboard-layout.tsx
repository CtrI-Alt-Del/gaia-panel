import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/ui/shadcn/components/sidebar'
import Sidebar from '../components/sidebar'
import { usePageTitle } from '../../hooks/use-page-title'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pageTitle = usePageTitle()

  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <div className='h-4 w-px bg-sidebar-border' />
          <h1 className='text-lg font-semibold'>{pageTitle}</h1>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
