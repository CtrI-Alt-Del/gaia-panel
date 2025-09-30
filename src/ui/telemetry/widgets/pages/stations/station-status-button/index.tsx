import { StationStatusButtonView } from './station-status-button-view'
import { useStationStatusButton } from './use-station-status-button'
import { useToastProvider } from '@/ui/global/hooks/use-toast-provider'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'
import { useRest } from '@/ui/global/hooks/use-rest'
import type { PropsWithChildren } from 'react'

type Props = {
  stationId: string
  isActive: boolean
}

export const StationStatusButton = ({
  stationId,
  isActive,
  children,
}: PropsWithChildren<Props>) => {
  const { telemetryService } = useRest()
  const toastProvider = useToastProvider()
  const uiProvider = useUiProvider()
  const { handleConfirm } = useStationStatusButton({
    stationId,
    isStationActive: isActive,
    telemetryService,
    uiProvider,
    toastProvider,
  })

  return (
    <StationStatusButtonView isActive={isActive} onConfirm={handleConfirm}>
      {children}
    </StationStatusButtonView>
  )
}
