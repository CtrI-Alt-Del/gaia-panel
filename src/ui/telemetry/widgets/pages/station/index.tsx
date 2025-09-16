import { useStation } from './use-station-page'
import StationPageView from './station-page-view'

export default function StationPage() {
  const props = useStation()
  return <StationPageView {...props} />
}
