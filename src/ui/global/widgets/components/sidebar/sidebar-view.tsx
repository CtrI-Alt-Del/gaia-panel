import {
  ChartLine,
  Bell,
  SlidersHorizontal,
  Settings,
  User,
  ChevronUp,
  RadioTower,
  Newspaper,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/shadcn/components/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui/shadcn/components/sidebar'
import { useLocation } from 'react-router'
import { ROUTES } from '@/core/constants/ROUTES'

const activeButtonStyles =
  'bg-gradient-to-r from-green-100  to-transparent border-r-4 border-green-500'
const inactiveButtonStyles = 'hover:bg-gray-50'
const activeIconStyles = 'text-green-600'
const inactiveIconStyles = 'text-gray-600'
const activeTextStyles = 'text-gray-700 font-medium'
const inactiveTextStyles = 'text-gray-700'
const buttonStyles = 'w-full rounded-none'

export function SidebarView() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <Sidebar className='w-64 bg-white border-r border-gray-200'>
      <SidebarHeader className='p-6'>
        <div className='flex items-center gap-1'>
          <img
            src='../../../../../public/images/logo.png'
            alt='Logo'
            className='w-9 h-9 border-2 border-gray-200 rounded-lg'
          />
          <span className='text-lg font-bold text-gray-800 leading-none'>Gaia</span>
        </div>
      </SidebarHeader>

      <SidebarContent className='px-0'>
        <SidebarGroup className='p-0 mx-0'>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={buttonStyles}>
                  <a
                    href={ROUTES.dashboard}
                    className={
                      currentPath === ROUTES.dashboard
                        ? activeButtonStyles
                        : inactiveButtonStyles
                    }
                    aria-current={currentPath === ROUTES.dashboard ? 'page' : undefined}
                  >
                    <ChartLine
                      className={
                        currentPath === ROUTES.dashboard
                          ? activeIconStyles
                          : inactiveIconStyles
                      }
                    />
                    <span
                      className={
                        currentPath === ROUTES.dashboard
                          ? activeTextStyles
                          : inactiveTextStyles
                      }
                    >
                      Dashboard
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className={buttonStyles}>
                  <a
                    href={ROUTES.stations}
                    className={
                      currentPath === ROUTES.stations
                        ? activeButtonStyles
                        : inactiveButtonStyles
                    }
                    aria-current={currentPath === ROUTES.stations ? 'page' : undefined}
                  >
                    <RadioTower
                      className={
                        currentPath === ROUTES.stations
                          ? activeIconStyles
                          : inactiveIconStyles
                      }
                    />
                    <span
                      className={
                        currentPath === ROUTES.stations
                          ? activeTextStyles
                          : inactiveTextStyles
                      }
                    >
                      Estações
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className={buttonStyles}>
                  <a
                    href={ROUTES.parameters}
                    className={
                      currentPath === ROUTES.parameters
                        ? activeButtonStyles
                        : inactiveButtonStyles
                    }
                    aria-current={currentPath === ROUTES.parameters ? 'page' : undefined}
                  >
                    <SlidersHorizontal
                      className={
                        currentPath === ROUTES.parameters
                          ? activeIconStyles
                          : inactiveIconStyles
                      }
                    />
                    <span
                      className={
                        currentPath === ROUTES.parameters
                          ? activeTextStyles
                          : inactiveTextStyles
                      }
                    >
                      Parâmetros
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive className={buttonStyles}>
                  <a
                    href={ROUTES.alerts}
                    className={
                      currentPath === ROUTES.alerts
                        ? activeButtonStyles
                        : inactiveButtonStyles
                    }
                    aria-current={currentPath === ROUTES.alerts ? 'page' : undefined}
                  >
                    <Bell
                      className={
                        currentPath === ROUTES.alerts
                          ? activeIconStyles
                          : inactiveIconStyles
                      }
                    />
                    <span
                      className={
                        currentPath === ROUTES.alerts
                          ? activeTextStyles
                          : inactiveTextStyles
                      }
                    >
                      Alertas
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className={buttonStyles}>
                  <a
                    href={ROUTES.reports}
                    className={
                      currentPath === ROUTES.reports
                        ? activeButtonStyles
                        : inactiveButtonStyles
                    }
                    aria-current={currentPath === ROUTES.reports ? 'page' : undefined}
                  >
                    <Newspaper
                      className={
                        currentPath === ROUTES.reports
                          ? activeIconStyles
                          : inactiveIconStyles
                      }
                    />
                    <span
                      className={
                        currentPath === ROUTES.reports
                          ? activeTextStyles
                          : inactiveTextStyles
                      }
                    >
                      Relatórios
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className={buttonStyles}>
                  <a
                    href={ROUTES.configuration}
                    className={
                      currentPath === ROUTES.configuration
                        ? activeButtonStyles
                        : inactiveButtonStyles
                    }
                    aria-current={
                      currentPath === ROUTES.configuration ? 'page' : undefined
                    }
                  >
                    <Settings
                      className={
                        currentPath === ROUTES.configuration
                          ? activeIconStyles
                          : inactiveIconStyles
                      }
                    />
                    <span
                      className={
                        currentPath === ROUTES.configuration
                          ? activeTextStyles
                          : inactiveTextStyles
                      }
                    >
                      Configuração
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='p-4'>
        <div className='border-t border-gray-200 pt-4'>
          <div className='flex items-center gap-3'>
            <Avatar className='w-10 h-10'>
              <AvatarImage src='https://github.com/shadcn.png' alt='Thigszin' />
              <AvatarFallback className='bg-gradient-to-br from-pink-200 to-pink-300 text-pink-600 font-medium'>
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
