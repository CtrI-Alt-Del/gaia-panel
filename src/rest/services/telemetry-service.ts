import { RestResponse } from "@/core/responses/rest-response";
import type { ParameterDto } from "@/core/dtos/telemetry/parameter-dto";
import type { StationDto } from "@/core/dtos/telemetry/station-dto";
import type { MeasurementDto } from "@/core/dtos/telemetry/measurement-dto";

const encode = (n: number) =>
  typeof window !== "undefined" && typeof window.btoa === "function"
    ? window.btoa(String(n))
    : Buffer.from(String(n), "utf8").toString("base64url");
const decode = (c: string) => {
  try {
    const s =
      typeof window !== "undefined" && typeof window.atob === "function"
        ? window.atob(c)
        : Buffer.from(c, "base64url").toString("utf8");
    const n = Number(s);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
};

const mockData: ParameterDto[] = [
  {
    id: "p-001",
    name: "Temperatura do Ar",
    unitOfMeasure: "°C",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 1 * 3600_000).toISOString(),
  },
  {
    id: "p-002",
    name: "Umidade Relativa",
    unitOfMeasure: "%",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 2 * 3600_000).toISOString(),
  },
  {
    id: "p-003",
    name: "Velocidade do Vento",
    unitOfMeasure: "m/s",
    factor: 1,
    offset: 0,
    active: false,
    createdAt: new Date(Date.now() - 3 * 3600_000).toISOString(),
  },
  {
    id: "p-004",
    name: "Pressão Atmosférica",
    unitOfMeasure: "hPa",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 4 * 3600_000).toISOString(),
  },
  {
    id: "p-005",
    name: "Radiação Solar",
    unitOfMeasure: "W/m²",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 5 * 3600_000).toISOString(),
  },
  {
    id: "p-001",
    name: "Temperatura do Ar",
    unitOfMeasure: "°C",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 1 * 3600_000).toISOString(),
  },
  {
    id: "p-002",
    name: "Umidade Relativa",
    unitOfMeasure: "%",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 2 * 3600_000).toISOString(),
  },
  {
    id: "p-003",
    name: "Velocidade do Vento",
    unitOfMeasure: "m/s",
    factor: 1,
    offset: 0,
    active: false,
    createdAt: new Date(Date.now() - 3 * 3600_000).toISOString(),
  },
  {
    id: "p-004",
    name: "Pressão Atmosférica",
    unitOfMeasure: "hPa",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 4 * 3600_000).toISOString(),
  },
  {
    id: "p-005",
    name: "Radiação Solar",
    unitOfMeasure: "W/m²",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 5 * 3600_000).toISOString(),
  },
];

// ===== Mock Stations ========================================================
const mockStations: StationDto[] = [
  {
    id: "s-001",
    name: "São Paulo Central",
    UID: "SP001",
    latitude: -23.55065,
    longitude: -46.633308,
    lastReadAt: new Date(Date.now() - 2 * 60_000),
    parameters: mockData.slice(0, 3), // Primeiros 3 parâmetros
    isActive: true,
    createdAt: new Date(Date.now() - 30 * 24 * 60_000),
    updatedAt: new Date(Date.now() - 2 * 60_000),
  },
  {
    id: "s-045",
    name: "Rio Sul",
    UID: "RJ045",
    latitude: -22.9068,
    longitude: -43.1729,
    lastReadAt: new Date(Date.now() - 5 * 60_000),
    parameters: mockData.slice(1, 4), // Parâmetros 1-3
    isActive: false,
    createdAt: new Date(Date.now() - 25 * 24 * 60_000),
    updatedAt: new Date(Date.now() - 5 * 60_000),
  },
  {
    id: "s-023",
    name: "Brasília Norte",
    UID: "DF023",
    latitude: -15.7801,
    longitude: -47.9292,
    lastReadAt: new Date(Date.now() - 8 * 60_000),
    parameters: mockData.slice(0, 2), // Primeiros 2 parâmetros
    isActive: true,
    createdAt: new Date(Date.now() - 20 * 24 * 60_000),
    updatedAt: new Date(Date.now() - 8 * 60_000),
  },
  {
    id: "s-089",
    name: "Belo Horizonte Centro",
    UID: "MG089",
    latitude: -19.9191,
    longitude: -43.9386,
    lastReadAt: new Date(Date.now() - 12 * 60_000),
    parameters: mockData, // Todos os parâmetros
    isActive: true,
    createdAt: new Date(Date.now() - 15 * 24 * 60_000),
    updatedAt: new Date(Date.now() - 12 * 60_000),
  },
  {
    id: "s-112",
    name: "Salvador Pelourinho",
    UID: "BA112",
    latitude: -12.9747,
    longitude: -38.501,
    lastReadAt: new Date(Date.now() - 2 * 3_600_000),
    parameters: mockData.slice(2, 5), // Parâmetros 2-4
    isActive: false,
    createdAt: new Date(Date.now() - 10 * 24 * 60_000),
    updatedAt: new Date(Date.now() - 2 * 3_600_000),
  },
  {
    id: "s-067",
    name: "Porto Alegre Zona Sul",
    UID: "RS067",
    latitude: -30.0346,
    longitude: -51.2177,
    lastReadAt: new Date(Date.now() - 15 * 60_000),
    parameters: mockData.slice(1, 3), // Parâmetros 1-2
    isActive: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60_000),
    updatedAt: new Date(Date.now() - 15 * 60_000),
  },
];

