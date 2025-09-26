import { useCallback } from 'react'
import { useRest } from '@/ui/global/hooks/use-rest'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'
import { useToastProvider } from '@/ui/global/hooks/use-toast'

type UseParameterStatusButtonProps = {
  parameterId: string
  isActive: boolean
}

export function useParameterStatusButton({
  parameterId,
  isActive,
}: UseParameterStatusButtonProps) {
  const { telemetryService } = useRest()
  const uiProvider = useUiProvider()
  const toastProvider = useToastProvider()

  const handleToggle = useCallback(async () => {
    try {
      // Capturar o valor atual de isActive no momento da execução
      const currentIsActive = isActive

      const response = currentIsActive
        ? await telemetryService.deactivateParameter(parameterId)
        : await telemetryService.activateParameter(parameterId)

      if (response.isFailure) {
        const errorMessage = response.errorMessage || 'Erro desconhecido'
        toastProvider.showError(`Erro ao alterar status do parâmetro: ${errorMessage}`)
        return
      }

      if (response.isSuccessful) {
        toastProvider.showSuccess(
          currentIsActive
            ? 'Parâmetro desativado com sucesso!'
            : 'Parâmetro ativado com sucesso!',
        )
        await uiProvider.reload()
      }
    } catch (error) {
      toastProvider.showError('Erro inesperado ao alterar status do parâmetro')
    }
  }, [parameterId, isActive, telemetryService, uiProvider, toastProvider])

  return {
    handleToggle,
  }
}
