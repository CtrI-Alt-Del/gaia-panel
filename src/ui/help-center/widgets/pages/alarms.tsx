import React from 'react';
import { Bell, AlertTriangle, Zap, Sliders, CheckCircle, Info, Activity } from 'lucide-react';

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

      {/* SEÇÃO 1: Conceito Fundamental */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          1. Diferença entre Alarmes e Alertas
        </h2>
        
        <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg mb-6">
          <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
            <Info className="w-5 h-5" /> Conceito Importante
          </h3>
          <p className="text-amber-800 mb-3">
            Muitos usuários confundem os termos. No GAIA, a distinção é clara:
          </p>
          <ul className="space-y-2 text-sm text-amber-900/80">
            <li className="flex gap-2">
              <strong>1. Alarme (Causa):</strong> É a <em>regra</em> configurada nesta tela. Ex: "Avise-me se a temperatura passar de 40°C". O alarme fica "dormindo" até que a condição seja atendida.
            </li>
            <li className="flex gap-2">
              <strong>2. Alerta (Consequência):</strong> É a <em>notificação</em> gerada quando a regra do alarme é quebrada. É o que aparece no painel de avisos.
            </li>
          </ul>
        </div>

        <p className="mb-4">
          Nesta tela, você gerencia apenas as <strong>Regras</strong>. Aqui você dita o comportamento do sistema diante das variações meteorológicas.
        </p>

        {/* Placeholder Imagem Principal */}
        {/* <figure className="my-6">
          <img 
            src={require('../../assets/prints/alarmes_tela.png')} 
            alt="Tela de listagem de alarmes configurados" 
            className="rounded-xl border border-slate-200 shadow-lg w-full" 
          />
          <figcaption className="text-sm text-slate-500 text-center mt-2 italic">
            Figura 1: Tabela de regras de alarmes ativas no sistema.
          </figcaption>
        </figure> */}
      </section>

      {/* SEÇÃO 2: Estrutura da Regra */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          2. Anatomia de um Alarme
        </h2>
        <p className="mb-6">
          Para entender a tabela, leia cada linha como uma frase lógica: 
          <br/>
          <em className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded">"Se o [Parâmetro] for [Operação] que o [Limite], gere um [Nível]."</em>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card Nível */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm col-span-1 lg:col-span-1">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" /> Níveis de Severidade
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold mt-1">Aviso</span>
                <p className="text-sm text-slate-600">
                  Para situações de atenção que não exigem parada imediata (Ex: Umidade baixa).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold mt-1">Crítico</span>
                <p className="text-sm text-slate-600">
                  Para situações de risco ou falha grave (Ex: Ventos acima de 100km/h ou Enchente).
                </p>
              </div>
            </div>
          </div>

          {/* Card Lógica */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm col-span-1 lg:col-span-2">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" /> Configuração da Lógica
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold">
                  <tr>
                    <th className="p-2 border-b">Coluna</th>
                    <th className="p-2 border-b">Descrição</th>
                    <th className="p-2 border-b">Exemplo do Print</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2 font-medium">Parâmetro</td>
                    <td className="p-2 text-slate-600">A variável monitorada.</td>
                    <td className="p-2 font-mono text-xs text-slate-500">Pluviosidade</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Operação</td>
                    <td className="p-2 text-slate-600">A condição matemática (Maior que, Menor que).</td>
                    <td className="p-2 font-mono text-xs text-slate-500">{'>'} (Maior que)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Limite</td>
                    <td className="p-2 text-slate-600">O valor de corte (Threshold).</td>
                    <td className="p-2 font-mono text-xs text-slate-500">99 mm</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Mensagem</td>
                    <td className="p-2 text-slate-600">Identificador interno ou texto que aparecerá no alerta.</td>
                    <td className="p-2 font-mono text-xs text-slate-500">"Pluviosidade muito alta"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      <hr className="border-slate-100 my-10" />

      {/* SEÇÃO 3: Filtros */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          3. Filtros de Visualização
        </h2>
        <p className="mb-4">
          A barra superior permite encontrar regras específicas dentro de grandes listas de configuração.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-slate-400" />
              <h3 className="font-bold text-slate-900">Filtrar por Nível</h3>
            </div>
            <p className="text-sm text-slate-600">
              Útil para auditorias de segurança. Selecione <strong>"Crítico"</strong> para revisar apenas as regras que geram alertas vermelhos no sistema.
            </p>
          </div>

          <div className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-slate-400" />
              <h3 className="font-bold text-slate-900">Filtrar por Status</h3>
            </div>
            <p className="text-sm text-slate-600">
              Permite ver alarmes desativados (regras antigas ou sazonais que foram desligadas temporariamente, mas não excluídas).
            </p>
          </div>
        </div>
      </section>

    </article>
  );
}