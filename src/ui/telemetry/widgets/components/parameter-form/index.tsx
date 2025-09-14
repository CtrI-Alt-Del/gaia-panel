import { useParameterForm } from "./use-parameter-form";
import { ParameterFormView } from "./parameter-form-view";
import type { ParameterDto } from "@/core/dtos/parameter-dto";

export type ParameterFormProps = {
  onCancel: () => void;
  parameter?: ParameterDto;
  onUpdated?: (parameter: ParameterDto) => void;
};

export function ParameterForm({ onCancel, parameter, onUpdated }: ParameterFormProps) {
  const { form, selectedIcon, handleSubmit, isEditMode } = useParameterForm({
    parameter,
    onUpdated,
    onCancel,
  });

  return (
    <ParameterFormView
      form={form}
      selectedIcon={selectedIcon}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isEditMode={isEditMode}
    />
  );
}
