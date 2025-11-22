import React from 'react';
import { MapPin, Settings, FileText, Search, Filter, Navigation, Database, List } from 'lucide-react';

export default function StationsHelpPage() {
  return (
    <article className="mx-auto px-4 py-8 bg-white sm:px-6 lg:px-8 text-slate-700 leading-relaxed">
      
      {/* Cabeçalho do Manual */}
      <header className="mb-10 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Módulo de Gestão
          </span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Estações
        </h1>
        <p className="text-xl text-slate-500 font-light">
          Gerencie o inventário de equipamentos, visualize localizações e monitore os parâmetros técnicos de cada ponto de coleta.
        </p>
      </header>

      {/* SEÇÃO 1: Listagem Geral */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          1. Listagem de Estações
        </h2>
        <p className="mb-6">
          Ao acessar o menu <strong>Estações</strong>, você verá a listagem completa de todos os dispositivos cadastrados no sistema GAIA. Esta tela permite uma visão rápida do status da rede.
        </p>

        {/* Placeholder Imagem Principal */}
        {/* <figure className="my-6">
          <img 
            src={require('../../assets/prints/estacoes_tela.png')} 
            alt="Tela principal de listagem de estações" 
            className="rounded-xl border border-slate-200 shadow-lg w-full" 
          />
          <figcaption className="text-sm text-slate-500 text-center mt-2 italic">
            Figura 1: Tabela principal com UID, Nome, Coordenadas e Status.
          </figcaption>
        </figure> */}

        <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 space-y-4">
          <h3 className="font-semibold text-slate-900">Entendendo as Colunas:</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="font-bold min-w-[100px] text-slate-800">UID</span>
              <span>Identificador único do hardware. Essencial para manutenção técnica.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold min-w-[100px] text-slate-800">Nome</span>
              <span className="text-indigo-600 font-medium">Link clicável.</span>
              <span>Leva aos detalhes da estação.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold min-w-[100px] text-slate-800">Status</span>
              <span>Indica se a estação está <span className="text-green-600 font-bold">Ativa</span> (coletando dados) ou Inativa.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* SEÇÃO 2: Filtros */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          2. Filtros e Pesquisa
        </h2>
        <p className="mb-4">
          Para facilitar a localização de equipamentos em grandes redes, utilize a barra de ferramentas superior.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {/* Explicação Filtro de Status */}
          <div className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900">Filtro de Status</h3>
            </div>
            <p className="text-sm mb-3">Permite visualizar subgrupos de estações.</p>
            
            {/* Placeholder Imagem Filtro Status */}
            {/* <figure className="mb-3">
              <img src={require('../../assets/prints/filtro_status_estacoes.png')} className="rounded shadow-sm border" />
            </figure> */}
            
            <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
              <li><strong>Todos:</strong> Visão padrão.</li>
              <li><strong>Ativos:</strong> Apenas estações em operação.</li>
              <li><strong>Inativos:</strong> Estações desligadas ou em manutenção.</li>
            </ul>
          </div>

          {/* Explicação Itens por Página */}
          <div className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <List className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900">Itens por Página</h3>
            </div>
            <p className="text-sm mb-3">Controle a densidade de informações na tela.</p>
            
            {/* Placeholder Imagem Filtro Itens */}
            {/* <figure className="mb-3">
              <img src={require('../../assets/prints/filtro_itens_estacoes.png')} className="rounded shadow-sm border" />
            </figure> */}

            <p className="text-xs text-slate-600">
              Ideal para telas menores (selecione 5 ou 10) ou para visão macro em monitores grandes (selecione 50).
            </p>
          </div>
        </div>
      </section>

      <hr className="border-slate-100 my-10" />

      {/* SEÇÃO 3: Detalhes da Estação */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          3. Detalhes da Estação
        </h2>
        <p className="mb-6">
          Ao clicar no <strong>Nome</strong> de qualquer estação na lista, você acessa o painel de controle individual daquele equipamento.
        </p>

        {/* Placeholder Imagem Header Detalhes */}
        {/* <figure className="my-6">
          <img 
            src={require('../../assets/prints/estacoes_detalhes.jpg')} 
            alt="Cabeçalho de detalhes da estação" 
            className="rounded-xl border border-slate-200 shadow-lg w-full" 
          />
          <figcaption className="text-sm text-slate-500 text-center mt-2 italic">
            Figura 2: Painel de resumo da estação selecionada.
          </figcaption>
        </figure> */}

        <div className="bg-white border-l-4 border-indigo-500 p-4 shadow-sm my-6">
          <h3 className="font-bold text-slate-900 mb-2">Resumo Rápido</h3>
          <p className="text-sm text-slate-600">
            O cabeçalho exibe cards brancos arredondados com informações vitais, como a quantidade de parâmetros monitorados e a data/hora da <strong>Última Leitura</strong> recebida pelo servidor.
          </p>
        </div>

        {/* Subseções das Abas */}
        <div className="space-y-12 mt-10">
          
          {/* Aba Localização */}
          <div id="tab-localizacao">
            <h3 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2 border-b pb-2">
              <MapPin className="w-5 h-5 text-indigo-500" /> Aba: Localização
            </h3>
            <p className="mb-4">
              Exibe a posição geográfica exata da estação utilizando coordenadas de Latitude e Longitude cadastradas.
            </p>
            
            {/* Placeholder Imagem Mapa */}
            {/* <figure className="my-4">
              <img src={require('../../assets/prints/mapa_estacoes_detalhes.jpg')} className="rounded-lg border shadow-sm w-full" />
            </figure> */}
            
            <ul className="list-disc pl-5 text-slate-600 text-sm space-y-1">
              <li>Use os botões <strong>+</strong> e <strong>-</strong> para aproximar o zoom.</li>
              <li>O marcador verde indica a posição exata do equipamento no terreno.</li>
            </ul>
          </div>

          {/* Aba Parâmetros */}
          <div id="tab-parametros">
            <h3 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2 border-b pb-2">
              <Settings className="w-5 h-5 text-indigo-500" /> Aba: Parâmetros
            </h3>
            <p className="mb-4">
              Lista todos os sensores configurados para esta estação. Aqui você confere as regras de conversão de dados brutos.
            </p>

            {/* Placeholder Imagem Parâmetros */}
            {/* <figure className="my-4">
              <img src={require('../../assets/prints/parametros_estacoes_detalhes.png')} className="rounded-lg border shadow-sm w-full" />
            </figure> */}

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-slate-200 rounded-lg">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="p-3 border-b">Coluna</th>
                    <th className="p-3 border-b">Descrição Técnica</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-medium">Unidade</td>
                    <td className="p-3 text-slate-600">Unidade de medida (ex: Mm, °C).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Fator</td>
                    <td className="p-3 text-slate-600">Multiplicador aplicado ao dado bruto do sensor para calibração.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Offset</td>
                    <td className="p-3 text-slate-600">Valor de compensação somado ou subtraído da leitura.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Aba Medições */}
          <div id="tab-medicoes">
            <h3 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2 border-b pb-2">
              <Database className="w-5 h-5 text-indigo-500" /> Aba: Medições
            </h3>
            <p className="mb-4">
              Um histórico detalhado dos dados enviados. Útil para auditoria e verificação de falhas de envio.
            </p>

            {/* Placeholder Imagem Medições */}
            {/* <figure className="my-4">
              <img src={require('../../assets/prints/medicoes_estacoes_detalhes.png')} className="rounded-lg border shadow-sm w-full" />
            </figure> */}

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800">
              <strong>Dica de Uso:</strong> Se a tabela exibir <em>"Nenhuma medição encontrada"</em>, verifique o filtro de <strong>Data</strong>. Por padrão, o sistema pode não trazer dados se não houver leituras no dia selecionado.
            </div>
          </div>

        </div>
      </section>
    </article>
  );
}