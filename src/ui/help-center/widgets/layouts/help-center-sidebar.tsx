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
    label: 'Notificações',
    path: ROUTES.helpCenter.notifications,
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
    <aside className="help-center-sidebar w-64 border-r border-gray-200 py-6 px-4 flex flex-col h-full bg-white">
      <nav className="space-y-2 flex-1">
        <div className="mb-8 px-2">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Central de Ajuda</h2>
          <p className="text-sm text-slate-500 mt-1">Manual do usuário GAIA</p>
        </div>

        {/* A propriedade 'end' garante que o link "Página Inicial" 
            só fique ativo se a rota for EXATAMENTE a raiz.
        */}
        <NavLink
          to={ROUTES.helpCenter.index}
          end
          className={({ isActive }) =>
            `block py-2.5 px-3 rounded-lg transition-all font-medium ${
              isActive
                ? 'bg-purple-100 text-purple-700 shadow-sm ring-1 ring-purple-200'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`
          }
        >
          Página Inicial
        </NavLink>

        <div className="mt-8 pt-4 border-t border-slate-100">
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Documentação
          </p>

          <div className="space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-lg transition-colors text-sm font-medium ${
                    isActive
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  )
}
