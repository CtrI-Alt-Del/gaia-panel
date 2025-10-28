import { envSchema } from '@/validation/global'

console.log('CLIENT ENV', import.meta.env)

export const CLIENT_ENV = envSchema.parse({
  gaiaServerUrl: import.meta.env.VITE_GAIA_SERVER_URL,
})
