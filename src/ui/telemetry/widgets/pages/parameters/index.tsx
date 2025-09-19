import { useLoaderData } from 'react-router'
import { useParametersPage } from './use-parameters-page'
import { ParametersPageView } from './parameters-page-view'
import type { loader } from '@/app/routes/telemetry/parameters-route'

export const ParametersPage = () => {
  const {
    parameters,
    nextCursor,
    previousCursor,
    pageSize,
    hasNextPage,
    hasPreviousPage,
  } = useLoaderData<typeof loader>()
  const {
    isModalOpen,
    selectedParameter,
    handleEdit,
    handleNewParameter,
    handleCloseModal,
    handleParameterUpdated,
    handleParameterCreated,
  } = useParametersPage()

  return (
    <ParametersPageView
      parameters={parameters}
      nextCursor={nextCursor}
      previousCursor={previousCursor}
      pageSize={pageSize}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      isModalOpen={isModalOpen}
      selectedParameter={selectedParameter}
      onEdit={handleEdit}
      onNewParameter={handleNewParameter}
      onCloseModal={handleCloseModal}
      onParameterUpdated={handleParameterUpdated}
      onParameterCreated={handleParameterCreated}
    />
  )
}
