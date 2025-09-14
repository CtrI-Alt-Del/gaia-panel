import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParameterIcon } from "./use-parameter-icon";

const parameterSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres"),
  description: z.string().optional(),
  unit: z.string().min(1, "Unidade é obrigatória"),
  factor: z
    .number()
    .min(0.001, "Fator deve ser maior que 0")
    .max(1000, "Fator deve ser menor que 1000"),
  offset: z
    .number()
    .min(-1000, "Offset deve ser maior que -1000")
    .max(1000, "Offset deve ser menor que 1000"),
  active: z.boolean(),
});

export type ParameterFormData = z.infer<typeof parameterSchema>;


export function useParameterForm() {
  const form = useForm<ParameterFormData>({
    resolver: zodResolver(parameterSchema),
    defaultValues: {
      name: "",
      description: "",
      unit: "",
      factor: 1,
      offset: 0,
      active: true,
    },
  });

  const watchedUnit = form.watch("unit");
  const { iconInfo: selectedIcon } = useParameterIcon(watchedUnit || "");

  function handleSubmit(data: ParameterFormData) {
    console.log("Dados do formulário:", data);
  };

  return {
    form,
    selectedIcon,
    handleSubmit,
  };
}
