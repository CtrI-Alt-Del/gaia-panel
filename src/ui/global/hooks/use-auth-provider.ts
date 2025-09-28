import { useCallback } from 'react'
import { useClerk, useSignIn, useUser } from '@clerk/react-router'

export function useAuthProvider() {
  const { signOut } = useClerk()
  const { signIn, setActive } = useSignIn()
  const { user } = useUser()

  return {
    signIn: useCallback(
      async (email: string, password: string) => {
        try {
          const response = await signIn?.create({ identifier: email, password })
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
      [signIn?.create],
    ),
    signOut: useCallback(async () => {
      await signOut()
    }, [signOut]),
    userId: user?.publicMetadata?.userId ? String(user.publicMetadata.userId) : '',
  }
}
