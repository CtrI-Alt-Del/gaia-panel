# Gaia Web

## 🧭 Índice

* ⚙️ [Visao Geral](#visao-geral)
* 🚀 [Principais Recursos](#principais-recursos)
* 🛠️ [Principais tecnologias](#principais-tecnologias)
* 🧩 [Arquitetura em Alto Nível](#arquitetura-em-alto-nível)
* 🧱 [Requisitos](#requisitos)
* 🧾 [Configuração do Ambiente](#configuração-do-ambiente)
* 💻 [Execução Local](#execução-local)
* 🗄️ [Banco de Dados e Seeds](#banco-de-dados-e-seeds)
* 🧪 [Testes e Qualidade](#testes-e-qualidade)
* 🤖 [Pipelines CI/Deployment](#-pipelines-cideployment)
* 📘 [Documentação da API](#documentação-da-api)
* 🗂️ [Estrutura de Pastas](#estrutura-de-pastas-resumo)
* 🔜 [Próximos Passos Sugeridos](#próximos-passos-sugeridos)

---

## ⚙️ Visao Geral

Gaia Web é o painel full-stack da plataforma Gaia. Ele combina renderização híbrida (SSR + streaming) do React Router com widgets especializados para monitorar telemetria, analisar alertas e administrar usuários, consumindo dados do Gaia Server via REST.

## 🚀 Principais Recursos

* **Telemetry Dashboard**: mapas Leaflet, tabelas e gráficos para monitorar estações, parâmetros e medições.
* **Alerting Hub**: listagem, filtros e agregados de alertas com feedback rápido.
* **Membership Management**: autenticação, recuperação de senha e gerenciamento de perfis com Clerk.
* **UI Modular**: biblioteca de widgets Shadcn + Radix com suporte a temas e responsividade.
* **Infra Client-Side**: React Query, nuqs e middlewares próprios para estado, cache e navegação segura.

## 🛠️ Principais tecnologias

* **React Router 7**, **React 19** e **TypeScript 5** como base da aplicação.
* **Tailwind CSS 4**, **Radix UI**, **Shadcn UI** e **Lucide** para componentes visuais.
* **TanStack Query & Table**, **React Hook Form**, **Zod** e **Conform** para dados e formulários.
* **Leaflet/React-Leaflet** para visualização geográfica.
* **Vitest**, **Testing Library**, **Husky**, **Commitlint** e **Biome** para testes e qualidade.

## 🧩 Arquitetura em Alto Nível

* Camadas verticais separam domínio (`core/`), integração (`rest/`, `rpc/`), interface (`ui/`) e rotas (`app/`).
* Middlewares do React Router controlam autenticação, carregamento inicial e injeção de serviços REST.
* DTOs compartilhados mantêm contratos alinhados com o backend; validações vivem em `validation/`.
* Fakers e utilitários de provisionamento (`provision/`) auxiliam em demos e testes locais.
* Convenções adicionais: `documentation/*.md` e `.windsurf/rules/*.md`.

## 🧱 Requisitos

* Node.js 20+ e npm 10+
* Docker (opcional) para execução por container
* Conta e chaves do **Clerk**
* Endpoint público da API **Gaia Server** (REST)

## 🧾 Configuração do Ambiente

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Duplique o arquivo de variáveis:

   ```bash
   cp .env.example .env
   ```

3. Ajuste os valores conforme necessário:

| Variável                     | Descrição                                                                    |
| ---------------------------- | ---------------------------------------------------------------------------- |
| `VITE_GAIA_SERVER_URL`       | URL base da API Gaia Server consumida pelo painel.                           |
| `VITE_CLERK_PUBLISHABLE_KEY` | Chave pública do Clerk exposta ao navegador.                                 |
| `CLERK_SECRET_KEY`           | Chave privada do Clerk usada em trechos server-side (SSR e rotas protegidas). |

> 💡 A validação das variáveis está em `src/validation/global/env-schema.ts`. Durante o build, o schema garante que apenas variáveis necessárias são expostas ao cliente.

## 💻 Execução Local

### Desenvolvimento com HMR

```bash
npm run dev
```

O painel ficará acessível em `http://localhost:5173` (ajustável via `PORT`/`VITE_PORT`). Rotas privadas exigem credenciais válidas do Clerk.

### Build e Servidor de Produção

```bash
npm run build
npm run start
```

O comando `build` gera artefatos client/server na pasta `build/`. O `start` usa `react-router-serve` para entregar SSR (porta padrão `3000` ou variável `PORT`).

### Execução com Docker

```bash
docker build -t gaia-web .
docker run -p 3000:3000 --env-file .env gaia-web
```

O container executa `npm run start`, servindo a aplicação renderizada pelo React Router.

## 🗄️ Banco de Dados e Seeds

Gaia Web não persiste dados localmente. Todos os recursos dependem do Gaia Server. Para demos completas, garanta que o backend esteja populado (seeds executados) e acessível pela URL configurada.

## 🧪 Testes e Qualidade

* `npm run test` — executa a suíte com Vitest (ambiente `jsdom` em `test/setup-tests.ts`).
* `npm run test:watch` — modo observação para desenvolvimento.
* `npm run typecheck` — gera tipos do React Router (`react-router typegen`) e roda `tsc --noEmit`.
* `npx biome check` — lint e formatação conforme `biome.json`.
* Husky instala hooks automaticamente (`prepare`); Commitlint reforça convenção de mensagens.

## 🤖 Pipelines CI/Deployment

* **Staging Deployment** (`.github/workflows/staging-deployment.yaml`) — dispara em _pull requests_ contra a branch `main`. Reutiliza o workflow genérico de deploy (`deployment.yaml`) com `environment=dev`, gera imagem Docker, publica no AWS ECR e atualiza o serviço ECS apontado para o ambiente de desenvolvimento.
* **Production Deployment** (`.github/workflows/production-deployment.yaml`) — executa em pushes para a branch `production`, reaproveitando a mesma stack de passos com `environment=prod` para atualizar o serviço de produção.
* **Reusable Workflow** (`.github/workflows/deployment.yaml`) — encapsula o fluxo comum: checkout, geração de tag curta, autenticação OIDC com AWS, build/push da imagem (tag e `latest`) e atualização da task definition no ECS. Recebe o `environment` como input e utiliza segredos (`AWS_ROLE_ARN`, `AWS_REGION`) herdados do repositório.

> Garanta que as contas AWS referenciadas possuam permissões para ECR e ECS e que as branches `main` e `production` reflitam o fluxo de promoção desejado.

## 📘 Documentação da API

* Os módulos deste painel consomem endpoints REST documentados no repositório Gaia Server.
* Tipos e DTOs sincronizados estão em `src/core/**`. Para detalhes de endpoints consulte `documentation/rest-layer.md` e a documentação pública do backend.
* Em desenvolvimento, recomenda-se utilizar as coleções de requisições do backend ou ferramentas como Hoppscotch/Postman.

## 🗂️ Estrutura de Pastas (resumo)

```
src/
  app/          # rotas, loaders/actions, middlewares e layouts React Router
  core/         # contratos, DTOs e lógica de domínio compartilhada
  rest/         # serviços REST e middlewares de integração
  rpc/          # adaptadores RPC e contratos
  ui/           # widgets, componentes e hooks de interface
  validation/   # schemas Zod e utilidades de validação
  provision/    # fakers, seeds e helpers de provisionamento
documentation/  # guias de arquitetura, convenções e PRD
```
---
