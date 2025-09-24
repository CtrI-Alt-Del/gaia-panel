import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { UsersTableView } from '../users-table-view'
import type { UserDto } from '@/core/membership/dtos/user-dto'
import { UsersFaker } from '@/core/membership/dtos/fakers/users-faker'

// Mock do React Router
vi.mock('react-router', () => ({
  useRevalidator: () => ({
    revalidate: vi.fn(),
  }),
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/test' }),
  useFetcher: () => ({
    Form: ({ children, onSubmit, ...props }: any) => (
      <form onSubmit={onSubmit} {...props}>
        {children}
      </form>
    ),
    state: 'idle',
    data: null,
    submit: vi.fn(),
  }),
}))

// Mock do useUiProvider
vi.mock('@/ui/global/hooks/use-ui-provider', () => ({
  useUiProvider: () => ({
    reload: vi.fn(),
  }),
}))

// Mock do useToastProvider
vi.mock('@/ui/global/hooks/use-toast', () => ({
  useToastProvider: () => ({
    showSuccess: vi.fn(),
    showError: vi.fn(),
  }),
}))

// Mock do useRest
vi.mock('@/ui/global/hooks/use-rest', () => ({
  useRest: () => ({
    membershipService: {
      updateUserStatus: vi.fn(),
    },
  }),
}))

// Mock dos componentes externos
vi.mock('@/ui/shadcn/components/status-pill', () => ({
  StatusPill: ({ active, activeText, inactiveText }: any) => (
    <span data-testid='status-pill' data-active={active}>
      {active ? activeText : inactiveText}
    </span>
  ),
}))

vi.mock('@/ui/global/widgets/components/user-avatar', () => ({
  UserAvatar: ({ name, size }: any) => (
    <div data-testid='user-avatar' data-name={name} data-size={size}>
      {name}
    </div>
  ),
}))

vi.mock('@/ui/membership/widgets/pages/users/user-table-skeleton', () => ({
  UserTableSkeleton: () => (
    <tr data-testid='user-table-skeleton'>
      <td colSpan={5}>Loading...</td>
    </tr>
  ),
}))

vi.mock('@/ui/global/widgets/components/pagination-control', () => ({
  PaginationControl: ({
    previousCursor,
    nextCursor,
    hasNextPage,
    hasPreviousPage,
  }: any) => (
    <div data-testid='pagination-control'>
      <span data-testid='previous-cursor'>{previousCursor || 'null'}</span>
      <span data-testid='next-cursor'>{nextCursor || 'null'}</span>
      <span data-testid='has-next'>{hasNextPage ? 'true' : 'false'}</span>
      <span data-testid='has-previous'>{hasPreviousPage ? 'true' : 'false'}</span>
    </div>
  ),
}))

vi.mock('@/ui/global/widgets/components/dialog', () => ({
  Dialog: ({ children, trigger, onClose, title, description }: any) => (
    <div data-testid='dialog' data-title={title} data-description={description}>
      {trigger}
      <div data-testid='dialog-content'>{children({ closeDialog: onClose })}</div>
    </div>
  ),
}))

vi.mock('../user-form', () => ({
  UserForm: ({ userDto, onSuccess, onCancel }: any) => (
    <div data-testid='user-form'>
      <span data-testid='user-form-dto'>{userDto?.id || 'new'}</span>
      <button type='button' data-testid='user-form-success' onClick={onSuccess}>
        Success
      </button>
      <button type='button' data-testid='user-form-cancel' onClick={onCancel}>
        Cancel
      </button>
    </div>
  ),
}))

vi.mock('../user-status-button', () => ({
  UserStatusButton: ({ userId, isActive }: any) => (
    <button
      type='button'
      data-testid='user-status-button'
      data-user-id={userId}
      data-active={isActive}
    >
      Toggle Status
    </button>
  ),
}))

