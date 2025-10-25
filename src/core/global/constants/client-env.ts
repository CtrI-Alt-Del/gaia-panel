import { envSchema } from '@/validation/global'

export const CLIENT_ENV = envSchema.parse({
  gaiaServerUrl: import.meta.env.VITE_GAIA_SERVER_URL,
})
