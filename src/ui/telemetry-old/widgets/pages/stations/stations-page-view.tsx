import { Link, Form } from "react-router";
import type { StationDto } from "@/core/dtos/telemetry/station-dto";
import { StatusPill } from "@/ui/shadcn/components/status-pill";
import { Input } from "@/ui/shadcn/components/input";
import { Button } from "@/ui/shadcn/components/button";
import { Edit, Power, Plus } from "lucide-react";
import { StationModal } from "../../components/station/station-form";
import { PaginationSelect } from "@/ui/global/widgets/components";

interface StationsPageViewProps {
  loading: boolean;
  rows: StationDto[];
  total: number;
  cursor: { next: string | null; prev: string | null };
  q: string;
  status: string;
  limit: number;
  fromTo: { from: number; to: number };
  setParam: (k: string, v: string | null) => void;
  load: () => Promise<void>;
  timeAgo: (d: Date) => string;
  toggleStationActive: (stationId: string) => Promise<void>;
  isModalOpen: boolean;
  editingStation: StationDto | null;
  formMode: "create" | "edit";
  onNewStation: () => void;
  onEditStation: (station: StationDto) => void;
  onCloseModal: () => void;
  handleStationSubmit: (data: any) => Promise<void>;
  availableParameters: any[];
}

export default function StationsPageView({
  loading,
  rows,
  total,
  cursor,
  q,
  status,
  limit,
  fromTo,
  setParam,
  load,
  timeAgo,
  toggleStationActive,
  isModalOpen,
  editingStation,
  formMode,
  onNewStation,
  onEditStation,
  onCloseModal,
  handleStationSubmit,
  availableParameters,
}: StationsPageViewProps) {
  return (
    <section className="container mx-auto px-4 py-2">
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Estações de Monitoramento</h1>
          <p className="text-sm text-stone-600">
            Filtros por UID, nome e status
          </p>
        </div>
      </header>

      <div className="mb-6">
        <div className="w-full">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <Form
              method="get"
              replace
              className="flex flex-wrap items-end gap-2"
            >
              <div className="flex flex-col">
                <label htmlFor="q" className="text-xs text-stone-600">
                  Filtrar por UID ou nome
                </label>
                <Input
                  id="q"
                  name="q"
                  defaultValue={q}
                  placeholder="Ex.: EST001 ou Central"
                  className="h-9 w-56"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="status" className="text-xs text-stone-600">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={status}
                  className="h-9 rounded-md border border-stone-300 px-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos</option>
                  <option value="ativo">Ativos</option>
                  <option value="inativo">Inativos</option>
                </select>
              </div>
              <PaginationSelect
                value={limit}
                onValueChange={(value) => setParam("limit", value)}
              />
              <Button type="submit" className="h-9">
                Aplicar
              </Button>
            </Form>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-stone-200">
        <div className="flex items-center justify-between p-4 border-b border-stone-200">
          <h2 className="text-lg font-medium">Estações de Monitoramento</h2>
          <Button onClick={onNewStation} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nova Estação
          </Button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left">
            <tr>
              <th className="p-3 w-[90px] font-medium text-stone-700">UID</th>
              <th className="p-3 font-medium text-stone-700">Nome</th>
              <th className="p-3 font-medium text-stone-700">Coordenadas</th>
              <th className="p-3 font-medium text-stone-700">Parâmetros</th>
              <th className="p-3 font-medium text-stone-700">Status</th>
              <th className="p-3 font-medium text-stone-700">Última Leitura</th>
              <th className="p-3 text-center font-medium text-stone-700">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-stone-500">
                  Carregando…
                </td>
              </tr>
            )}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-stone-500">
                  Nenhuma estação encontrada
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((s) => (
                <tr
                  key={s.id}
                  className="border-t border-stone-100 hover:bg-stone-50"
                >
                  <td className="p-3 font-medium text-stone-900">{s.UID}</td>
                  <td className="p-3">
                    <Link
                      to={`/stations/${s.id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                      {s.name}
                    </Link>
                  </td>
                  <td className="p-3 text-stone-600">
                    {s.latitude.toFixed(4)}, {s.longitude.toFixed(4)}
                  </td>
                  <td className="p-3 text-stone-600">
                    {s.parameters.length} parâmetros
                  </td>
                  <td className="p-3">
                    <StatusPill active={s.isActive || false} />
                  </td>
                  <td className="p-3 text-stone-600">
                    {s.lastReadAt ? timeAgo(s.lastReadAt) : "—"}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex gap-2 justify-center">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 border border-gray-200"
                        onClick={() => onEditStation(s)}
                        title="Editar estação"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className={`inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer border ${s.isActive
                          ? "bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 border-red-200"
                          : "bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 border-green-200"
                          }`}
                        onClick={() => toggleStationActive(s.id)}
                        title={
                          s.isActive ? "Desativar estação" : "Ativar estação"
                        }
                      >
                        <Power className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-stone-600">
        <span>
          Mostrando {rows.length ? `${fromTo.from}–${fromTo.to}` : 0} de {total}{" "}
          resultados
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-8 px-3 rounded-md border border-stone-300 text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!cursor.prev}
            onClick={async () => {
              setParam("cursor", cursor.prev);
              await load();
            }}
          >
            Anterior
          </button>
          <button
            type="button"
            className="h-8 px-3 rounded-md border border-stone-300 text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!cursor.next}
            onClick={async () => {
              setParam("cursor", cursor.next);
              await load();
            }}
          >
            Próximo
          </button>
        </div>
      </div>

      {/* Modal do Formulário */}
      {onCloseModal && (
        <StationModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
          onSubmit={handleStationSubmit}
          availableParameters={availableParameters}
          station={editingStation}
          mode={formMode}
        />
      )}
    </section>
  );
}
