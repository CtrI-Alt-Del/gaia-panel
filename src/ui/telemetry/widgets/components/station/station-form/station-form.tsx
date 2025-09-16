import { Button } from "@/ui/shadcn/components/button";
import { Input } from "@/ui/shadcn/components/input";
import { Label } from "@/ui/shadcn/components/label";
import { Switch } from "@/ui/shadcn/components/switch";
import { Badge } from "@/ui/shadcn/components/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/shadcn/components/form";
import { X, MapPin, Plus } from "lucide-react";
import type { ParameterDto } from "@/core/dtos/telemetry/parameter-dto";
import type { StationDto } from "@/core/dtos/telemetry/station-dto";
import { useStationForm, type StationFormData } from "./use-station-form";

interface StationFormProps {
  onCancel: () => void;
  onSubmit: (data: StationFormData) => Promise<void>;
  availableParameters: ParameterDto[];
  station?: StationDto | null;
  mode: "create" | "edit";
}

export function StationForm({
  onCancel,
  onSubmit,
  availableParameters,
  station,
  mode,
}: StationFormProps) {
  const {
    form,
    selectedParameterId,
    isSubmitting,
    selectedParameters,
    availableParametersForSelection,
    submitButtonText,
    setSelectedParameterId,
    handleSubmit,
    handleClose,
    handleMapClick,
    addParameter,
    removeParameter,
  } = useStationForm({
    availableParameters,
    station,
    mode,
    onSubmit,
    onCancel,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex.: Estação Central"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="UID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex.: EST001"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>Localização</Label>
          <div className="border rounded-lg p-4 bg-muted/50">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">
                Clique no mapa para selecionar a localização
              </span>
            </div>
            <button
              type="button"
              className="w-full h-64 bg-muted rounded border-2 border-dashed border-muted-foreground/25 flex items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
              onClick={() => {
                const lat = -23.5505 + (Math.random() - 0.5) * 0.1;
                const lng = -46.6333 + (Math.random() - 0.5) * 0.1;
                handleMapClick(lat, lng);
              }}
            >
              {form.watch("latitude") !== 0 && form.watch("longitude") !== 0 ? (
                <div className="text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p className="text-sm font-medium">Localização selecionada</p>
                  <p className="text-xs text-muted-foreground">
                    {form.watch("latitude").toFixed(6)},{" "}
                    {form.watch("longitude").toFixed(6)}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Clique para selecionar
                  </p>
                </div>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    placeholder="Ex.: -23.5505"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    placeholder="Ex.: -46.6333"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Estação ativa</FormLabel>
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <Label>Parâmetros da Estação</Label>

          <div className="flex gap-2">
            <select
              value={selectedParameterId}
              onChange={(e) => setSelectedParameterId(e.target.value)}
              className="flex-1 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Selecione um parâmetro</option>
              {availableParametersForSelection.map((parameter) => (
                <option key={parameter.id} value={parameter.id}>
                  {parameter.name} ({parameter.unitOfMeasure})
                </option>
              ))}
            </select>
            <Button
              type="button"
              onClick={addParameter}
              disabled={!selectedParameterId}
              size="sm"
              className="px-3"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {selectedParameters.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Parâmetros selecionados:</p>
              <div className="flex flex-wrap gap-2">
                {selectedParameters.map((parameter) => (
                  <Badge
                    key={parameter.id}
                    className="flex items-center gap-1 pr-1"
                  >
                    {parameter.name} ({parameter.unitOfMeasure})
                    <button
                      type="button"
                      onClick={() => removeParameter(parameter.id)}
                      className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {submitButtonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
