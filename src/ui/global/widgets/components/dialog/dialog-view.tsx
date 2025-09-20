import type { ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { X } from 'lucide-react'
import { cn } from '@/ui/shadcn/utils/cn'

export type DialogSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | 'full'

export type DialogViewProps = {
  title?: string
  description?: string
  icon?: ReactNode
  children: (closeDialog: () => void) => ReactNode
  trigger?: ReactNode
  size?: DialogSize
  isDismissable?: boolean
  hideCloseButton?: boolean
  hideScrollbar?: boolean
  showHeader?: boolean
  onOpen?: () => void
  onClose?: () => void
  // Valores do hook
  isOpen: boolean
  open: () => void
  close: () => void
  isAnimating: boolean
}

const sizeClasses: Record<DialogSize, string> = {
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

export const DialogView = ({
  title,
  description,
  icon,
  children,
  trigger,
  size = 'md',
  isDismissable = true,
  hideCloseButton = false,
  hideScrollbar = false,
  showHeader = true,
  onOpen: _onOpen,
  onClose: _onClose,
  isOpen,
  open,
  close,
  isAnimating,
}: DialogViewProps) => {
  return (
    <>
      {trigger && <Slot onClick={open}>{trigger}</Slot>}

      {isOpen && (
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
              aria-label='Fechar dialog'
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
              {showHeader && (title || description || icon || !hideCloseButton) && (
                <div
                  className={cn(
                    'flex items-start justify-between p-6 border-b border-gray-200 transition-all duration-300 ease-out',
                    isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                  )}
                >
                  <div className='flex-1 pr-4 text-left'>
                    {title && (
                      <div className='flex items-center gap-3 mb-2'>
                        {icon && <div className='p-2 bg-blue-50 rounded-lg'>{icon}</div>}
                        <h2 className='text-2xl font-bold text-gray-900'>{title}</h2>
                      </div>
                    )}
                    {description && (
                      <p className='text-gray-600 text-sm'>{description}</p>
                    )}
                  </div>
                  {!hideCloseButton && (
                    <button
                      type='button'
                      onClick={close}
                      onKeyDown={(e) => e.key === 'Enter' && close()}
                      className='text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 cursor-pointer p-1 rounded-md hover:bg-gray-100 flex-shrink-0'
                      aria-label='Fechar dialog'
                    >
                      <X className='w-5 h-5' />
                    </button>
                  )}
                </div>
              )}

              <div
                className={cn(
                  'overflow-y-auto transition-all duration-300 ease-out delay-75',
                  showHeader ? 'p-6 max-h-[calc(90vh-8rem)]' : 'p-6 max-h-[90vh]',
                  hideScrollbar && 'scrollbar-hide',
                  isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                )}
              >
                {children(close)}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
