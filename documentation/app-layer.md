
# Camada de Aplicação (App Layer)

A camada de aplicação é responsável por orquestrar a comunicação entre o frontend e backend, implementando o padrão de **arquitetura em camadas** com React Router v7. Ela gerencia rotas, middlewares, contextos e a integração entre a UI e os serviços de domínio.

## Estrutura

```
src/app/
├── contexts/          # Contextos do React Router
│   ├── auth-context.ts
│   └── rest-context.ts
├── layouts/           # Layouts compartilhados
│   └── app-layout.tsx
├── middlewares/       # Middlewares de rota
│   ├── auth-middleware.ts
│   └── rest-middleware.ts
├── routes/            # Definição de rotas
│   ├── api/           # Rotas de API (actions)
│   │   └── membership/
│   ├── auth/          # Rotas de autenticação
│   ├── membership/    # Rotas de usuários
│   ├── telemetry/     # Rotas de telemetria
│   └── alerting/      # Rotas de alertas
├── types/             # Tipos específicos da aplicação
│   └── route-args.ts
├── root.tsx           # Componente raiz
└── routes.ts          # Configuração de rotas
```

## Conceitos Principais

### 1. Sistema de Rotas

O projeto utiliza **React Router v7** com configuração declarativa:

```typescript
export default [
  index('routes/auth/login.tsx'),
  layout('layouts/app-layout.tsx', [
    route(ROUTES.dashboard, 'routes/telemetry/dashboard.tsx'),
    route(ROUTES.users, 'routes/membership/users-route.tsx'),
  ]),
  route(ROUTES.api.membership.createUser, 'routes/api/membership/users/create-user-route.ts'),
] satisfies RouteConfig
```

**Tipos de Rotas:**
- **Index routes**: Página inicial (`auth/login`)
- **Layout routes**: Rotas com layout compartilhado
- **API routes**: Endpoints para actions (sem UI)
- **Page routes**: Páginas com interface de usuário

### 2. Middlewares

Middlewares são executados antes das rotas e fornecem funcionalidades transversais:

```typescript
export const RestMiddleware = async ({ context }: Route.LoaderArgs) => {
  const restClient = AxiosRestClient()
  restClient.setBaseUrl(ENV.serverAppUrl)
  
  const membershipService = MembershipService(restClient)
  
  context.set(restContext, {
    membershipService,
  })
}
```

**Características:**
- **Execução sequencial** antes das rotas
- **Injeção de dependências** via context
- **Configuração por rota** via `export const middleware`

### 3. Contextos

Contextos fornecem dados compartilhados entre rotas:

```typescript
// Definição do contexto
export const restContext = createContext<RestContext>()

// Uso nas rotas
const { membershipService } = context.get(restContext)
```

**Tipos de Contexto:**
- **AuthContext**: Dados de autenticação
- **RestContext**: Serviços de API

### 4. Loaders e Actions

**Loaders** carregam dados para páginas:

```typescript
export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const { membershipService } = context.get(restContext)
  const response = await service.fetchUsers(params)
  return { users: response.body.items }
}
```

**Actions** processam formulários e mutações:

```typescript
export const action = async (args: RouteArgs) => {
  const call = RemixCall<UserDto>(args, userSchema)
  const { membershipService } = args.context.get(restContext)
  const action = CreateUserAction(membershipService)
  return action.execute(call)
}
```

### 5. Layouts

Layouts definem estrutura compartilhada entre páginas:

```typescript
export default function AppLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}
```

## Padrões de Organização

### 1. **Rotas por Domínio**

```
routes/
├── membership/     # Gestão de usuários
├── telemetry/      # Dados de telemetria
├── alerting/       # Sistema de alertas
└── auth/          # Autenticação
```

### 2. **Separação API/UI**

```
routes/
├── api/           # Actions (sem UI)
│   └── membership/users/create-user-route.ts
└── membership/    # Páginas (com UI)
    └── users-route.tsx
```

### 3. **Middleware por Funcionalidade**

- **RestMiddleware**: Configura serviços de API
- **AuthMiddleware**: Gerencia autenticação (comentado)

## Integração com Outras Camadas

### 1. **RPC Layer**
- Actions são executadas via `RemixCall`
- Validação com schemas Zod
- Tratamento de erros padronizado

### 2. **UI Layer**
- Páginas importam widgets da camada UI
- Layouts compartilhados
- Contextos para estado global

### 3. **Core Layer**
- Serviços injetados via context
- DTOs e interfaces de domínio
- Constantes e configurações

## Fluxo de Execução

### 1. **Requisição de Página**
1. Middleware executa (injeção de dependências)
2. Loader carrega dados
3. Componente renderiza com dados

### 2. **Submissão de Formulário**
1. Middleware executa
2. Action processa dados
3. RPC action executa lógica de negócio
4. Redirecionamento para página de sucesso

## Vantagens da Arquitetura

### 1. **Separação de Responsabilidades**
- Rotas focadas em orquestração
- Middlewares para funcionalidades transversais
- Contextos para dados compartilhados

### 2. **Reutilização**
- Middlewares aplicáveis a múltiplas rotas
- Layouts compartilhados
- Contextos reutilizáveis

### 3. **Testabilidade**
- Middlewares testáveis isoladamente
- Loaders/actions testáveis com mocks
- Contextos mockáveis

### 4. **Manutenibilidade**
- Estrutura clara e organizada
- Padrões consistentes
- Fácil localização de funcionalidades

## Boas Práticas

1. **Use middlewares** para funcionalidades transversais
2. **Organize rotas por domínio** para melhor manutenção
3. **Separe API routes de page routes** claramente
4. **Injete dependências via context** em vez de importações diretas
5. **Mantenha loaders simples** e delegue lógica complexa para serviços
6. **Use layouts** para estrutura compartilhada
7. **Documente contextos** com tipos TypeScript claros
8. **Configure rotas declarativamente** no `routes.ts`
9. **Trate erros** de forma consistente
10. **Mantenha rotas focadas** em uma única responsabilidade