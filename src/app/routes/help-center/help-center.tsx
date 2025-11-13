import type { ReactNode } from 'react'
import { Outlet, useLocation } from 'react-router'
import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { ROUTES } from '@/core/global/constants/routes'

export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

interface HelpCenterLayoutProps {
  children?: ReactNode
}

export default function HelpCenterLayout({ children }: HelpCenterLayoutProps) {
  const location = useLocation()
  const isActive = (path: string) => location.pathname.startsWith(path)
  // Se não houver children, renderiza o Outlet para o roteamento aninhado
  if (!children) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Central de Ajuda</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/help-center" 
                  className="block px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md font-medium"
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
                      href="/help-center/telemetry/dashboard" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/help-center/telemetry/stations" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Estações
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/help-center/telemetry/parameters" 
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
                      href="/help-center/alerting/alarms" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Alarmes
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/help-center/alerting/alerts" 
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
          {children || <Outlet />}
        </div>
      </div>
    )
  }

  // Se houver children, renderiza o layout com as children
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
                  isActive(ROUTES.helpCenter.index)
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
                    href="/help-center/telemetry/dashboard" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a 
                    href="/help-center/telemetry/stations" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Estações
                  </a>
                </li>
                <li>
                  <a 
                    href="/help-center/telemetry/parameters" 
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
                    href="/help-center/alerting/alerts" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Gerenciar Alertas
                  </a>
                </li>
                <li>
                  <a 
                    href="/help-center/alerting/notifications" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Notificações
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
