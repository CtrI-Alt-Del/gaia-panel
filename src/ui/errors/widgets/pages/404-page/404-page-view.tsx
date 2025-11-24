import { ROUTES } from '@/core/global/constants/routes';
import { Link } from 'react-router';

export const NotFoundPageView = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <div className="flex w-full max-w-md flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center shadow-lg transition-all animate-in fade-in zoom-in duration-500">
        
        <h1 className="select-none text-8xl font-black tracking-tighter text-primary drop-shadow-sm">
          404
        </h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl">
        Oops...
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
           Parece que a página que você está procurando não existe.
        </p>
        <div className="mt-8">
          <Link
            to={ROUTES.index}
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
};
