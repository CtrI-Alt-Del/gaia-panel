import { Link } from 'react-router'
import { ROUTES } from '@/core/global/constants/routes'
import { Button } from '@/ui/shadcn/components/button'
import { Avatar, AvatarFallback } from '@/ui/shadcn/components/avatar'
import { LogIn } from 'lucide-react'

type VisitorProps = {
  isVisitor: boolean
}

export const VisitorInfoView = ({ isVisitor }: VisitorProps) => {
  if (!isVisitor) return null

  return (
    <div className='border-t border-white pt-2'>
      <div className='flex items-center gap-3'>
        <Avatar className='w-10 h-10'>
          <AvatarFallback className='bg-gradient-to-br from-gray-100 to-gray-300 text-gray-600 font-medium'>
            V
          </AvatarFallback>
        </Avatar>

        <div className='flex-1 min-w-0'>
          <p className='text-sm font-medium text-foreground'>Visitante</p>
          <p className='text-xs text-muted-foreground'>Modo de visualização</p>
        </div>

        <Link to={ROUTES.auth.signIn}>
          <Button
            variant='outline'
            size='sm'
            className='h-8 px-3 text-xs font-medium border-purple-300 text-purple-700 hover:bg-purple-50'
          >
            <LogIn className='w-3 h-3 mr-1' />
            Entrar
          </Button>
        </Link>
      </div>
    </div>
  )
}
