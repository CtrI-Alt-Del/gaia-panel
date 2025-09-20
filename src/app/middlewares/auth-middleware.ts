export const AuthMiddleware = async ({
  context,
  request,
}: {
  request: Request
  context: any
}) => {
  // const accessToken = sessionStorage.getItem(SESSION_STORAGE_KEYS.accessToken)
  // const isSignInRoute = request.url.endsWith(ROUTES.index)
  // if (!accessToken && !isSignInRoute) {
  //   throw redirect(ROUTES.index)
  // }
  // context.set(authContext, {
  //   accessToken,
  // })
}
