import { useState, useEffect, useCallback } from 'react'
import type { ParameterDto } from '@/core/dtos/telemetry/parameter-dto'
import type { StationDto } from '@/core/dtos/telemetry/station-dto'

export interface StationFormData {
  name: string
  UID: string
  latitude: number
  longitude: number
  parameterIds: string[]
}

interface UseStationFormProps {
  availableParameters: ParameterDto[]
  station?: StationDto | null
  mode: 'create' | 'edit'
  onSubmit: (data: StationFormData) => Promise<void>
  onCancel: () => void
}

export function useStationForm({
  availableParameters,
  station,
  mode,
  onSubmit,
  onCancel,
}: UseStationFormProps) {
  const [formData, setFormData] = useState<StationFormData>({
    name: '',
    UID: '',
    latitude: 0,
    longitude: 0,
    parameterIds: [],
  })
  const [selectedParameterId, setSelectedParameterId] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultFormData: StationFormData = {
    name: '',
    UID: '',
    latitude: 0,
    longitude: 0,
    parameterIds: [],
  }

  const resetForm = useCallback(() => {
    setFormData(defaultFormData)
    setSelectedParameterId('')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.UID) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      handleClose()
    } catch (error) {
      console.error('Erro ao salvar estação:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    resetForm()
    onCancel()
  }

  const handleMapClick = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }))
  }

  const addParameter = () => {
    if (selectedParameterId && !formData.parameterIds.includes(selectedParameterId)) {
      setFormData((prev) => ({
        ...prev,
        parameterIds: [...prev.parameterIds, selectedParameterId],
      }))
      setSelectedParameterId('')
    }
  }

  const removeParameter = (parameterId: string) => {
    setFormData((prev) => ({
      ...prev,
      parameterIds: prev.parameterIds.filter((id) => id !== parameterId),
    }))
  }

  const updateFormField = (field: keyof StationFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const selectedParameters = availableParameters.filter((p) =>
    formData.parameterIds.includes(p.id),
  )

  const availableParametersForSelection = availableParameters.filter(
    (p) => !formData.parameterIds.includes(p.id),
  )

  const isFormValid = formData.name && formData.UID

  const submitButtonText = isSubmitting
    ? mode === 'create'
      ? 'Criando...'
      : 'Salvando...'
    : mode === 'create'
      ? 'Criar Estação'
      : 'Salvar Alterações'

  useEffect(() => {
    if (mode === 'edit' && station) {
      setFormData({
        name: station.name,
        UID: station.UID,
        latitude: station.latitude,
        longitude: station.longitude,
        parameterIds: station.parameters.map((p) => p.id),
      })
    } else {
      resetForm()
    }
  }, [mode, station, resetForm])

  return {
    formData,
    selectedParameterId,
    isSubmitting,
    selectedParameters,
    availableParametersForSelection,
    isFormValid,
    submitButtonText,
    setSelectedParameterId,
    handleSubmit,
    handleClose,
    handleMapClick,
    addParameter,
    removeParameter,
    updateFormField,
  }
}
