export default function StationsHelpRoute() {
  return (
    <div className="stations-help prose prose-sm max-w-none dark:prose-invert">
      <h1>Estações - Central de Ajuda</h1>
      <h2>O que é uma Estação?</h2>
      <p>
        Uma estação meteorológica é um dispositivo físico equipado com sensores que coleta dados
        ambientais contínuamente. No sistema GAIA, cada estação transmite seus dados para a
        plataforma web.
      </p>
      <h2>Gerenciamento de Estações</h2>
      <h3>Visualizar Estações</h3>
      <ol>
        <li>Navegue até a seção "Estações"</li>
        <li>Você verá lista com todas as estações disponíveis</li>
        <li>Informações: Nome, Localização, Status, Última transmissão, Sensores</li>
      </ol>
      <h3>Criar Nova Estação (Admin)</h3>
      <ol>
        <li>Clique em "Nova Estação"</li>
        <li>Preencha dados: Nome, Localização, Descrição</li>
        <li>Configure sensores disponíveis</li>
        <li>Clique em "Salvar"</li>
      </ol>
      <h2>Status de Estação</h2>
      <ul>
        <li>🟢 Online: Estação transmitindo dados</li>
        <li>🔴 Offline: Desconectada ou com problemas</li>
        <li>🟡 Manutenção: Temporariamente indisponível</li>
      </ul>
      <h2>Dicas</h2>
      <ul>
        <li>Localize estrategicamente estações</li>
        <li>Realize manutenção regular</li>
        <li>Mantenha sensores calibrados</li>
        <li>Considere redundância para cobertura</li>
      </ul>
    </div>
  )
}
