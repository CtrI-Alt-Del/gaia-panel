import { createContext } from 'react-router'

type VisitorContext = {
  isVisitor: boolean
  setIsVisitor: (isVisitor: boolean) => void
}

export const visitorContext = createContext<VisitorContext>()
