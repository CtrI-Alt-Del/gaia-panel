import React from 'react';
import { Sliders, Search, Calculator, Tag, CheckCircle, Activity, Ruler, Edit, Power, Plus, AlertCircle } from 'lucide-react';
import parametrosListagem from '../assets/parametros_tela_usuario.png';
import modalEdicao from '../assets/modal_editar_parametro.png';
import modalDesativar from '../assets/modal_desativar_parametro.png';

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
          Gerencie o "dicionário" do sistema. Defina quais variáveis (sensores) o GAIA deve reconhecer, suas unidades de medida e regras de conversão.
        </p>
      </header>

      {/* SEÇÃO 1: Listagem e Gestão */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          1. Listagem de Variáveis
        </h2>
        <p className="mb-6">
          A tela principal lista todos os tipos de dados que podem ser coletados pelas estações. É aqui que você padroniza como o sistema entende "Temperatura", "Chuva", "Vento", etc.
        </p>

        {/* Imagem Principal da Listagem */}
        <figure className="my-6">
          <img 
            src={parametrosListagem} 
            alt="Tela de listagem de parâmetros com botões de ação" 
            className="rounded-xl border border-slate-200 shadow-sm w-full object-cover" 
          />
          <figcaption className="text-sm text-slate-500 text-center mt-2 italic">
            Figura 1: Tabela de parâmetros ativos com opções de edição e desativação.
          </figcaption>
        </figure>

        <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 space-y-4">
          <h3 className="font-semibold text-slate-900">Ações Disponíveis:</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3 items-start">
              <div className="bg-indigo-600 text-white p-1 rounded-md mt-0.5"><Plus className="w-3 h-3" /></div>
              <div>
                <span className="font-bold text-slate-800">Novo Parâmetro:</span>
                <p className="text-slate-600">Botão no topo esquerdo. Usado para cadastrar um novo tipo de sensor que o sistema passará a suportar.</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <div className="bg-slate-200 text-slate-600 p-1 rounded-md mt-0.5"><Edit className="w-3 h-3" /></div>
              <div>
                <span className="font-bold text-slate-800">Editar Propriedades:</span>
                <p className="text-slate-600">Ajuste o nome, código técnico, unidades ou fatores de conversão de um parâmetro existente.</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <div className="bg-red-100 text-red-600 p-1 rounded-md mt-0.5"><Power className="w-3 h-3" /></div>
              <div>
                <span className="font-bold text-slate-800">Desativar:</span>
                <p className="text-slate-600">Arquiva o parâmetro. Ele deixará de aparecer nas opções de configuração das estações.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* SEÇÃO 2: Configuração Técnica (Edição) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          2. Detalhes de Configuração
        </h2>
        <p className="mb-6">
          Ao criar ou editar um parâmetro, você define as regras matemáticas que o sistema usará para interpretar os dados brutos. Entenda cada campo do formulário:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Imagem do Modal de Edição */}
          <div>
            <img 
              src={modalEdicao} 
              alt="Formulário de edição de parâmetro" 
              className="rounded-xl border border-slate-200 shadow-sm w-full" 
            />
            <p className="text-xs text-slate-400 mt-2 text-center">
              Formulário de cadastro/edição
            </p>
          </div>

          {/* Explicação dos Campos */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-600" /> Identificação
              </h3>
              <ul className="text-sm space-y-2 text-slate-600">
                <li><strong>Nome:</strong> O rótulo que aparecerá nos gráficos e relatórios (Ex: "Visibilidade horizontal").</li>
                <li><strong>Código (Slug):</strong> Identificador interno único (Ex: <code>vis</code>, <code>temp_ar</code>). Usado por desenvolvedores e integrações API.</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-indigo-600" /> Conversão de Dados
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                O GAIA aplica a fórmula: <code>Valor = (Bruto × Fator) + Offset</code>
              </p>
              <ul className="text-sm space-y-2 text-slate-600">
                <li><strong>Unidade:</strong> A grandeza física (km, °C, m/s).</li>
                <li><strong>Fator:</strong> Multiplicador de escala. Se o sensor envia o dado multiplicado por 10 (ex: 255 p/ 25.5°C), use Fator 0.1.</li>
                <li><strong>Offset:</strong> Valor de ajuste somado ao final. Útil para calibração de "ponto zero".</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-slate-100 my-10" />

      {/* SEÇÃO 3: Desativação */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          3. Zona de Perigo
        </h2>
        
        <div className="bg-red-50 border border-red-100 rounded-xl p-6 flex flex-col md:flex-row gap-8 items-center">
          <div className="space-y-4 flex-1">
            <h3 className="text-xl font-semibold text-red-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> Desativando um Parâmetro
            </h3>
            <p className="text-red-900/80 text-sm leading-relaxed">
              Ao clicar no botão de desativar, uma confirmação será exigida.
              <br/><br/>
              <strong>Cuidado:</strong> Desativar um parâmetro globalmente (ex: "Temperatura") fará com que ele deixe de ser processado em <strong>todas</strong> as estações que o utilizam. O histórico de dados antigos será preservado, mas novas coletas serão ignoradas.
            </p>
          </div>
          
          <div className="w-full md:w-1/2">
             <img 
               src={modalDesativar} 
               alt="Modal de confirmação de desativação" 
               className="rounded-lg shadow-sm border border-red-200 w-full" 
             />
          </div>
        </div>
      </section>

    </article>
  );
}