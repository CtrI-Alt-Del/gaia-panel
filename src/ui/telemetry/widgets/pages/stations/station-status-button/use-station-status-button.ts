import type { TelemetryService } from "@/core/telemetry/interfaces/telemetry-service";
import type { UiProvider, ToastProvider } from "@/core/global/interfaces";

type UseStationStatusButtonProps = {
  stationId: string;
  isStationActive: boolean;
  telemetryService: TelemetryService;
  toastProvider: ToastProvider;
  uiProvider: UiProvider;
};

export function useStationStatusButton({
  stationId,
  isStationActive,
  telemetryService,
  toastProvider,
  uiProvider,
}: UseStationStatusButtonProps) {
  async function handleActivate() {
    const response = await telemetryService.activateStation(stationId);
    if (response.isFailure) {
      toastProvider.showError(response.errorMessage);
    }
    if (response.isSuccessful) {
      toastProvider.showSuccess("Estação ativada com sucesso!");
      await uiProvider.reload();
    }
  }

  async function handleDeactivate() {
    const response = await telemetryService.deactivateStation(stationId);

    if (response.isFailure) {
      toastProvider.showError(response.errorMessage);
    }
    if (response.isSuccessful) {
      toastProvider.showSuccess("Estação desativada com sucesso!");
      await uiProvider.reload();
    }
  }

  function handleConfirm() {
    if (isStationActive) {
      handleDeactivate();
    } else {
      handleActivate();
    }
  }

  return {
    handleConfirm,
  };
}
