import { useState } from "react";
import { useSearchParams } from "react-router";
import { AlarmsPageView } from "./alarms-page-view";
import { useAlarms } from "./use-alarms";

export const AlarmsPage = () => {
  const {
    allAlarms,
    calculateStats,
    filterAlarms,
    getPaginatedAlarms,
    handleEditAlarm,
    handleDeleteAlarm,
  } = useAlarms();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const search = searchParams.get("q") || "";
  const status =
    (searchParams.get("status") as "all" | "ativo" | "inativo") || "all";
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const cursor = searchParams.get("cursor");

  const filters = { search, status };

  const filteredAlarms = filterAlarms(allAlarms, filters);
  const stats = calculateStats(filteredAlarms);

  const { alarms, nextCursor, prevCursor } = getPaginatedAlarms(
    filteredAlarms,
    limit,
    cursor
  );

  const pagination = {
    limit,
    cursor,
    nextCursor,
    prevCursor,
  };

  const handleClearError = () => {
    setError(null);
  };

  return (
    <AlarmsPageView
      alarms={alarms}
      stats={stats}
      filters={filters}
      pagination={pagination}
      error={error}
      onEditAlarm={handleEditAlarm}
      onDeleteAlarm={handleDeleteAlarm}
      onClearError={handleClearError}
    />
  );
};
