import z from 'zod'

const envSchema = z.object({
  gaiaServerUrl: z.url(),
})

console.log('olá env', process.env)

export const ENV = envSchema.parse({
  gaiaServerUrl:
    import.meta.env.VITE_GAIA_SERVER_URL ||
    'http://dev-gaia-server-sd.dev.gaia.local:3333',
})
