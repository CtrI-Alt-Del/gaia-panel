import { type ForwardedRef, type ReactNode, useImperativeHandle, useEffect } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { X } from 'lucide-react'
import { cn } from '@/ui/shadcn/utils/cn'
import { useModal } from './use-modal'

export interface ModalRef {
  open: () => void
  close: () => void
}

type ModalProps = {
  title?: string
  children: (closeDialog: () => void) => ReactNode
  trigger?: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
  isDismissable?: boolean
  hideCloseButton?: boolean
  hideScrollbar?: boolean
  onOpen?: () => void
  onClose?: () => void
  ref?: ForwardedRef<ModalRef>
}

const sizeClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  full: 'max-w-full mx-4',
}

export const Modal = ({
  title,
  children,
  trigger,
  size = 'md',
  isDismissable = true,
  hideCloseButton = false,
  hideScrollbar = false,
  onOpen,
  onClose,
  ref,
}: ModalProps) => {
  const { isOpen, open, close, isAnimating } = useModal(onOpen)

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  )

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && isDismissable) {
        close()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isDismissable, close])

  useEffect(() => {
    if (!isOpen && onClose) {
      onClose()
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return trigger ? <Slot onClick={open}>{trigger}</Slot> : null
  }

  return (
    <>
      {isDismissable && (
        <button
          type='button'
          className={cn(
            'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300 ease-out',
            isAnimating ? 'opacity-100' : 'opacity-0',
          )}
          onClick={close}
          onKeyDown={(e) => e.key === 'Enter' && close()}
          aria-label='Fechar modal'
        />
      )}

      <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        <div
          className={cn(
            'relative w-full bg-white rounded-lg shadow-2xl transition-all duration-300 ease-out transform',
            sizeClasses[size],
            size === 'full' ? 'h-[90vh]' : 'max-h-[90vh]',
            isAnimating
              ? 'opacity-100 scale-100 translate-y-0 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300'
              : 'opacity-0 scale-90 translate-y-8',
          )}
        >
          {(title || !hideCloseButton) && (
            <div
              className={cn(
                'flex items-center justify-between p-6 border-b border-gray-200 transition-all duration-300 ease-out',
                isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
              )}
            >
              {title && <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>}
              {!hideCloseButton && (
                <button
                  type='button'
                  onClick={close}
                  onKeyDown={(e) => e.key === 'Enter' && close()}
                  className='text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 cursor-pointer p-1 rounded-md hover:bg-gray-100'
                  aria-label='Fechar modal'
                >
                  <X className='w-5 h-5' />
                </button>
              )}
            </div>
          )}

          <div
            className={cn(
              'p-6 overflow-y-auto max-h-[calc(90vh-8rem)] transition-all duration-300 ease-out delay-75',
              hideScrollbar && 'scrollbar-hide',
              isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
            )}
          >
            {children(close)}
          </div>
        </div>
      </div>
    </>
  )
}
