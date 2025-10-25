import z from 'zod'

const envSchema = z.object({
  gaiaServerUrl: z.url(),
})

console.log('olá env', process.env)

export const ENV = envSchema.parse({
  gaiaServerUrl: process.env.VITE_GAIA_SERVER_URL,
})
