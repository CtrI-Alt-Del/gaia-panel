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

export type AlertDialogVariant = 'destructive' | 'warning' | 'default'

export interface AlertDialogStyles {
  iconBg: string
  iconColor: string
  warningBg: string
  warningBorder: string
  warningText: string
  buttonBg: string
}

export function getVariantStyles(variant: AlertDialogVariant): AlertDialogStyles {
  switch (variant) {
    case 'destructive':
      return {
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        warningBg: 'bg-red-50',
        warningBorder: 'border-red-200',
        warningText: 'text-red-800',
        buttonBg: 'bg-red-700 hover:bg-red-800',
      }
    case 'warning':
      return {
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
        warningBg: 'bg-yellow-50',
        warningBorder: 'border-yellow-200',
        warningText: 'text-yellow-800',
        buttonBg: 'bg-yellow-600 hover:bg-yellow-700',
      }
    default:
      return {
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        warningBg: 'bg-blue-50',
        warningBorder: 'border-blue-200',
        warningText: 'text-blue-800',
        buttonBg: 'bg-blue-600 hover:bg-blue-700',
      }
  }
}

interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmText: string
  cancelText?: string
  variant?: AlertDialogVariant
  icon?: React.ReactNode
  children?: React.ReactNode
  onConfirm: () => void
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText = 'Cancelar',
  variant = 'destructive',
  icon,
  children,
  onConfirm,
}: AlertDialogProps) {
  const styles = getVariantStyles(variant)
  const defaultIcon = <AlertTriangle className='w-5 h-5' />

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <div className='flex items-center gap-3'>
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${styles.iconBg}`}
            >
              <div className={styles.iconColor}>{icon || defaultIcon}</div>
            </div>
            <div>
              <DialogTitle className='text-lg font-semibold text-gray-900'>
                {title}
              </DialogTitle>
              <DialogDescription className='text-sm text-gray-600 mt-1'>
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {children && <div className='py-4'>{children}</div>}

        <DialogFooter className='flex gap-3'>
          <Button
            type='button'
            variant='outline'
            onClick={() => onOpenChange(false)}
            className='px-4 py-2'
          >
            {cancelText}
          </Button>
          <Button
            type='button'
            onClick={onConfirm}
            className={`px-4 py-2 text-white ${styles.buttonBg}`}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
