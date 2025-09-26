import { ChevronUp } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/ui/shadcn/components/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/shadcn/components/dropdown-menu'
import { SignOutButton } from './sign-out-button'

type Props = {
  name: string
  email: string
}

export const UserInfoView = ({ name, email }: Props) => {
  return (
    <div className='border-t border-white pt-2'>
      <div className='flex items-center gap-3'>
        <Avatar className='w-10 h-10'>
          <AvatarFallback className='bg-gradient-to-br from-white to-purple-300 text-purple-600 font-medium'>
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className='flex-1 min-w-0'>
          <p className='text-sm font-medium text-foreground truncate'>{name}</p>
          <p className='text-xs text-muted-foreground truncate'>{email}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type='button'
              className='p-1 hover:bg-muted rounded-sm transition-colors'
            >
              <ChevronUp
                className={'w-4 h-4 text-muted-foreground transition-transform'}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-48'>
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