// ===== Mock Measurements ====================================================
const mockMeasurements: MeasurementDto[] = (() => {
  const rows: MeasurementDto[] = [];
  for (const s of mockStations) {
    for (let i = 0; i < 60; i++) {
      const t = new Date(Date.now() - i * 5 * 60_000); // a cada 5 minutos
      for (const p of s.parameters) {
        const base =
          p.id === "p-001"
            ? 24.5
            : p.id === "p-002"
              ? 60
              : p.id === "p-003"
                ? 12
                : p.id === "p-004"
                  ? 1013.2
                  : 500;
        const jitter = (Math.random() - 0.5) * (p.id === "p-003" ? 6 : 1.5);
        rows.push({
          id: `${s.id}-${p.id}-${i}`,
          station: s,
          parameter: p,
          value: +(base + jitter).toFixed(1),
          measuredAt: t,
        });
      }
    }
  }
  return rows;
})();

// ===== Common List Types ====================================================
export type CursorPage<T> = {
  items: T[];
  nextCursor: string | null;
  prevCursor: string | null;
  limit: number;
};

type ListParams = { q?: string; limit?: number; cursor?: string | null };
type ListPage = {
  items: ParameterDto[];
  nextCursor: string | null;
  prevCursor: string | null;
  limit: number;
  q: string;
};

type CreatePayload = Omit<ParameterDto, "id" | "createdAt" | "updatedAt">;

type UpdatePayload = Partial<
  Pick<
    ParameterDto,
    "name" | "unitOfMeasure" | "factor" | "offset" | "isActive"
  >
>;

