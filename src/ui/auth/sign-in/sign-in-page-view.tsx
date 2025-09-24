import type { UseFormReturn } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/shadcn/components/form'
import { Input } from '@/ui/shadcn/components/input'
import { Button } from '@/ui/shadcn/components/button'
import { GaiaLogo } from '@/ui/global/widgets/components/gaia-logo'

type SignInFormData = {
  email: string
  password: string
}

type Props = {
  form: UseFormReturn<SignInFormData>
  isLoading: boolean
  error?: string
  onSubmit: () => void
  onForgotPassword: () => void
}

export const SignInPageView = ({
  form,
  isLoading,
  error,
  onSubmit,
  onForgotPassword,
}: Props) => {
  return (
    <div className='min-h-screen bg-background flex flex-col'>
      <header className='flex justify-start p-6'>
        <GaiaLogo width={96} height={96} />
      </header>

      <main className='flex-1 flex items-center justify-center px-4'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center'>
            <h1 className='text-3xl font-bold text-foreground'>Entrar na sua Conta</h1>
          </div>

          <Form {...form}>
            <form onSubmit={onSubmit} className='space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço de Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='Digite seu email'
                        className='py-6'
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Digite sua senha'
                        className='py-6'
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='text-right'>
                <Button
                  type='button'
                  variant='link'
                  onClick={onForgotPassword}
                  disabled={isLoading}
                  className='p-0 h-auto text-sm text-primary hover:text-primary/80'
                >
                  Esqueceu a senha?
                </Button>
              </div>

              {error && (
                <div className='p-3 bg-destructive/10 border border-destructive/20 rounded-lg'>
                  <p className='text-sm text-destructive'>{error}</p>
                </div>
              )}

              <Button
                type='submit'
                disabled={isLoading || !form.formState.isValid}
                className='w-full py-6'
                size='lg'
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  )
}
