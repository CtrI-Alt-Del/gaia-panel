import { useFetcher } from "react-router";

import type { ParameterDto } from "@/core/dtos/telemetry/parameter-dto";
import type { UiProvider } from "@/core/global/interfaces/ui-provider";
import type { ToastProvider } from "@/core/global/interfaces/toast-provider";
import { Button } from "@/ui/shadcn/components/button";
import { Input } from "@/ui/shadcn/components/input";
import { Switch } from "@/ui/shadcn/components/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/shadcn/components/form";
import { useParameterForm } from "./use-parameter-form";

export type ParameterFormViewProps = {
  onSuccess?: () => void;
  onCancel: () => void;
  parameterDto?: ParameterDto;
  uiProvider: UiProvider;
  toastProvider: ToastProvider;
};

export const ParameterFormView = ({
  onSuccess,
  onCancel,
  parameterDto,
  uiProvider,
  toastProvider,
}: ParameterFormViewProps) => {
  const fetcher = useFetcher();
  const isEdition = Boolean(parameterDto?.id);
  const { form, isValid, handleCancel, handleSubmit } = useParameterForm({
    onSuccess,
    onCancel,
    parameterDto,
    uiProvider,
    toastProvider,
  });

  return (
    <div className="space-y-6">
      <Form {...form}>
        <fetcher.Form
          method="post"
          action="/telemetry/parameters"
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          {isEdition && parameterDto?.id && (
            <input type="hidden" name="id" value={parameterDto.id} />
          )}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Parâmetro</FormLabel>
                <FormControl>
                  <Input placeholder="Ex.: Temperatura" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unitOfMeasure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidade de Medida</FormLabel>
                <FormControl>
                  <Input placeholder="Ex.: °C" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="factor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fator</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="1.0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="offset"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offset</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
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
                <FormLabel>Parâmetro ativo</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isValid || fetcher.state === "submitting"}
            >
              {fetcher.state === "submitting"
                ? "Salvando..."
                : isEdition
                  ? "Atualizar"
                  : "Criar"}
            </Button>
          </div>
        </fetcher.Form>
      </Form>
    </div>
  );
};
