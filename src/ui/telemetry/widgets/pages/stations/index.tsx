import { useLoaderData } from "react-router";
import { useStationsPage } from "./use-stations-page";
import { StationsPageView } from "./stations-page-view";
import type { loader } from "@/app/routes/telemetry/stations-route";
import { useUiProvider } from "@/ui/global/hooks/use-ui-provider";
import { useRest } from "@/ui/global/hooks/use-rest";
import { useToastProvider } from "@/ui/global/hooks/use-toast";
import { useCache } from "@/ui/global/hooks/use-cache";

export const StationsPage = () => {
  const { stations, nextCursor, previousCursor, hasNextPage, hasPreviousPage } =
    useLoaderData<typeof loader>();
  const { selectedStation, handleEdit } = useStationsPage({
    stations,
  });
  const { isLoading, reload } = useUiProvider();
  const { telemetryService } = useRest();
  const toastProvider = useToastProvider();
  const availableParameters = useCache({
    key: 'parameters',
    fetcher: () => telemetryService.fetchParameters(),
  });

  return (
    <StationsPageView
      stations={stations}
      nextCursor={nextCursor}
      previousCursor={previousCursor}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      isLoading={isLoading}
      onEdit={handleEdit}
      selectedStation={selectedStation}
      availableParameters={availableParameters.data ?? []}
      telemetryService={telemetryService}
      uiProvider={{ isLoading, reload }}
      toastProvider={toastProvider}
    />
  );
};
