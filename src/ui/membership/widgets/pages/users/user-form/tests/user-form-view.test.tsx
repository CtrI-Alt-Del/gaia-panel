import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { mock, type MockProxy } from 'vitest-mock-extended'
import { UserFormView } from '../user-form-view'
import type { UserDto } from '@/core/membership/dtos/user-dto'
import type { MembershipService } from '@/core/membership/interfaces'
import type { ToastProvider, UiProvider } from '@/core/global/interfaces'
import { RestResponse } from '@/core/global/responses'

// Mock do useFetcher
const mockFetcher = {
  Form: ({ children, onSubmit, ...props }: any) => (
    <form onSubmit={onSubmit} {...props}>
      {children}
    </form>
  ),
  state: 'idle',
}

vi.mock('react-router', () => ({
  useFetcher: () => mockFetcher,
}))

describe('UserFormView Component', () => {
  let membershipService: MockProxy<MembershipService>
  let uiProvider: MockProxy<UiProvider>
  let toastProvider: MockProxy<ToastProvider>
  let onSuccessMock: ReturnType<typeof vi.fn>
  let onCancelMock: ReturnType<typeof vi.fn>

  const defaultProps = {
    membershipService: {} as any,
    uiProvider: {} as any,
    toastProvider: {} as any,
    onSuccess: vi.fn(),
    onCancel: vi.fn(),
  }

  beforeEach(() => {
    membershipService = mock<MembershipService>()
    uiProvider = mock<UiProvider>()
    toastProvider = mock<ToastProvider>()
    onSuccessMock = vi.fn()
    onCancelMock = vi.fn()

    // Reset mock state
    mockFetcher.state = 'idle'
  })

  const renderComponent = (props = {}) => {
    return render(
      <UserFormView
        {...defaultProps}
        membershipService={membershipService}
        uiProvider={uiProvider}
        toastProvider={toastProvider}
        onSuccess={onSuccessMock}
        onCancel={onCancelMock}
        {...props}
      />,
    )
  }

  describe('Form rendering', () => {
    it('should render form fields correctly', () => {
      renderComponent()

      expect(screen.getByLabelText('Nome')).toBeInTheDocument()
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Digite o nome completo')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Digite o email do usuário')).toBeInTheDocument()
    })

    it('should render submit and cancel buttons', () => {
      renderComponent()

      expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument()
    })

    it('should show correct button text for create mode', () => {
      renderComponent()

      expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument()
    })

    it('should show correct button text for edit mode', () => {
      const userDto: UserDto = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      }

      renderComponent({ userDto })

      expect(screen.getByRole('button', { name: 'Atualizar' })).toBeInTheDocument()
    })

    it('should include hidden id field in edit mode', () => {
      const userDto: UserDto = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      }

      renderComponent({ userDto })

      const hiddenInput = screen.getByDisplayValue('user-1')
      expect(hiddenInput).toBeInTheDocument()
      expect(hiddenInput).toHaveAttribute('type', 'hidden')
      expect(hiddenInput).toHaveAttribute('name', 'id')
    })
  })

  describe('Form submission', () => {
    it('should call handleSubmit when form is submitted', async () => {
      const successResponse = new RestResponse({ body: {} as UserDto })
      membershipService.createUser.mockResolvedValue(successResponse)

      renderComponent()

  const nameInput = screen.getByLabelText('Nome')
  const emailInput = screen.getByLabelText('Email')
  const submitButton = screen.getByRole('button', { name: 'Salvar' })

  fireEvent.change(nameInput, { target: { value: 'John Doe' } })
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } })

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })

      fireEvent.click(submitButton)

      await waitFor(() => {
          expect(membershipService.createUser).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@example.com',
          })
      })
    })

    it('should call handleSubmit for update when userDto has id', async () => {
      const userDto: UserDto = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      }

      const successResponse = new RestResponse({ body: {} as UserDto })
      membershipService.updateUser.mockResolvedValue(successResponse)

      renderComponent({ userDto })

      const nameInput = screen.getByLabelText('Nome')
      const emailInput = screen.getByLabelText('Email')
      const submitButton = screen.getByRole('button', { name: 'Atualizar' })

      fireEvent.change(nameInput, { target: { value: 'John Updated' } })
      fireEvent.change(emailInput, { target: { value: 'john.updated@example.com' } })

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })

      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(membershipService.updateUser).toHaveBeenCalledWith({
          name: 'John Updated',
          email: 'john.updated@example.com',
          id: 'user-1',
        })
      })
    })

    it('should disable submit button when form is invalid', () => {
      renderComponent()

      const submitButton = screen.getByRole('button', { name: 'Salvar' })
      expect(submitButton).toBeDisabled()
    })

    it('should disable submit button when fetcher is submitting', () => {
      mockFetcher.state = 'submitting'

      renderComponent()

      const submitButton = screen.getByRole('button', { name: 'Salvando...' })
      expect(submitButton).toBeDisabled()
    })

    it('should show loading state when submitting', () => {
      mockFetcher.state = 'submitting'

      renderComponent()

      expect(screen.getByText('Salvando...')).toBeInTheDocument()
    })
  })

  describe('Cancel functionality', () => {
    it('should call onCancel when cancel button is clicked', () => {
      renderComponent()

      const cancelButton = screen.getByRole('button', { name: 'Cancelar' })
      fireEvent.click(cancelButton)

      expect(onCancelMock).toHaveBeenCalledTimes(1)
    })

    it('should disable cancel button when submitting', () => {
      mockFetcher.state = 'submitting'

      renderComponent()

      const cancelButton = screen.getByRole('button', { name: 'Cancelar' })
      expect(cancelButton).toBeDisabled()
    })
  })

  describe('Form validation', () => {
    it('should disable submit button when form is invalid', () => {
      renderComponent()

      const submitButton = screen.getByRole('button', { name: 'Salvar' })
      expect(submitButton).toBeDisabled()
    })
  })
})
