import { useLoaderData } from "react-router";
import { useStationsPage } from "./use-stations-page";
import { StationsPageView } from "./stations-page-view";
import type { loader } from "@/app/routes/telemetry/stations-route";
import { useUiProvider } from "@/ui/global/hooks/use-ui-provider";
import { useRest } from "@/ui/global/hooks/use-rest";
import { useToastProvider } from "@/ui/global/hooks/use-toast";

export const StationsPage = () => {
  const { stations, nextCursor, previousCursor, hasNextPage, hasPreviousPage } =
    useLoaderData<typeof loader>();
  const { selectedStation, handleEdit } = useStationsPage({
    stations,
  });
  const { isLoading, reload } = useUiProvider();
  const { telemetryService } = useRest();
  const toastProvider = useToastProvider();

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
      telemetryService={telemetryService}
      uiProvider={{ isLoading, reload }}
      toastProvider={toastProvider}
    />
  );
};
