import React from 'react';
import { Users, UserPlus, Edit, Power, Shield, Lock, Mail, AlertTriangle } from 'lucide-react';
import usuariosListagem from '../assets/usuarios_tela.png';
import modalAdicionar from '../assets/modal_adicionar_usuario.png';
import modalEditar from '../assets/modal_editar_usuario.png';
import modalDesativar from '../assets/modal_desativar_usuario.png';

export default function UsersHelpPage() {
  return (
    <article className="mx-auto px-4 py-8 bg-white sm:px-6 lg:px-8 text-slate-700 leading-relaxed">
      
      {/* Cabeçalho do Manual */}
      <header className="mb-10 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Administração
          </span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Gerenciamento de Usuários
        </h1>
        <p className="text-xl text-slate-500 font-light">
          Controle quem tem acesso ao sistema GAIA. Cadastre novos colaboradores, mantenha dados atualizados e gerencie permissões de segurança.
        </p>
      </header>

      {/* SEÇÃO 1: Painel de Controle */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          1. Visão Geral da Equipe
        </h2>
        <p className="mb-6">
          A tela de usuários centraliza o cadastro de todos os operadores e analistas com acesso ao painel.
        </p>

        {/* Imagem Principal */}
        <figure className="my-6">
          <img 
            src={usuariosListagem} 
            alt="Tela principal de listagem de usuários" 
            className="rounded-xl border border-slate-200 shadow-sm w-full object-cover" 
          />
          <figcaption className="text-sm text-slate-500 text-center mt-2 italic">
            Figura 1: Lista ativa de usuários com status e data de cadastro.
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" /> Identificação
            </h3>
            <p className="text-sm text-slate-600">
              Visualize rapidamente o Nome e Email corporativo de cada membro.
            </p>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" /> Status
            </h3>
            <p className="text-sm text-slate-600">
              A tag <span className="text-green-600 font-bold bg-green-100 px-1 rounded text-xs">Ativo</span> confirma que o login está habilitado.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-indigo-600" /> Novo Acesso
            </h3>
            <p className="text-sm text-slate-600">
              Use o botão roxo <strong>"+ Novo Usuário"</strong> para convidar um integrante.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-slate-100 my-10" />

      {/* SEÇÃO 2: Adicionar e Editar */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          2. Gerenciando Acessos
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Coluna Adicionar */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">A</span>
              Cadastrando Novo Usuário
            </h3>
            <img 
              src={modalAdicionar} 
              alt="Modal de cadastro de usuário" 
              className="rounded-lg border border-slate-200 shadow-sm mb-4 w-full" 
            />
            <p className="text-sm text-slate-600 leading-relaxed">
              Ao cadastrar um novo usuário, você precisará informar apenas:
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm text-slate-600 space-y-1">
              <li><strong>Nome Completo:</strong> Para identificação no sistema.</li>
              <li><strong>E-mail:</strong> Será usado como login e para recuperação de senha.</li>
            </ul>
            <div className="bg-blue-50 p-3 rounded border border-blue-100 mt-4 flex gap-2 text-xs text-blue-800">
              <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>O sistema enviará automaticamente as credenciais de acesso para o e-mail cadastrado.</p>
            </div>
          </div>

          {/* Coluna Editar */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">B</span>
              Editando Dados (Ícone Lápis)
            </h3>
            <img 
              src={modalEditar} 
              alt="Modal de edição de usuário" 
              className="rounded-lg border border-slate-200 shadow-sm mb-4 w-full" 
            />
            <p className="text-sm text-slate-600 leading-relaxed">
              Caso haja erro de digitação ou mudança de e-mail corporativo, utilize a edição.
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm text-slate-600 space-y-1">
              <li>As alterações entram em vigor imediatamente.</li>
              <li>O usuário deverá usar o novo e-mail no próximo login.</li>
            </ul>
          </div>

        </div>
      </section>

      <hr className="border-slate-100 my-10" />

      {/* SEÇÃO 3: Segurança e Revogação */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          3. Revogação de Acesso
        </h2>
        
        <div className="bg-red-50 border border-red-100 rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-xl font-semibold text-red-800 flex items-center gap-2">
                <Power className="w-5 h-5" /> Desativar Usuário
              </h3>
              <p className="text-red-900/80 text-sm leading-relaxed">
                Quando um colaborador deixa a empresa ou muda de função, é crucial revogar seu acesso para manter a segurança dos dados.
              </p>
              
              <div className="bg-white p-4 rounded border border-red-100 shadow-sm">
                <h4 className="font-bold text-red-900 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Lock className="w-3 h-3" /> O que acontece?
                </h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span> <span>O login será bloqueado imediatamente.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span> <span>O histórico de ações (criação de alarmes, edições) é <strong>mantido</strong> para auditoria.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span> <span>O usuário não receberá mais alertas por e-mail.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
               <img 
                 src={modalDesativar} 
                 alt="Confirmação de desativação de usuário" 
                 className="rounded-lg shadow-sm border border-red-200 w-full" 
               />
               <p className="text-center text-xs text-red-400 mt-2 italic">
                 A ação exige confirmação manual para evitar cliques acidentais.
               </p>
            </div>
          </div>
        </div>
      </section>

    </article>
  );
}