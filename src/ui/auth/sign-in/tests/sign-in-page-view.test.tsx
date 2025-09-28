import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { SignInPageView } from '../sign-in-page-view'

const signInSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 8 caracteres'),
})

type SignInFormData = z.infer<typeof signInSchema>

// Componente wrapper para usar useForm dentro de um componente React
const SignInPageWrapper = (props: {
  isLoading?: boolean
  error?: string
  onSubmit?: () => void
  onForgotPassword?: () => void
  formData?: Partial<SignInFormData>
}) => {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      ...props.formData,
    },
  })

  return (
    <SignInPageView
      form={form}
      isLoading={props.isLoading || false}
      error={props.error}
      onSubmit={props.onSubmit || vi.fn()}
      onForgotPassword={props.onForgotPassword || vi.fn()}
    />
  )
}

const renderSignInPageView = (props: {
  isLoading?: boolean
  error?: string
  onSubmit?: () => void
  onForgotPassword?: () => void
  formData?: Partial<SignInFormData>
}) => {
  return render(<SignInPageWrapper {...props} />)
}

describe('SignInPageView', () => {
  const mockOnSubmit = vi.fn()
  const mockOnForgotPassword = vi.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
    mockOnForgotPassword.mockClear()
  })

  it('should render the sign in form', () => {
    renderSignInPageView({
      onSubmit: mockOnSubmit,
      onForgotPassword: mockOnForgotPassword,
    })

    expect(screen.getByText('Entrar na sua Conta')).toBeInTheDocument()
    expect(
      screen.getByText('Entre na sua conta inserindo suas informações abaixo.'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Endereço de E-mail')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByText('Esqueceu a senha?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
  })

  it('should render Gaia logo', () => {
    renderSignInPageView({
      onSubmit: mockOnSubmit,
      onForgotPassword: mockOnForgotPassword,
    })

    const logo = screen.getByAltText('Gaia')
    expect(logo).toBeInTheDocument()
  })

  it('should render rainy city image', () => {
    renderSignInPageView({
      onSubmit: mockOnSubmit,
      onForgotPassword: mockOnForgotPassword,
    })

    const image = screen.getByAltText('Rainy City')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/rainy-city.svg')
  })

  it('should have correct input placeholders', () => {
    renderSignInPageView({
      onSubmit: mockOnSubmit,
      onForgotPassword: mockOnForgotPassword,
    })

    expect(screen.getByPlaceholderText('Digite seu e-mail')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument()
  })

  it('should have correct input types', () => {
    renderSignInPageView({
      onSubmit: mockOnSubmit,
      onForgotPassword: mockOnForgotPassword,
    })

    const emailInput = screen.getByLabelText('Endereço de E-mail')
    const passwordInput = screen.getByLabelText('Senha')

    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should call onSubmit when form is submitted', async () => {
    renderSignInPageView({
      onSubmit: mockOnSubmit,
      onForgotPassword: mockOnForgotPassword,
    })

    const emailInput = screen.getByLabelText('Endereço de E-mail')
    const passwordInput = screen.getByLabelText('Senha')
    const submitButton = screen.getByRole('button', { name: 'Entrar' })

    // Fill form with valid data
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123456' } })

    // Submit form
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    })
  })

  it('should call onForgotPassword when forgot password link is clicked', () => {
    renderSignInPageView({
      onSubmit: mockOnSubmit,
      onForgotPassword: mockOnForgotPassword,
    })

    const forgotPasswordLink = screen.getByText('Esqueceu a senha?')
    fireEvent.click(forgotPasswordLink)

    expect(mockOnForgotPassword).toHaveBeenCalledTimes(1)
  })

  it('should show loading state when isLoading is true', () => {
    renderSignInPageView({
      isLoading: true,
      onSubmit: mockOnSubmit,
      onForgotPassword: mockOnForgotPassword,
    })

    expect(screen.getByText('Entrando...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrando...' })).toBeDisabled()
  })

  it('should disable inputs when loading', () => {
    renderSignInPageView({
      isLoading: true,
      onSubmit: mockOnSubmit,
      onForgotPassword: mockOnForgotPassword,
    })

    const emailInput = screen.getByLabelText('Endereço de E-mail')
    const passwordInput = screen.getByLabelText('Senha')
    const forgotPasswordLink = screen.getByText('Esqueceu a senha?')

    expect(emailInput).toBeDisabled()
    expect(passwordInput).toBeDisabled()
    expect(forgotPasswordLink).toBeDisabled()
  })

  it('should show error message when error is provided', () => {
    const errorMessage = 'Email ou senha inválidos'
    renderSignInPageView({
      error: errorMessage,
      onSubmit: mockOnSubmit,
      onForgotPassword: mockOnForgotPassword,
    })

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(screen.getByText(errorMessage)).toHaveClass('text-red-600')
  })

  it('should not show error message when error is not provided', () => {
    renderSignInPageView({
      onSubmit: mockOnSubmit,
      onForgotPassword: mockOnForgotPassword,
    })

    expect(screen.queryByText('Email ou senha inválidos')).not.toBeInTheDocument()
  })

  it('should have correct form validation attributes', () => {
    renderSignInPageView({
      onSubmit: mockOnSubmit,
      onForgotPassword: mockOnForgotPassword,
    })

    const emailInput = screen.getByLabelText('Endereço de E-mail')
    const passwordInput = screen.getByLabelText('Senha')

    // React Hook Form handles validation internally, so we check the form structure
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should render footer with copyright and Tecsus link', () => {
    renderSignInPageView({
      onSubmit: mockOnSubmit,
      onForgotPassword: mockOnForgotPassword,
    })

    expect(
      screen.getByText('© 2025 Gaia Web. Todos os direitos reservados.'),
    ).toBeInTheDocument()

    const tecsusLink = screen.getByText('Tecsus')
    expect(tecsusLink).toBeInTheDocument()
    expect(tecsusLink).toHaveAttribute('href', 'https://tecsus.com.br/')
    expect(tecsusLink).toHaveAttribute('target', '_blank')
    expect(tecsusLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should have correct CSS classes for styling', () => {
    renderSignInPageView({
      onSubmit: mockOnSubmit,
      onForgotPassword: mockOnForgotPassword,
    })

    const card = screen.getByRole('button', { name: 'Entrar' }).closest('.bg-white')
    expect(card).toHaveClass('bg-white', 'border-gray-200', 'shadow-2xl')

    const submitButton = screen.getByRole('button', { name: 'Entrar' })
    expect(submitButton).toHaveClass('w-full', 'text-white', 'font-medium', 'py-3')
  })

  it('should handle form data changes correctly', async () => {
    renderSignInPageView({
      onSubmit: mockOnSubmit,
      onForgotPassword: mockOnForgotPassword,
    })

    const emailInput = screen.getByLabelText('Endereço de E-mail')
    const passwordInput = screen.getByLabelText('Senha')

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } })

    expect(emailInput).toHaveValue('user@example.com')
    expect(passwordInput).toHaveValue('mypassword')
  })
})
