import type { ReactNode } from 'react'

interface TestWrapperProps {
  children: ReactNode
  initialEntries?: string[]
}

export function TestWrapper({ children, initialEntries = ['/'] }: TestWrapperProps) {
  // Simplificar o wrapper para evitar problemas de contexto
  return <div>{children}</div>
}
