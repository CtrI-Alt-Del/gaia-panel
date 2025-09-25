import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stationSchema } from "@/validation/telemetry";
import type { StationDto } from "@/core/telemetry/dtos/station-dto";
import type { TelemetryService } from "@/core/telemetry/interfaces/telemetry-service";
import type { UiProvider } from "@/core/global/interfaces/ui-provider";
import type { ToastProvider } from "@/core/global/interfaces/toast-provider";
import type { RestResponse } from "@/core/global/responses/rest-response";

type Props = {
  stationDto?: StationDto;
  telemetryService: TelemetryService;
  uiProvider: UiProvider;
  toastProvider: ToastProvider;
  onSuccess?: () => void;
  onCancel: () => void;
};

export function useStationForm({
  onSuccess,
  onCancel,
  stationDto,
  telemetryService,
  uiProvider,
  toastProvider,
}: Props) {
  const form = useForm({
    resolver: zodResolver(stationSchema),
    defaultValues: {
      name: stationDto?.name || "",
      uid: stationDto?.uid || "",
      latitude: stationDto?.latitude || 0,
      longitude: stationDto?.longitude || 0,
    },
    mode: "onSubmit",
  });

  const { formState } = form;
  const isValid = formState.isValid;

  function handleCancel() {
    onCancel();
  }

  async function handleSubmit(data: {
    name: string;
    uid: string;
    latitude: number;
    longitude: number;
  }) {
    const isEdition = Boolean(stationDto?.id);

    let response: RestResponse;
    if (isEdition && stationDto?.id) {
      const stationData: StationDto = {
        ...data,
        id: stationDto.id,
        quantityOfParameters: stationDto.quantityOfParameters,
        status: stationDto.status,
        lastMeasurement: stationDto.lastMeasurement,
        address: stationDto.address,
      };
      response = await telemetryService.updateStation(stationData);
    } else {
      const stationData: StationDto = {
        ...data,
        id: "",
        quantityOfParameters: 0,
        status: false,
        lastMeasurement: "",
        address: "",
      };
      response = await telemetryService.createStation(stationData);
    }

    if (response.isFailure) {
      toastProvider.showError(response.errorMessage);
    }

    if (response.isSuccessful) {
      toastProvider.showSuccess(
        isEdition
          ? "Estação atualizada com sucesso!"
          : "Estação criada com sucesso!"
      );
      await uiProvider.reload();
      onSuccess?.();
    }
  }

  return {
    form,
    isValid,
    handleCancel,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
}
