export default function ReportsHelpRoute() {
  return (
    <div className="reports-help prose prose-sm max-w-none dark:prose-invert">
      <h1>Relatórios - Central de Ajuda</h1>
      <h2>O que são Relatórios?</h2>
      <p>
        Relatórios consolidam dados meteorológicos de um período específico, fornecendo análises
        estatísticas, gráficos e insights.
      </p>
      <h2>Tipos de Relatórios</h2>
      <h3>Relatório Resumido</h3>
      <ul>
        <li>Visão geral dos principais parâmetros</li>
        <li>Período: Diário, semanal ou mensal</li>
      </ul>
      <h3>Relatório Detalhado</h3>
      <ul>
        <li>Análise completa com todos parâmetros</li>
        <li>Correlações entre variáveis</li>
      </ul>
      <h3>Relatório de Anomalias</h3>
      <ul>
        <li>Eventos fora do padrão</li>
        <li>Dias com extremos</li>
      </ul>
      <h2>Gerando Relatórios</h2>
      <ol>
        <li>Acesse seção de Relatórios</li>
        <li>Selecione tipo de relatório</li>
        <li>Escolha período (data inicial e final)</li>
        <li>Selecione estações e parâmetros</li>
        <li>Clique "Gerar Relatório"</li>
      </ol>
      <h2>Exportação</h2>
      <ul>
        <li>PDF: Relatório formatado para impressão</li>
        <li>CSV: Dados para análise em Excel</li>
        <li>JSON: Integração com outros sistemas</li>
      </ul>
    </div>
  )
}
