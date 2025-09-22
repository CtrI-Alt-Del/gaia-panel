import type React from 'react'
import {
  ChartLine,
  Bell,
  SlidersHorizontal,
  ChevronUp,
  RadioTower,
  Info,
  BarChart3,
  Shield,
  Users,
  Cog,
  ClipboardClock,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/shadcn/components/avatar'
import { Badge } from '@/ui/shadcn/components/badge'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui/shadcn/components/sidebar'
import { useLocation } from 'react-router'
import { ROUTES } from '@/core/global/constants/routes'
import { cn } from '@/ui/shadcn/utils'

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  badge?: string | number
  hasInfo?: boolean
  isActive?: boolean
}

function SidebarItem({ icon, label, href, badge, hasInfo, isActive }: SidebarItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className='w-full rounded-none h-10'>
        <a
          href={href}
          className={cn(
            'flex items-center justify-between px-3 hover:bg-purple-100/50 cursor-pointer transition-colors rounded-sm',
            isActive && 'bg-purple-200',
          )}
          aria-current={isActive ? 'page' : undefined}
        >
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-white border border-purple-300 rounded-sm shadow-lg flex items-center justify-center flex-shrink-0'>
              <div className='w-4 h-4 text-purple-600 flex items-center justify-center'>
                {icon}
              </div>
            </div>
            <span className={cn('text-sm font-medium text-gray-900', isActive && 'text-purple-700')}>{label}</span>
          </div>
          <div className='flex items-center gap-1'>
            {hasInfo && <Info className='w-4 h-4 text-gray-400' />}
            {badge && (
              <Badge className='bg-purple-600 text-white text-xs px-1.5 py-0.5 h-5 min-w-5 rounded-full'>
                {badge}
              </Badge>
            )}
          </div>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function SidebarView() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <Sidebar className='w-64 bg-purple-100 min-h-screen'>
      <SidebarHeader className='p-6 bg-purple-100'>
        <div className='flex items-center gap-1'>
          <img
            src='../../../../../public/images/logo.png'
            alt='Logo'
            className='w-9 h-9 border-2 border-gray-200 rounded-lg'
          />
          <span className='text-lg font-bold text-gray-800 leading-none'>Gaia</span>
        </div>
      </SidebarHeader>

      <SidebarContent className='bg-purple-100 px-3'>
        <div className='space-y-1'>
          {/* Seção Principal */}
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

          {/* Divider */}
          <div className='h-px bg-purple-200 my-4' />

          {/* Seção de Monitoramento */}
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

      <SidebarFooter className='p-4 border-purple-100'>
        <div className='border-t border-purple-100 pt-2'>
          {/* User Profile */}
          <div className='flex items-center gap-3'>
            <Avatar className='w-10 h-10'>
              <AvatarImage src='https://github.com/shadcn.png' alt='Thigszin' />
              <AvatarFallback className='bg-gradient-to-br from-purple-100 to-purple-300 text-purple-600 font-medium'>
                T
              </AvatarFallback>
            </Avatar>

            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-800 truncate'>Thigszin</p>
              <p className='text-xs text-gray-500 truncate'>Administrador</p>
            </div>

            <ChevronUp className='w-4 h-4 text-gray-400' />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
