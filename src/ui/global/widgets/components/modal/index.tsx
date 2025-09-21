import { forwardRef, useImperativeHandle } from 'react'
import { ModalView, type ModalViewProps } from './modal-view'
import { useModal } from './use-modal'
import type { ModalRef } from './modal-ref'

export type { ModalRef } from './modal-ref'

export const Modal = forwardRef<ModalRef, Omit<ModalViewProps, 'ref'>>((props, ref) => {
  const { isOpen, open, close, isAnimating } = useModal(props.onOpen, props.onClose)

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  )

  return (
    <ModalView
      {...props}
      isOpen={isOpen}
      open={open}
      close={close}
      isAnimating={isAnimating}
    />
  )
})
