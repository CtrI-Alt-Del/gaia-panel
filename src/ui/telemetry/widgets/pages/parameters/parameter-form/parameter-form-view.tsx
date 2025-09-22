import { useState } from "react";
import { useFetcher } from "react-router";

import type { ParameterDto } from "@/core/dtos/telemetry/parameter-dto";
import { Button } from "@/ui/shadcn/components/button";
import { Input } from "@/ui/shadcn/components/input";
import { Label } from "@/ui/shadcn/components/label";
import { Switch } from "@/ui/shadcn/components/switch";

export type ParameterFormProps = {
  parameterDto?: ParameterDto;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export const ParameterForm = ({
  parameterDto,
  onSuccess,
  onCancel,
}: ParameterFormProps) => {
  const fetcher = useFetcher();
  const [isActive, setIsActive] = useState(parameterDto?.isActive ?? true);

  const isSubmitting = fetcher.state === "submitting";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("isActive", String(isActive));

    fetcher.submit(formData, {
      method: "POST",
      action: "/telemetry/parameters",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Parâmetro</Label>
        <Input
          id="name"
          name="name"
          defaultValue={parameterDto?.name || ""}
          placeholder="Ex.: Temperatura"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="unitOfMeasure">Unidade de Medida</Label>
        <Input
          id="unitOfMeasure"
          name="unitOfMeasure"
          defaultValue={parameterDto?.unitOfMeasure || ""}
          placeholder="Ex.: °C"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="factor">Fator</Label>
          <Input
            id="factor"
            name="factor"
            type="number"
            step="0.01"
            defaultValue={parameterDto?.factor || ""}
            placeholder="1.0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="offset">Offset</Label>
          <Input
            id="offset"
            name="offset"
            type="number"
            step="0.01"
            defaultValue={parameterDto?.offset || ""}
            placeholder="0.0"
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={isActive}
          onCheckedChange={setIsActive}
        />
        <Label htmlFor="isActive">Parâmetro ativo</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : parameterDto ? "Atualizar" : "Criar"}
        </Button>
      </div>
    </form>
  );
};
