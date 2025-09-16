import { Button } from "@/ui/shadcn/components/button";
import { Input } from "@/ui/shadcn/components/input";
import { Label } from "@/ui/shadcn/components/label";
import { useParameterForm } from "./use-parameter-form";
import type { ParameterDto } from "@/core/dtos/telemetry/parameter-dto";
import { Switch } from "@/ui/shadcn/components/switch";

export type ParameterFormViewProps = {
  parameter?: ParameterDto;
  onCancel: () => void;
  onUpdated?: (parameter: ParameterDto) => void;
};

export function ParameterFormView({
  parameter,
  onCancel,
  onUpdated,
}: ParameterFormViewProps) {
  const { form, selectedIcon, handleSubmit } = useParameterForm({
    parameter,
    onUpdated,
    onCancel,
  });

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const isEditMode = Boolean(parameter);

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Ex: Temperatura do Ar"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="unit">Unidade *</Label>
        <div className="flex items-center gap-3">
          <Input
            id="unit"
            {...register("unit")}
            placeholder="Ex: °C, %, hPa, m/s, W/m², km, W, °"
            className={`flex-1 ${errors.unit ? "border-red-500" : ""}`}
          />
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border">
            <span
              className={`inline-flex size-8 items-center justify-center rounded-lg ring-1 ${selectedIcon.badgeColor}`}
            >
              <selectedIcon.Icon
                className={`size-4 ${selectedIcon.iconColor}`}
              />
            </span>
          </div>
        </div>
        {errors.unit && (
          <p className="text-sm text-red-500">{errors.unit.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="factor">Fator *</Label>
          <Input
            id="factor"
            type="number"
            step="0.001"
            {...register("factor", { valueAsNumber: true })}
            className={errors.factor ? "border-red-500" : ""}
          />
          {errors.factor && (
            <p className="text-sm text-red-500">{errors.factor.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="offset">Offset *</Label>
          <Input
            id="offset"
            type="number"
            step="0.001"
            {...register("offset", { valueAsNumber: true })}
            className={errors.offset ? "border-red-500" : ""}
          />
          {errors.offset && (
            <p className="text-sm text-red-500">{errors.offset.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="active"
          checked={watch("active")}
          onCheckedChange={(checked) => setValue("active", checked as boolean)}
        />
        <Label
          htmlFor="active"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {watch("active") ? "Ativo" : "Inativo"}
        </Label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="cursor-pointer"
        >
          Cancelar
        </Button>
        <Button type="submit" className="min-w-[100px] cursor-pointer">
          {isEditMode ? "Atualizar" : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
