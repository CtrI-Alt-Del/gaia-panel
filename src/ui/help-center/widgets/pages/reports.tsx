import React from 'react'

export default function ReportsHelpPage() {
  return (
    <article className="prose prose-sm dark:prose-invert max-w-none">
      <h1>Relatórios</h1>

      <h2>O que são Relatórios?</h2>
      <p>
        Relatórios consolidam dados meteorológicos de um período específico,
        fornecendo análises estatísticas, gráficos e insights.
      </p>

      <h2>Tipos de Relatórios</h2>
      <ul>
        <li>Relatório Resumido: visão geral dos principais parâmetros</li>
        <li>Relatório Detalhado: análise completa e correlações</li>
        <li>Relatório de Anomalias: foco em eventos fora do padrão</li>
      </ul>

      <h2>Gerando Relatórios</h2>
      <ol>
        <li>Acesse a seção de Relatórios</li>
        <li>Selecione tipo e período</li>
        <li>Selecione estações e parâmetros</li>
        <li>Clique "Gerar Relatório"</li>
      </ol>

      <h2>Exportação</h2>
      <ul>
        <li>PDF: formato impresso</li>
        <li>CSV: dados brutos para análise</li>
        <li>JSON: integração</li>
      </ul>
    </article>
  )
}
