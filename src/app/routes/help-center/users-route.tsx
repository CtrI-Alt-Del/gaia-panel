export default function UsersHelpRoute() {
  return (
    <div className="users-help prose prose-sm max-w-none dark:prose-invert">
      <h1>Gerenciamento de Usuários - Central de Ajuda</h1>
      <h2>O que é Gerenciamento de Usuários?</h2>
      <p>Funcionalidade que controla acesso ao sistema GAIA e permissões de cada pessoa.</p>
      <h2>Níveis de Acesso</h2>
      <h3>1. Visitante (Public)</h3>
      <ul>
        <li>Leitura apenas</li>
        <li>Sem login necessário em algumas áreas</li>
      </ul>
      <h3>2. Usuário Comum</h3>
      <ul>
        <li>Visualizar dados</li>
        <li>Criar alertas e alarmes pessoais</li>
      </ul>
      <h3>3. Administrador</h3>
      <ul>
        <li>Acesso completo</li>
        <li>Gerenciar usuários</li>
        <li>Configurar estações</li>
      </ul>
      <h3>4. Admin Master</h3>
      <ul>
        <li>Superadministrador</li>
        <li>Acesso irrestrito</li>
      </ul>
      <h2>Gerenciando Usuários (Admin)</h2>
      <h3>Acessar Gerenciamento</h3>
      <ol>
        <li>Menu → "Administração"</li>
        <li>Selecione "Usuários"</li>
      </ol>
      <h3>Criar Novo Usuário</h3>
      <ol>
        <li>Clique "Novo Usuário"</li>
        <li>Preencha: Nome, Email, Nível</li>
        <li>Sistema enviará email de boas-vindas</li>
      </ol>
      <h3>Editar Usuário</h3>
      <ol>
        <li>Selecione usuário</li>
        <li>Clique "Editar"</li>
        <li>Modifique campos</li>
        <li>Clique "Salvar"</li>
      </ol>
      <h3>Resetar Senha</h3>
      <ol>
        <li>Selecione usuário</li>
        <li>Clique "Resetar Senha"</li>
        <li>Email com link enviado</li>
      </ol>
      <h2>Sua Conta</h2>
      <h3>Alterar Senha</h3>
      <ol>
        <li>Menu → Seu nome</li>
        <li>"Configurações"</li>
        <li>"Alterar Senha"</li>
      </ol>
      <h3>2FA (Autenticação de Dois Fatores)</h3>
      <ol>
        <li>Menu → "Segurança"</li>
        <li>"Habilitar 2FA"</li>
        <li>Escaneie QR code</li>
      </ol>
      <h2>Segurança e LGPD</h2>
      <h3>Princípios</h3>
      <ul>
        <li>Confidencialidade: Dados para autorizados</li>
        <li>Integridade: Logs de ações</li>
        <li>Disponibilidade: 24/7</li>
      </ul>
      <h3>Direitos</h3>
      <ul>
        <li>Acesso: Solicite cópia de dados</li>
        <li>Correção: Corrija dados</li>
        <li>Exclusão: Seja esquecido</li>
        <li>Portabilidade: Exporte dados</li>
      </ul>
      <h2>Boas Práticas</h2>
      <ul>
        <li>Senhas Fortes: Mín 12 chars</li>
        <li>2FA: Essencial para Admin</li>
        <li>Acesso Mínimo: Apenas necessário</li>
        <li>Auditoria: Revise logs mensalmente</li>
      </ul>
    </div>
  )
}
