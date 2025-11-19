import { useState } from 'react'

import type { TelemetryService } from '@/core/telemetry/interfaces/telemetry-service'
import type { ToastProvider } from '@/core/global/interfaces/toast-provider'

type Props = {
  stationId: string
  fileName: string
  telemetryService: TelemetryService
  toastProvider: ToastProvider
}

export function useStationReportDownload({
  stationId,
  fileName,
  telemetryService,
  toastProvider,
}: Props) {
  const [isDownloading, setIsDownloading] = useState(false)

  async function handleDownload() {
    try {
      setIsDownloading(true)
      const response = await telemetryService.downloadStationPdf(stationId)

      if (response.isFailure) {
        try {
          toastProvider.showError(response.errorMessage)
        } catch {
          toastProvider.showError('Erro ao baixar PDF da estaçãoo.')
        }
        return
      }

      saveBlob(response.body, fileName)
      toastProvider.showSuccess('Download iniciado com sucesso!')
    } catch (error) {
      console.error(error)
      toastProvider.showError('Erro inesperado ao baixar o PDF da estação.')
    } finally {
      setIsDownloading(false)
    }
  }

  return {
    isDownloading,
    handleDownload,
  }
}

function saveBlob(blob: Blob, fileName: string) {
  if (typeof window === 'undefined') return

  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}
