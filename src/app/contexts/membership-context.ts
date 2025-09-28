import { createContext } from 'react-router'

import type { UserDto } from '@/core/membership/dtos/user-dto'

type MembershipContext = {
  user: UserDto | null
}

export const membershipContext = createContext<MembershipContext>()
