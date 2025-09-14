import { useParameterForm } from "./use-parameter-form";
import { ParameterFormView } from "./parameter-form-view";

export type ParameterFormProps = {
  onCancel: () => void;
};

export function ParameterForm({ onCancel }: ParameterFormProps) {
  const { form, selectedIcon, handleSubmit } = useParameterForm();

  return (
    <ParameterFormView
      form={form}
      selectedIcon={selectedIcon}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
