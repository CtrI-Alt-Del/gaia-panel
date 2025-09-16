import { useStations } from "./use-stations-page";
import StationsPageView from "./stations-page-view";

export default function StationsPage() {
  const props = useStations();
  return <StationsPageView {...props} />;
}
