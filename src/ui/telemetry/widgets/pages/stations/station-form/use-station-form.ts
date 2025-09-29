import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { stationSchema } from '@/validation/telemetry'
import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import type { TelemetryService } from '@/core/telemetry/interfaces/telemetry-service'
import type { UiProvider } from '@/core/global/interfaces/ui-provider'
import type { ToastProvider } from '@/core/global/interfaces/toast-provider'
import type { RestResponse } from '@/core/global/responses/rest-response'

type Props = {
  stationDto?: StationDto
  telemetryService: TelemetryService
  uiProvider: UiProvider
  toastProvider: ToastProvider
  onSuccess?: () => void
  onCancel: () => void
}

const formSchema = stationSchema.extend({
  parameterIds: z.array(z.string()),
})

export function useStationForm({
  onSuccess,
  onCancel,
  stationDto,
  telemetryService,
  uiProvider,
  toastProvider,
}: Props) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: stationDto?.name || '',
      uid: stationDto?.uid || '',
      latitude: stationDto?.latitude || 0,
      longitude: stationDto?.longitude || 0,
      address: stationDto?.address || '',
    },
    mode: 'onChange',
  })

  const { formState } = form
  const isValid = formState.isValid

  function handleCancel() {
    onCancel()
  }

  async function handleSubmit(data: {
    name: string
    uid: string
    latitude: number
    longitude: number
    address: string
    parameterIds: string[]
  }) {
    const isEdition = Boolean(stationDto?.id)

    let response: RestResponse
    if (isEdition && stationDto?.id) {
      const station: StationDto = {
        ...data,
        id: stationDto.id,
        quantityOfParameters: data.parameterIds.length,
      }
      response = await telemetryService.updateStation(station, data.parameterIds)
    } else {
      const stationDto: StationDto = {
        name: data.name,
        uid: data.uid,
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        quantityOfParameters: data.parameterIds.length,
      }

      response = await telemetryService.createStation(stationDto, data.parameterIds)
    }

    if (response.isFailure) {
      try {
        toastProvider.showError(response.errorMessage)
      } catch {
        toastProvider.showError('Erro ao salvar estação (ver console)')
      }
    }

    if (response.isSuccessful) {
      toastProvider.showSuccess(
        isEdition ? 'Estação atualizada com sucesso!' : 'Estação criada com sucesso!',
      )
      await uiProvider.reload()
      onSuccess?.()
    }
  }

  useEffect(() => {
    async function fetchParameters() {
      const response = await telemetryService.fetchParametersByStationId(
        stationDto?.id as string,
      )
      if (response.isFailure) return
      form.setValue(
        'parameterIds',
        response.body.map((parameter) => String(parameter.id)),
      )
    }
    fetchParameters()
  }, [form.setValue, telemetryService.fetchParametersByStationId, stationDto?.id])

  return {
    form,
    isValid,
    handleCancel,
    handleSubmit: form.handleSubmit(handleSubmit),
  }
}
