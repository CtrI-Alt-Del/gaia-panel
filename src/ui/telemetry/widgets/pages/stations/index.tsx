import { useStationsPage } from './use-stations-page'
import StationsPageView from './stations-page-view'

export const StationsPage = () => {
  const props = useStationsPage()
  return <StationsPageView {...props} />
}
