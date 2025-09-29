import type { Route } from '../+types/root'
import { authContext } from '../contexts/auth-context'
import { restContext } from '../contexts/rest-context'
import { membershipContext } from '../contexts/membership-context'

export const MembershipMiddleware = async ({ context }: Route.LoaderArgs) => {
  const { userId } = context.get(authContext)
  const { membershipService } = context.get(restContext)

  let user = null

  if (userId) {
    const response = await membershipService.fetchUser(userId)
    if (response.isFailure) response.throwError()
    user = response.body
  }

  context.set(membershipContext, {
    user,
  })
}
