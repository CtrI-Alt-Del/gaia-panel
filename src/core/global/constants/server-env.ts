import { envSchema } from '@/validation/global'

console.log('SERVER ENV', process.env)

export const SERVER_ENV = envSchema.parse({
  gaiaServerUrl: process.env.VITE_GAIA_SERVER_URL,
})
