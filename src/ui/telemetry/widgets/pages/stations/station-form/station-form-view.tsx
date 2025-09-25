import { Button } from "@/ui/shadcn/components/button";
import { Input } from "@/ui/shadcn/components/input";
import { Label } from "@/ui/shadcn/components/label";
import { LocationPickerView } from "@/ui/global/widgets/components/location-picker";
import { ParameterSelectorView } from "@/ui/global/widgets/components/parameter-selector";
import type { StationDto } from "@/core/telemetry/dtos/station-dto";
import type { ParameterDto } from "@/core/telemetry/dtos/parameter-dto";
import type { TelemetryService } from "@/core/telemetry/interfaces/telemetry-service";
import type { UiProvider } from "@/core/global/interfaces/ui-provider";
import type { ToastProvider } from "@/core/global/interfaces/toast-provider";
import { useStationForm } from "./use-station-form";

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
  stationDto?: StationDto;
  availableParameters: ParameterDto[] | undefined;
  telemetryService: TelemetryService;
  uiProvider: UiProvider;
  toastProvider: ToastProvider;
};

export const StationFormView = ({
  onSuccess,
  onCancel,
  stationDto,
  availableParameters,
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

        {/* Localização */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Localização</h3>
          <LocationPickerView
            latitude={form.watch("latitude")}
            longitude={form.watch("longitude")}
            address={form.watch("address")}
            onLocationChange={(lat, lng, address) => {
              form.setValue("latitude", lat, { shouldValidate: true });
              form.setValue("longitude", lng, { shouldValidate: true });
              form.setValue("address", address, { shouldValidate: true });
            }}
          />
          {form.formState.errors.latitude && (
            <p className="text-sm text-red-500">
              {form.formState.errors.latitude.message}
            </p>
          )}
          {form.formState.errors.longitude && (
            <p className="text-sm text-red-500">
              {form.formState.errors.longitude.message}
            </p>
          )}
          {form.formState.errors.address && (
            <p className="text-sm text-red-500">
              {form.formState.errors.address.message}
            </p>
          )}
        </div>

        {/* Parâmetros */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Parâmetros</h3>
          <ParameterSelectorView
            availableParameters={availableParameters}
            selectedParameterIds={form.watch("parameterIds") || []}
            onSelectionChange={(parameterIds) => {
              form.setValue("parameterIds", parameterIds, { shouldValidate: true });
            }}
          />
          {form.formState.errors.parameterIds && (
            <p className="text-sm text-red-500">
              {form.formState.errors.parameterIds.message}
            </p>
          )}
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