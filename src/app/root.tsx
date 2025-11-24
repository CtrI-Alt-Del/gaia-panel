import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'
import { rootAuthLoader } from '@clerk/react-router/ssr.server'
import { ClerkProvider } from '@clerk/react-router'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { ptBR } from '@clerk/localizations'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

import type { Route } from './+types/root'
import '@/ui/global/styles/global.css'
import { Toaster } from '@/ui/shadcn/components/sonner'
import { PageBackground } from '@/ui/global/widgets/components/page-background'
import { NotFoundPageView } from '@/ui/errors/widgets/pages/404-page/404-page-view'
import { InternalServerErrorPage } from '@/ui/errors/widgets/pages/500-page'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='pt-BR'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <NuqsAdapter>
          <PageBackground>{children}</PageBackground>
        </NuqsAdapter>
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  )
}

export async function loader(args: Route.LoaderArgs) {
  return rootAuthLoader(args)
}

const App = ({ loaderData }: Route.ComponentProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider loaderData={loaderData} localization={ptBR}>
        <Outlet />
      </ClerkProvider>
    </QueryClientProvider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  console.log('ErrorBoundary:', error)

  if (isRouteErrorResponse(error)) {
    if (isRouteErrorResponse(error) && error.status === 404) {
      return <NotFoundPageView />
    }
    return <InternalServerErrorPage error={error} />
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}

export default App
