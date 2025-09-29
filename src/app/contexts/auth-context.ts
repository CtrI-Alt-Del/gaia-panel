import { createContext } from 'react-router'

type AuthContext = {
  accessToken: string | null
  userId: string | null
}

export const authContext = createContext<AuthContext>()
