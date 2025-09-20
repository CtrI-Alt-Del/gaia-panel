import { forwardRef, useImperativeHandle } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { AlertDialogView } from './alert-dialog-view'
import { useAlertDialog } from './use-alert-dialog'
import type { AlertDialogRef } from './alert-dialog-ref'

export type { AlertDialogRef } from './alert-dialog-ref'
export type { AlertDialogVariant, AlertDialogStyles } from './alert-dialog-view'

export type AlertDialogProps = {
  title: string
  description: string
  confirmText: string
  cancelText?: string
  variant?: 'destructive' | 'warning' | 'default'
  icon?: React.ReactNode
  children?: React.ReactNode
  onConfirm?: () => void
  trigger?: React.ReactNode
  onOpen?: () => void
  onClose?: () => void
}

export const AlertDialog = forwardRef<AlertDialogRef, AlertDialogProps>((props, ref) => {
  const { trigger, onOpen, onClose, ...alertProps } = props
  const { isOpen, open, close, isAnimating } = useAlertDialog(onOpen, onClose)

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  )

  return (
    <>
      {trigger && <Slot onClick={open}>{trigger}</Slot>}

      <AlertDialogView
        {...alertProps}
        isOpen={isOpen}
        open={open}
        close={close}
        isAnimating={isAnimating}
      />
    </>
  )
})
