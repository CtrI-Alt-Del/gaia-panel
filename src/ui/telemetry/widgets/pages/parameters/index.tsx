import { useLoaderData } from 'react-router'
import { useParametersPage } from './use-parameters-page'
import { ParametersPageView } from './parameters-page-view'
import type { loader } from '@/app/routes/telemetry/parameters-route'
import { useUiProvider } from '@/ui/global/hooks/use-ui-provider'

export const ParametersPage = () => {
  const { user, parameters, nextCursor, previousCursor, hasNextPage, hasPreviousPage } =
    useLoaderData<typeof loader>()
  const { selectedParameter, handleEdit, handleCloseModal } = useParametersPage({
    parameters,
  })
  const { isLoading } = useUiProvider()

  return (
    <ParametersPageView
      parameters={parameters}
      nextCursor={nextCursor}
      previousCursor={previousCursor}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      isLoading={isLoading}
      selectedParameter={selectedParameter}
      onEdit={handleEdit}
      onCloseModal={handleCloseModal}
      isAuthenticated={Boolean(user)}
    />
  )
}
