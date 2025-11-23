import React from 'react';
import { MapPin, Settings, Database, List, Plus, Edit, Power, AlertCircle } from 'lucide-react';
import estacoesListagem from '../assets/estacoes_tela_usuario.png';
import filtroStatus from '../assets/filtro_status_estacoes.png';
import filtroItens from '../assets/filtro_itens_estacoes.png';
import estacaoDetalhesHeader from '../assets/estacoes_detalhes_usuario.png';
import modalEdicaoGeral from '../assets/form_edicao_estacoes.png';
import modalEdicaoMapa from '../assets/form_edicao_estacoes_2.png';
import modalEdicaoParams from '../assets/form_edicao_estacoes_4.png';
import modalDesativar from '../assets/modal_desativar_estacao.png';
import tabMapa from '../assets/mapa_estacoes_detalhes.png';
import tabParams from '../assets/parametros_estacoes_detalhes.png';
import tabMedicoes from '../assets/medicoes_estacoes_detalhes.png';

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
          Gerencie o inventário de equipamentos, visualize localizações, edite configurações e monitore os parâmetros técnicos.
        </p>
      </header>

      {/* SEÇÃO 1: Listagem Geral */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          1. Listagem e Ações Rápidas
        </h2>
        <p className="mb-6">
          A tela principal exibe todas as estações cadastradas. Além de visualizar o status, você pode realizar ações administrativas diretamente nesta tabela.
        </p>

        {/* Imagem Principal da Listagem */}
        <figure className="my-6">
          <img 
            src={estacoesListagem} 
            alt="Tela principal de listagem de estações com botões de ação" 
            className="rounded-xl border border-slate-200 shadow-sm w-full object-cover" 
          />
          <figcaption className="text-sm text-slate-500 text-center mt-2 italic">
            Figura 1: Visão geral da listagem com colunas de dados e ações.
          </figcaption>
        </figure>

        <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 space-y-4">
          <h3 className="font-semibold text-slate-900">Guia da Interface:</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3 items-start">
              <div className="bg-indigo-600 text-white p-1 rounded-md mt-0.5"><Plus className="w-3 h-3" /></div>
              <div>
                <span className="font-bold text-slate-800">Botão Nova Estação:</span>
                <p className="text-slate-600">Localizado no topo esquerdo, abre o formulário para cadastrar um novo equipamento na rede.</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <div className="bg-slate-200 text-slate-600 p-1 rounded-md mt-0.5"><Edit className="w-3 h-3" /></div>
              <div>
                <span className="font-bold text-slate-800">Botão Editar (Lápis):</span>
                <p className="text-slate-600">Abre a janela de configuração para alterar nome, localização ou sensores da estação.</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <div className="bg-red-100 text-red-600 p-1 rounded-md mt-0.5"><Power className="w-3 h-3" /></div>
              <div>
                <span className="font-bold text-slate-800">Botão Desativar:</span>
                <p className="text-slate-600">Interrompe a coleta de dados daquela estação. Requer confirmação.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* SEÇÃO 2: Filtros */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          2. Filtros de Pesquisa
        </h2>
        <p className="mb-4">
          Utilize a barra superior para refinar a lista de equipamentos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="border border-slate-200 rounded-lg p-4">
            <h3 className="font-bold text-slate-900 mb-3">Filtro de Status</h3>
            <img src={filtroStatus} alt="Dropdown de filtro de status" className="rounded shadow-sm border mb-3 w-48" />
            <p className="text-xs text-slate-600">
              Alterne entre <strong>Ativos</strong> (em operação) e <strong>Inativos</strong> (manutenção/desligados).
            </p>
          </div>

          <div className="border border-slate-200 rounded-lg p-4">
            <h3 className="font-bold text-slate-900 mb-3">Itens por Página</h3>
            <img src={filtroItens} alt="Dropdown de itens por página" className="rounded shadow-sm border mb-3 w-32" />
            <p className="text-xs text-slate-600">
              Ajuste a quantidade de registros visíveis para facilitar a navegação em grandes inventários.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-slate-100 my-10" />

      {/* SEÇÃO 3: Gestão (Editar e Desativar) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          3. Gerenciamento e Manutenção
        </h2>
        <p className="mb-6">
          O sistema GAIA permite controle total sobre o ciclo de vida das estações. Abaixo detalhamos os processos de edição e desativação.
        </p>

        {/* Subseção: Edição */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Edit className="w-5 h-5 text-indigo-600" /> Editando uma Estação
          </h3>
          <p className="mb-4 text-sm">
            Ao clicar no ícone de lápis, uma janela modal se abrirá. O formulário é dividido em etapas intuitivas:
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Passo 1: Dados Básicos */}
            <div className="space-y-2">
              <img src={modalEdicaoGeral} className="rounded-lg border shadow-sm w-full" alt="Edição de Nome e UID" />
              <div className="text-sm">
                <strong className="block text-slate-800">1. Identificação e Local</strong>
                <span className="text-slate-500">Edite o Nome amigável, UID do hardware e Endereço físico.</span>
              </div>
            </div>

            {/* Passo 2: Mapa */}
            <div className="space-y-2">
              <img src={modalEdicaoMapa} className="rounded-lg border shadow-sm w-full" alt="Seleção de local no mapa" />
              <div className="text-sm">
                <strong className="block text-slate-800">2. Coordenadas Precisas</strong>
                <span className="text-slate-500">Você pode arrastar o pin no mapa ou digitar Latitude/Longitude manualmente.</span>
              </div>
            </div>

            {/* Passo 3: Parâmetros */}
            <div className="space-y-2">
              <img src={modalEdicaoParams} className="rounded-lg border shadow-sm w-full" alt="Seleção de parâmetros" />
              <div className="text-sm">
                <strong className="block text-slate-800">3. Sensores Ativos</strong>
                <span className="text-slate-500">Marque quais parâmetros (ex: Temperatura, Vento) esta estação deve coletar.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subseção: Desativação */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center gap-2">
            <Power className="w-5 h-5" /> Desativando uma Estação
          </h3>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img src={modalDesativar} className="rounded-lg shadow-sm border border-red-200 w-full md:w-1/2" alt="Modal de confirmação de desativação" />
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-red-900 font-medium">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>Ação Crítica</p>
              </div>
              <p className="text-red-800 text-sm leading-relaxed">
                Ao clicar em desativar, o sistema solicitará uma confirmação final. 
                <strong> Atenção:</strong> Uma estação desativada para imediatamente de processar dados. 
                O histórico de medições anteriores é mantido, mas novos pacotes de dados serão ignorados pelo servidor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-slate-100 my-10" />

      {/* SEÇÃO 4: Detalhes da Estação */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          4. Painel de Detalhes
        </h2>
        <p className="mb-6">
          Ao clicar no nome da estação, você acessa o painel completo. Note que os botões de <strong>Editar</strong> e <strong>Desativar</strong> também estão disponíveis no cabeçalho desta tela, facilitando a gestão rápida durante a análise. Clique no botão <strong>Baixar PDF</strong> para exportar um relatório completo.
        </p>

        <figure className="my-6">
          <img 
            src={estacaoDetalhesHeader} 
            alt="Cabeçalho de detalhes da estação com botões de ação" 
            className="rounded-xl border border-slate-200 shadow-sm w-full object-cover" 
          />
        </figure>

        {/* Abas */}
        <div className="space-y-12 mt-10">
          
          {/* Aba Localização */}
          <div id="tab-localizacao">
            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2 border-b pb-2">
              <MapPin className="w-4 h-4 text-indigo-500" /> Aba: Localização
            </h3>
            <img src={tabMapa} className="rounded-lg border shadow-sm w-full mb-3" alt="Mapa detalhado" />
            <p className="text-sm text-slate-600">Visualização ampliada do terreno onde o equipamento está instalado.</p>
          </div>

          {/* Aba Parâmetros */}
          <div id="tab-parametros">
            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2 border-b pb-2">
              <Settings className="w-4 h-4 text-indigo-500" /> Aba: Parâmetros
            </h3>
            <img src={tabParams} className="rounded-lg border shadow-sm w-full mb-3" alt="Lista de parâmetros" />
            <p className="text-sm text-slate-600">Lista técnica dos sensores configurados, mostrando Fator de Conversão e Offset aplicados.</p>
          </div>

          {/* Aba Medições */}
          <div id="tab-medicoes">
            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2 border-b pb-2">
              <Database className="w-4 h-4 text-indigo-500" /> Aba: Medições
            </h3>
            <img src={tabMedicoes} className="rounded-lg border shadow-sm w-full mb-3" alt="Histórico de medições" />
            <p className="text-sm text-slate-600">Log bruto dos últimos dados recebidos, útil para auditoria técnica.</p>
          </div>

        </div>
      </section>
    </article>
  );
}