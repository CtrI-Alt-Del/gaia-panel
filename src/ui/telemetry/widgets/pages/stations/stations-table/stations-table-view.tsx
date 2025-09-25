import { Link } from "react-router";
import type { StationDto } from "@/core/telemetry/dtos/station-dto";
import type { ParameterDto } from "@/core/telemetry/dtos/parameter-dto";
import { StatusPill } from "@/ui/shadcn/components/status-pill";
import { Edit } from "lucide-react";
import { StationStatusButton } from "../station-status-button";
import { Dialog } from "@/ui/global/widgets/components/dialog";
import { StationForm } from "../station-form";
import { PaginationControl } from "@/ui/global/widgets/components/pagination-control";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/ui/shadcn/components/table";
import type { TelemetryService } from "@/core/telemetry/interfaces/telemetry-service";
import type { UiProvider } from "@/core/global/interfaces/ui-provider";
import type { ToastProvider } from "@/core/global/interfaces/toast-provider";

type StationsTableViewProps = {
  stations: StationDto[];
  nextCursor: string | null;
  previousCursor: string | null;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isLoading?: boolean;
  selectedStation?: StationDto;
  availableParameters: ParameterDto[] | undefined;
  onEdit?: (id: string) => void;
  onCloseModal?: () => void;
  telemetryService: TelemetryService;
  uiProvider: UiProvider;
  toastProvider: ToastProvider;
};

export const StationsTableView = ({
  stations,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  selectedStation,
  availableParameters,
  onEdit,
  onCloseModal,
  telemetryService,
  uiProvider,
  toastProvider,
}: StationsTableViewProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[90px]">UID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Coordenadas</TableHead>
          <TableHead>Parâmetros</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Última Leitura</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-muted-foreground">
              Carregando…
            </TableCell>
          </TableRow>
        ) : stations.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-muted-foreground">
              Nenhuma estação encontrada
            </TableCell>
          </TableRow>
        ) : (
          stations.map((station) => (
            <TableRow key={station.id}>
              <TableCell className="font-medium">{station.uid}</TableCell>
              <TableCell>
                <Link
                  to={`/stations/${station.id}`}
                  className="text-primary hover:text-primary/80 hover:underline font-medium"
                >
                  {station.name}
                </Link>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {station.latitude.toFixed(4)}, {station.longitude.toFixed(4)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {station.quantityOfParameters || 0} parâmetros
              </TableCell>
              <TableCell>
                <StatusPill active={station.status || false} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {station.lastMeasurement ? station.lastMeasurement : "—"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-center">
                  {onEdit && (
                    <Dialog
                      onClose={onCloseModal || (() => { })}
                      title="Editar Estação"
                      description="Edite as informações da estação"
                      size="md"
                      trigger={
                        <button
                          type="button"
                          onClick={() => onEdit(String(station.id))}
                          className="inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer bg-gray-100 hover:bg-gray-200 text-muted-foreground hover:text-accent-foreground border border-gray-200"
                          title="Editar estação"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      }
                    >
                      {(closeDialog) => (
                        <StationForm
                          onSuccess={closeDialog}
                          onCancel={closeDialog}
                          stationDto={selectedStation}
                          availableParameters={availableParameters}
                          telemetryService={telemetryService}
                          uiProvider={uiProvider}
                          toastProvider={toastProvider}
                        />
                      )}
                    </Dialog>
                  )}
                  <StationStatusButton
                    stationId={station.id}
                    isActive={station.status || false}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>
            <PaginationControl
              previousCursor={previousCursor}
              nextCursor={nextCursor}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};