import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/ui/shadcn/components/sidebar'
import { Sidebar } from '../components/sidebar'
import { usePageTitle } from '../../hooks/use-page-title'
import { PageBackgroundView } from '../components/page-background/page-background-view'
import { AlertsPopover } from './alerts-popover'

const queryClient = new QueryClient()

export const DashboardLayoutView = ({ children }: { children: React.ReactNode }) => {
  const pageTitle = usePageTitle()

  return (
    <PageBackgroundView>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <Sidebar />
          <SidebarInset>
            <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
              <SidebarTrigger className='-ml-1' />
              <div className='h-4 w-px bg-sidebar-border' />
              <h1 className='text-lg font-semibold'>{pageTitle}</h1>

              <AlertsPopover />
            </header>
            <div className='flex flex-1 flex-col gap-4 p-4'>{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </QueryClientProvider>
    </PageBackgroundView>
  )
}
