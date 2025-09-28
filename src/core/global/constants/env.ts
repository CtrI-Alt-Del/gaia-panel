import z from 'zod'

const envSchema = z.object({
  gaiaServerUrl: z.url(),
})

export const ENV = envSchema.parse({
  gaiaServerUrl: import.meta.env.VITE_SERVER_APP_URL || 'http://localhost:3333',
})

console.log(ENV)
