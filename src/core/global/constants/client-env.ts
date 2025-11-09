import { envSchema } from '@/validation/global'


export const CLIENT_ENV = envSchema.parse({
  gaiaServerUrl:
    import.meta.env.VITE_GAIA_SERVER_URL ??
    'http://dev-gaia-server-sd.dev.gaia.local:3333',
})

console.log('CLIENT ENV', CLIENT_ENV)
