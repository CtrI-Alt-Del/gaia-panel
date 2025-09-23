import { ParametersPageView } from "./parameters-page-view";
import { useParametersPage } from "./use-parameters-page";
import { ParametersFaker } from "@/core/telemetry/dtos/fakers/parameters-faker";

export const ParametersPage = () => {
  const mockParameters = ParametersFaker.fakeMany(10);

  const parametersData = useParametersPage({ parameters: mockParameters });

  return (
    <ParametersPageView
      parameters={mockParameters}
      nextCursor={null}
      previousCursor={null}
      hasNextPage={false}
      hasPreviousPage={false}
      isLoading={false}
      {...parametersData}
    />
  );
};
