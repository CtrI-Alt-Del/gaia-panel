import { Outlet, useLocation } from 'react-router'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { ROUTES } from '@/core/global/constants/routes'

export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

// Esta rota é apenas um wrapper que renderiza o layout da Central de Ajuda
// As rotas filhas são carregadas automaticamente pelo React Router
// com base na estrutura de pastas

export default function HelpCenterRoute() {
  // Força a renderização do layout mesmo sem rotas filhas
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Central de Ajuda</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <a 
                href={ROUTES.helpCenter.index} 
                className={`block px-4 py-2 rounded-md font-medium ${
                  window.location.pathname === ROUTES.helpCenter.index
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Início
              </a>
            </li>
            <li className="mt-6">
              <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Telemetria
              </h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <a 
                    href={`${ROUTES.helpCenter.index}/telemetry/dashboard`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a 
                    href={`${ROUTES.helpCenter.index}/telemetry/stations`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Estações
                  </a>
                </li>
                <li>
                  <a 
                    href={`${ROUTES.helpCenter.index}/telemetry/parameters`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Parâmetros
                  </a>
                </li>
              </ul>
            </li>
            <li className="mt-6">
              <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Alertas
              </h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <a 
                    href={`${ROUTES.helpCenter.index}/alerting/alarms`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Alarmes
                  </a>
                </li>
                <li>
                  <a 
                    href={`${ROUTES.helpCenter.index}/alerting/alerts`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Alertas
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
