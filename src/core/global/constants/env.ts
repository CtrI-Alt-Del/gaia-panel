import z from 'zod'

const envSchema = z.object({
  gaiaServerUrl: z.url(),
})

export const ENV = envSchema.parse({
  gaiaServerUrl:
    import.meta.env.VITE_GAIA_SERVER_URL || 'http://gaia-server.dev.gaia.local:3333',
})
