import {
  ChartLine,
  Bell,
  SlidersHorizontal,
  RadioTower,
  BarChart3,
  Users,
  ClipboardClock,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from '@/ui/shadcn/components/sidebar'
import { ROUTES } from '@/core/global/constants/routes'
import { SidebarItem } from './sidebar-item'
import { UserInfo } from '../user-info'

type Props = {
  currentPath: string
  isUserOwner: boolean
}

export const SidebarView = ({ currentPath, isUserOwner }: Props) => {
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

          {isUserOwner && (
            <SidebarMenu>
              <SidebarItem
                icon={<Users />}
                label='Usuários'
                href={ROUTES.users}
                isActive={currentPath === ROUTES.users}
              />
            </SidebarMenu>
          )}
        </div>
      </SidebarContent>

      <SidebarFooter className='p-4 bg-card border-card'>
        <UserInfo />
      </SidebarFooter>
    </Sidebar>
  )
}
