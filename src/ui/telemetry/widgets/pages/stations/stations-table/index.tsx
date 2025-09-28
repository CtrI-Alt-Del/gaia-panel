import { StationsTableView } from "./stations-table-view";
import type { StationDto } from "@/core/telemetry/dtos/station-dto";
import type { TelemetryService } from "@/core/telemetry/interfaces/telemetry-service";
import type { UiProvider } from "@/core/global/interfaces/ui-provider";
import type { ToastProvider } from "@/core/global/interfaces/toast-provider";

type StationsTableProps = {
  stations: StationDto[];
  nextCursor: string | null;
  previousCursor: string | null;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isLoading?: boolean;
  selectedStation?: StationDto;
  onEdit?: (id: string) => void;
  onCloseModal?: () => void;
  telemetryService: TelemetryService;
  uiProvider: UiProvider;
  toastProvider: ToastProvider;
};

export const StationsTable = (props: StationsTableProps) => <StationsTableView {...props} />;
