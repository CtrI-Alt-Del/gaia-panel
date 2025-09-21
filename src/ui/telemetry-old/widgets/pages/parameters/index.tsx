import { ParametersPageView } from "./parameters-page-view";
import { useParametersPage } from "./use-parameters-page";

export default function Parameters() {
  const parametersData = useParametersPage();

  return <ParametersPageView {...parametersData} />;
}