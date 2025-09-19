import { useCallback, useState, useEffect } from 'react'

export const useDialog = (onOpenDialog?: () => void, onCloseDialog?: () => void) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
    onOpenDialog?.()

    const timer = setTimeout(() => {
      setIsAnimating(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [onOpenDialog])

  const close = useCallback(() => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsOpen(false)
    }, 300)
  }, [])

  // Handle escape key and body scroll
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
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
  }, [isOpen, close])

  // Handle onClose callback
  useEffect(() => {
    if (!isOpen && onCloseDialog) {
      onCloseDialog()
    }
  }, [isOpen, onCloseDialog])

  return {
    isOpen,
    open,
    close,
    isAnimating,
  }
}
