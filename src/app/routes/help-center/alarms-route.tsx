export default function AlarmsHelpRoute() {
  return (
    <div className="alarms-help prose prose-sm max-w-none dark:prose-invert">
      <h1>Alarmes - Central de Ajuda</h1>
      <h2>O que é um Alarme?</h2>
      <p>Um alarme é uma regra que dispara uma ação quando uma condição específica é atendida.</p>
      <h2>Diferença entre Alarmes e Alertas</h2>
      <table>
        <thead>
          <tr>
            <th>Aspecto</th>
            <th>Alarmes</th>
            <th>Alertas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Criação</td>
            <td>Manualmente</td>
            <td>Automaticamente</td>
          </tr>
          <tr>
            <td>Disparo</td>
            <td>Regras definidas</td>
            <td>Alarme dispara</td>
          </tr>
          <tr>
            <td>Controle</td>
            <td>Usuário</td>
            <td>Sistema</td>
          </tr>
        </tbody>
      </table>
      <h2>Componentes de um Alarme</h2>
      <h3>1. Condição</h3>
      <p>Regra monitorada: Parâmetro, Operador, Valor</p>
      <h3>2. Ação</h3>
      <p>Notificação, Email, SMS, Webhook, Log</p>
      <h3>3. Severidade</h3>
      <ul>
        <li>🔵 Informacional: Registro apenas</li>
        <li>🟡 Aviso: Requer atenção</li>
        <li>🔴 Crítico: Ação imediata</li>
      </ul>
      <h2>Criando um Alarme</h2>
      <ol>
        <li>Menu → "Alarmes"</li>
        <li>Clique "Novo Alarme"</li>
        <li>Defina informações básicas</li>
        <li>Configure condição</li>
        <li>Configure ações</li>
        <li>Clique "Salvar"</li>
      </ol>
      <h2>Boas Práticas</h2>
      <ul>
        <li>Evite alarmes redundantes</li>
        <li>Revise thresholds periodicamente</li>
        <li>Teste alarmes</li>
        <li>Documente decisões</li>
      </ul>
    </div>
  )
}
