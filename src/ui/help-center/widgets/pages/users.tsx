import React from 'react'

export default function UsersHelpPage() {
  return (
    <article className="prose prose-sm dark:prose-invert max-w-none">
      <h1>Gerenciamento de Usuários</h1>

      <h2>O que é Gerenciamento de Usuários?</h2>
      <p>
        Funcionalidade que controla acesso ao sistema GAIA e permissões de cada
        pessoa.
      </p>

      <h2>Níveis de Acesso</h2>
      <ul>
        <li>Visitante (público): leitura</li>
        <li>Usuário comum: visualizar e criar alertas pessoais</li>
        <li>Administrador: gerenciar usuários, configurar estações</li>
        <li>Admin Master: superadministrador</li>
      </ul>

      <h2>Gerenciando Usuários</h2>
      <ol>
        <li>Menu → "Administração" → "Usuários"</li>
        <li>Criar, editar, desativar ou deletar contas (admin)</li>
        <li>Resetar senha, ativar 2FA</li>
      </ol>

      <h2>Segurança e LGPD</h2>
      <p>
        Confidencialidade, integridade, disponibilidade — Direitos: acesso,
        correção, exclusão, portabilidade.
      </p>
    </article>
  )
}
