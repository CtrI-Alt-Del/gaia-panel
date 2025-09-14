import { RestResponse } from "@/core/responses/rest-response";
import type { ParameterDto } from "@/core/dtos/ParameterDto";

const encode = (n: number) =>
  Buffer.from(String(n), "utf8").toString("base64url");
const decode = (c: string) => {
  const s = Buffer.from(c, "base64url").toString("utf8");
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

const mockData: ParameterDto[] = [
  {
    id: "p-001",
    name: "Temperatura do Ar",
    unit: "°C",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 1 * 3600_000).toISOString(),
  },
  {
    id: "p-002",
    name: "Umidade Relativa",
    unit: "%",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 2 * 3600_000).toISOString(),
  },
  {
    id: "p-003",
    name: "Velocidade do Vento",
    unit: "m/s",
    factor: 1,
    offset: 0,
    active: false,
    createdAt: new Date(Date.now() - 3 * 3600_000).toISOString(),
  },
  {
    id: "p-004",
    name: "Pressão Atmosférica",
    unit: "hPa",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 4 * 3600_000).toISOString(),
  },
  {
    id: "p-005",
    name: "Radiação Solar",
    unit: "W/m²",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 5 * 3600_000).toISOString(),
  },
  {
    id: "p-001",
    name: "Temperatura do Ar",
    unit: "°C",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 1 * 3600_000).toISOString(),
  },
  {
    id: "p-002",
    name: "Umidade Relativa",
    unit: "%",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 2 * 3600_000).toISOString(),
  },
  {
    id: "p-003",
    name: "Velocidade do Vento",
    unit: "m/s",
    factor: 1,
    offset: 0,
    active: false,
    createdAt: new Date(Date.now() - 3 * 3600_000).toISOString(),
  },
  {
    id: "p-004",
    name: "Pressão Atmosférica",
    unit: "hPa",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 4 * 3600_000).toISOString(),
  },
  {
    id: "p-005",
    name: "Radiação Solar",
    unit: "W/m²",
    factor: 1,
    offset: 0,
    active: true,
    createdAt: new Date(Date.now() - 5 * 3600_000).toISOString(),
  },
];

type ListParams = { q?: string; limit?: number; cursor?: string | null };
type ListPage = {
  items: ParameterDto[];
  nextCursor: string | null;
  prevCursor: string | null;
  limit: number;
  q: string;
};

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
};
