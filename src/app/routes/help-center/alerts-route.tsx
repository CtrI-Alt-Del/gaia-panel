export default function AlertsHelpRoute() {
  return (
    <div className="alerts-help prose prose-sm max-w-none dark:prose-invert">
      <h1>Alertas - Central de Ajuda</h1>
      <h2>O que é um Alerta?</h2>
      <p>
        Um alerta é uma notificação automática gerada quando uma condição crítica é detectada.
      </p>
      <h2>Ciclo de Vida</h2>
      <ol>
        <li>Condição Atingida</li>
        <li>Alarme Dispara</li>
        <li>Alerta Gerado</li>
        <li>Notificação Enviada</li>
        <li>Alerta Resolvido</li>
      </ol>
      <h2>Estados de um Alerta</h2>
      <h3>🔴 Ativo</h3>
      <p>Condição presente - Requer ação imediata</p>
      <h3>🟡 Pendente</h3>
      <p>Reconhecido - Ação em progresso</p>
      <h3>🟢 Resolvido</h3>
      <p>Condição normalizada</p>
      <h2>Gerenciando Alertas</h2>
      <h3>Visualizar Alertas</h3>
      <ol>
        <li>Dashboard ou "Alertas"</li>
        <li>Veja lista em tempo real</li>
      </ol>
      <h3>Reconhecer Alerta</h3>
      <ol>
        <li>Clique em alerta</li>
        <li>Leia detalhes</li>
        <li>Clique "Reconhecer"</li>
        <li>Adicione comentário</li>
      </ol>
      <h3>Resolver Alerta</h3>
      <p>Após resolver causa, clique "Resolver"</p>
      <h2>Canais de Notificação</h2>
      <ul>
        <li>No Sistema: Badge, popup</li>
        <li>Email</li>
        <li>SMS</li>
        <li>Slack/Teams</li>
      </ul>
      <h2>Boas Práticas</h2>
      <ul>
        <li>Responda prontamente</li>
        <li>Investigue causas raiz</li>
        <li>Comunique com equipe</li>
        <li>Mantenha registros</li>
      </ul>
    </div>
  )
}
