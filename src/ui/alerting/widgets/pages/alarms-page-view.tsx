import { Link, useLocation } from 'react-router'
import { AlarmsFilters } from '../components/alarms-filters'
import { AlarmsTable } from '../components/alarms-table'
import type { AlarmRule, AlarmFilters, AlarmStats, AlarmPagination } from './use-alarms'

interface AlarmsPageViewProps {
  alarms: AlarmRule[]
  stats: AlarmStats
  filters: AlarmFilters
  pagination: AlarmPagination
  error: string | null
  onViewAlarm: (alarmId: string) => void
  onEditAlarm: (alarmId: string) => void
  onDeleteAlarm: (alarmId: string) => void
  onClearError: () => void
}

export const AlarmsPageView = ({
  alarms,
  stats,
  filters,
  pagination,
  error,
  onViewAlarm,
  onEditAlarm,
  onDeleteAlarm,
  onClearError,
}: AlarmsPageViewProps) => {
  const { search } = useLocation()

  const urlWith = (patch: Record<string, string | null>) => {
    const p = new URLSearchParams(search)
    p.set('q', filters.search ?? '')
    p.set('status', filters.status)
    p.set('limit', String(pagination.limit))
    if (patch.cursor === null) p.delete('cursor')
    Object.entries(patch).forEach(([k, v]) => {
      if (v === null) return
      p.set(k, v)
    })
    return `?${p.toString()}`
  }
  return (
    <section className='container mx-auto px-4 py-2'>
      {error && (
        <div className='mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between'>
          <span className='text-red-800'>{error}</span>
          <button
            type='button'
            onClick={onClearError}
            className='text-red-600 hover:text-red-800 cursor-pointer'
          >
            ✕
          </button>
        </div>
      )}

      <header className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <h1 className='text-xl font-semibold'>Regras de Alarme</h1>
          <p className='text-sm text-stone-600'>Filtro por nome e status</p>
        </div>
      </header>

      <div className='mb-6'>
        <AlarmsFilters
          searchValue={filters.search}
          statusValue={filters.status}
          limit={pagination.limit}
        />
      </div>

      <AlarmsTable
        alarms={alarms}
        stats={stats}
        onViewAlarm={onViewAlarm}
        onEditAlarm={onEditAlarm}
        onDeleteAlarm={onDeleteAlarm}
      />

      <footer className='mt-4 flex items-center justify-between'>
        <div className='text-xs text-stone-600'>
          Mostrando até {pagination.limit} itens • Filtro:{' '}
          {filters.search ? `"${filters.search}"` : 'nenhum'} • Status:{' '}
          {filters.status === 'all' ? 'todos' : filters.status}
        </div>

        <nav className='flex items-center gap-2'>
          <Link
            to={pagination.prevCursor ? urlWith({ cursor: pagination.prevCursor }) : '#'}
            aria-disabled={!pagination.prevCursor}
            className={`rounded-full border px-3 py-1.5 text-sm ${pagination.prevCursor ? 'hover:bg-stone-50' : 'pointer-events-none opacity-50'}`}
          >
            Anterior
          </Link>
          <Link
            to={pagination.nextCursor ? urlWith({ cursor: pagination.nextCursor }) : '#'}
            aria-disabled={!pagination.nextCursor}
            className={`rounded-full border px-3 py-1.5 text-sm ${pagination.nextCursor ? 'hover:bg-stone-50' : 'pointer-events-none opacity-50'}`}
          >
            Próxima
          </Link>
        </nav>
      </footer>
    </section>
  )
}
