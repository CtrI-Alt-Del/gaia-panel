import { useState } from 'react'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'
import type { ParameterFormData } from '@/ui/telemetry/widgets/components/parameter-form'

export function useParametersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedParameter, setSelectedParameter] = useState<ParameterDto | undefined>(
    undefined,
  )

  function handleEdit(id: string) {
    // TODO: Buscar parâmetro por ID da API
    console.log('Editar parâmetro:', id)
    setSelectedParameter(undefined)
    setIsModalOpen(true)
  }

  function handleNewParameter() {
    setSelectedParameter(undefined)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setSelectedParameter(undefined)
  }

  function handleParameterUpdated(updatedParameter: ParameterDto) {
    console.log('Parâmetro atualizado:', updatedParameter)
  }

  function handleParameterCreated(parameterData: ParameterFormData) {
    console.log('Novo parâmetro criado:', parameterData)
  }

  return {
    isModalOpen,
    selectedParameter,
    handleEdit,
    handleNewParameter,
    handleCloseModal,
    handleParameterUpdated,
    handleParameterCreated,
  }
}
