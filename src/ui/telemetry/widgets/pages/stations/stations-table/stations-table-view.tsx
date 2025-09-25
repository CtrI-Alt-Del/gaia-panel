import { Link } from "react-router";
import type { StationDto } from "@/core/telemetry/dtos/station-dto";
import { StatusPill } from "@/ui/shadcn/components/status-pill";
import { Button } from "@/ui/shadcn/components/button";
import { Edit } from "lucide-react";
import { StationStatusButton } from "../station-status-button";
import { Dialog } from "@/ui/global/widgets/components/dialog";
import { StationForm } from "../station-form";
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
  onEdit?: (id: string) => void;
  onCloseModal?: () => void;
  telemetryService: TelemetryService;
  uiProvider: UiProvider;
  toastProvider: ToastProvider;
};

export const StationsTableView = ({
  stations,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  selectedStation,
  onEdit,
  onCloseModal,
  telemetryService,
  uiProvider,
  toastProvider,
}: StationsTableViewProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="p-3 w-[90px] font-medium text-muted-foreground">
              UID
            </th>
            <th className="p-3 font-medium text-muted-foreground">Nome</th>
            <th className="p-3 font-medium text-muted-foreground">
              Coordenadas
            </th>
            <th className="p-3 font-medium text-muted-foreground">
              Parâmetros
            </th>
            <th className="p-3 font-medium text-muted-foreground">Status</th>
            <th className="p-3 font-medium text-muted-foreground">
              Última Leitura
            </th>
            <th className="p-3 text-center font-medium text-muted-foreground">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={7} className="p-6 text-center text-muted-foreground">
                Carregando…
              </td>
            </tr>
          )}
          {!isLoading && stations.length === 0 && (
            <tr>
              <td colSpan={7} className="p-6 text-center text-muted-foreground">
                Nenhuma estação encontrada
              </td>
            </tr>
          )}
          {!isLoading &&
            stations.map((station) => (
              <tr
                key={station.id}
                className="border-t border-border hover:bg-muted/50"
              >
                <td className="p-3 font-medium">{station.uid}</td>
                <td className="p-3">
                  <Link
                    to={`/stations/${station.id}`}
                    className="text-primary hover:text-primary/80 hover:underline font-medium"
                  >
                    {station.name}
                  </Link>
                </td>
                <td className="p-3 text-muted-foreground">
                  {station.latitude.toFixed(4)}, {station.longitude.toFixed(4)}
                </td>
                <td className="p-3 text-muted-foreground">
                  {station.quantityOfParameters || 0} parâmetros
                </td>
                <td className="p-3">
                  <StatusPill active={station.status || false} />
                </td>
                <td className="p-3 text-muted-foreground">
                  {station.lastMeasurement ? station.lastMeasurement : "—"}
                </td>
                <td className="p-3 text-right">
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
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination */}
      {(hasNextPage || hasPreviousPage) && (
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Mostrando {stations.length} estações
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!hasPreviousPage}
              onClick={() => {
                // Implementar navegação para página anterior
                console.log("Previous page");
              }}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!hasNextPage}
              onClick={() => {
                // Implementar navegação para próxima página
                console.log("Next page");
              }}
            >
              Próximo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
