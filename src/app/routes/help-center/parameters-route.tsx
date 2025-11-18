export default function ParametersHelpRoute() {
  return (
    <div className="parameters-help prose prose-sm max-w-none dark:prose-invert">
      <h1>Parâmetros - Central de Ajuda</h1>
      <h2>O que são Parâmetros?</h2>
      <p>
        Parâmetros são as variáveis meteorológicas que o sistema GAIA coleta, processa e
        visualiza. Cada parâmetro representa uma medição específica.
      </p>
      <h2>Parâmetros Principais</h2>
      <h3>Temperatura (°C)</h3>
      <ul>
        <li>Unidade: Graus Celsius</li>
        <li>Faixa Típica: -20°C a 50°C</li>
      </ul>
      <h3>Umidade Relativa (%)</h3>
      <ul>
        <li>Percentual de vapor de água no ar</li>
        <li>Faixa Típica: 0% a 100%</li>
      </ul>
      <h3>Pressão Atmosférica (hPa)</h3>
      <ul>
        <li>Força exercida pela atmosfera</li>
        <li>Faixa Típica: 950-1050 hPa</li>
      </ul>
      <h3>Precipitação (mm)</h3>
      <ul>
        <li>Quantidade de chuva</li>
        <li>Período: Acumulado em 24h ou customizado</li>
      </ul>
      <h3>Velocidade do Vento (m/s)</h3>
      <ul>
        <li>Rapidez do ar</li>
        <li>Conversão: 1 m/s ≈ 3,6 km/h</li>
      </ul>
      <h2>Configurar Novos Parâmetros</h2>
      <ol>
        <li>Acesse "Parâmetros" no menu</li>
        <li>Clique "Novo Parâmetro"</li>
        <li>Defina: Nome, Unidade, Tipo, Estações</li>
        <li>Configure limites</li>
        <li>Clique "Salvar"</li>
      </ol>
      <h2>Limites e Thresholds</h2>
      <ul>
        <li>Limite Aviso (Amarelo): Aviso visual</li>
        <li>Limite Crítico (Vermelho): Alarme automático</li>
      </ul>
    </div>
  )
}
