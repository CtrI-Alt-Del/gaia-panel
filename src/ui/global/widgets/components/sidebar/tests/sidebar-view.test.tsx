import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { SidebarView } from '../sidebar-view'
import { MemoryRouter } from 'react-router'

// Mock do componente UserInfo
vi.mock('../../user-info', () => ({
  UserInfo: () => <div data-testid='user-info'>User Info Component</div>,
}))

// Mock dos componentes do shadcn
vi.mock('@/ui/shadcn/components/sidebar', () => ({
  Sidebar: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div data-testid='sidebar' className={className}>
      {children}
    </div>
  ),
  SidebarContent: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div data-testid='sidebar-content' className={className}>
      {children}
    </div>
  ),
  SidebarFooter: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div data-testid='sidebar-footer' className={className}>
      {children}
    </div>
  ),
  SidebarHeader: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div data-testid='sidebar-header' className={className}>
      {children}
    </div>
  ),
  SidebarMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='sidebar-menu'>{children}</div>
  ),
}))

// Mock do componente SidebarItem
vi.mock('../sidebar-item', () => ({
  SidebarItem: ({
    icon,
    label,
    href,
    isActive,
  }: {
    icon: React.ReactNode
    label: string
    href: string
    isActive: boolean
  }) => (
    <div data-testid={`sidebar-item-${href.replace('/', '')}`} data-active={isActive}>
      {icon}
      {label}
    </div>
  ),
}))

