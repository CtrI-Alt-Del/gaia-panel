import { Download, Loader2 } from 'lucide-react'

type Props = {
  isDownloading: boolean
  onDownload: () => void
}

export const StationReportDownloadView = ({ isDownloading, onDownload }: Props) => {
  return (
    <button
      type='button'
      onClick={onDownload}
      disabled={isDownloading}
      className='flex items-center gap-2 h-10 px-4 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none bg-white'
    >
      {isDownloading ? (
        <Loader2 className='w-4 h-4 animate-spin' />
      ) : (
        <Download className='w-4 h-4' />
      )}
      <span>{isDownloading ? 'Gerando PDF...' : 'Baixar PDF'}</span>
    </button>
  )
}
