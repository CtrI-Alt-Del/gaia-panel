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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/ui/shadcn/components/input-otp'
import { useChangePasswordPage, FormStep } from './use-change-password-page'
import type { AuthProvider } from '@/core/auth/interfaces'
import type { RouterProvider } from '@/core/global/interfaces/router-provider'

type Props = {
  authProvider: AuthProvider
  routerProvider: RouterProvider
}

export const ChangePasswordPageView = ({ authProvider, routerProvider }: Props) => {
  const {
    emailForm,
    verificationForm,
    passwordForm,
    currentStep,
    isLoading,
    error,
    handleEmailSubmit,
    handleVerificationSubmit,
    handlePasswordSubmit,
    handleBackToLogin,
    handleBackToEmail,
    handleBackToVerification,
  } = useChangePasswordPage({ authProvider, routerProvider })

  return (
    <div className='min-h-screen w-full grid grid-cols-1'>
      <div className='h-full flex items-center justify-center'>
        <div className='w-full max-w-md space-y-6'>
          <div className='flex justify-center'>
            <GaiaLogo width={120} height={120} />
          </div>

          <Card className='bg-white border-gray-200 shadow-2xl'>
            {currentStep === FormStep.EMAIL && (
              <>
                <CardHeader className='space-y-2 text-center pb-3'>
                  <CardTitle className='text-3xl font-bold text-gray-900'>
                    Recuperação de Senha
                  </CardTitle>
                  <CardDescription className='text-gray-600 text-sm'>
                    Digite seu e-mail para receber o código de verificação.
                  </CardDescription>
                </CardHeader>

                <CardContent className='space-y-6'>
                  <Form {...emailForm}>
                    <form onSubmit={handleEmailSubmit} className='space-y-6'>
                      <FormField
                        control={emailForm.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-gray-900 text-sm font-medium'>
                              E-mail
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

                      {error && (
                        <div className='p-3 bg-red-50 border border-red-200 rounded-lg'>
                          <p className='text-sm text-red-600'>{error}</p>
                        </div>
                      )}

                      <Button
                        type='submit'
                        disabled={isLoading || !emailForm.formState.isValid}
                        className='w-full text-white font-medium py-3'
                        size='lg'
                      >
                        {isLoading ? 'Enviando...' : 'Enviar Código'}
                      </Button>

                      <div className='flex justify-center'>
                        <Button
                          type='button'
                          variant='link'
                          onClick={handleBackToLogin}
                          disabled={isLoading}
                          className='p-0 h-auto text-sm text-purple-600 hover:text-purple-700'
                        >
                          Voltar para o login
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </>
            )}

            {currentStep === FormStep.VERIFICATION && (
              <>
                <CardHeader className='space-y-2 text-center'>
                  <CardTitle className='text-3xl font-bold text-gray-900'>
                    Verificação
                  </CardTitle>
                  <CardDescription className='text-gray-600 text-sm'>
                    Digite o código de verificação enviado ao seu e-mail.
                  </CardDescription>
                </CardHeader>

                <CardContent className='space-y-6'>
                  <Form {...verificationForm}>
                    <form onSubmit={handleVerificationSubmit} className='space-y-6'>
                      <FormField
                        control={verificationForm.control}
                        name='code'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <InputOTP
                                maxLength={6}
                                containerClassName='justify-center'
                                className='mx-auto'
                                value={field.value ?? ''}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                disabled={isLoading}
                              >
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {error && (
                        <div className='p-3 bg-red-50 border border-red-200 rounded-lg'>
                          <p className='text-sm text-red-600'>{error}</p>
                        </div>
                      )}

                      <Button
                        type='submit'
                        disabled={isLoading || !verificationForm.formState.isValid}
                        className='w-full text-white font-medium py-3'
                        size='lg'
                      >
                        {isLoading ? 'Verificando...' : 'Verificar Código'}
                      </Button>

                      <div className='flex justify-center space-x-4'>
                        <Button
                          type='button'
                          variant='link'
                          onClick={handleBackToEmail}
                          disabled={isLoading}
                          className='p-0 h-auto text-sm text-purple-600 hover:text-purple-700'
                        >
                          Voltar
                        </Button>
                        <Button
                          type='button'
                          variant='link'
                          onClick={handleBackToLogin}
                          disabled={isLoading}
                          className='p-0 h-auto text-sm text-purple-600 hover:text-purple-700'
                        >
                          Voltar para o login
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </>
            )}

            {currentStep === FormStep.PASSWORD && (
              <>
                <CardHeader className='space-y-2 text-center pb-3'>
                  <CardTitle className='text-3xl font-bold text-gray-900'>
                    Alterar Senha
                  </CardTitle>
                  <CardDescription className='text-gray-600 text-sm'>
                    Digite sua nova senha para continuar.
                  </CardDescription>
                </CardHeader>

                <CardContent className='space-y-6'>
                  <Form {...passwordForm}>
                    <form onSubmit={handlePasswordSubmit} className='space-y-6'>
                      <FormField
                        control={passwordForm.control}
                        name='password'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-gray-900 text-sm font-medium'>
                              Nova Senha
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='password'
                                placeholder='Digite sua nova senha'
                                className='py-6 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500'
                                disabled={isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {error && (
                        <div className='p-3 bg-red-50 border border-red-200 rounded-lg'>
                          <p className='text-sm text-red-600'>{error}</p>
                        </div>
                      )}

                      <Button
                        type='submit'
                        disabled={isLoading || !passwordForm.formState.isValid}
                        className='w-full text-white font-medium py-3'
                        size='lg'
                      >
                        {isLoading ? 'Alterando...' : 'Alterar Senha'}
                      </Button>

                      <div className='flex justify-center space-x-4'>
                        <Button
                          type='button'
                          variant='link'
                          onClick={handleBackToVerification}
                          disabled={isLoading}
                          className='p-0 h-auto text-sm text-purple-600 hover:text-purple-700'
                        >
                          Voltar
                        </Button>
                        <Button
                          type='button'
                          variant='link'
                          onClick={handleBackToLogin}
                          disabled={isLoading}
                          className='p-0 h-auto text-sm text-purple-600 hover:text-purple-700'
                        >
                          Voltar para o login
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </>
            )}
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
    </div>
  )
}
