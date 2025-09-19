import { Link } from 'react-router'

export type PaginationControlViewProps = {
  previousCursor: string | null
  nextCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  onbuildUrl: (params: Record<string, string>) => string
  className?: string
}

export const PaginationControlView = ({
  previousCursor,
  nextCursor,
  hasNextPage,
  hasPreviousPage,
  onbuildUrl,
  className = '',
}: PaginationControlViewProps) => {
  return (
    <div className={`text-right ${className}`}>
      <nav className='inline-flex items-center gap-2'>
        <Link
          to={
            previousCursor && hasPreviousPage
              ? onbuildUrl({ previousCursor: previousCursor })
              : '#'
          }
          aria-disabled={!hasPreviousPage}
          className={`rounded-full border px-3 py-1.5 text-sm ${
            hasPreviousPage ? 'hover:bg-stone-50' : 'pointer-events-none opacity-50'
          }`}
        >
          Anterior
        </Link>
        <Link
          to={nextCursor && hasNextPage ? onbuildUrl({ nextCursor: nextCursor }) : '#'}
          aria-disabled={!hasNextPage}
          className={`rounded-full border px-3 py-1.5 text-sm ${
            hasNextPage ? 'hover:bg-stone-50' : 'pointer-events-none opacity-50'
          }`}
        >
          Próxima
        </Link>
      </nav>
    </div>
  )
}

export const PaginationInfo = ({
  limit,
  q,
  isActive,
  className = '',
}: {
  limit: number
  q: string
  isActive?: string
  className?: string
}) => {
  return (
    <div className={`text-xs text-stone-600 ${className}`}>
      Mostrando até {limit} itens • Busca: {q ? `"${q}"` : 'nenhuma'} • Status:{' '}
      {isActive === 'all' ? 'todos' : isActive === 'active' ? 'ativos' : 'inativos'}
    </div>
  )
}
