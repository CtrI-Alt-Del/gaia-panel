import z from 'zod'

const envSchema = z.object({
  serverAppUrl: z.url(),
  clerkSecretKey: z.string(),
})


export const ENV = envSchema.parse({
  serverAppUrl: import.meta.env.VITE_SERVER_APP_URL || 'http://localhost:3000',
  clerkSecretKey: import.meta.env.VITE_CLERK_SECRET_KEY || '',
})
