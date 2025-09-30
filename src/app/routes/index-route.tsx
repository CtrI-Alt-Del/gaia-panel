import { redirect } from 'react-router'

import { ROUTES } from '@/core/global/constants/routes'

export const loader = () => {
  return redirect(ROUTES.auth.signIn)
}
