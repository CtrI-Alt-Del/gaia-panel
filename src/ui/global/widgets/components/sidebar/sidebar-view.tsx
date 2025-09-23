import {
  ChartLine,
  Bell,
  SlidersHorizontal,
  ChevronUp,
  RadioTower,
  BarChart3,
  Users,
  ClipboardClock,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/shadcn/components/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from '@/ui/shadcn/components/sidebar'
import { ROUTES } from '@/core/global/constants/routes'
import { SidebarItem } from './sidebar-item'

type Props = {
  currentPath: string
}

export const SidebarView = ({ currentPath }: Props) => {
  return (
    <Sidebar className='w-64 bg-card min-h-screen'>
      <SidebarHeader className='p-6 bg-card'>
        <div className='flex items-center gap-1'>
          <img
            src='../../../../../public/images/gaia-logo.png'
            alt='Gaia'
            width={96}
            height={96}
          />
        </div>
      </SidebarHeader>

      <SidebarContent className='bg-card px-3'>
        <div className='space-y-1'>
          <SidebarMenu>
            <SidebarItem
              icon={<ChartLine />}
              label='Dashboard'
              href={ROUTES.dashboard}
              isActive={currentPath === ROUTES.dashboard}
            />
            <SidebarItem
              icon={<BarChart3 />}
              label='Relatórios'
              href={ROUTES.reports}
              isActive={currentPath === ROUTES.reports}
            />
          </SidebarMenu>

          <div className='h-px bg-purple-200 my-4' />

          <SidebarMenu>
            <SidebarItem
              icon={<RadioTower />}
              label='Estações'
              href={ROUTES.stations}
              isActive={currentPath === ROUTES.stations}
            />
            <SidebarItem
              icon={<SlidersHorizontal />}
              label='Parâmetros'
              href={ROUTES.parameters}
              isActive={currentPath === ROUTES.parameters}
            />
          </SidebarMenu>

          <div className='h-px bg-purple-200 my-4' />

          <SidebarMenu>
            <SidebarItem
              icon={<ClipboardClock />}
              label='Alarmes'
              href={ROUTES.alarms}
              isActive={currentPath === ROUTES.alarms}
            />
            <SidebarItem
              icon={<Bell />}
              label='Alertas'
              href={ROUTES.users}
              isActive={currentPath === ROUTES.alerts}
            />
          </SidebarMenu>

          <div className='h-px bg-purple-200 my-4' />

          <SidebarMenu>
            <SidebarItem
              icon={<Users />}
              label='Usuários'
              href={ROUTES.users}
              isActive={currentPath === ROUTES.users}
            />
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className='p-4 bg-card border-card'>
        <div className='border-t border-white pt-2'>
          <div className='flex items-center gap-3'>
            <Avatar className='w-10 h-10'>
              <AvatarImage src='https://github.com/shadcn.png' alt='Thigszin' />
              <AvatarFallback className='bg-gradient-to-br from-white to-purple-300 text-purple-600 font-medium'>
                T
              </AvatarFallback>
            </Avatar>

            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-foreground truncate'>Thigszin</p>
              <p className='text-xs text-muted-foreground truncate'>Administrador</p>
            </div>

            <ChevronUp className='w-4 h-4 text-muted-foreground' />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
