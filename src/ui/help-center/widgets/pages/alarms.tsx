import React from 'react';
import { Bell, AlertTriangle, Zap, Sliders, CheckCircle, Info, Activity, Edit, Power, Plus, AlertCircle, ArrowRight } from 'lucide-react';
import alarmesListagem from '../assets/alarmes_tela.png';
import modalEdicao from '../assets/modal_editar_alarme.png';
import modalSelecaoEstacao from '../assets/modal_editar_parametro_alarme_1.png';
import modalSelecaoParametro from '../assets/modal_editar_parametro_alarme_2.png';
import modalDesativar from '../assets/modal_desativar_alarme.png';

export default function AlarmsHelpPage() {
  return (
    <article className="mx-auto px-4 py-8 bg-white sm:px-6 lg:px-8 text-slate-700 leading-relaxed">
      
      {/* Cabeçalho do Manual */}
      <header className="mb-10 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Regras de Monitoramento
          </span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Alarmes
        </h1>
        <p className="text-xl text-slate-500 font-light">
          Configure os gatilhos e limites de segurança. Defina <strong>quando</strong> o sistema deve notificar a operação sobre anomalias.
        </p>
      </header>

      {/* SEÇÃO 1: Conceito e Listagem */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          1. Visão Geral
        </h2>
        
        <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg mb-6">
          <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
            <Info className="w-5 h-5" /> Diferença Importante
          </h3>
          <ul className="space-y-2 text-sm text-amber-900/80">
            <li className="flex gap-2">
              <strong>Alarme (Causa):</strong> É a regra "adormecida" (ex: "Se T {'>'} 40°C"). É o que você configura aqui.
            </li>
            <li className="flex gap-2">
              <strong>Alerta (Consequência):</strong> É o aviso gerado quando a regra é quebrada.
            </li>
          </ul>
        </div>

        {/* Imagem Principal da Listagem */}
        <figure className="my-6">
          <img 
            src={alarmesListagem} 
            alt="Tela de listagem de alarmes configurados" 
            className="rounded-xl border border-slate-200 shadow-sm w-full object-cover" 
          />
          <figcaption className="text-sm text-slate-500 text-center mt-2 italic">
            Figura 1: Tabela de regras ativas, mostrando Nível (Crítico/Aviso) e Status.
          </figcaption>
        </figure>
      </section>

      {/* SEÇÃO 2: Criação e Edição de Regras */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          2. Configurando um Alarme
        </h2>
        <p className="mb-6">
          A configuração de um alarme é um processo preciso. Você precisa dizer ao sistema exatamente <strong>ONDE</strong> olhar e <strong>O QUE</strong> procurar.
        </p>

        {/* Subseção: Fluxo de Seleção */}
        <div className="mb-10 p-6 bg-slate-50 rounded-xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Passo a Passo de Seleção</h3>
          
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2">
                <img src={modalSelecaoEstacao} className="rounded-lg shadow-sm w-full" alt="Lista de estações" />
              </div>
              <div className="w-full md:w-1/2 space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 font-bold">
                  <div className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</div>
                  Selecionar Estação
                </div>
                <p className="text-sm text-slate-600">
                  Primeiro, escolha qual equipamento será monitorado. Você pode buscar pelo nome ou UID na barra superior.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-slate-300 rotate-90 md:rotate-0" />
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2">
                <img src={modalSelecaoParametro} className="rounded-lg shadow-sm w-full" alt="Lista de parâmetros" />
              </div>
              <div className="w-full md:w-1/2 space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 font-bold">
                  <div className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</div>
                  Selecionar Parâmetro
                </div>
                <p className="text-sm text-slate-600">
                  Em seguida, escolha qual sensor específico daquela estação será vigiado (ex: "Temperatura do ar").
                  <br/>
                  <span className="text-xs text-slate-400 block mt-1">* Apenas sensores ativos aparecem nesta lista.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subseção: Lógica da Regra */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <img 
            src={modalEdicao} 
            alt="Modal de edição da lógica do alarme" 
            className="rounded-xl border border-slate-200 shadow-sm w-full" 
          />
          
          <div className="space-y-6">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600" /> Definindo a Lógica
            </h3>
            
            <ul className="space-y-4">
              <li className="bg-white p-3 rounded border border-slate-100 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Mensagem</span>
                <p className="text-sm text-slate-700">O texto que aparecerá na notificação. Seja claro (Ex: "Chuva torrencial detectada").</p>
              </li>
              
              <li className="bg-white p-3 rounded border border-slate-100 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Nível de Criticidade</span>
                <div className="flex gap-2 mt-1">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded font-bold">Aviso</span>
                  <span className="text-xs text-slate-500 flex items-center">ou</span>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded font-bold">Crítico</span>
                </div>
              </li>

              <li className="bg-white p-3 rounded border border-slate-100 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Condição (Gatilho)</span>
                <p className="text-sm text-slate-700">
                  Combinação de <strong>Operador</strong> (Maior que / Menor que) e <strong>Valor Limite</strong>.
                  <br/>
                  <em className="text-xs text-slate-500 block mt-1">Ex: Maior que {'>'} 99 mm</em>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-slate-100 my-10" />

      {/* SEÇÃO 3: Desativação */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          3. Desativando um Alarme
        </h2>
        
        <div className="bg-red-50 border border-red-100 rounded-xl p-6 flex flex-col md:flex-row gap-8 items-center">
          <div className="space-y-4 flex-1">
            <h3 className="text-xl font-semibold text-red-800 flex items-center gap-2">
              <Power className="w-5 h-5" /> Interrompendo o Monitoramento
            </h3>
            <p className="text-red-900/80 text-sm leading-relaxed">
              Ao desativar um alarme, o sistema <strong>para imediatamente</strong> de verificar aquela condição.
              <br/><br/>
              Isso é útil para evitar falsos positivos durante manutenções na estação ou em estações que foram desativadas sazonalmente. A regra não é excluída, apenas pausada.
            </p>
          </div>
          
          <div className="w-full md:w-1/2">
             <img 
               src={modalDesativar} 
               alt="Modal de confirmação de desativação de alarme" 
               className="rounded-lg shadow-sm border border-red-200 w-full" 
             />
          </div>
        </div>
      </section>

    </article>
  );
}