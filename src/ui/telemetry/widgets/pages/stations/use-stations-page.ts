import { useCallback, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import type { StationDto } from "@/core/dtos/telemetry/station-dto";

const mockStations: StationDto[] = [
  {
    id: "1",
    name: "Estação Central",
    UID: "EST001",
    latitude: -23.5505,
    longitude: -46.6333,
    lastReadAt: new Date(),
    parameters: [
      {
        id: "1",
        name: "Temperatura do Ar",
        unitOfMeasure: "°C",
        factor: 0.1,
        offset: -40.0,
        isActive: true,
      },
      {
        id: "2",
        name: "Umidade Relativa",
        unitOfMeasure: "%",
        factor: 0.1,
        offset: 0.0,
        isActive: true,
      },
    ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Estação Norte",
    UID: "EST002",
    latitude: -23.5,
    longitude: -46.6,
    lastReadAt: new Date(Date.now() - 1000 * 60 * 30),
    parameters: [
      {
        id: "3",
        name: "Pressão Atmosférica",
        unitOfMeasure: "hPa",
        factor: 0.1,
        offset: 300.0,
        isActive: true,
      },
    ],
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useStations() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const q = params.get("q") ?? "";
  const status = (params.get("status") as any) ?? "todos";
  const activity = (params.get("activity") as any) ?? "Last24h";
  const limit = Number(params.get("limit") ?? 10);
  const cur = params.get("cursor");

  const setParam = (k: string, v: string | null) => {
    const next = new URLSearchParams(params);
    if (v === null || v === "") next.delete(k);
    else next.set(k, v);
    if (k !== "cursor") next.delete("cursor");
    setParams(next, { replace: true });
  };

  const filteredStations = useMemo(() => {
    return mockStations.filter((station) => {
      const matchesSearch =
        station.name.toLowerCase().includes(q.toLowerCase()) ||
        station.UID.toLowerCase().includes(q.toLowerCase());
      const matchesStatus =
        status === "todos" ||
        (status === "active" && station.isActive) ||
        (status === "inactive" && !station.isActive);
      return matchesSearch && matchesStatus;
    });
  }, [q, status]);

  const startIndex = cur ? parseInt(cur) : 0;
  const endIndex = startIndex + limit;
  const rows = filteredStations.slice(startIndex, endIndex);
  const total = filteredStations.length;
  const cursor = {
    next: endIndex < filteredStations.length ? String(endIndex) : null,
    prev: startIndex > 0 ? String(Math.max(0, startIndex - limit)) : null,
  };

  async function load() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
  }

  const atobSafe = useCallback((s: string) => {
    try {
      return typeof window !== "undefined" && window.atob
        ? window.atob(s)
        : Buffer.from(s, "base64").toString("utf8");
    } catch {
      return "0";
    }
  }, []);

  const fromTo = useMemo(() => {
    const searchIndex = Number(atobSafe(cur ?? "MA=="));
    const from = Math.min(total, searchIndex + 1);
    const to = Math.min(total, searchIndex + rows.length);
    return { from, to };
  }, [cur, total, rows.length, atobSafe]);

  function timeAgo(d: Date) {
    const diff = Date.now() - new Date(d).getTime();
    if (diff < 60_000) return "agora mesmo";
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} min atrás`;
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} h atrás`;
    const days = Math.floor(diff / 86_400_000);
    return `${days}d atrás`;
  }

  async function toggleStationActive(stationId: string) {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(false);
    console.log("Toggle station active:", stationId);
  }

  return {
    loading,
    rows,
    total,
    cursor,
    q,
    status,
    activity,
    limit,
    fromTo,
    setParam,
    load,
    navigate,
    timeAgo,
    toggleStationActive,
  };
}
