import type { MembershipService } from '@/core/membership/interfaces'
import { createContext } from 'react-router'

type RestContext = {
  membershipService: MembershipService
}

export const restContext = createContext<RestContext>()
