import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'

export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

export default function HelpCenterIndexRoute() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Central de Ajuda</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Telemetria</h2>
          <p className="text-gray-600 mb-4">
            Aprenda a monitorar suas estações e visualizar dados em tempo real.
          </p>
          <a 
            href="/help-center/telemetry" 
            className="text-blue-600 hover:underline font-medium"
          >
            Ver documentação de Telemetria →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Alertas</h2>
          <p className="text-gray-600 mb-4">
            Configure e gerencie alertas para monitorar suas estações.
          </p>
          <a 
            href="/help-center/alerting" 
            className="text-blue-600 hover:underline font-medium"
          >
            Ver documentação de Alertas →
          </a>
        </div>
      </div>
    </div>
  )
}
