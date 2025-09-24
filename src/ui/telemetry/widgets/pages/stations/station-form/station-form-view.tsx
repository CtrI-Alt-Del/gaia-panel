import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/ui/shadcn/components/button";
import { Input } from "@/ui/shadcn/components/input";
import { Label } from "@/ui/shadcn/components/label";
import { toast } from "sonner";

const stationSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  UID: z.string().min(1, "UID é obrigatório"),
  latitude: z.number().min(-90).max(90, "Latitude deve estar entre -90 e 90"),
  longitude: z
    .number()
    .min(-180)
    .max(180, "Longitude deve estar entre -180 e 180"),
});

export type StationFormData = z.infer<typeof stationSchema>;

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
};

export const StationFormView = ({ onSuccess, onCancel }: Props) => {
  const form = useForm<StationFormData>({
    resolver: zodResolver(stationSchema),
    defaultValues: {
      name: "",
      UID: "",
      latitude: 0,
      longitude: 0,
    },
  });

  const handleSubmit = (data: StationFormData) => {
    console.log("Station form data:", data);
    toast.success("Estação criada com sucesso!");
    onSuccess();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
        <Label htmlFor="UID">UID</Label>
        <Input id="UID" {...form.register("UID")} placeholder="Ex.: EST001" />
        {form.formState.errors.UID && (
          <p className="text-sm text-red-500">
            {form.formState.errors.UID.message}
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

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Criar Estação</Button>
      </div>
    </form>
  );
};
