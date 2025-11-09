import { envSchema } from '@/validation/global'


export const CLIENT_ENV = envSchema.parse({
  gaiaServerUrl:
    import.meta.env.VITE_GAIA_SERVER_URL ??
    'dev-alb-2035488909.us-east-1.elb.amazonaws.com/server', 
})

console.log('CLIENT ENV', CLIENT_ENV)
