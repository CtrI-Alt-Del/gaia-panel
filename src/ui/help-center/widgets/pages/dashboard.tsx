import React from 'react';
import { Activity, AlertTriangle, Zap, Map, BarChart2, List, Thermometer } from 'lucide-react';

export default function DashboardHelpPage() {
  return (
    <article className="mx-auto px-4 py-8 bg-white sm:px-6 lg:px-8 text-slate-700 leading-relaxed">
      
      {/* Cabeçalho do Manual */}
      <header className="mb-10 border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Dashboard
        </h1>
        <p className="text-xl text-slate-500 font-light">
          Visão geral da operação, indicadores de saúde da rede e monitoramento de alertas em tempo real.
        </p>
      </header>

      {/* SEÇÃO 1: KPIs e Métricas */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          1. Indicadores de Performance (KPIs)
        </h2>
        <p className="mb-4">
          Localizados no topo da página, estes quatro cartões fornecem um diagnóstico instantâneo da rede de monitoramento.
        </p>

        {/* Placeholder para a Imagem 1 (Topo) */}
        {/* <figure className="my-6">
          <img 
            src={require('../../assets/manual/dashboard-kpis.jpg')} 
            alt="Print dos cartões de KPI e Gráfico" 
            className="rounded-xl border border-slate-200 shadow-lg w-full" 
          />
          <figcaption className="text-sm text-slate-500 text-center mt-2 italic">
            Figura 1: Visão superior do Dashboard com KPIs e Mapa.
          </figcaption>
        </figure> 
        */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-purple-500" /> Total de Estações
            </h3>
            <p className="text-sm text-slate-600">
              Exibe o número absoluto de estações cadastradas no sistema, independentemente do seu status atual.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-green-500" /> % Estações Ativas
            </h3>
            <p className="text-sm text-slate-600">
              Representa a saúde da rede. Indica a porcentagem de estações que estão comunicando dados corretamente neste momento.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" /> Alertas de Avisos
            </h3>
            <p className="text-sm text-slate-600">
              Contador de ocorrências de nível <strong>Médio</strong> (Amarelo). Geralmente indicam parâmetros fora do ideal, mas que não representam risco imediato.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-red-500" /> Alertas Críticos
            </h3>
            <p className="text-sm text-slate-600">
              Contador de ocorrências de nível <strong>Alto</strong> (Vermelho). Exige atenção imediata da operação.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-slate-100 my-8" />

      {/* SEÇÃO 2: Gráficos e Mapas */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          2. Análise Geográfica e Temporal
        </h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-indigo-600" /> Histórico e Evolução de Alertas
            </h3>
            <p className="mb-3">
              Este gráfico de linha permite visualizar a tendência de disparos de alertas ao longo do tempo.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-600">
              <li><strong>Filtros Temporais:</strong> Utilize os botões no canto superior do gráfico para alternar entre visão semanal ("Dias da Semana") ou anual ("Meses do Ano").</li>
              <li><strong>Tendência:</strong> O sistema calcula automaticamente se a quantidade de alertas está subindo, descendo ou estável (ex: "Tendência Sem variação").</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Map className="w-5 h-5 text-indigo-600" /> Mapa das Estações
            </h3>
            <p>
              Um mapa interativo que plota a localização exata de todas as estações.
              Você pode usar os controles <strong>(+)</strong> e <strong>(-)</strong> para dar zoom e visualizar a densidade de estações em regiões específicas (ex: clusters em Minas Gerais e Goiás).
            </p>
          </div>
        </div>
      </section>

      <hr className="border-slate-100 my-8" />

      {/* SEÇÃO 3: Detalhamento (Parte de Baixo) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          3. Monitoramento Detalhado
        </h2>
        <p className="mb-6">
          A parte inferior do Dashboard é dividida em duas colunas essenciais para a operação diária: Gestão de Incidentes e Auditoria de Dados.
        </p>

        {/* Placeholder para a Imagem 2 (Parte inferior) */}
        {/* <figure className="my-6">
          <img 
            src={require('../../assets/manual/dashboard-bottom.png')} 
            alt="Listagem de Alertas Recentes e Tabela de Medições" 
            className="rounded-xl border border-slate-200 shadow-lg w-full" 
          />
          <figcaption className="text-sm text-slate-500 text-center mt-2 italic">
            Figura 2: Área inferior com lista de alertas e tabela de medições.
          </figcaption>
        </figure> 
        */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Coluna da Esquerda: Alertas */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-yellow-400 pl-3">
              Alertas Recentes (24h)
            </h3>
            <p className="text-sm mb-4">
              Lista cronológica das últimas ocorrências. Cada cartão exibe:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3 bg-white p-3 rounded border border-slate-200 shadow-sm">
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold h-fit">Aviso</span>
                <div className="text-sm">
                  <strong>Alertas Amarelos:</strong> Indicam desvios de padrão (ex: Umidade relativa em 21% ou Pressão em 74 hPa).
                </div>
              </li>
              <li className="flex gap-3 bg-white p-3 rounded border border-slate-200 shadow-sm">
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold h-fit">Crítico</span>
                <div className="text-sm">
                  <strong>Alertas Vermelhos:</strong> Situações extremas (ex: Temperatura caindo drasticamente para 12°C em curto período).
                </div>
              </li>
            </ul>
            <p className="text-xs text-slate-500 mt-3">
              * Cada card mostra o nome da regra (ex: "orchestrate"), a estação afetada e há quanto tempo ocorreu.
            </p>
          </div>

          {/* Coluna da Direita: Medições */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-indigo-500 pl-3">
              Últimas Medições
            </h3>
            <p className="text-sm mb-4">
              Uma tabela em tempo real mostrando os dados brutos que chegam ao servidor.
            </p>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-slate-50 font-semibold text-slate-700">
                  <tr>
                    <th className="px-3 py-2">Parâmetro</th>
                    <th className="px-3 py-2">Descrição</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-3 py-2 font-medium text-slate-900">Estação</td>
                    <td className="px-3 py-2 text-slate-600">Origem do dado (Nome da estação).</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-slate-900">Parâmetro</td>
                    <td className="px-3 py-2 text-slate-600">Tipo de sensor (Temperatura, Pluviosidade, Vento, etc).</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-slate-900">Valor/Unid.</td>
                    <td className="px-3 py-2 text-slate-600">A leitura numérica e sua unidade de medida (mm, °C, m/s).</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded">
              <List className="w-4 h-4" />
              <span>Use a barra de rolagem inferior para visualizar todas as colunas da tabela.</span>
            </div>
          </div>

        </div>
      </section>

    </article>
  );
}