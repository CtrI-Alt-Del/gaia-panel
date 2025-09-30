import { StationsTableView } from './stations-table-view'
import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import type { loader } from '@/app/routes/telemetry/stations-route'
import { useLoaderData } from 'react-router'

type StationsTableProps = {
  stations: StationDto[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  isLoading?: boolean
  selectedStation?: StationDto
  onEdit?: (id: string) => void
  onCloseModal?: () => void
}

export const StationsTable = (props: StationsTableProps) => {
  const { user } = useLoaderData<typeof loader>()
  return <StationsTableView {...props} isAuthenticated={Boolean(user)} />
}
