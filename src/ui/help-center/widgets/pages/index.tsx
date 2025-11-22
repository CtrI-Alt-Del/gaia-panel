import React from 'react'

export default function HelpCenterIndexPage() {
  return (
    <article className="prose prose-sm dark:prose-invert max-w-none">
      <h1>Central de Ajuda</h1>

      <blockquote>
        <p>
          Bem-vindo à Central de Ajuda do sistema GAIA. Aqui você encontrará
          documentação completa sobre como utilizar cada funcionalidade do
          sistema.
        </p>
      </blockquote>

      <h2>Seções de Documentação</h2>
      <ul>
        <li>
          <a href="/help-center/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/help-center/stations">Estações</a>
        </li>
        <li>
          <a href="/help-center/parameters">Parâmetros</a>
        </li>
        <li>
          <a href="/help-center/reports">Relatórios</a>
        </li>
        <li>
          <a href="/help-center/alarms">Alarmes</a>
        </li>
        <li>
          <a href="/help-center/alerts">Alertas</a>
        </li>
        <li>
          <a href="/help-center/users">Usuários</a>
        </li>
      </ul>

      <h2>Dúvidas Frequentes</h2>

      <h3>Como faço para começar a usar o GAIA?</h3>
      <p>
        Comece visitando o Dashboard para visualizar os dados já disponibilizados.
        Em seguida, explore a seção de Estações para entender como os dados
        são coletados e configure suas preferências de visualização.
      </p>

      <h3>Qual é a diferença entre Alarmes e Alertas?</h3>
      <p>
        Alarmes são regras que você configura manualmente para disparar quando
        certas condições são atendidas. Alertas são notificações geradas
        automaticamente quando essas condições ocorrem.
      </p>
    </article>
  )
}