describe('SidebarView Component', () => {
  const defaultProps = {
    currentPath: '/dashboard',
    isUserOwner: false,
  }

  it('should render sidebar with correct structure', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar-header')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar-content')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar-footer')).toBeInTheDocument()
  })

  it('should render logo in header', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} />
      </MemoryRouter>,
    )

    const logo = screen.getByAltText('Gaia')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '../../../../../public/images/gaia-logo.png')
    expect(logo).toHaveAttribute('width', '96')
    expect(logo).toHaveAttribute('height', '96')
  })

  it('should render all main menu items', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} />
      </MemoryRouter>,
    )

    // Dashboard
    expect(screen.getByTestId('sidebar-item-dashboard')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()

    // Reports
    expect(screen.getByTestId('sidebar-item-reports')).toBeInTheDocument()
    expect(screen.getByText('Relatórios')).toBeInTheDocument()

    // Stations
    expect(screen.getByTestId('sidebar-item-stations')).toBeInTheDocument()
    expect(screen.getByText('Estações')).toBeInTheDocument()

    // Parameters
    expect(screen.getByTestId('sidebar-item-parameters')).toBeInTheDocument()
    expect(screen.getByText('Parâmetros')).toBeInTheDocument()

    // Alarms
    expect(screen.getByTestId('sidebar-item-alarms')).toBeInTheDocument()
    expect(screen.getByText('Alarmes')).toBeInTheDocument()

    // Alerts
    expect(screen.getByTestId('sidebar-item-alerts')).toBeInTheDocument()
    expect(screen.getByText('Alertas')).toBeInTheDocument()
  })

  it('should render user info in footer', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('user-info')).toBeInTheDocument()
  })

  it('should show users section when user is owner', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} isUserOwner={true} />
      </MemoryRouter>,
    )

    const usersItem = screen.getByTestId('sidebar-item-users')
    expect(usersItem).toBeInTheDocument()
    expect(screen.getByText('Usuários')).toBeInTheDocument()

    const alertsItem = screen.getByTestId('sidebar-item-alerts')
    expect(alertsItem).toBeInTheDocument()
  })

  it('should not show users section when user is not owner', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} isUserOwner={false} />
      </MemoryRouter>,
    )

    const alertsItem = screen.getByTestId('sidebar-item-alerts')
    expect(alertsItem).toBeInTheDocument()
    expect(screen.queryByTestId('sidebar-item-users')).not.toBeInTheDocument()
    expect(screen.queryByText('Usuários')).not.toBeInTheDocument()
  })

  it('should mark correct item as active based on current path', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} currentPath='/dashboard' />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('sidebar-item-dashboard')).toHaveAttribute(
      'data-active',
      'true',
    )
    expect(screen.getByTestId('sidebar-item-reports')).toHaveAttribute(
      'data-active',
      'false',
    )
    expect(screen.getByTestId('sidebar-item-stations')).toHaveAttribute(
      'data-active',
      'false',
    )
  })

  it('should mark reports item as active when current path is reports', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} currentPath='/reports' />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('sidebar-item-dashboard')).toHaveAttribute(
      'data-active',
      'false',
    )
    expect(screen.getByTestId('sidebar-item-reports')).toHaveAttribute(
      'data-active',
      'true',
    )
  })

  it('should mark stations item as active when current path is stations', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} currentPath='/stations' />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('sidebar-item-stations')).toHaveAttribute(
      'data-active',
      'true',
    )
    expect(screen.getByTestId('sidebar-item-parameters')).toHaveAttribute(
      'data-active',
      'false',
    )
  })

  it('should mark parameters item as active when current path is parameters', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} currentPath='/parameters' />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('sidebar-item-parameters')).toHaveAttribute(
      'data-active',
      'true',
    )
    expect(screen.getByTestId('sidebar-item-alarms')).toHaveAttribute(
      'data-active',
      'false',
    )
  })

  it('should mark alarms item as active when current path is alarms', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} currentPath='/alarms' />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('sidebar-item-alarms')).toHaveAttribute(
      'data-active',
      'true',
    )
    expect(screen.getByTestId('sidebar-item-alerts')).toHaveAttribute(
      'data-active',
      'false',
    )
  })

  it('should mark alerts item as active when current path is alerts', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} currentPath='/alerts' />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('sidebar-item-alerts')).toHaveAttribute(
      'data-active',
      'true',
    )
    expect(screen.getByTestId('sidebar-item-alarms')).toHaveAttribute(
      'data-active',
      'false',
    )
  })

  it('should mark users item as active when current path is users and user is owner', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} currentPath='/users' isUserOwner={true} />
      </MemoryRouter>,
    )

    const usersItem = screen.getByTestId('sidebar-item-users')
    const alertsItem = screen.getByTestId('sidebar-item-alerts')

    expect(usersItem).toHaveAttribute('data-active', 'true')
    expect(alertsItem).toHaveAttribute('data-active', 'false')
  })

  it('should apply correct CSS classes to sidebar', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} />
      </MemoryRouter>,
    )

    const sidebar = screen.getByTestId('sidebar')
    expect(sidebar).toHaveClass('w-64', 'bg-card', 'min-h-screen')
  })

  it('should apply correct CSS classes to sidebar header', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} />
      </MemoryRouter>,
    )

    const header = screen.getByTestId('sidebar-header')
    expect(header).toHaveClass('p-6', 'bg-card')
  })

  it('should apply correct CSS classes to sidebar content', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} />
      </MemoryRouter>,
    )

    const content = screen.getByTestId('sidebar-content')
    expect(content).toHaveClass('bg-card', 'px-3')
  })

  it('should apply correct CSS classes to sidebar footer', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} />
      </MemoryRouter>,
    )

    const footer = screen.getByTestId('sidebar-footer')
    expect(footer).toHaveClass('p-4', 'bg-card', 'border-card')
  })

  it('should render all sidebar menus', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} />
      </MemoryRouter>,
    )

    const menus = screen.getAllByTestId('sidebar-menu')
    expect(menus).toHaveLength(3) // 3 seções de menu quando usuário não é owner
  })

  it('should render all sidebar menus when user is owner', () => {
    render(
      <MemoryRouter>
        <SidebarView {...defaultProps} isUserOwner={true} />
      </MemoryRouter>,
    )

    const menus = screen.getAllByTestId('sidebar-menu')
    expect(menus).toHaveLength(4) // 4 seções de menu quando usuário é owner
  })

  it('should render separators between menu sections', () => {
    const { container } = render(
      <MemoryRouter>
        <SidebarView {...defaultProps} />
      </MemoryRouter>,
    )

    // The separators are div elements with specific classes, not elements with role="separator"
    const separators = container.querySelectorAll('.h-px.bg-purple-200.my-4')
    expect(separators).toHaveLength(3) // 3 separadores entre as 4 seções
  })
})
