import { Link, Form } from "react-router";
import type { ParameterDto } from "@/core/dtos/parameter-dto";
import { Input } from "@/ui/shadcn/components/input";
import { Button } from "@/ui/shadcn/components/button";
import { Badge } from "@/ui/shadcn/components/badge";
import { StatusPill } from "@/ui/shadcn/components/status-pill";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/ui/shadcn/components/table";
import {
  Power,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Cloud,
  Gauge,
  Eye,
  Edit,
  Plus,
} from "lucide-react";
import { ParameterModal } from "@/ui/telemetry/widgets/components/parameter-modal";

export type ParametersPageViewProps = {
  items: ParameterDto[];
  nextCursor: string | null;
  prevCursor: string | null;
  limit: number;
  q: string;
  isActive?: string;
  searchParams: URLSearchParams;
  isModalOpen: boolean;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onToggleisActive?: (id: string) => void;
  onNewParameter?: () => void;
  onCloseModal?: () => void;
};

// ‼️‼️‼️‼️ ESSA PAGINA ESTA MOCKADA APENAS POR DEMONSTRAÇÃO, NADA DISSO VAI ESTAR AQUI.

const getParameterIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("temperatura"))
    return {
      Icon: Thermometer,
      iconColor: "text-red-500",
      badgeColor: "bg-red-50 ring-red-200",
      iconBgColor: "bg-red-100",
    };
  if (lowerName.includes("umidade") || lowerName.includes("precipitação"))
    return {
      Icon: Droplets,
      iconColor: "text-blue-500",
      badgeColor: "bg-blue-50 ring-blue-200",
      iconBgColor: "bg-blue-100",
    };
  if (lowerName.includes("vento"))
    return {
      Icon: Wind,
      iconColor: "text-gray-500",
      badgeColor: "bg-gray-50 ring-gray-200",
      iconBgColor: "bg-gray-100",
    };
  if (lowerName.includes("radiação") || lowerName.includes("uv"))
    return {
      Icon: Sun,
      iconColor: "text-yellow-500",
      badgeColor: "bg-yellow-50 ring-yellow-200",
      iconBgColor: "bg-yellow-100",
    };
  if (lowerName.includes("pressão"))
    return {
      Icon: Gauge,
      iconColor: "text-purple-500",
      badgeColor: "bg-purple-50 ring-purple-200",
      iconBgColor: "bg-purple-100",
    };
  return {
    Icon: Cloud,
    iconColor: "text-gray-400",
    badgeColor: "bg-gray-50 ring-gray-200",
    iconBgColor: "bg-gray-100",
  };
};

const getBadgeColor = (
  unit: string
):
  | "stone"
  | "blue"
  | "sky"
  | "teal"
  | "green"
  | "yellow"
  | "orange"
  | "red"
  | "violet" => {
  const unitColors: Record<
    string,
    | "stone"
    | "blue"
    | "sky"
    | "teal"
    | "green"
    | "yellow"
    | "orange"
    | "red"
    | "violet"
  > = {
    "°C": "blue",
    "%": "green",
    hPa: "violet",
    "m/s": "orange",
    "°": "sky",
    "W/m²": "yellow",
    mm: "teal",
    índice: "red",
  };
  return unitColors[unit] || "stone";
};


const urlWith = (params: Record<string, string>) => {
  const searchParams = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
  });
  return `?${searchParams.toString()}`;
};

