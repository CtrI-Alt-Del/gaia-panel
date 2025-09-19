import z from 'zod'

const envSchema = z.object({
  serverAppUrl: z.string(),
})

export const ENV = envSchema.parse({
  serverAppUrl: import.meta.env.VITE_SERVER_APP_URL,
})
