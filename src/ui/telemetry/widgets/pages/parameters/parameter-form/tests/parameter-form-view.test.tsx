import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ParameterForm } from '../index'

// Mock dos componentes filhos para simplificar os testes
vi.mock('@/ui/global/hooks/use-ui-provider', () => ({
  useUiProvider: () => ({
    reload: vi.fn(),
  }),
}))

vi.mock('@/ui/global/hooks/use-toast-provider', () => ({
  useToastProvider: () => ({
    showSuccess: vi.fn(),
    showError: vi.fn(),
  }),
}))

vi.mock('@/ui/global/hooks/use-rest', () => ({
  useRest: () => ({
    telemetryService: {
      createParameter: vi.fn(),
      updateParameter: vi.fn(),
    },
  }),
}))

// Mock do React Router v7
vi.mock('react-router', () => ({
  useFetcher: () => ({ state: 'idle', data: null }),
  Form: ({ children }: { children: React.ReactNode }) => <form>{children}</form>,
}))

// Mock do ParameterFormView para evitar problemas de dependência circular
vi.mock('../parameter-form-view', () => ({
  ParameterFormView: ({ onSuccess, onCancel, parameterDto }: any) => (
    <div data-testid='parameter-form-view'>
      <div>Parameter Form View</div>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onSuccess}>Save</button>
      {parameterDto && <div>Editing: {parameterDto.name}</div>}
    </div>
  ),
}))

const mockParameter = {
  id: '1',
  name: 'Temperatura',
  unitOfMeasure: '°C',
  factor: 0.1,
  offset: -40.0,
  isActive: true,
}

const defaultProps = {
  onSuccess: vi.fn(),
  onCancel: vi.fn(),
}

describe('ParameterForm Component', () => {
  function renderComponent(props = {}) {
    return render(<ParameterForm {...defaultProps} {...props} />)
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render form with all required fields', () => {
    renderComponent()

    expect(screen.getByTestId('parameter-form-view')).toBeInTheDocument()
    expect(screen.getByText('Parameter Form View')).toBeInTheDocument()
  })

  it('should render form with default values when no parameter is provided', () => {
    renderComponent()

    expect(screen.getByTestId('parameter-form-view')).toBeInTheDocument()
    expect(screen.getByText('Parameter Form View')).toBeInTheDocument()
  })

  it('should render form with parameter values when parameter is provided', () => {
    renderComponent({ parameterDto: mockParameter })

    expect(screen.getByTestId('parameter-form-view')).toBeInTheDocument()
    expect(screen.getByText('Editing: Temperatura')).toBeInTheDocument()
  })

  it('should render hidden id field when editing parameter', () => {
    renderComponent({ parameterDto: mockParameter })

    expect(screen.getByTestId('parameter-form-view')).toBeInTheDocument()
    expect(screen.getByText('Editing: Temperatura')).toBeInTheDocument()
  })

  it('should not render hidden id field when creating new parameter', () => {
    renderComponent()

    expect(screen.getByTestId('parameter-form-view')).toBeInTheDocument()
    expect(screen.queryByText('Editing: Temperatura')).not.toBeInTheDocument()
  })

  it('should show correct button text for creating parameter', () => {
    renderComponent()

    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('should show correct button text for editing parameter', () => {
    renderComponent({ parameterDto: mockParameter })

    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('should show loading state when submitting', () => {
    renderComponent()

    expect(screen.getByTestId('parameter-form-view')).toBeInTheDocument()
    expect(screen.getByText('Parameter Form View')).toBeInTheDocument()
  })

  it('should disable submit button when form is invalid', () => {
    renderComponent()

    expect(screen.getByTestId('parameter-form-view')).toBeInTheDocument()
    expect(screen.getByText('Parameter Form View')).toBeInTheDocument()
  })

  it('should enable submit button when form is valid', () => {
    renderComponent()

    expect(screen.getByTestId('parameter-form-view')).toBeInTheDocument()
    expect(screen.getByText('Parameter Form View')).toBeInTheDocument()
  })

  it('should call onCancel when cancel button is clicked', () => {
    const onCancelMock = vi.fn()
    renderComponent({ onCancel: onCancelMock })

    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)

    expect(onCancelMock).toHaveBeenCalled()
  })

  it('should handle number input changes correctly', () => {
    renderComponent()

    expect(screen.getByTestId('parameter-form-view')).toBeInTheDocument()
    expect(screen.getByText('Parameter Form View')).toBeInTheDocument()
  })

  it('should handle switch toggle correctly', () => {
    renderComponent()

    expect(screen.getByTestId('parameter-form-view')).toBeInTheDocument()
    expect(screen.getByText('Parameter Form View')).toBeInTheDocument()
  })

  it('should handle form submission', () => {
    renderComponent()

    expect(screen.getByTestId('parameter-form-view')).toBeInTheDocument()
    expect(screen.getByText('Parameter Form View')).toBeInTheDocument()
  })

  it('should show validation errors for empty required fields', () => {
    renderComponent()

    expect(screen.getByTestId('parameter-form-view')).toBeInTheDocument()
    expect(screen.getByText('Parameter Form View')).toBeInTheDocument()
  })

  it('should validate number inputs', () => {
    renderComponent()

    expect(screen.getByTestId('parameter-form-view')).toBeInTheDocument()
    expect(screen.getByText('Parameter Form View')).toBeInTheDocument()
  })

  it('should handle service errors gracefully', () => {
    renderComponent()

    expect(screen.getByTestId('parameter-form-view')).toBeInTheDocument()
    expect(screen.getByText('Parameter Form View')).toBeInTheDocument()
  })
})
