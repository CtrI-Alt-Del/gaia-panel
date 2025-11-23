import { Bell, Clock, MousePointer, ExternalLink, AlertTriangle, Zap } from 'lucide-react';
import notificacoesDropdown from '../assets/notificacoes.png';

export default function NotificationsHelpPage() {
  return (
    <article className="mx-auto px-4 py-8 bg-white sm:px-6 lg:px-8 text-slate-700 leading-relaxed">
      
      {/* Cabeçalho do Manual */}
      <header className="mb-10 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Acesso Rápido
          </span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Notificações
        </h1>
        <p className="text-xl text-slate-500 font-light">
          O centro de avisos em tempo real. Entenda como o sino de notificações mantém você informado sem sair da tela atual.
        </p>
      </header>

      {/* SEÇÃO 1: O Menu Suspenso */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          1. O Sino de Alertas
        </h2>
        <p className="mb-6">
          Localizado no canto superior direito de todas as telas do sistema, o ícone de sino é seu ponto de contato imediato com a saúde da rede.
        </p>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Imagem do Dropdown */}
          <div className="w-full md:w-1/2">
            <figure className="shadow-lg rounded-xl overflow-hidden border border-slate-200">
              <img 
                src={notificacoesDropdown} 
                alt="Menu dropdown de notificações aberto" 
                className="w-full object-cover" 
              />
            </figure>
            <figcaption className="text-xs text-slate-400 text-center mt-2 italic">
              Visão do menu rápido ao clicar no ícone de sino.
            </figcaption>
          </div>

          {/* Explicação dos Elementos */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span> Contador de Pendências
              </h3>
              <p className="text-sm text-slate-600">
                O círculo vermelho sobre o sino indica quantos novos alertas ocorreram desde a sua última verificação. Ele chama a atenção visualmente para que nada passe despercebido.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" /> Tempo Real
              </h3>
              <p className="text-sm text-slate-600">
                A lista exibe as ocorrências mais recentes primeiro (ordem cronológica inversa). Cada cartão mostra o horário exato do evento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: Anatomia da Notificação */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          2. Entendendo os Cartões
        </h2>
        <p className="mb-6">
          Cada notificação no menu suspenso é um resumo compacto do problema.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-200 rounded-xl p-4 hover:border-yellow-400 transition-colors bg-white shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded border border-yellow-200 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Aviso
              </span>
              <span className="text-xs text-slate-400">10 min atrás</span>
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Umidade Relativa</h4>
            <p className="text-xs text-slate-500">Estação: Orchestrate</p>
            <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded">
              "Umidade abaixo do esperado para o horário."
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 hover:border-red-400 transition-colors bg-white shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded border border-red-200 flex items-center gap-1">
                <Zap className="w-3 h-3" /> Crítico
              </span>
              <span className="text-xs text-slate-400">2 min atrás</span>
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Temperatura do Ar</h4>
            <p className="text-xs text-slate-500">Estação: Jeopardise</p>
            <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded">
              "Temperatura excedeu o limite de segurança!"
            </p>
          </div>
        </div>
      </section>

      <hr className="border-slate-100 my-10" />

      {/* SEÇÃO 3: Navegação para Histórico */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          3. Ver Tudo (Histórico Completo)
        </h2>
        
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl">
          <div className="flex items-start gap-4">
            <div className="bg-white p-2 rounded-full shadow-sm text-indigo-600">
              <MousePointer className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-indigo-900 text-lg mb-2 flex items-center gap-2">
                Botão "Ver tudo"
                <ExternalLink className="w-4 h-4 opacity-50" />
              </h3>
              <p className="text-indigo-800 leading-relaxed">
                O menu suspenso mostra apenas as últimas notificações para não poluir a tela. 
                <br/><br/>
                Ao clicar no botão <strong>"Ver tudo"</strong> no rodapé do menu, você será redirecionado automaticamente para a página de <strong>Alertas</strong>. Lá você terá acesso ao histórico completo, filtros de data e opções de exportação para auditoria detalhada.
              </p>
            </div>
          </div>
        </div>
      </section>

    </article>
  );
}