describe('UsersTableView', () => {
  const mockUsers: UserDto[] = [
    UsersFaker.fakeDto({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      isActive: true,
      createdAt: new Date('2024-01-01'),
    }),
    UsersFaker.fakeDto({
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      isActive: false,
      createdAt: new Date('2024-01-02'),
    }),
    UsersFaker.fakeDto({
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      isActive: true,
      createdAt: new Date('2024-01-03'),
    }),
  ]

  const defaultProps = {
    users: mockUsers,
    nextCursor: 'next-cursor-123',
    previousCursor: 'prev-cursor-456',
    hasNextPage: true,
    hasPreviousPage: false,
    isLoading: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render table with correct headers', () => {
    render(<UsersTableView {...defaultProps} />)

    expect(screen.getByText('Nome')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Data de Criação')).toBeInTheDocument()
    expect(screen.getByText('Ações')).toBeInTheDocument()
  })

  it('should render all users in table rows', () => {
    render(<UsersTableView {...defaultProps} />)

    expect(screen.getAllByText('John Doe')).toHaveLength(2) // Avatar + name
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getAllByText('Jane Smith')).toHaveLength(2) // Avatar + name
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.getAllByText('Bob Johnson')).toHaveLength(2) // Avatar + name
    expect(screen.getByText('bob@example.com')).toBeInTheDocument()
  })

  it('should render user avatars with correct props', () => {
    render(<UsersTableView {...defaultProps} />)

    const avatars = screen.getAllByTestId('user-avatar')
    expect(avatars).toHaveLength(3)
    expect(avatars[0]).toHaveAttribute('data-name', 'John Doe')
    expect(avatars[0]).toHaveAttribute('data-size', 'md')
  })

  it('should render status pills with correct active state', () => {
    render(<UsersTableView {...defaultProps} />)

    const statusPills = screen.getAllByTestId('status-pill')
    expect(statusPills).toHaveLength(3)
    expect(statusPills[0]).toHaveAttribute('data-active', 'true')
    expect(statusPills[1]).toHaveAttribute('data-active', 'false')
    expect(statusPills[2]).toHaveAttribute('data-active', 'true')
  })

  // it('should render creation dates in Brazilian format', () => {
  //   render(<UsersTableView {...defaultProps} />)

  //   // As datas são formatadas como 31/12/2023, 01/01/2024, 02/01/2024
  //   expect(screen.getByText('31/12/2023')).toBeInTheDocument()
  //   expect(screen.getByText('01/01/2024')).toBeInTheDocument()
  //   expect(screen.getByText('02/01/2024')).toBeInTheDocument()
  // })

  it('should render pagination control with correct props', () => {
    render(<UsersTableView {...defaultProps} />)

    const pagination = screen.getByTestId('pagination-control')
    expect(pagination).toBeInTheDocument()
    expect(screen.getByTestId('previous-cursor')).toHaveTextContent('prev-cursor-456')
    expect(screen.getByTestId('next-cursor')).toHaveTextContent('next-cursor-123')
    expect(screen.getByTestId('has-next')).toHaveTextContent('true')
    expect(screen.getByTestId('has-previous')).toHaveTextContent('false')
  })

  it('should render skeleton rows when loading', () => {
    render(<UsersTableView {...defaultProps} isLoading={true} />)

    const skeletons = screen.getAllByTestId('user-table-skeleton')
    expect(skeletons).toHaveLength(5)
  })

  it('should not render user data when loading', () => {
    render(<UsersTableView {...defaultProps} isLoading={true} />)

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
  })

  it('should render empty message when no users', () => {
    render(<UsersTableView {...defaultProps} users={[]} />)

    expect(screen.getByText('Nenhum usuário encontrado.')).toBeInTheDocument()
  })

  it('should not render user data when empty', () => {
    render(<UsersTableView {...defaultProps} users={[]} />)

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
  })

  it('should render edit buttons for each user', () => {
    const onEditMock = vi.fn()
    render(<UsersTableView {...defaultProps} onEdit={onEditMock} />)

    const editButtons = screen.getAllByTitle('Editar usuário')
    expect(editButtons).toHaveLength(3)
  })

  it('should call onEdit when edit button is clicked', () => {
    const onEditMock = vi.fn()
    render(<UsersTableView {...defaultProps} onEdit={onEditMock} />)

    const editButtons = screen.getAllByTitle('Editar usuário')
    fireEvent.click(editButtons[0])

    expect(onEditMock).toHaveBeenCalledWith('1')
  })

  it('should render user status buttons for each user', () => {
    render(<UsersTableView {...defaultProps} />)

    const deactivateButtons = screen.getAllByTestId('deactivate-button')
    const activateButtons = screen.getAllByTestId('activate-button')

    // John Doe e Bob Johnson são ativos (2 botões de desativar)
    expect(deactivateButtons).toHaveLength(2)
    // Jane Smith é inativa (1 botão de ativar)
    expect(activateButtons).toHaveLength(1)
  })

  it('should render dialog with user form when edit is triggered', () => {
    const onEditMock = vi.fn()
    const selectedUser = mockUsers[0]
    render(
      <UsersTableView
        {...defaultProps}
        onEdit={onEditMock}
        selectedUser={selectedUser}
      />,
    )

    const editButton = screen.getAllByTitle('Editar usuário')[0]
    fireEvent.click(editButton)

    const dialogs = screen.getAllByTestId('dialog')
    expect(dialogs.length).toBeGreaterThan(0)
    expect(dialogs[0]).toHaveAttribute('data-title', 'Editar Usuário')
    expect(dialogs[0]).toHaveAttribute(
      'data-description',
      'Edite as informações do usuário',
    )
  })

  it('should render user form with selected user data', () => {
    const onEditMock = vi.fn()
    const selectedUser = mockUsers[0]
    render(
      <UsersTableView
        {...defaultProps}
        onEdit={onEditMock}
        selectedUser={selectedUser}
      />,
    )

    const editButton = screen.getAllByTitle('Editar usuário')[0]
    fireEvent.click(editButton)

    // Verifica se o formulário está presente (pode estar no dialog real ou no mock)
    const userForm = screen.queryByTestId('user-form')
    if (userForm) {
      expect(userForm).toBeInTheDocument()
      expect(screen.getByTestId('user-form-dto')).toHaveTextContent('1')
    } else {
      // Se não encontrar o mock, verifica se o formulário real está presente
      expect(screen.getAllByDisplayValue('John Doe')).toHaveLength(3) // Múltiplos formulários
      expect(screen.getAllByDisplayValue('john@example.com')).toHaveLength(3) // Múltiplos formulários
    }
  })

  it('should handle users without createdAt date', () => {
    const usersWithoutDate: UserDto[] = [
      UsersFaker.fakeDto({
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        createdAt: undefined,
      }),
    ]

    render(<UsersTableView {...defaultProps} users={usersWithoutDate} />)

    expect(screen.getByText('-')).toBeInTheDocument()
  })

  it('should handle users without isActive property', () => {
    const usersWithoutActive: UserDto[] = [
      UsersFaker.fakeDto({
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        isActive: undefined,
      }),
    ]

    render(<UsersTableView {...defaultProps} users={usersWithoutActive} />)

    const statusPill = screen.getByTestId('status-pill')
    expect(statusPill).toHaveAttribute('data-active', 'false')
  })

  it('should handle numeric user ids correctly', () => {
    const usersWithNumericId: UserDto[] = [
      UsersFaker.fakeDto({
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
      }),
    ]

    const onEditMock = vi.fn()
    render(
      <UsersTableView {...defaultProps} users={usersWithNumericId} onEdit={onEditMock} />,
    )

    const editButton = screen.getByTitle('Editar usuário')
    fireEvent.click(editButton)

    expect(onEditMock).toHaveBeenCalledWith('123')
  })

  it('should handle null cursors', () => {
    render(<UsersTableView {...defaultProps} nextCursor={null} previousCursor={null} />)

    expect(screen.getByTestId('next-cursor')).toHaveTextContent('null')
    expect(screen.getByTestId('previous-cursor')).toHaveTextContent('null')
  })

  it('should handle undefined pagination flags', () => {
    render(
      <UsersTableView
        {...defaultProps}
        hasNextPage={undefined}
        hasPreviousPage={undefined}
      />,
    )

    expect(screen.getByTestId('has-next')).toHaveTextContent('false')
    expect(screen.getByTestId('has-previous')).toHaveTextContent('false')
  })
})
