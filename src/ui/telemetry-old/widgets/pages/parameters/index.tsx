import { useParametersPage } from './use-parameters-page'
import { ParametersPageView } from './parameters-page-view'

export const ParametersPage = () => {
  const parametersData = useParametersPage()

  return <ParametersPageView {...parametersData} />
}
