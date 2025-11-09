import { SERVER_ENV } from '@/core/global/constants/server-env'
import { SignInPage } from '@/ui/auth/sign-in'

export const loader = async () => {
  // try {
  //   const response = await fetch(SERVER_ENV.gaiaServerUrl)
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch health check')
  //   }
  //   console.log(await response.json())
  // } catch (error) {
  //   console.log('Failed to connect to server at', SERVER_ENV.gaiaServerUrl)
  //   console.log('error', error)
  // }
}

export default SignInPage