export const TelemetryService = {
  async listParameters({ q = "", limit = 10, cursor = null }: ListParams) {
    const byName = (p: ParameterDto) =>
      p.name.toLowerCase().includes(q.toLowerCase());

    const sorted = [...mockData]
      .filter(byName)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    const startIndex = cursor ? decode(cursor) : 0;
    const pageItems = sorted.slice(startIndex, startIndex + limit);

    const nextIndex = startIndex + limit;
    const prevIndex = Math.max(0, startIndex - limit);

    const nextCursor = nextIndex < sorted.length ? encode(nextIndex) : null;
    const prevCursor = startIndex > 0 ? encode(prevIndex) : null;

    const body: ListPage = {
      items: pageItems,
      nextCursor,
      prevCursor,
      limit,
      q,
    };

    return new RestResponse({ body });
  },

  async createParameter(data: CreatePayload) {
    const newId = `p-${String(mockData.length + 1).padStart(3, "0")}`;
    const newParameter: ParameterDto = {
      id: newId,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockData.push(newParameter);

    // Em produção, aqui seria um POST na API. Ex:
    // const res = await fetch('/api/telemetry/parameters', { method: 'POST', body: JSON.stringify(data) })
    // return new RestResponse({ body: await res.json(), statusCode: res.status })

    return new RestResponse<ParameterDto>({ body: newParameter });
  },

  async updateParameter(id: string, data: UpdatePayload) {
    const idx = mockData.findIndex((p) => p.id === id);
    if (idx === -1) {
      return new RestResponse<ParameterDto>({
        statusCode: 404,
        errorMessage: "Parâmetro não encontrado",
      });
    }

    const prev = mockData[idx];
    const updated: ParameterDto = {
      ...prev,
      ...data,
      updatedAt: new Date(),
    };

    mockData[idx] = updated;

    // Em produção, aqui seria um PUT/patch na API. Ex:
    // const res = await fetch(`/api/telemetry/parameters/${id}`, { method: 'PUT', body: JSON.stringify(data) })
    // return new RestResponse({ body: await res.json(), statusCode: res.status })

    return new RestResponse<ParameterDto>({ body: updated });
  },

  // ---------- STATIONS ------------------------------------------------------
  async listStations(params: {
    q?: string;
    status?: "todos" | "Active" | "Inactive";
    activity?: "todos" | "Last24h";
    limit?: number;
    cursor?: string | null;
  }) {
    const {
      q = "",
      status = "todos",
      activity = "todos",
      limit = 10,
      cursor = null,
    } = params ?? {};

    const now = Date.now();

    const filtered = mockStations
      .filter((s) => {
        const byQ = (s.name + s.UID).toLowerCase().includes(q.toLowerCase());
        const byStatus =
          status === "todos"
            ? true
            : status === "Active"
              ? s.isActive
              : !s.isActive;
        const byActivity =
          activity === "todos"
            ? true
            : s.lastReadAt
              ? now - s.lastReadAt.getTime() <= 24 * 3600_000
              : false;
        return byQ && byStatus && byActivity;
      })
      .sort(
        (a, b) =>
          (b.lastReadAt?.getTime() ?? 0) - (a.lastReadAt?.getTime() ?? 0)
      );

    const startIndex = cursor ? decode(cursor) : 0;
    const pageItems = filtered.slice(startIndex, startIndex + limit);
    const nextIndex = startIndex + limit;
    const prevIndex = Math.max(0, startIndex - limit);

    const nextCursor = nextIndex < filtered.length ? encode(nextIndex) : null;
    const prevCursor = startIndex > 0 ? encode(prevIndex) : null;

    const body: CursorPage<StationDto> & { total: number } = {
      items: pageItems,
      nextCursor,
      prevCursor,
      limit,
      total: filtered.length,
    };

    return new RestResponse({ body });
  },

  async getStationById(id: string) {
    const station = mockStations.find((s) => s.id === id) || null;
    if (!station)
      return new RestResponse<StationDto>({
        statusCode: 404,
        errorMessage: "Estação não encontrada",
      });
    return new RestResponse<StationDto>({ body: station });
  },

  async toggleStationActive(id: string) {
    const idx = mockStations.findIndex((s) => s.id === id);
    if (idx === -1)
      return new RestResponse<StationDto>({
        statusCode: 404,
        errorMessage: "Estação não encontrada",
      });
    mockStations[idx] = {
      ...mockStations[idx],
      isActive: !mockStations[idx].isActive,
    };
    return new RestResponse<StationDto>({ body: mockStations[idx] });
  },

  // ---------- STATION MEASUREMENTS -----------------------------------------
  async listStationMeasurements(params: {
    stationId: string;
    parameterId?: string | "todos";
    dateFrom?: Date | null;
    dateTo?: Date | null;
    limit?: number;
    cursor?: string | null;
  }) {
    const {
      stationId,
      parameterId = "todos",
      dateFrom = null,
      dateTo = null,
      limit = 15,
      cursor = null,
    } = params;

    let rows = mockMeasurements.filter((m) => m.station.id === stationId);

    if (parameterId !== "todos")
      rows = rows.filter((m) => m.parameter.id === parameterId);
    if (dateFrom) rows = rows.filter((m) => m.measuredAt >= dateFrom);
    if (dateTo) rows = rows.filter((m) => m.measuredAt <= dateTo);

    rows.sort((a, b) => b.measuredAt.getTime() - a.measuredAt.getTime());

    const startIndex = cursor ? decode(cursor) : 0;
    const pageItems = rows.slice(startIndex, startIndex + limit);
    const nextIndex = startIndex + limit;
    const prevIndex = Math.max(0, startIndex - limit);

    const nextCursor = nextIndex < rows.length ? encode(nextIndex) : null;
    const prevCursor = startIndex > 0 ? encode(prevIndex) : null;

    const body: CursorPage<MeasurementDto> & { total: number } = {
      items: pageItems,
      nextCursor,
      prevCursor,
      limit,
      total: rows.length,
    };

    return new RestResponse({ body });
  },
};
