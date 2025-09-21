import { ParametersPageView } from './parameters-page-view'
import { useParametersPage } from './use-parameters-page'

export const ParametersPage = () => {
  const parametersData = useParametersPage()

  console.log(parametersData)

  return <ParametersPageView {...parametersData} />
}
