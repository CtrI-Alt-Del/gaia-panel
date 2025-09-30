import { useCallback, useState } from 'react'
import { useClerk, useSignIn, useUser } from '@clerk/react-router'

export function useAuthProvider() {
  const { signOut: clerkSignOut } = useClerk()
  const { signIn: clerkSignIn, setActive } = useSignIn()
  const { user, isSignedIn } = useUser()
  const [otp, setOtp] = useState('')

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await clerkSignIn?.create({ identifier: email, password })
        if (response?.status === 'complete') {
          await setActive?.({ session: response.createdSessionId })
          return true
        }
        return false
      } catch (error) {
        console.log('error', error)
        return false
      }
    },
    [clerkSignIn?.create, setActive],
  )

  const signOut = useCallback(async () => {
    await clerkSignOut()
  }, [clerkSignOut])

  const sendChangePasswordEmail = useCallback(
    async (email: string) => {
      await clerkSignIn?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
    },
    [clerkSignIn?.create],
  )

  const verifyOtp = useCallback(async (otp: string) => {
    setOtp(otp)
    return true
  }, [])

  const changePassword = useCallback(
    async (password: string) => {
      await clerkSignIn?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: otp,
        password,
      })
      await clerkSignOut()
    },
    [clerkSignIn?.attemptFirstFactor],
  )

  return {
    signIn,
    signOut,
    sendChangePasswordEmail,
    verifyOtp,
    changePassword,
    userId: user?.publicMetadata?.userId ? String(user.publicMetadata.userId) : '',
    isAuthenticated: Boolean(isSignedIn),
  }
}
