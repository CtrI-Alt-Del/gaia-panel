import { useEffect, useMemo, useState, useCallback } from 'react'
import { useForm, type Resolver, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { ParameterDto } from '@/core/dtos/telemetry/parameter-dto'
import type { StationDto } from '@/core/telemetry/dtos/station-dto'

const stationFormSchema = z.object({
  name: z.string().min(1, 'Informe o nome da estacao'),
  UID: z.string().min(1, 'Informe o UID'),
  latitude: z.coerce
    .number()
    .refine((value) => Number.isFinite(value), 'Informe a latitude'),
  longitude: z.coerce
    .number()
    .refine((value) => Number.isFinite(value), 'Informe a longitude'),
  parameterIds: z.array(z.string()).default([]),
})

export type StationFormData = z.infer<typeof stationFormSchema>

interface UseStationFormProps {
  availableParameters: ParameterDto[]
  station?: StationDto | null
  mode: 'create' | 'edit'
  onSubmit: (data: StationFormData) => Promise<void>
  onCancel: () => void
}

const defaultValues: StationFormData = {
  name: '',
  UID: '',
  latitude: 0,
  longitude: 0,
  parameterIds: [],
}

export function useStationForm({
  availableParameters,
  station,
  mode,
  onSubmit,
  onCancel,
}: UseStationFormProps) {
  const [selectedParameterId, setSelectedParameterId] = useState<string>('')

  const initialValues = useMemo<StationFormData>(() => {
    if (mode === 'edit' && station) {
      return {
        name: station.name,
        uid: station.uid,
        latitude: station.latitude,
        longitude: station.longitude,
      }
    }
    return { ...defaultValues, parameterIds: [] }
  }, [mode, station])

  const form = useForm<StationFormData>({
    resolver: zodResolver(stationFormSchema) as Resolver<StationFormData>,
    defaultValues: initialValues,
    mode: 'onChange',
  })

  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isSubmitting, isValid },
  } = form

  useEffect(() => {
    reset(initialValues)
    setSelectedParameterId('')
  }, [reset, initialValues])

  const formData = watch()

  const handleClose = useCallback(() => {
    reset(initialValues)
    setSelectedParameterId('')
    onCancel()
  }, [reset, initialValues, onCancel])

  const onSubmitHandler: SubmitHandler<StationFormData> = async (data) => {
    try {
      await onSubmit(data)
      handleClose()
    } catch (error) {
      console.error('Erro ao salvar estacao:', error)
    }
  }

  const onSubmitForm = onSubmitHandler

  const handleMapClick = (lat: number, lng: number) => {
    setValue('latitude', lat, { shouldDirty: true, shouldValidate: true })
    setValue('longitude', lng, { shouldDirty: true, shouldValidate: true })
  }

  const addParameter = () => {
    if (selectedParameterId && !formData.parameterIds.includes(selectedParameterId)) {
      setValue('parameterIds', [...formData.parameterIds, selectedParameterId], {
        shouldDirty: true,
        shouldValidate: true,
      })
      setSelectedParameterId('')
    }
  }

  const removeParameter = (parameterId: string) => {
    setValue(
      'parameterIds',
      formData.parameterIds.filter((id) => id !== parameterId),
      { shouldDirty: true, shouldValidate: true },
    )
  }

  const updateFormField = (field: keyof StationFormData, value: any) => {
    setValue(field as any, value, { shouldDirty: true, shouldValidate: true })
  }

  const selectedParameters = availableParameters.filter((p) =>
    formData.parameterIds.includes(p.id),
  )

  const availableParametersForSelection = availableParameters.filter(
    (p) => !formData.parameterIds.includes(p.id),
  )

  const submitButtonText = isSubmitting
    ? mode === 'create'
      ? 'Criando...'
      : 'Salvando...'
    : mode === 'create'
      ? 'Criar Estacao'
      : 'Salvar Alteracoes'

  return {
    form,
    formData,
    selectedParameterId,
    isSubmitting,
    selectedParameters,
    availableParametersForSelection,
    isFormValid: isValid,
    submitButtonText,
    setSelectedParameterId,
    handleSubmit: onSubmitForm,
    handleClose,
    handleMapClick,
    addParameter,
    removeParameter,
    updateFormField,
  }
}
