import z from 'zod'

export const envSchema = z.object({
  gaiaServerUrl: z.string(),
})
