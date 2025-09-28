import { useRest } from '@/ui/global/hooks/use-rest'
import { ParametersSelectorView } from './parameters-selector-view'
import { useParametersSelector } from './use-parameters-selector'

type ParametersSelectorProps = {
  defaultParametersIds: string[]
  selectedParameterIds: string[]
  onSelectionChange: (parameterIds: string[]) => void
  className?: string
}

export const ParametersSelector = ({
  defaultParametersIds,
  selectedParameterIds,
  onSelectionChange,
  className,
}: ParametersSelectorProps) => {
  const { telemetryService } = useRest()
  const {
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
    name,
    status,
    pageSize,
    handleParameterToggle,
    handleSelectAll,
    handleRemoveParameter,
    handleToggleExpanded,
    handleNameChange,
    handleStatusChange,
    handlePageSizeChange,
    handleApplyFilters,
  } = useParametersSelector({
    telemetryService,
    defaultParametersIds,
    selectedParameterIds,
    onSelectionChange,
  })

  return (
    <ParametersSelectorView
      parameters={parameters}
      selectedParameters={selectedParameters}
      isAllSelected={isAllSelected}
      isIndeterminate={isIndeterminate}
      isExpanded={isExpanded}
      isLoading={isLoading}
      nextCursor={nextCursor}
      previousCursor={previousCursor}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      name={name}
      status={status}
      pageSize={pageSize}
      className={className}
      handleParameterToggle={handleParameterToggle}
      handleSelectAll={handleSelectAll}
      handleRemoveParameter={handleRemoveParameter}
      handleToggleExpanded={handleToggleExpanded}
      handleNameChange={handleNameChange}
      handleStatusChange={handleStatusChange}
      handlePageSizeChange={handlePageSizeChange}
      handleApplyFilters={handleApplyFilters}
    />
  )
}
