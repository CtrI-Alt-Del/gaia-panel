import { forwardRef, useImperativeHandle } from 'react'
import { DialogView, type DialogViewProps } from './dialog-view'
import { useDialog } from './use-dialog'
import type { DialogRef } from './dialog-ref'

export type { DialogRef } from './dialog-ref'
export type { DialogSize, DialogViewProps } from './dialog-view'

export type DialogProps = Omit<
  DialogViewProps,
  'isOpen' | 'open' | 'close' | 'isAnimating'
>

export const Dialog = forwardRef<DialogRef, DialogProps>((props, ref) => {
  const { isOpen, open, close, isAnimating } = useDialog(props.onOpen, props.onClose)

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  )

  return (
    <DialogView
      {...props}
      isOpen={isOpen}
      open={open}
      close={close}
      isAnimating={isAnimating}
    />
  )
})
