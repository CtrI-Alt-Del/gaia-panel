import { useState, useEffect } from 'react'

import type { TelemetryService } from '@/core/telemetry/interfaces'
import { useCache } from '@/ui/global/hooks/use-cache'
import { CACHE } from '@/core/global/constants'

type Params = {
  telemetryService: TelemetryService
  defaultParametersIds: string[]
  selectedParameterIds: string[]
  onSelectionChange: (parameterIds: string[]) => void
}

export function useParametersSelector({
  telemetryService,
  defaultParametersIds,
  selectedParameterIds,
  onSelectionChange,
}: Params) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [previousCursor, setPreviousCursor] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [pageSize, setPageSize] = useState(5)
  const [name, setName] = useState('')
  const [status, setStatus] = useState('ACTIVE')

  const { data, isLoading } = useCache({
    key: CACHE.stationParameters.key,
    fetcher: async () =>
      await telemetryService.fetchParameters({
        nextCursor,
        previousCursor,
        pageSize,
        name,
        status,
      }),
    dependencies: [pageSize, name, status, nextCursor, previousCursor],
  })

  function handleParameterToggle(parameterId: string) {
    const isSelected = selectedParameterIds.includes(parameterId)

    if (isSelected) {
      onSelectionChange(selectedParameterIds.filter((id) => id !== parameterId))
    } else {
      onSelectionChange([...selectedParameterIds, parameterId])
    }
  }

  function handleSelectAll() {
    const allParameterIds = (data?.items || [])
      .filter((p) => p.id && p.isActive)
      .map((p) => p.id)
      .filter((id): id is string => Boolean(id))

    if (selectedParameterIds.length === allParameterIds.length) {
      onSelectionChange([])
    } else {
      onSelectionChange(allParameterIds)
    }
  }

  function handleRemoveParameter(parameterId: string | undefined) {
    if (!parameterId) return
    onSelectionChange(selectedParameterIds.filter((id) => id !== parameterId))
  }

  function handleToggleExpanded() {
    setIsExpanded(!isExpanded)
  }

  function handleNameChange(newName: string) {
    setName(newName)
    // Reset pagination when filtering
    setNextCursor(null)
    setPreviousCursor(null)
  }

  function handleStatusChange(newStatus: string) {
    setStatus(newStatus)
    // Reset pagination when filtering
    setNextCursor(null)
    setPreviousCursor(null)
  }

  function handlePageSizeChange(newPageSize: number) {
    setPageSize(newPageSize)
    // Reset pagination when changing page size
    setNextCursor(null)
    setPreviousCursor(null)
  }

  function handleApplyFilters() {
    // Force refetch by updating the cache key
    // The cache key already includes all filter states, so this will trigger a new fetch
  }

  const parameters = data?.items || []

  const selectedParameters = parameters.filter(
    (parameter) => parameter.id && selectedParameterIds.includes(parameter.id),
  )

  const allActiveParameterIds = parameters
    .filter((p) => p.id && p.isActive)
    .map((p) => p.id)
    .filter((id): id is string => Boolean(id))

  const isAllSelected =
    allActiveParameterIds.length > 0 &&
    allActiveParameterIds.every((id) => selectedParameterIds.includes(id))

  const isIndeterminate = selectedParameterIds.length > 0 && !isAllSelected

  useEffect(() => {
    if (defaultParametersIds.length > 0 && selectedParameterIds.length === 0) {
      onSelectionChange(defaultParametersIds)
    }
  }, [defaultParametersIds, selectedParameterIds, onSelectionChange])

  return {
    isExpanded,
    parameters,
    selectedParameters,
    isAllSelected,
    isIndeterminate,
    nextCursor,
    previousCursor,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    // Filter states
    name,
    status,
    pageSize,
    // Handlers
    handleParameterToggle,
    handleSelectAll,
    handleRemoveParameter,
    handleToggleExpanded,
    handleNameChange,
    handleStatusChange,
    handlePageSizeChange,
    handleApplyFilters,
    // Pagination setters
    setNextCursor,
    setPreviousCursor,
    setHasNextPage,
    setHasPreviousPage,
  }
}
