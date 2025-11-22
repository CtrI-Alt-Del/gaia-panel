import React from 'react';
import { Bell, Calendar, Filter, AlertTriangle, Zap, Clock, FileText, RotateCcw } from 'lucide-react';

export default function AlertsHelpPage() {
  return (
    <article className="mx-auto px-4 py-8 bg-white sm:px-6 lg:px-8 text-slate-700 leading-relaxed">
      
      {/* Cabeçalho do Manual */}
      <header className="mb-10 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Gestão de Incidentes
          </span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Alertas
        </h1>
        <p className="text-xl text-slate-500 font-light">
          Visualize o histórico de ocorrências, audite falhas e monitore eventos críticos gerados automaticamente pelas regras de alarme.
        </p>
      </header>

      {/* SEÇÃO 1: O que é esta tela? */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          1. Histórico de Ocorrências
        </h2>
        <p className="mb-6">
          Enquanto a tela de <em>Alarmes</em> define as regras, a tela de <strong>Alertas</strong> exibe o resultado prático. Cada linha nesta tabela representa um momento no tempo onde uma estação reportou um dado fora dos padrões estabelecidos.
        </p>

        {/* Placeholder Imagem Principal */}
        {/* <figure className="my-6">
          <img 
            src={require('../../assets/prints/alertas_tela.png')} 
            alt="Tela de listagem de alertas disparados" 
            className="rounded-xl border border-slate-200 shadow-lg w-full" 
          />
          <figcaption className="text-sm text-slate-500 text-center mt-2 italic">
            Figura 1: Log de alertas do sistema mostrando eventos críticos e avisos.
          </figcaption>
        </figure> */}

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" /> Retenção de Dados
          </h3>
          <p className="text-sm text-slate-600">
            Os alertas são registros permanentes de auditoria. Eles informam exatamente <strong>qual</strong> estação falhou, <strong>quando</strong> ocorreu e <strong>qual valor</strong> foi medido naquele instante.
          </p>
        </div>
      </section>

      {/* SEÇÃO 2: Filtros Avançados */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          2. Filtrando Eventos
        </h2>
        <p className="mb-4">
          Em dias de tempestade ou instabilidade, o volume de alertas pode ser alto. Utilize a barra de ferramentas para focar no que importa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Filtro Nível */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors">
            <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900">
              <Filter className="w-4 h-4 text-indigo-500" /> Nível
            </div>
            <p className="text-xs text-slate-500">
              Alterne entre "Todos", "Aviso" (Amarelo) ou "Crítico" (Vermelho) para priorizar os problemas mais graves.
            </p>
          </div>

          {/* Filtro Data */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors">
            <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900">
              <Calendar className="w-4 h-4 text-indigo-500" /> Data
            </div>
            <p className="text-xs text-slate-500">
              Selecione um dia específico ou um intervalo para investigar incidentes passados (Retroanálise).
            </p>
          </div>

          {/* Botão Limpar */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors">
            <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900">
              <RotateCcw className="w-4 h-4 text-indigo-500" /> Limpar Filtros
            </div>
            <p className="text-xs text-slate-500">
              Remove rapidamente todas as seleções para voltar à visualização em tempo real de todos os eventos.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-slate-100 my-10" />

      {/* SEÇÃO 3: Interpretando a Tabela */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          3. Detalhes do Incidente
        </h2>
        <p className="mb-6">
          Cada linha da tabela conta a história completa de um evento. Entenda os dados apresentados:
        </p>

        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-700 font-semibold">
              <tr>
                <th className="px-4 py-3 border-b">Coluna</th>
                <th className="px-4 py-3 border-b">Significado Operacional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">Parâmetro & Estação</td>
                <td className="px-4 py-3 text-slate-600">
                  Identifica a origem. Ex: "Pluviosidade" na estação "Kittyfield".
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">Mensagem</td>
                <td className="px-4 py-3 text-slate-600">
                  O texto explicativo configurado na regra do Alarme (Ex: "Pluviosidade muito alta"). Ajuda a entender o contexto sem olhar os números.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">Nível</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-bold">Aviso</span>
                      <span className="text-slate-500 text-xs">Atenção necessária.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-bold">Crítico</span>
                      <span className="text-slate-500 text-xs">Risco iminente ou falha grave.</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">Medição & Unidade</td>
                <td className="px-4 py-3 text-slate-600">
                  O "dado culpado". Mostra o valor exato que quebrou a regra (Ex: <strong>99 mm</strong>).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">Data de Criação</td>
                <td className="px-4 py-3 text-slate-600">
                  O carimbo de tempo exato (Dia/Mês/Ano Hora:Minuto) de quando o sistema detectou a anomalia.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100 flex gap-3">
          <FileText className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-indigo-900 text-sm">Dica de Análise</h4>
            <p className="text-sm text-indigo-800 mt-1">
              Se você notar muitos alertas repetidos de "Crítico" para a mesma estação em um curto período (Ex: a cada 5 minutos), isso pode indicar um sensor defeituoso ou uma situação de emergência contínua. Verifique a tela de <em>Estações</em>.
            </p>
          </div>
        </div>
      </section>

    </article>
  );
}