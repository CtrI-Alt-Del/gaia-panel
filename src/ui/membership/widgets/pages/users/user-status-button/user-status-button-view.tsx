import { Power, AlertTriangle, Loader2 } from 'lucide-react'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { Button } from '@/ui/shadcn/components/button'

type Props = {
  isActive: boolean
  onConfirm: () => void
  isLoading?: boolean
}

export const UserStatusButtonView = ({
  isActive,
  isLoading = false,
  onConfirm,
}: Props) => {
  return (
    <AlertDialog
      title={isActive ? 'Confirmar Desativação' : 'Confirmar Ativação'}
      description={
        isActive
          ? 'Tem certeza que deseja desativar este usuário? Ele não poderá mais acessar o sistema.'
          : 'Tem certeza que deseja ativar este usuário? Ele poderá acessar o sistema normalmente.'
      }
      confirmText={isActive ? 'Desativar Usuário' : 'Ativar Usuário'}
      variant={isActive ? 'destructive' : 'default'}
      icon={<AlertTriangle className='w-5 h-5' />}
      onConfirm={onConfirm}
      trigger={
        <div>
          {isActive ? (
            <Button
              type='button'
              disabled={isLoading}
              variant='destructive'
              size='icon'
              className='rounded-full bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 border border-red-200'
              title={isLoading ? 'Desativando usuário...' : 'Desativar usuário'}
            >
              {isLoading ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <Power className='w-4 h-4' />
              )}
            </Button>
          ) : (
            <Button
              type='button'
              disabled={isLoading}
              variant='default'
              size='icon'
              className='rounded-full bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 border border-green-200'
              title={isLoading ? 'Ativando usuário...' : 'Ativar usuário'}
            >
              {isLoading ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <Power className='w-4 h-4' />
              )}
            </Button>
          )}
        </div>
      }
    />
  )
}
