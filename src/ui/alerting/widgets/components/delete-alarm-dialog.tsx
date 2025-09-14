import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/shadcn/components/dialog'
import { Button } from '@/ui/shadcn/components/button'
import { AlertTriangle } from 'lucide-react'
import type { AlarmRule } from '../pages/use-alarms'

interface DeleteAlarmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  alarm: AlarmRule | null
  onConfirm: () => void
}

export function DeleteAlarmDialog({
  open,
  onOpenChange,
  alarm,
  onConfirm,
}: DeleteAlarmDialogProps) {
  if (!alarm) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <div className='flex items-center gap-3'>
            <div className='flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center'>
              <AlertTriangle className='w-5 h-5 text-red-600' />
            </div>
            <div>
              <DialogTitle className='text-lg font-semibold text-gray-900'>
                Confirmar Exclusão
              </DialogTitle>
              <DialogDescription className='text-sm text-gray-600 mt-1'>
                Esta ação não pode ser desfeita.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className='py-4'>
          <div className='bg-gray-50 rounded-lg p-4 border'>
            <h4 className='font-medium text-gray-900 mb-2'>Alarme a ser excluído:</h4>
            <div className='space-y-2 text-sm text-gray-600'>
              <div>
                <span className='font-medium'>Nome:</span> {alarm.name}
              </div>
              <div>
                <span className='font-medium'>Condição:</span> {alarm.condition}
              </div>
              <div>
                <span className='font-medium'>Severidade:</span>{' '}
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    alarm.severity === 'critical'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {alarm.severity === 'critical' ? '▲ Crítico' : '○ Alarme'}
                </span>
              </div>
              <div>
                <span className='font-medium'>Status:</span>{' '}
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    alarm.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {alarm.status === 'active' ? '○ Ativo' : '• Inativo'}
                </span>
              </div>
            </div>
          </div>

          <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
            <p className='text-sm text-red-800'>
              <strong>Atenção:</strong> Ao excluir este alarme, todas as configurações e
              histórico associados serão permanentemente removidos.
            </p>
          </div>
        </div>

        <DialogFooter className='flex gap-3'>
          <Button
            type='button'
            variant='outline'
            onClick={() => onOpenChange(false)}
            className='px-4 py-2'
          >
            Cancelar
          </Button>
          <Button
            type='button'
            onClick={onConfirm}
            className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white'
          >
            Excluir Alarme
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
