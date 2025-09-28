import { Power, AlertTriangle } from 'lucide-react'
import { Button } from '@/ui/shadcn/components/button'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'

type Props = {
  isActive: boolean
  onConfirm: () => void
}

export const StationStatusButtonView = ({ isActive, onConfirm }: Props) => {
  return (
    <AlertDialog
      data-testid='alert-dialog'
      title={isActive ? 'Confirmar Desativação' : 'Confirmar Ativação'}
      description={
        isActive
          ? 'Tem certeza que deseja desativar esta estação? Ela não poderá mais coletar dados.'
          : 'Tem certeza que deseja ativar esta estação? Ela poderá coletar dados normalmente.'
      }
      confirmText={isActive ? 'Desativar Estação' : 'Ativar Estação'}
      variant={isActive ? 'destructive' : 'default'}
      icon={<AlertTriangle className='w-5 h-5' />}
      onConfirm={onConfirm}
      trigger={
        <div>
          {isActive ? (
            <Button
              data-testid='deactivate-button'
              type='button'
              variant='destructive'
              size='icon'
              className='rounded-full bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 border border-red-200'
              title='Desativar estação'
            >
              <Power className='w-4 h-4' />
            </Button>
          ) : (
            <Button
              data-testid='activate-button'
              type='button'
              variant='default'
              size='icon'
              className='rounded-full bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 border border-green-200'
              title='Ativar estação'
            >
              <Power className='w-4 h-4' />
            </Button>
          )}
        </div>
      }
    />
  )
}