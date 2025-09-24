import { useCallback } from 'react'

type UseStationStatusButtonProps = {
  stationId: string
  isStationActive: boolean
  telemetryService: any
  uiProvider: any
  toastProvider: any
}

export const useStationStatusButton = ({
  stationId,
  isStationActive,
  telemetryService,
  uiProvider,
  toastProvider,
}: UseStationStatusButtonProps) => {
  const handleConfirm = useCallback(async () => {
    try {
      uiProvider.setLoading(true)

      if (isStationActive) {
        await telemetryService.deactivateStation(stationId)
        toastProvider.showSuccess('Estação desativada com sucesso!')
      } else {
        await telemetryService.activateStation(stationId)
        toastProvider.showSuccess('Estação ativada com sucesso!')
      }
    } catch (error) {
      console.error('Erro ao alterar status da estação:', error)
      toastProvider.showError('Erro ao alterar status da estação')
    } finally {
      uiProvider.setLoading(false)
    }
  }, [stationId, isStationActive, telemetryService, uiProvider, toastProvider])

  return {
    handleConfirm,
  }
}
