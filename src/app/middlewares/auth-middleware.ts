import type { Route } from '../+types/root'
import { getAuth } from '@clerk/react-router/ssr.server'
import { clerkClient } from '@clerk/clerk-sdk-node'

import { authContext } from '../contexts/auth-context'

export const AuthMiddleware = async ({ context, request, params }: Route.LoaderArgs) => {
  const { userId: clerkUserId, getToken } = await getAuth({ context, request, params })

  let userId = null

  if (clerkUserId) {
    const clerkUser = await clerkClient.users.getUser(clerkUserId)
    userId = clerkUser.publicMetadata.userId as string
  }

  const token = await getToken()

  context.set(authContext, {
    accessToken: token,
    userId,
  })
}
