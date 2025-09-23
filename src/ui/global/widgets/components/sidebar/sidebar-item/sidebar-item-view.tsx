import type React from 'react'
import { Info } from 'lucide-react'
import { Badge } from '@/ui/shadcn/components/badge'
import { SidebarMenuButton, SidebarMenuItem } from '@/ui/shadcn/components/sidebar'
import { cn } from '@/ui/shadcn/utils'

type Props = {
  icon: React.ReactNode
  label: string
  href: string
  badge?: string | number
  hasInfo?: boolean
  isActive?: boolean
}

export const SidebarItemView = ({
  icon,
  label,
  href,
  badge,
  hasInfo,
  isActive,
}: Props) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className='w-full rounded-none h-10'>
        <a
          href={href}
          className={cn(
            'flex items-center justify-between px-3 hover:bg-purple-100/50 cursor-pointer transition-colors rounded-sm',
            isActive && 'bg-purple-200/75',
          )}
          aria-current={isActive ? 'page' : undefined}
        >
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-card border border-purple-300/50 rounded-sm shadow-lg flex items-center justify-center flex-shrink-0'>
              <div className='w-4 h-4 text-purple-800 flex items-center justify-center'>
                {icon}
              </div>
            </div>
            <span className={cn('text-sm font-medium text-accent-foreground')}>
              {label}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            {hasInfo && <Info className='w-4 h-4 text-muted-foreground' />}
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
