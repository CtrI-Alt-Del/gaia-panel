import React from 'react';
import { Sliders, Search, Calculator, Tag, CheckCircle, Activity, Ruler } from 'lucide-react';

export default function ParametersHelpPage() {
  return (
    <article className="mx-auto px-4 py-8 bg-white sm:px-6 lg:px-8 text-slate-700 leading-relaxed">
      
      {/* Cabeçalho do Manual */}
      <header className="mb-10 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Configuração Global
          </span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Parâmetros
        </h1>
        <p className="text-xl text-slate-500 font-light">
          Gerencie as definições de variáveis monitoráveis, unidades de medida e fatores de conversão utilizados por todo o sistema.
        </p>
      </header>

      {/* SEÇÃO 1: Visão Geral */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          1. O que são Parâmetros?
        </h2>
        <p className="mb-6">
          No sistema GAIA, um <strong>Parâmetro</strong> representa um tipo específico de dado ambiental que pode ser coletado por uma estação (Ex: Temperatura, Velocidade do Vento, Radiação Solar). Esta tela lista todas as variáveis que o sistema está "ensinado" a reconhecer.
        </p>

        {/* Placeholder Imagem Principal */}
        {/* <figure className="my-6">
          <img 
            src={require('../../assets/prints/parametros_tela.png')} 
            alt="Tela de listagem de parâmetros" 
            className="rounded-xl border border-slate-200 shadow-lg w-full" 
          />
          <figcaption className="text-sm text-slate-500 text-center mt-2 italic">
            Figura 1: Tabela geral de parâmetros configurados no sistema.
          </figcaption>
        </figure> */}

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-6">
          <div className="flex items-start gap-3">
            <Activity className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800 leading-relaxed">
              <strong>Importante:</strong> As configurações definidas aqui (como Fator e Offset) são aplicadas globalmente para processar os dados brutos recebidos dos sensores, garantindo padronização nas medições.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: Estrutura da Tabela */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          2. Detalhes Técnicos das Colunas
        </h2>
        <p className="mb-6">
          A tabela principal apresenta informações cruciais para a interpretação dos dados. Entenda o significado de cada coluna:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card Identificação */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-600" /> Identificação
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex flex-col">
                <span className="font-semibold text-slate-800">Nome</span>
                <span>Descrição amigável (Ex: "Sensação térmica"). Abaixo do nome, é exibida a data de criação do parâmetro.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-semibold text-slate-800">Código (Slug)</span>
                <span className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded w-fit text-slate-500">vis, wnd_spd</span>
                <span>Identificador técnico curto usado em APIs e integrações de banco de dados.</span>
              </li>
            </ul>
          </div>

          {/* Card Medição */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Ruler className="w-4 h-4 text-indigo-600" /> Unidades
            </h3>
            <p className="text-sm text-slate-600 mb-2">
              Define a grandeza física da medição. Exemplos comuns na lista:
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-slate-100 px-2 py-1 rounded border">°C (Graus)</span>
              <span className="bg-slate-100 px-2 py-1 rounded border">m/s (Velocidade)</span>
              <span className="bg-slate-100 px-2 py-1 rounded border">W/m² (Radiação)</span>
              <span className="bg-slate-100 px-2 py-1 rounded border">% (Porcentagem)</span>
            </div>
          </div>

          {/* Card Calibração (Técnico) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-indigo-600" /> Fatores de Conversão
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              O sistema utiliza uma fórmula linear padrão para converter sinais elétricos brutos ou dados comprimidos em valores legíveis:
              <br/>
              <code className="bg-slate-100 px-2 py-1 rounded mt-1 inline-block font-mono text-indigo-700">
                Valor Final = (Dado Bruto × Fator) + Offset
              </code>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-bold text-slate-800 block">Fator (Multiplicador)</span>
                <span className="text-slate-500">Usado para escala. Ex: Se o sensor envia 100 e o fator é 0.1, o valor lido será 10.</span>
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Offset (Deslocamento)</span>
                <span className="text-slate-500">Usado para ajuste de zero ou calibração fina. Soma-se ao resultado da multiplicação.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-slate-100 my-10" />

      {/* SEÇÃO 3: Funcionalidades da Tela */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          3. Barra de Ferramentas
        </h2>
        
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 mt-1">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Busca Textual</h3>
              <p className="text-sm text-slate-600 mt-1">
                O campo <em>"Filtrar por nome"</em> permite localizar rapidamente um parâmetro. A busca é feita em tempo real enquanto você digita (Ex: ao digitar "vento", o sistema mostra Rajada, Direção e Velocidade do vento).
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 mt-1">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Filtro de Status</h3>
              <p className="text-sm text-slate-600 mt-1">
                Por padrão, todos os parâmetros ativos e inativos são exibidos. Use o dropdown "Status" para visualizar apenas os <span className="text-green-600 font-bold text-xs border border-green-200 bg-green-50 px-1 rounded">Ativo</span> caso deseje limpar a visualização de itens obsoletos.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 mt-1">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Paginação</h3>
              <p className="text-sm text-slate-600 mt-1">
                Caso existam muitos parâmetros cadastrados (o sistema suporta centenas), use o seletor "Itens por página" para controlar quantos registros aparecem por vez (10, 20 ou 50).
              </p>
            </div>
          </div>
        </div>
      </section>

    </article>
  );
}