import { useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'

type UseParametersPageProps = {
  parameters: ParameterDto[]
}

export function useParametersPage({ parameters }: UseParametersPageProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const handleEdit = useCallback(
    (id: string) => {
      // Adiciona o ID do parâmetro como query param para abrir o modal
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set('editParameter', id)
      navigate(`?${newSearchParams.toString()}`, { replace: true })
    },
    [navigate, searchParams],
  )

  const handleCloseModal = useCallback(() => {
    // Remove o query param para fechar o modal
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('editParameter')
    navigate(`?${newSearchParams.toString()}`, { replace: true })
  }, [navigate, searchParams])

  // Busca o parâmetro selecionado baseado no query param
  const editParameterId = searchParams.get('editParameter')
  const selectedParameter = editParameterId
    ? parameters.find((p) => String(p.id) === editParameterId)
    : undefined

  return {
    selectedParameter,
    handleEdit,
    handleCloseModal,
  }
}
