import { SignUp } from '@clerk/react-router'

import { ROUTES } from '@/core/global/constants/routes'

export const SignUpPageView = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <SignUp path='/auth/sign-up' routing='path' forceRedirectUrl={ROUTES.stations} />
    </div>
  )
}
