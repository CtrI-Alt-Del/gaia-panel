import { useState } from 'react'
import type { ParameterDto } from '@/core/dtos/telemetry/parameter-dto'

type UseParametersPageProps = {
  parameters: ParameterDto[]
}

export function useParametersPage({ parameters }: UseParametersPageProps) {
  const [selectedParameter, setSelectedParameter] = useState<ParameterDto | undefined>(
    undefined,
  )
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false)
  const [parameterToDeactivate, setParameterToDeactivate] = useState<ParameterDto | null>(
    null,
  )

  function handleEdit(id: string) {
    const parameter = parameters.find((p) => String(p.id) === id)
    if (parameter) {
      setSelectedParameter(parameter)
    }
  }

  function handleDeactivateClick(parameter: ParameterDto) {
    setParameterToDeactivate(parameter)
    setDeactivateDialogOpen(true)
  }

  function handleConfirmDeactivate() {
    console.log('Desativando parâmetro:', parameterToDeactivate)
    setDeactivateDialogOpen(false)
    setParameterToDeactivate(null)
  }

  function handleToggleActive(id: string) {
    console.log('Alternando status do parâmetro:', id)
  }

  return {
    selectedParameter,
    deactivateDialogOpen,
    parameterToDeactivate,
    setDeactivateDialogOpen,
    handleEdit,
    handleDeactivateClick,
    handleConfirmDeactivate,
    handleToggleActive,
  }
}
