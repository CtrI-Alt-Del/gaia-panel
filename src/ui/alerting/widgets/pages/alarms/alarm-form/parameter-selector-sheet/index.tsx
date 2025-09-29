import { useRest } from '@/ui/global/hooks/use-rest'
import { ParameterSelectorSheetView } from './parameter-selector-sheet-view'
import { useParameterSelectorSheet } from './use-parameter-selector-sheet'
import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'

type ParameterSelectorSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (station: StationDto, parameter: ParameterDto) => void
}

export const ParameterSelectorSheet = ({
  open,
  onOpenChange,
  onSelect,
}: ParameterSelectorSheetProps) => {
  const { telemetryService } = useRest()

  const {
    view,
    selectedStation,
    searchTerm,
    pageSize,
    hasNextPage,
    hasPreviousPage,
    stations,
    isLoading,
    handleSelectStation,
    handleBackToStations,
    handleSelectParameter,
    handleCloseAndReset,
    handleNameChange,
    handlePageSizeChange,
    handleNextPage,
    handlePreviousPage,
  } = useParameterSelectorSheet({
    telemetryService,
    onOpenChange,
    onSelect,
  })

  return (
    <ParameterSelectorSheetView
      open={open}
      view={view}
      selectedStation={selectedStation}
      searchTerm={searchTerm}
      pageSize={pageSize}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      stations={stations}
      isLoading={isLoading}
      telemetryService={telemetryService}
      onCloseAndReset={handleCloseAndReset}
      onSelectStation={handleSelectStation}
      onBackToStations={handleBackToStations}
      onSelectParameter={handleSelectParameter}
      onNameChange={handleNameChange}
      onPageSizeChange={handlePageSizeChange}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
    />
  )
}
