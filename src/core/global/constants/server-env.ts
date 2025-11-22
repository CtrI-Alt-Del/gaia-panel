import { envSchema } from '@/validation/global'

export const SERVER_ENV = envSchema.parse({
  gaiaServerUrl: 'http://localhost:3333',
})
