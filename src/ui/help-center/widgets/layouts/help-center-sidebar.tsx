import { NavLink } from 'react-router'
import { ROUTES } from '@/core/global/constants/routes'

interface NavItem {
  label: string
  path: string
  children?: NavItem[]
}

const navigationItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: ROUTES.helpCenter.dashboard,
  },
  {
    label: 'Estações',
    path: ROUTES.helpCenter.stations,
  },
  {
    label: 'Parâmetros',
    path: ROUTES.helpCenter.parameters,
  },
  {
    label: 'Relatórios',
    path: ROUTES.helpCenter.reports,
  },
  {
    label: 'Alarmes',
    path: ROUTES.helpCenter.alarms,
  },
  {
    label: 'Alertas',
    path: ROUTES.helpCenter.alerts,
  },
  {
    label: 'Gerenciamento de Usuários',
    path: ROUTES.helpCenter.users,
  },
]

export function HelpCenterSidebar() {
  return (
    <aside className="help-center-sidebar w-64 border-r border-gray-200 py-6 px-4">
      <nav className="space-y-2">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">Central de Ajuda</h2>
          <p className="text-sm text-gray-600 mt-1">Manual do usuário GAIA</p>
        </div>

        <NavLink
          to={ROUTES.helpCenter.index}
          className={({ isActive }) =>
            `block py-2 px-3 rounded-md transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          Página Inicial
        </NavLink>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Documentação
          </p>

          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block py-2 px-3 rounded-md transition-colors text-sm ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  )
}
