import { RestMiddleware } from '@/app/middlewares/rest-middleware'
import { AuthMiddleware } from '@/app/middlewares/auth-middleware'
import { MembershipMiddleware } from '@/app/middlewares/membership-middleware'
import { useParams } from 'react-router'

export const middleware = [AuthMiddleware, RestMiddleware, MembershipMiddleware]

const docsContent: Record<string, Record<string, { title: string; content: string }>> = {
  telemetry: {
    dashboard: {
      title: 'Dashboard de Telemetria',
      content: `
# Dashboard de Telemetria

O Dashboard de Telemetria fornece uma visão geral do status das suas estações e parâmetros monitorados.

## Como usar

1. **Visão Geral**
   - Gráficos com métricas em tempo real
   - Status das estações (online/offline)
   - Alertas recentes

2. **Navegação**
   - Use o menu lateral para acessar diferentes seções
   - Filtre por estação ou período de tempo

3. **Personalização**
   - Arraste e solte os widgets para reorganizar
   - Clique em um widget para ver detalhes
`,
    },
    stations: {
      title: 'Gerenciamento de Estações',
      content: `
# Gerenciamento de Estações

Gerencie todas as suas estações de monitoramento em um único lugar.

## Adicionar uma nova estação

1. Clique em "Adicionar Estação"
2. Preencha os detalhes da estação
3. Configure os parâmetros a serem monitorados
4. Clique em "Salvar"

## Visualizar dados da estação

- Clique em uma estação para ver detalhes
- Visualize gráficos de histórico
- Verifique o status atual dos sensores
`,
    },
  },
  alerting: {
    alerts: {
      title: 'Gerenciamento de Alertas',
      content: `
# Gerenciamento de Alertas

Configure alertas para ser notificado sobre condições importantes nas suas estações.

## Criar um alerta

1. Navegue até a seção de Alertas
2. Clique em "Novo Alerta"
3. Selecione a estação e o parâmetro
4. Defina as condições do alerta
5. Escolha os canais de notificação

## Tipos de alerta

- **Limite**: Alerta quando um valor ultrapassa um limite definido
- **Mudança repentina**: Alerta para variações bruscas nos valores
- **Inatividade**: Alerta quando não há atualizações de uma estação
`,
    },
  },
}

export default function HelpCenterDocRoute() {
  const { category, doc } = useParams<{ category: string; doc: string }>()
  
  const content = category && doc ? docsContent[category]?.[doc] : null
  
  if (!content) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800">Documentação não encontrada</h1>
        <p className="mt-2 text-gray-600">A página que você está procurando não existe ou foi movida.</p>
        <a 
          href="/help-center" 
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Voltar para a Central de Ajuda
        </a>
      </div>
    )
  }

  return (
    <article className="prose max-w-none">
      <h1>{content.title}</h1>
      <div 
        className="prose prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: content.content.replace(/\n/g, '<br />') }}
      />
      <div className="mt-8 pt-6 border-t border-gray-200">
        <a 
          href={`/help-center/${category}`} 
          className="text-blue-600 hover:underline font-medium"
        >
          ← Voltar para {category === 'telemetry' ? 'Telemetria' : 'Alertas'}
        </a>
      </div>
    </article>
  )
}
