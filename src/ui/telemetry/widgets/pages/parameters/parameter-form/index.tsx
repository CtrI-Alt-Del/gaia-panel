import type { ParameterDto } from "@/core/dtos/telemetry/parameter-dto";
import { useUiProvider } from "@/ui/global/hooks/use-ui-provider";
import { useToastProvider } from "@/ui/global/hooks/use-toast";
import { ParameterFormView } from "./parameter-form-view";

type ParameterFormProps = {
  onSuccess?: () => void;
  onCancel: () => void;
  parameterDto?: ParameterDto;
};

export const ParameterForm = ({
  onSuccess,
  onCancel,
  parameterDto,
}: ParameterFormProps) => {
  const uiProvider = useUiProvider();
  const toastProvider = useToastProvider();

  return (
    <ParameterFormView
      uiProvider={uiProvider}
      toastProvider={toastProvider}
      onSuccess={onSuccess}
      onCancel={onCancel}
      parameterDto={parameterDto}
    />
  );
};
