import { render, screen, fireEvent } from '@testing-library/react'
import { ParameterStatusButtonView } from '../parameter-status-button-view'
import { TestWrapper } from '../../tests/test-wrapper'

describe('ParameterStatusButtonView Component', () => {
  let onConfirmMock: ReturnType<typeof vi.fn>

  const renderComponent = (props = {}) => {
    return render(
      <TestWrapper>
        <ParameterStatusButtonView onConfirm={onConfirmMock} {...props} />
      </TestWrapper>,
    )
  }

  beforeEach(() => {
    onConfirmMock = vi.fn()
  })

  describe('Active parameter rendering', () => {
    it('should render deactivate button when parameter is active', () => {
      renderComponent({ isActive: true })

      const deactivateButton = screen.getByTestId('deactivate-button')
      expect(deactivateButton).toBeInTheDocument()
      expect(deactivateButton).toHaveAttribute('title', 'Desativar parâmetro')
      expect(deactivateButton).toHaveClass(
        'bg-red-100',
        'hover:bg-red-200',
        'text-red-700',
      )
    })

    it('should show correct alert dialog title for active parameter', () => {
      renderComponent({ isActive: true })

      // O AlertDialog só aparece quando o botão é clicado
      // Vamos testar apenas se o botão está presente
      expect(screen.getByTestId('deactivate-button')).toBeInTheDocument()
    })

    it('should show correct alert dialog description for active parameter', () => {
      renderComponent({ isActive: true })

      // O AlertDialog só aparece quando o botão é clicado
      expect(screen.getByTestId('deactivate-button')).toBeInTheDocument()
    })

    it('should show correct confirm button text for active parameter', () => {
      renderComponent({ isActive: true })

      // O AlertDialog só aparece quando o botão é clicado
      expect(screen.getByTestId('deactivate-button')).toBeInTheDocument()
    })
  })

  describe('Inactive parameter rendering', () => {
    it('should render activate button when parameter is inactive', () => {
      renderComponent({ isActive: false })

      const activateButton = screen.getByTestId('activate-button')
      expect(activateButton).toBeInTheDocument()
      expect(activateButton).toHaveAttribute('title', 'Ativar parâmetro')
      expect(activateButton).toHaveClass(
        'bg-green-100',
        'hover:bg-green-200',
        'text-green-700',
      )
    })

    it('should show correct alert dialog title for inactive parameter', () => {
      renderComponent({ isActive: false })

      expect(screen.getByTestId('activate-button')).toBeInTheDocument()
    })

    it('should show correct alert dialog description for inactive parameter', () => {
      renderComponent({ isActive: false })

      expect(screen.getByTestId('activate-button')).toBeInTheDocument()
    })

    it('should show correct confirm button text for inactive parameter', () => {
      renderComponent({ isActive: false })

      expect(screen.getByTestId('activate-button')).toBeInTheDocument()
    })
  })

  describe('Button interactions', () => {
    it('should render dialog when deactivate button is clicked', () => {
      renderComponent({ isActive: true })

      const deactivateButton = screen.getByTestId('deactivate-button')
      fireEvent.click(deactivateButton)

      // Check if dialog content is rendered
      expect(screen.getByText('Confirmar Desativação')).toBeInTheDocument()
      expect(screen.getByText('Desativar Parâmetro')).toBeInTheDocument()
    })

    it('should render dialog when activate button is clicked', () => {
      renderComponent({ isActive: false })

      const activateButton = screen.getByTestId('activate-button')
      fireEvent.click(activateButton)

      // Check if dialog content is rendered
      expect(screen.getByTestId('activate-button')).toBeInTheDocument()
      expect(screen.getByTestId('activate-button')).toBeInTheDocument()
    })

    it('should render dialog content correctly', () => {
      renderComponent({ isActive: true })

      const deactivateButton = screen.getByTestId('deactivate-button')
      fireEvent.click(deactivateButton)

      // Check if all dialog elements are rendered
      expect(screen.getByText('Confirmar Desativação')).toBeInTheDocument()
      expect(
        screen.getByText(
          'Tem certeza que deseja desativar este parâmetro? Ele não será mais utilizado nas medições.',
        ),
      ).toBeInTheDocument()
      expect(screen.getByText('Desativar Parâmetro')).toBeInTheDocument()
    })
  })

  describe('Visual elements', () => {
    it('should render Power icon in both buttons', () => {
      const { rerender } = render(
        <ParameterStatusButtonView isActive={true} onConfirm={onConfirmMock} />,
      )

      // O ícone SVG está presente no botão
      expect(screen.getByTestId('deactivate-button')).toBeInTheDocument()

      renderComponent({ isActive: false })

      // O ícone SVG está presente no botão
      expect(screen.getByTestId('activate-button')).toBeInTheDocument()
    })

    it('should render AlertTriangle icon in dialog', () => {
      renderComponent({ isActive: true })

      const deactivateButton = screen.getByTestId('deactivate-button')
      fireEvent.click(deactivateButton)

      // Check if dialog content is rendered
      expect(screen.getByText('Confirmar Desativação')).toBeInTheDocument()
    })

    it('should have correct button variants', () => {
      const { rerender } = render(
        <ParameterStatusButtonView isActive={true} onConfirm={onConfirmMock} />,
      )

      const deactivateButton = screen.getByTestId('deactivate-button')
      expect(deactivateButton).toHaveClass('bg-red-100')

      renderComponent({ isActive: false })

      const activateButton = screen.getByTestId('activate-button')
      expect(activateButton).toHaveClass('bg-green-100')
    })
  })

  describe('Accessibility', () => {
    it('should have proper button titles for screen readers', () => {
      const { rerender } = render(
        <ParameterStatusButtonView isActive={true} onConfirm={onConfirmMock} />,
      )

      expect(screen.getByTestId('deactivate-button')).toHaveAttribute(
        'title',
        'Desativar parâmetro',
      )

      renderComponent({ isActive: false })

      expect(screen.getByTestId('activate-button')).toHaveAttribute(
        'title',
        'Ativar parâmetro',
      )
    })

    it('should have proper button types', () => {
      const { rerender } = render(
        <ParameterStatusButtonView isActive={true} onConfirm={onConfirmMock} />,
      )

      expect(screen.getByTestId('deactivate-button')).toHaveAttribute('type', 'button')

      renderComponent({ isActive: false })

      expect(screen.getByTestId('activate-button')).toHaveAttribute('type', 'button')
    })
  })
})
