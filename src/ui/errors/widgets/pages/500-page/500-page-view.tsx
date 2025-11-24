import { ROUTES } from '@/core/global/constants/routes';
import { Link } from 'react-router';

interface InternalServerErrorViewProps {
  error?: unknown;
}

export const InternalServerErrorView = ({ error }: InternalServerErrorViewProps) => {
  const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <div className="flex w-full max-w-md flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center shadow-lg transition-all animate-in fade-in zoom-in duration-500">
        <h1 className="select-none text-8xl font-black tracking-tighter text-destructive drop-shadow-sm">
          500
        </h1>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl">
          Erro Interno
        </h2>

        <p className="mt-4 text-lg text-muted-foreground">
          Algo correu mal nos nossos servidores. Não se preocupe, o problema não é consigo.
        </p>
        {errorMessage && (
           <div className="mt-6 w-full rounded bg-muted p-3 font-mono text-xs text-muted-foreground break-all">
             {errorMessage}
           </div>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
          >
            Tentar Novamente
          </button>
          <Link
            to={ROUTES.index}
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
};
