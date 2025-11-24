import { envSchema } from '@/validation/global'

export const SERVER_ENV = envSchema.parse({
  gaiaServerUrl: process.env.GAIA_SERVER_URL,
})
