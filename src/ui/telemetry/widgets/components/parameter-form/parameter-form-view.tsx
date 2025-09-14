import { Button } from "@/ui/shadcn/components/button";
import { Input } from "@/ui/shadcn/components/input";
import { Label } from "@/ui/shadcn/components/label";
import { Checkbox } from "@/ui/shadcn/components/checkbox";
import type { ParameterFormData } from "./use-parameter-form";
import type { ParameterIconType } from "./use-parameter-icon";

export type ParameterFormViewProps = {
  form: any;
  selectedIcon: ParameterIconType;
  onSubmit: (data: ParameterFormData) => void;
  onCancel: () => void;
};

export function ParameterFormView({
  form,
  selectedIcon,
  onSubmit,
  onCancel,
}: ParameterFormViewProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex size-12 items-center justify-center rounded-xl ring-1 ${selectedIcon.badgeColor}`}
          >
            <selectedIcon.Icon className={`size-6 ${selectedIcon.iconColor}`} />
          </span>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700">Preview do Ícone</div>
            <div className="text-xs text-gray-500">Ícone baseado na unidade</div>
          </div>
        </div>
      </div>

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
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          {...register("description")}
          placeholder="Ex: Medição da temperatura ambiente"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="unit">Unidade *</Label>
        <Input
          id="unit"
          {...register("unit")}
          placeholder="Ex: °C, %, hPa, m/s, W/m², km, W, °"
          className={errors.unit ? "border-red-500" : ""}
        />
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
        <Checkbox
          id="active"
          checked={watch("active")}
          onCheckedChange={(checked) => setValue("active", checked as boolean)}
        />
        <Label htmlFor="active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Parâmetro ativo
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
        <Button
          type="submit"
          className="min-w-[100px] cursor-pointer"
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
