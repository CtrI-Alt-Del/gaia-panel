import { RestResponse } from "@/core/responses/rest-response";
import type { ParameterDto } from "@/core/dtos/parameter-dto";

// Helpers de paginação mock
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
    unitOfMeasure: "°C",
    numberOfDecimalPlaces: 1,
    factor: 1,
    offset: 0,
    isActive: true,
    createdAt: new Date(Date.now() - 1 * 3600_000),
    updatedAt: new Date(Date.now() - 1 * 3600_000),
  },
  {
    id: "p-002",
    name: "Umidade Relativa",
    unitOfMeasure: "%",
    numberOfDecimalPlaces: 0,
    factor: 1,
    offset: 0,
    isActive: true,
    createdAt: new Date(Date.now() - 2 * 3600_000),
    updatedAt: new Date(Date.now() - 2 * 3600_000),
  },
  {
    id: "p-003",
    name: "Velocidade do Vento",
    unitOfMeasure: "m/s",
    numberOfDecimalPlaces: 1,
    factor: 1,
    offset: 0,
    isActive: false,
    createdAt: new Date(Date.now() - 3 * 3600_000),
    updatedAt: new Date(Date.now() - 3 * 3600_000),
  },
  {
    id: "p-004",
    name: "Pressão Atmosférica",
    unitOfMeasure: "hPa",
    numberOfDecimalPlaces: 1,
    factor: 1,
    offset: 0,
    isActive: true,
    createdAt: new Date(Date.now() - 4 * 3600_000),
    updatedAt: new Date(Date.now() - 4 * 3600_000),
  },
  {
    id: "p-005",
    name: "Radiação Solar",
    unitOfMeasure: "W/m²",
    numberOfDecimalPlaces: 0,
    factor: 1,
    offset: 0,
    isActive: true,
    createdAt: new Date(Date.now() - 5 * 3600_000),
    updatedAt: new Date(Date.now() - 5 * 3600_000),
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

type CreatePayload = Omit<ParameterDto, "id" | "createdAt" | "updatedAt">;

type UpdatePayload = Partial<
  Pick<
    ParameterDto,
    | "name"
    | "unitOfMeasure"
    | "numberOfDecimalPlaces"
    | "factor"
    | "offset"
    | "isActive"
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
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
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
};
