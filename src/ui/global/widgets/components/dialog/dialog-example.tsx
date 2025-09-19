import { useRef } from 'react'
import { Dialog, type DialogRef } from './index'
import { Button } from '@/ui/shadcn/components/button'

export const DialogExample = () => {
  const dialogRef = useRef<DialogRef>(null)

  const handleOpenDialog = () => {
    dialogRef.current?.open()
  }

  return (
    <div className='p-4 space-y-4'>
      <h2 className='text-xl font-semibold'>Exemplos de Dialog</h2>

      {/* Exemplo 1: Dialog simples com trigger */}
      <div>
        <h3 className='text-lg font-medium mb-2'>Dialog Simples</h3>
        <Dialog
          ref={dialogRef}
          title='Confirmação'
          description='Tem certeza que deseja continuar com esta ação?'
          trigger={<Button>Abrir Dialog</Button>}
        >
          {(close) => (
            <div className='space-y-4'>
              <p className='text-gray-600'>
                Este é um exemplo de dialog simples. Você pode adicionar qualquer conteúdo
                aqui.
              </p>
              <div className='flex justify-end space-x-2'>
                <Button variant='outline' onClick={close}>
                  Cancelar
                </Button>
                <Button onClick={close}>Confirmar</Button>
              </div>
            </div>
          )}
        </Dialog>
      </div>

      {/* Exemplo 2: Dialog sem trigger (controlado programaticamente) */}
      <div>
        <h3 className='text-lg font-medium mb-2'>Dialog Controlado</h3>
        <Button onClick={handleOpenDialog}>Abrir Dialog Programaticamente</Button>

        <Dialog
          ref={dialogRef}
          title='Dialog Controlado'
          description='Este dialog é aberto programaticamente'
          size='lg'
        >
          {(close) => (
            <div className='space-y-4'>
              <p className='text-gray-600'>
                Este dialog é controlado programaticamente através de refs.
              </p>
              <div className='flex justify-end space-x-2'>
                <Button variant='outline' onClick={close}>
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </Dialog>
      </div>

      {/* Exemplo 3: Dialog sem header */}
      <div>
        <h3 className='text-lg font-medium mb-2'>Dialog Sem Header</h3>
        <Dialog
          title='Dialog Sem Header'
          showHeader={false}
          size='sm'
          trigger={<Button variant='outline'>Dialog Sem Header</Button>}
        >
          {(close) => (
            <div className='text-center space-y-4'>
              <p className='text-gray-600'>Este dialog não possui header visível.</p>
              <Button onClick={close}>Fechar</Button>
            </div>
          )}
        </Dialog>
      </div>
    </div>
  )
}
