import { StationFormView } from "./station-form-view";
import type { StationDto } from "@/core/telemetry/dtos/station-dto";
import type { TelemetryService } from "@/core/telemetry/interfaces/telemetry-service";
import type { UiProvider } from "@/core/global/interfaces/ui-provider";
import type { ToastProvider } from "@/core/global/interfaces/toast-provider";

type StationFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
  stationDto?: StationDto;
  telemetryService: TelemetryService;
  uiProvider: UiProvider;
  toastProvider: ToastProvider;
};

export const StationForm = (props: StationFormProps) => <StationFormView {...props} />;
