import { SignInPageView } from './sign-in-page-view'
import { useSignIn } from './use-sign-in'

export const SignInPage = () => {
  const { form, isLoading, error, onSubmit, onForgotPassword } = useSignIn()

  return (
    <SignInPageView
      form={form}
      isLoading={isLoading}
      error={error}
      onSubmit={onSubmit}
      onForgotPassword={onForgotPassword}
    />
  )
}
