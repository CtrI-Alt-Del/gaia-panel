import { useRest, useToastProvider } from '@/ui/global/hooks'
import { useStationReportDownload } from './use-station-pdf'
import { StationReportDownloadView } from './station-report-download-view'

type Props = {
  stationId: string
  stationName: string
  stationUid?: string
}

export const StationReportDownload = ({ stationId, stationName, stationUid }: Props) => {
  const { telemetryService } = useRest()
  const toastProvider = useToastProvider()

  const { isDownloading, handleDownload } = useStationReportDownload({
    stationId,
    telemetryService,
    toastProvider,
    fileName: buildFileName(stationName, stationUid),
  })

  return (
    <StationReportDownloadView
      isDownloading={isDownloading}
      onDownload={handleDownload}
    />
  )
}

function buildFileName(name: string, uid?: string) {
  const normalized = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
  const slug = normalized.replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '')
  const base = slug || (uid ? uid.toLowerCase() : 'station-report')
  return `${base}.pdf`
}
