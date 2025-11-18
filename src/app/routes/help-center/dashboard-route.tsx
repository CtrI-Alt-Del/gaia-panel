export default function DashboardHelpRoute() {
  return (
    <div className="dashboard-help prose prose-sm max-w-none dark:prose-invert">
      <h1>Dashboard - Central de Ajuda</h1>

      <h2>O que é o Dashboard?</h2>
      <p>
        O Dashboard é a página principal do sistema GAIA onde você pode visualizar todos os dados
        meteorológicos coletados em tempo real. É um painel interativo que oferece uma visão geral
        rápida das condições atmosféricas monitoradas.
      </p>

      <h2>Principais Funcionalidades</h2>

      <h3>1. Visualização de Dados em Tempo Real</h3>
      <ul>
        <li>Gráficos interativos que atualizam automaticamente</li>
        <li>Múltiplos parâmetros meteorológicos simultâneos</li>
        <li>Filtros para selecionar períodos específicos</li>
      </ul>

      <h3>2. Cards de Resumo</h3>
      <p>Cada parâmetro é exibido em um card mostrando:</p>
      <ul>
        <li>Valor atual</li>
        <li>Valores máximo e mínimo do período</li>
        <li>Tendência (seta indicando aumento ou diminuição)</li>
        <li>Unidade de medida</li>
      </ul>

      <h3>3. Seleção de Estações</h3>
      <ul>
        <li>Dropdown para escolher qual estação deseja monitorar</li>
        <li>Visualização simultânea de múltiplas estações (se configurado)</li>
        <li>Indicador de status online/offline das estações</li>
      </ul>

      <h2>Como Usar</h2>

      <h3>Acessando o Dashboard</h3>
      <ol>
        <li>Faça login no sistema GAIA</li>
        <li>Você será redirecionado automaticamente para o Dashboard</li>
        <li>A página carregará os dados da sua estação padrão</li>
      </ol>

      <h3>Alterando a Estação</h3>
      <ol>
        <li>Clique no dropdown "Selecionar Estação" no topo</li>
        <li>Escolha a estação desejada</li>
        <li>Os dados serão atualizados automaticamente</li>
      </ol>

      <h3>Personalizando o Período</h3>
      <ol>
        <li>Use os filtros de data na parte superior</li>
        <li>
          Selecione "Últimas 24 horas", "Últimos 7 dias", "Últimos 30 dias" ou "Personalizado"
        </li>
        <li>Se escolher "Personalizado", selecione as datas inicial e final desejadas</li>
      </ol>

      <h3>Interagindo com Gráficos</h3>
      <ul>
        <li>
          <strong>Hover</strong>: Passe o mouse sobre o gráfico para ver valores precisos
        </li>
        <li>
          <strong>Zoom</strong>: Clique e arraste para ampliar uma seção específica
        </li>
        <li>
          <strong>Pan</strong>: Use a barra inferior para navegar pelo gráfico
        </li>
        <li>
          <strong>Reset</strong>: Clique no ícone de reset para voltar à visualização original
        </li>
      </ul>

      <h2>Interpretando os Dados</h2>

      <h3>Parâmetros Comuns</h3>
      <ul>
        <li>
          <strong>Temperatura</strong>: Medida em °C (Celsius)
        </li>
        <li>
          <strong>Umidade</strong>: Percentual de umidade relativa (%)
        </li>
        <li>
          <strong>Pressão</strong>: Medida em hPa (hectopascal)
        </li>
        <li>
          <strong>Precipitação</strong>: Medida em mm (milímetros)
        </li>
        <li>
          <strong>Velocidade do Vento</strong>: Medida em m/s (metros por segundo)
        </li>
      </ul>

      <h3>Indicadores de Status</h3>
      <ul>
        <li>
          🟢 <strong>Verde</strong>: Dentro dos limites normais
        </li>
        <li>
          🟡 <strong>Amarelo</strong>: Atenção - próximo ao limite
        </li>
        <li>
          🔴 <strong>Vermelho</strong>: Alerta - fora dos limites estabelecidos
        </li>
      </ul>

      <h2>Dicas e Boas Práticas</h2>
      <ol>
        <li>
          <strong>Monitore Regularmente</strong>: Acesse o dashboard diariamente para se manter
          atualizado
        </li>
        <li>
          <strong>Configure Alertas</strong>: Defina limites de alarme para ser notificado de
          eventos críticos
        </li>
        <li>
          <strong>Analise Tendências</strong>: Observe padrões nos dados para melhor compreensão
          do clima local
        </li>
        <li>
          <strong>Exporte Dados</strong>: Use a função de exportação para análises externas
        </li>
      </ol>

      <h2>Solução de Problemas</h2>

      <h3>Dados não carregam</h3>
      <ul>
        <li>Verifique sua conexão com a internet</li>
        <li>Aguarde alguns segundos para a página carregar completamente</li>
        <li>Tente recarregar a página (F5)</li>
      </ul>

      <h3>Gráficos vazios</h3>
      <ul>
        <li>Verifique se a estação está online</li>
        <li>Confirme se existem dados disponíveis para o período selecionado</li>
        <li>Contate o administrador se o problema persistir</li>
      </ul>
    </div>
  )
}
