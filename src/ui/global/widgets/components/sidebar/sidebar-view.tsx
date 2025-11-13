import {
  ChartLine,
  Bell,
  SlidersHorizontal,
  RadioTower,
  BarChart3,
  Users,
  ClipboardClock,
  HelpCircle,
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
import { Link } from 'react-router'

type Props = {
  currentPath: string
  isUserOwner: boolean
  isVisitor?: boolean
}

export const SidebarView = ({ currentPath, isUserOwner, isVisitor }: Props) => {
  return (
    <Sidebar className='w-64 bg-card min-h-screen'>
      <SidebarHeader className='p-6 bg-card'>
        <Link to={ROUTES.index} className='flex items-center gap-1'>
          <img src='/images/gaia-logo.png' alt='Gaia' width={96} height={96} />
        </Link>
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
              href={ROUTES.alerts}
              isActive={currentPath === ROUTES.alerts}
            />
          </SidebarMenu>

          <div className='h-px bg-purple-200 my-4' />

          {isUserOwner && !isVisitor && (
            <SidebarMenu>
              <SidebarItem
                icon={<Users />}
                label='Usuários'
                href={ROUTES.users}
                isActive={currentPath === ROUTES.users}
              />
            </SidebarMenu>
          )}

          <div className='h-px bg-purple-200 my-4' />

          <SidebarMenu>
            <SidebarItem
              icon={<HelpCircle />}
              label='Central de Ajuda'
              href={ROUTES.helpCenter.index}
              isActive={currentPath.startsWith(ROUTES.helpCenter.index)}
            />
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className='p-4 bg-card border-card'>
        <UserInfo />
      </SidebarFooter>
    </Sidebar>
  )
}
