import { Link } from 'react-router'
import type { StationDto } from '@/core/dtos/telemetry/station-dto'
import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'
import { DetailsTab, RecordsTab } from '../../components/station'

interface StationPageViewProps {
  station: StationDto | null
  tab: 'details' | 'records'
  loading: boolean
  rows: MeasurementDto[]
  cursor: { next: string | null, prev: string | null }
  parameterId: string
  limit: number
  uniqueParams: Array<{ id: string, name: string }>
  setTab: (tab: 'details' | 'records') => void
  setParam: (k: string, v: string | null) => void
  loadRecords: () => Promise<void>
  timeAgo: (d: Date) => string
  formatDateTime: (d: Date) => string
  toggleStationActive: () => Promise<void>
}

export default function StationPageView({
  station,
  tab,
  loading,
  rows,
  cursor,
  parameterId,
  limit,
  uniqueParams,
  setTab,
  setParam,
  loadRecords,
  timeAgo,
  formatDateTime,
  toggleStationActive
}: StationPageViewProps) {
  if (!station) return <div className="p-6">Carregando…</div>

  return (
    <div className="p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            <Link className="underline" to="/stations">Estações</Link>
            <span className="mx-2">/</span>
            <span>{station.UID}</span>
          </div>
          <h1 className="text-2xl font-semibold">{station.name}</h1>
          <p className="text-sm text-muted-foreground">{station.latitude.toFixed(4)}, {station.longitude.toFixed(4)}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="h-9 px-4 rounded-md border border-stone-300 text-stone-700 hover:bg-stone-50">
            Editar
          </button>
          <button
            type="button"
            className={`h-9 px-4 rounded-md border ${station.isActive
              ? 'border-red-300 text-red-700 hover:bg-red-50'
              : 'border-green-300 text-green-700 hover:bg-green-50'
              }`}
            onClick={toggleStationActive}
          >
            {station.isActive ? 'Desativar' : 'Ativar'}
          </button>
        </div>
      </div>

      <div className="border-b mb-4 flex gap-6 text-sm">
        <button type="button" className={`pb-2 -mb-[1px] border-b-2 ${tab === 'details' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`} onClick={() => setTab('details')}>Detalhes da Estação</button>
        <button type="button" className={`pb-2 -mb-[1px] border-b-2 ${tab === 'records' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`} onClick={() => setTab('records')}>Registros</button>
      </div>

      {tab === 'details' ? (
        <DetailsTab
          station={station}
          timeAgo={timeAgo}
        />
      ) : (
        <RecordsTab
          loading={loading}
          rows={rows}
          cursor={cursor}
          parameterId={parameterId}
          limit={limit}
          uniqueParams={uniqueParams}
          setParam={setParam}
          loadRecords={loadRecords}
          formatDateTime={formatDateTime}
        />
      )}
    </div>
  )
}
