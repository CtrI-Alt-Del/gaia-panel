import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { useParams, Link } from 'react-router'
import { ROUTES } from '@/core/global/constants/routes'

export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

export default function HelpCenterCategoryRoute() {
  const { category } = useParams<{ category: string }>()
  
  const categoryTitles: Record<string, string> = {
    telemetry: 'Telemetria',
    alerting: 'Alertas',
  }

  const categoryDescriptions: Record<string, string> = {
    telemetry: 'Aprenda a monitorar suas estações e visualizar dados em tempo real.',
    alerting: 'Configure e gerencie alertas para monitorar suas estações.',
  }
  
  // Garantir que category não seja undefined
  if (!category || !(category in categoryTitles)) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800">Categoria não encontrada</h1>
        <p className="mt-2 text-gray-600">A categoria especificada não existe ou não está disponível.</p>
        <Link 
          to={ROUTES.helpCenter.index}
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Voltar para a Central de Ajuda
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{categoryTitles[category]}</h1>
      <p className="text-gray-600 mb-8">{categoryDescriptions[category]}</p>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Documentação disponível</h2>
        <p className="text-gray-600 mb-4">
          Selecione um tópico abaixo para visualizar a documentação detalhada:
        </p>
      </div>
      
      {category === 'telemetry' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-3">Dashboard</h3>
            <p className="text-gray-600 mb-4">
              Aprenda a usar o dashboard para monitorar suas estações e visualizar métricas em tempo real.
            </p>
            <Link 
              to={`${ROUTES.helpCenter.index}/telemetry/dashboard`}
              className="inline-flex items-center text-blue-600 hover:underline font-medium"
            >
              Ver documentação <span className="ml-1">→</span>
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">Estações</h2>
            <p className="text-gray-600 mb-4">
              Gerencie suas estações e visualize dados detalhados de cada uma delas.
            </p>
            <a 
              href="/help-center/telemetry/stations" 
              className="text-blue-600 hover:underline font-medium"
            >
              Ver guia de Estações →
            </a>
          </div>
        </div>
      )}
      
      {category === 'alerting' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">Gerenciar Alertas</h2>
            <p className="text-gray-600 mb-4">
              Aprenda a criar e gerenciar alertas para monitorar suas estações.
            </p>
            <a 
              href="/help-center/alerting/alerts" 
              className="text-blue-600 hover:underline font-medium"
            >
              Ver guia de Alertas →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
