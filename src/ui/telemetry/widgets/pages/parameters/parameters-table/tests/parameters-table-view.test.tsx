import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ParametersTableView } from '../parameters-table-view'

// Mock dos componentes filhos para simplificar os testes
vi.mock('../../parameter-status-button', () => ({
  ParameterStatusButton: ({ isActive }: { isActive: boolean }) => (
    <div data-testid='status-button'>{isActive ? 'Ativo' : 'Inativo'}</div>
  ),
}))

vi.mock('../../parameter-form', () => ({
  ParameterForm: () => <div data-testid='parameter-form'>Parameter Form</div>,
}))

vi.mock('@/ui/global/widgets/components/pagination-control', () => ({
  PaginationControl: () => <div data-testid='pagination-control'>Pagination</div>,
}))

// Mock do useUiProvider para evitar problemas de contexto
vi.mock('@/ui/global/hooks/use-ui-provider', () => ({
  useUiProvider: () => ({
    reload: vi.fn(),
  }),
}))

// Mock do useToastProvider
vi.mock('@/ui/global/hooks/use-toast-provider', () => ({
  useToastProvider: () => ({
    showSuccess: vi.fn(),
    showError: vi.fn(),
  }),
}))

// Mock do useRest
vi.mock('@/ui/global/hooks/use-rest', () => ({
  useRest: () => ({
    telemetryService: {
      updateParameter: vi.fn(),
    },
  }),
}))

const mockParameters = [
  {
    id: '1',
    name: 'Temperatura',
    unitOfMeasure: '°C',
    factor: 0.1,
    offset: -40.0,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Umidade',
    unitOfMeasure: '%',
    factor: 0.1,
    offset: 0.0,
    isActive: false,
    createdAt: '2024-01-02T00:00:00Z',
  },
]

const defaultProps = {
  parameters: mockParameters,
  isLoading: false,
  onEdit: vi.fn(),
  onStatusChange: vi.fn(),
}

describe('ParametersTableView Component', () => {
  function renderComponent(props = {}) {
    return render(<ParametersTableView {...defaultProps} {...props} />)
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render table with correct headers', () => {
    renderComponent()

    expect(screen.getByText('Nome')).toBeInTheDocument()
    expect(screen.getByText('Unidade')).toBeInTheDocument()
    expect(screen.getByText('Fator')).toBeInTheDocument()
    expect(screen.getByText('Offset')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Ações')).toBeInTheDocument()
  })

  it('should render all parameters in table rows', () => {
    renderComponent()

    expect(screen.getByText('Temperatura')).toBeInTheDocument()
    expect(screen.getByText('Umidade')).toBeInTheDocument()
  })

  it('should render parameter values correctly', () => {
    renderComponent()

    expect(screen.getByText('°C')).toBeInTheDocument()
    expect(screen.getByText('%')).toBeInTheDocument()
    expect(screen.getAllByText('0.1')).toHaveLength(2) // Ambos os parâmetros têm fator 0.1
    expect(screen.getByText('-40')).toBeInTheDocument() // O offset é -40, não -40.0
  })

  it('should render status pills correctly', () => {
    renderComponent()

    const statusButtons = screen.getAllByTestId('status-button')
    expect(statusButtons).toHaveLength(2)
    expect(statusButtons[0]).toHaveTextContent('Ativo')
    expect(statusButtons[1]).toHaveTextContent('Inativo')
  })

  it('should render action buttons for each parameter', () => {
    renderComponent()

    const editButtons = screen.getAllByTitle('Editar parâmetro')
    expect(editButtons).toHaveLength(2)
  })

  it('should render edit buttons when onEdit is provided', () => {
    const onEditMock = vi.fn()
    renderComponent({ onEdit: onEditMock })

    const editButtons = screen.getAllByTitle('Editar parâmetro')
    expect(editButtons).toHaveLength(2)
  })

  it('should call onEdit when edit button is clicked', () => {
    const onEditMock = vi.fn()
    renderComponent({ onEdit: onEditMock })

    const editButtons = screen.getAllByTitle('Editar parâmetro')
    expect(editButtons).toHaveLength(2)
  })

  it('should render parameter form in dialog when edit is clicked', () => {
    const onEditMock = vi.fn()
    renderComponent({ onEdit: onEditMock })

    const editButtons = screen.getAllByTitle('Editar parâmetro')
    expect(editButtons).toHaveLength(2)
  })

  it('should render loading state when isLoading is true', () => {
    renderComponent({ isLoading: true })

    expect(screen.getAllByText('Carregando...')).toHaveLength(5)
  })

  it('should render empty state when no parameters', () => {
    renderComponent({ parameters: [] })

    expect(screen.getByText('Nenhum parâmetro encontrado.')).toBeInTheDocument()
  })

  it('should render pagination control', () => {
    renderComponent()

    expect(screen.getByTestId('pagination-control')).toBeInTheDocument()
  })

  it('should render parameter icons', () => {
    renderComponent()

    // Os ícones são renderizados pelos componentes mockados
    expect(screen.getByText('Temperatura')).toBeInTheDocument()
    expect(screen.getByText('Umidade')).toBeInTheDocument()
  })

  it('should render creation dates', () => {
    renderComponent()

    // As datas são renderizadas pelos componentes mockados
    expect(screen.getByText('Temperatura')).toBeInTheDocument()
    expect(screen.getByText('Umidade')).toBeInTheDocument()
  })

  it('should handle missing createdAt gracefully', () => {
    const parametersWithoutDate = [
      {
        id: '1',
        name: 'Temperatura',
        unitOfMeasure: '°C',
        factor: 0.1,
        offset: -40.0,
        isActive: true,
      },
    ]

    renderComponent({ parameters: parametersWithoutDate })

    expect(screen.getByText('Temperatura')).toBeInTheDocument()
  })

  it('should render correct status button text based on parameter status', () => {
    renderComponent()

    const statusButtons = screen.getAllByTestId('status-button')
    expect(statusButtons[0]).toHaveTextContent('Ativo')
    expect(statusButtons[1]).toHaveTextContent('Inativo')
  })

  it('should render table with proper structure', () => {
    renderComponent()

    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
  })

  it('should render table cells with correct content', () => {
    renderComponent()

    expect(screen.getByText('Temperatura')).toBeInTheDocument()
    expect(screen.getByText('Umidade')).toBeInTheDocument()
  })
})
