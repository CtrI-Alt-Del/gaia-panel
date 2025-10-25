import { ENV } from '@/core/global/constants'
import { SignInPage } from '@/ui/auth/sign-in'

export const loader = async () => {
  try {
    const response = await fetch(ENV.gaiaServerUrl)

    if (!response.ok) {
      throw new Error('Failed to fetch health check')
    }
    console.log(await response.json())
  } catch (error) {
    console.log('Failed to connect to server at', ENV.gaiaServerUrl)
    console.log('error', error)
  }
}

export default SignInPage
