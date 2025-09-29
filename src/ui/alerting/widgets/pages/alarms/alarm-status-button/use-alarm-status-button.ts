import type { AlertingService } from '@/core/alerting/interfaces/alerting-service'
import type { ToastProvider, UiProvider } from "@/core/global/interfaces";

type UseAlarmStatusButtonProps = {
  alarmId: string;
  isAlarmActive: boolean;
  alertingService: AlertingService
  toastProvider: ToastProvider;
  uiProvider: UiProvider;
};

export function useAlarmStatusButton({
  alarmId,
  isAlarmActive,
  alertingService,
  toastProvider,
  uiProvider,
}: UseAlarmStatusButtonProps) {
  async function handleActivate() {
    const response = await alertingService.activateAlarm(alarmId)
    if (response.isFailure) {
      toastProvider.showError(response.errorMessage)
    }
    if (response.isSuccessful) {
      toastProvider.showSuccess('Alarm ativado com sucesso!')
      await uiProvider.reload()
    }

    // Simulação temporária
    toastProvider.showSuccess("Alarm ativado com sucesso!");
    await uiProvider.reload();
  }

  async function handleDeactivate() {
    const response = await alertingService.deactivateAlarm(alarmId)
    if (response.isFailure) {
      toastProvider.showError(response.errorMessage)
    }
    if (response.isSuccessful) {
      toastProvider.showSuccess('Alarm desativado com sucesso!')
      await uiProvider.reload()
    }

    // Simulação temporária
    toastProvider.showSuccess("Alarm desativado com sucesso!");
    await uiProvider.reload();
  }

  function handleConfirm() {
    if (isAlarmActive) {
      handleDeactivate();
    } else {
      handleActivate();
    }
  }

  return {
    handleConfirm,
  };
}
