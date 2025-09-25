import { Button } from "@/ui/shadcn/components/button";
import { Input } from "@/ui/shadcn/components/input";
import { Label } from "@/ui/shadcn/components/label";
import type { StationDto } from "@/core/telemetry/dtos/station-dto";
import type { TelemetryService } from "@/core/telemetry/interfaces/telemetry-service";
import type { UiProvider } from "@/core/global/interfaces/ui-provider";
import type { ToastProvider } from "@/core/global/interfaces/toast-provider";
import { useStationForm } from "./use-station-form";

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
  stationDto?: StationDto;
  telemetryService: TelemetryService;
  uiProvider: UiProvider;
  toastProvider: ToastProvider;
};

export const StationFormView = ({
  onSuccess,
  onCancel,
  stationDto,
  telemetryService,
  uiProvider,
  toastProvider,
}: Props) => {
  const isEdition = Boolean(stationDto?.id);
  const { form, isValid, handleCancel, handleSubmit } = useStationForm({
    onSuccess,
    onCancel,
    stationDto,
    telemetryService,
    uiProvider,
    toastProvider,
  });

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {isEdition && stationDto?.id && (
          <input type="hidden" name="id" value={stationDto.id} />
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Nome da Estação</Label>
          <Input
            id="name"
            {...form.register("name")}
            placeholder="Ex.: Estação Central"
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="uid">UID</Label>
          <Input
            id="uid"
            {...form.register("uid")}
            placeholder="Ex.: EST001"
          />
          {form.formState.errors.uid && (
            <p className="text-sm text-red-500">
              {form.formState.errors.uid.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="number"
              step="any"
              {...form.register("latitude", { valueAsNumber: true })}
              placeholder="Ex.: -23.5505"
            />
            {form.formState.errors.latitude && (
              <p className="text-sm text-red-500">
                {form.formState.errors.latitude.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              type="number"
              step="any"
              {...form.register("longitude", { valueAsNumber: true })}
              placeholder="Ex.: -46.6333"
            />
            {form.formState.errors.longitude && (
              <p className="text-sm text-red-500">
                {form.formState.errors.longitude.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!isValid}>
            {isEdition ? "Atualizar Estação" : "Criar Estação"}
          </Button>
        </div>
      </form>
    </div>
  );
};