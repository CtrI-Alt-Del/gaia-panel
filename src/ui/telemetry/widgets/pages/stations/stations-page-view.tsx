import { Form } from "react-router";

import type { StationDto } from "@/core/telemetry/dtos/station-dto";
import { Button } from "@/ui/shadcn/components/button";
import { Plus } from "lucide-react";
import { PageSizeSelect } from "@/ui/global/widgets/components/page-size-select";
import { StatusSelect } from "@/ui/global/widgets/components/status-select";
import { StationNameSearchInput } from "./station-name-search-input";
import { StationForm } from "./station-form";
import { Dialog } from "@/ui/global/widgets/components/dialog";
import { StationsTable } from "./stations-table";
import type { TelemetryService } from "@/core/telemetry/interfaces/telemetry-service";
import type { UiProvider } from "@/core/global/interfaces/ui-provider";
import type { ToastProvider } from "@/core/global/interfaces/toast-provider";

export type StationsPageViewProps = {
  stations: StationDto[];
  nextCursor: string | null;
  previousCursor: string | null;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isLoading?: boolean;
  selectedStation?: StationDto;
  onEdit?: (id: string) => void;
  onCloseModal?: () => void;
  onStationUpdated?: (station: StationDto) => void;
  telemetryService: TelemetryService;
  uiProvider: UiProvider;
  toastProvider: ToastProvider;
};

export const StationsPageView = ({
  stations,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  selectedStation,
  onEdit,
  onCloseModal,
  telemetryService,
  uiProvider,
  toastProvider,
}: StationsPageViewProps) => {
  return (
    <div className="container mx-auto px-4 py-2">
      <div className="mb-6">
        <div className="w-full">
          <div className="rounded-lg border border-accent bg-card p-4">
            <Form
              preventScrollReset
              method="get"
              className="flex flex-wrap items-end gap-2"
            >
              <StationNameSearchInput label="Filtrar por nome" />
              <StatusSelect />
              <PageSizeSelect />
              <Button type="submit" className="h-9">
                Aplicar
              </Button>
            </Form>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card border-accent">
        <div className="flex items-center justify-between p-4 border-b border-accent">
          <Dialog
            onClose={onCloseModal || (() => { })}
            title="Nova Estação"
            description="Preencha os dados para criar uma nova estação"
            size="md"
            trigger={
              <Button className="flex items-center gap-2 h-9">
                <Plus className="w-4 h-4" />
                Nova Estação
              </Button>
            }
          >
            {(closeDialog) => (
              <StationForm
                onSuccess={closeDialog}
                onCancel={closeDialog}
                telemetryService={telemetryService}
                uiProvider={uiProvider}
                toastProvider={toastProvider}
              />
            )}
          </Dialog>
        </div>

        <StationsTable
          stations={stations}
          nextCursor={nextCursor}
          previousCursor={previousCursor}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          isLoading={isLoading}
          selectedStation={selectedStation}
          onEdit={onEdit}
          onCloseModal={onCloseModal}
          telemetryService={telemetryService}
          uiProvider={uiProvider}
          toastProvider={toastProvider}
        />
      </div>
    </div>
  );
};
