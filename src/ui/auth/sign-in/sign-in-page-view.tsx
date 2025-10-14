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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/ui/shadcn/components/card'
import { GaiaLogo } from '@/ui/global/widgets/components/gaia-logo'
import { Link } from 'react-router'
import { ROUTES } from '@/core/global/constants/routes'

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
    <div className='min-h-screen w-full grid grid-cols-2'>
      <div className='h-full flex items-center justify-center'>
        <div className='w-full max-w-md space-y-6'>
          <div className='flex justify-center'>
            <GaiaLogo width={120} height={120} />
          </div>

          <Card className='bg-white border-gray-200 shadow-2xl'>
            <CardHeader className='space-y-2 text-center pb-3'>
              <CardTitle className='text-3xl font-bold text-gray-900'>
                Entrar na sua Conta
              </CardTitle>
              <CardDescription className='text-gray-600 text-sm'>
                Entre na sua conta inserindo suas informações abaixo.
              </CardDescription>
            </CardHeader>

            <CardContent className='space-y-6'>
              <Form {...form}>
                <form onSubmit={onSubmit} className='space-y-6'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-gray-900 text-sm font-medium'>
                          Endereço de E-mail
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            placeholder='Digite seu e-mail'
                            className='py-6 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500'
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
                        <FormLabel className='text-gray-900 text-sm font-medium'>
                          Senha
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            placeholder='Digite sua senha'
                            className='py-6 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500'
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='flex justify-between items-center'>
                    <button
                      type="button"
                      onClick={onForgotPassword}
                      disabled={isLoading}
                      className='p-0 h-auto text-sm text-purple-600 hover:text-purple-700 bg-transparent border-none cursor-pointer'
                    >
                      Esqueceu a senha?
                    </button>
                  </div>

                  {error && (
                    <div className='p-3 bg-red-50 border border-red-200 rounded-lg'>
                      <p className='text-sm text-red-600'>{error}</p>
                    </div>
                  )}

                  <Button
                    type='submit'
                    disabled={isLoading || !form.formState.isValid}
                    className='w-full text-white font-medium py-3'
                    size='lg'
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className='text-center space-y-2'>
            <p className='text-sm text-gray-500'>
              © 2025 Gaia Web. Todos os direitos reservados.
            </p>
            <div className='flex justify-center space-x-6 text-sm'>
              <a
                href='https://tecsus.com.br/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-purple-600 hover:text-purple-700 transition-colors'
              >
                Tecsus
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='h-full flex items-center justify-center'>
        <img src='/images/rainy-city.svg' alt='Rainy City' width={750} height={750} />
      </div>
    </div>
  )
}
