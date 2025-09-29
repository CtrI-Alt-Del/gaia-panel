import { SignUp } from '@clerk/react-router'

export const SignUpPageView = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <SignUp path='/auth/sign-up' routing='path' signInUrl='/auth/sign-in' />
    </div>
  )
}
