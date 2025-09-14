import { useCallback, useState } from 'react'

export const useModal = (onOpenModal?: () => void) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
    onOpenModal?.()

    const timer = setTimeout(() => {
      setIsAnimating(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [onOpenModal])

  const close = useCallback(() => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsOpen(false)
    }, 300)
  }, [])

  return {
    isOpen,
    open,
    close,
    isAnimating,
  }
}
