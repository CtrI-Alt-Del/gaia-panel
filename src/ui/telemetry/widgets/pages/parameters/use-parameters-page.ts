import { useState, useCallback } from 'react'
import type { ParameterDto } from '@/core/dtos/telemetry/parameter-dto'

type UseParametersPageProps = {
  parameters: ParameterDto[]
}

export function useParametersPage({ parameters }: UseParametersPageProps) {
  const [selectedParameter, setSelectedParameter] = useState<ParameterDto | undefined>(
    undefined,
  )

  const handleEdit = useCallback(
    (id: string) => {
      const parameter = parameters.find((p) => String(p.id) === id)
      if (parameter) {
        setSelectedParameter(parameter)
      }
    },
    [parameters],
  )

  const handleToggleActive = useCallback((id: string) => {
    console.log('Alternando status do parâmetro:', id)
    // TODO: Implementar lógica de toggle quando o serviço estiver disponível
  }, [])

  return {
    selectedParameter,
    onEdit: handleEdit,
    onToggleActive: handleToggleActive,
  }
}
