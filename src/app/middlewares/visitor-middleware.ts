import type { Route } from '../+types/root'
import { visitorContext } from '../contexts/visitor-context'
import { membershipContext } from '../contexts/membership-context'

export const VisitorMiddleware = async ({ context, request }: Route.LoaderArgs) => {
  const url = new URL(request.url)
  const isVisitorParam = url.searchParams.get('visitor') === 'true'

  const { user } = context.get(membershipContext)
  const isVisitor = isVisitorParam || (!user?.isActive && !request.url.includes('/auth/'))

  context.set(visitorContext, {
    isVisitor,
    setIsVisitor: () => {},
  })
}
