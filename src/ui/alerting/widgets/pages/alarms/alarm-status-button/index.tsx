import { AlarmStatusButtonView } from './alarm-status-button-view'
import { useAlarmStatusButton } from './use-alarm-status-button'
import { useToastProvider } from '@/ui/global/hooks/use-toast-provider'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'

type Props = {
  alarmId: string
  isActive: boolean
}

export const AlarmStatusButton = ({ alarmId, isActive }: Props) => {
  const toastProvider = useToastProvider()
  const uiProvider = useUiProvider()
  const { handleConfirm } = useAlarmStatusButton({
    alarmId,
    isAlarmActive: isActive,
    toastProvider,
    uiProvider,
  })

  return <AlarmStatusButtonView isActive={isActive} onConfirm={handleConfirm} />
}
