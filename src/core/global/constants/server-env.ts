import { envSchema } from '@/validation/global'

console.log('SERVER ENV', process.env)

export const SERVER_ENV = envSchema.parse({
  gaiaServerUrl: 'http://localhost:3333',
})
