import z from 'zod'

const envSchema = z.object({
  gaiaServerUrl: z.url(),
  clerkSecretKey: z.string(),
})

export const ENV = envSchema.parse({
  gaiaServerUrl: import.meta.env.VITE_GAIA_SERVER_URL || 'http://localhost:3000',
  clerkSecretKey: import.meta.env.VITE_CLERK_SECRET_KEY || '',
})
