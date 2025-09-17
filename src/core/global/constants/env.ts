import z from 'zod'

const envSchema = z.object({
  serverAppUrl: z.url(),
})

export const ENV = envSchema.parse({
  serverAppUrl: process.env.SERVER_APP_URL,
})