export function ParametersPageView({
  items,
  nextCursor,
  prevCursor,
  limit,
  q,
  isActive,
  searchParams,
  isModalOpen,
  onView,
  onEdit,
  onToggleisActive,
  onNewParameter,
  onCloseModal,
}: ParametersPageViewProps) {
  return (
    <section className="container mx-auto p-4 pt-16">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Parâmetros Meteorológicos</h1>
          <p className="text-sm text-stone-600">Filtros por nome e status</p>
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <Form method="get" replace className="flex flex-wrap items-end gap-2">
            <div className="flex flex-col">
              <label htmlFor="q" className="text-xs text-stone-600">
                Filtrar por nome
              </label>
              <Input
                id="q"
                name="q"
                defaultValue={q}
                placeholder="Ex.: Temperatura"
                className="h-9 w-56"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="isActive" className="text-xs text-stone-600">
                Status
              </label>
              <select
                id="isActive"
                name="isActive"
                defaultValue={searchParams.get("isActive") || "all"}
                className="h-9 rounded-md border border-stone-300 px-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos</option>
                <option value="active">Ativos</option>
                <option value="inactive">Inativos</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="limit" className="text-xs text-stone-600">
                Itens por página
              </label>
              <select
                id="limit"
                name="limit"
                defaultValue={String(limit ?? 10)}
                className="h-9 rounded-md border border-stone-300 px-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[5, 10, 20, 50].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" className="h-9">
              Aplicar
            </Button>
          </Form>

          {onNewParameter && (
            <Button onClick={onNewParameter} className="flex items-center gap-2 h-9">
              <Plus className="w-4 h-4" />
              Novo Parâmetro
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-stone-200">
        <Table>
          <TableCaption>Parâmetros Meteorológicos</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
                <TableHead>Unidade</TableHead>
              <TableHead>Fator</TableHead>
              <TableHead>Offset</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-stone-500 py-10"
                >
                  Nenhum parâmetro encontrado.
                </TableCell>
              </TableRow>
            )}

            {items.map((p) => {
              const {
                Icon: IconComponent,
                iconColor,
                badgeColor,
              } = getParameterIcon(p.name);
              const color = getBadgeColor(p.unitOfMeasure);

              return (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex size-9 items-center justify-center rounded-xl ring-1 ${badgeColor}`}
                      >
                        <IconComponent className={`size-5 ${iconColor}`} />
                      </span>
                      <div className="leading-tight">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-stone-500">
                          Criado em{" "}
                          {new Date(p.createdAt || new Date()).toLocaleString("pt-BR")}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge color={color} className="capitalize">
                      {p.unitOfMeasure}
                    </Badge>
                  </TableCell>

                  <TableCell className="tabular-nums">{p.factor}</TableCell>
                  <TableCell className="tabular-nums">{p.offset}</TableCell>

                  <TableCell>
                    <StatusPill active={p.isActive || false} />
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-center">
                      {onView && (
                        <button
                          type="button"
                          onClick={() => onView(p.id || "")}
                          className="inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 border border-blue-200"
                          title="Visualizar parâmetro"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(p.id || "")}
                          className="inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 border border-gray-200"
                          title="Editar parâmetro"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {onToggleisActive && (
                        <button
                          type="button"
                          onClick={() => onToggleisActive(p.id || "")}
                          className={`inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${p.isActive
                            ? "bg-orange-100 hover:bg-orange-200 text-orange-700 hover:text-orange-800 border border-orange-200" : p.isActive
                            ? "bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 border border-green-200"
                            : "bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 border border-green-200"
                            }`}
                          title={
                            p.isActive
                              ? "Desativar parâmetro"
                              : "Ativar parâmetro"
                          }
                        >
                          <Power className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-xs text-stone-600">
                Mostrando até {limit} itens • Nome: {q ? `"${q}"` : "nenhum"} •
                Status:{" "}
                {isActive === "all"
                  ? "todos"
                  : isActive === "active"
                    ? "ativos"
                    : "inativos"}
              </TableCell>
              <TableCell colSpan={3} className="text-right">
                <nav className="inline-flex items-center gap-2">
                  <Link
                    to={prevCursor ? urlWith({ cursor: prevCursor }) : "#"}
                    aria-disabled={!prevCursor}
                    className={`rounded-full border px-3 py-1.5 text-sm ${prevCursor
                      ? "hover:bg-stone-50"
                      : "pointer-events-none opacity-50"
                      }`}
                  >
                    Anterior
                  </Link>
                  <Link
                    to={nextCursor ? urlWith({ cursor: nextCursor }) : "#"}
                    aria-disabled={!nextCursor}
                    className={`rounded-full border px-3 py-1.5 text-sm ${nextCursor
                      ? "hover:bg-stone-50"
                      : "pointer-events-none opacity-50"
                      }`}
                  >
                    Próxima
                  </Link>
                </nav>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {onCloseModal && (
        <ParameterModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
        />
      )}
    </section>
  );
}
