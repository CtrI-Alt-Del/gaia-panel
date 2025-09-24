import { StationStatusButtonView } from "./station-status-button-view";
import { useStationStatusButton } from "./use-station-status-button";
import { useToastProvider } from "@/ui/global/hooks/use-toast";
import { useUiProvider } from "@/ui/global/hooks/use-ui-provider";
import { useRest } from "@/ui/global/hooks/use-rest";

type Props = {
  stationId: string;
  isActive: boolean;
};

export const StationStatusButton = ({ stationId, isActive }: Props) => {
  const { membershipService } = useRest();
  const toastProvider = useToastProvider();
  const uiProvider = useUiProvider();
  const { handleConfirm } = useStationStatusButton({
    stationId,
    isStationActive: isActive,
    telemetryService: membershipService, // Temporariamente usando membershipService
    uiProvider,
    toastProvider,
  });

  return (
    <StationStatusButtonView isActive={isActive} onConfirm={handleConfirm} />
  );
};
