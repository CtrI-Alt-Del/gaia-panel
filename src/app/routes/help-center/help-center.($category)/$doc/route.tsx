import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { useParams, Link } from 'react-router'
import { ROUTES } from '@/core/global/constants/routes'

export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

const docsContent: Record<string, Record<string, { title: string; content: string }>> = {
  telemetry: {
    dashboard: {
      title: 'Dashboard de Telemetria',
      content: 'O dashboard de telemetria fornece uma visão geral das suas estações e métricas importantes em tempo real.'
    },
    stations: {
      title: 'Gerenciamento de Estações',
      content: 'Aprenda a gerenciar suas estações de monitoramento e visualizar dados detalhados.'
    },
    parameters: {
      title: 'Parâmetros de Telemetria',
      content: 'Configure e visualize os parâmetros de telemetria das suas estações.'
    }
  },
  alerting: {
    alarms: {
      title: 'Configuração de Alarmes',
      content: 'Aprenda a configurar e gerenciar alarmes para monitorar suas estações.'
    },
    alerts: {
      title: 'Gerenciamento de Alertas',
      content: 'Visualize e gerencie os alertas gerados pelo sistema.'
    }
  }
}

export default function HelpCenterDocRoute() {
  const { category, doc } = useParams<{ category: string; doc: string }>()
  
  // Verifica se a categoria e o documento existem
  if (!category || !doc || !docsContent[category]?.[doc]) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800">Documentação não encontrada</h1>
        <p className="mt-2 text-gray-600">O documento solicitado não existe ou não está disponível.</p>
        <Link 
          to={ROUTES.helpCenter.index}
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Voltar para a Central de Ajuda
        </Link>
      </div>
    )
  }

  const { title, content } = docsContent[category][doc]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow">
        <Link 
          to={`${ROUTES.helpCenter.index}/${category}`}
          className="inline-flex items-center text-blue-600 hover:underline mb-6"
        >
          ← Voltar para {category === 'telemetry' ? 'Telemetria' : 'Alertas'}
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">{content}</p>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Informações adicionais</h2>
            <p className="text-gray-600">
              Esta documentação está em constante atualização. Se precisar de ajuda adicional, entre em contato com nosso suporte.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
