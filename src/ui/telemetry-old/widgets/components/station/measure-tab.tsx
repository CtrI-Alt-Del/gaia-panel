import { Form } from "react-router";
import type { MeasurementDto } from "@/core/dtos/telemetry/measurement-dto";
import { Button } from "@/ui/shadcn/components/button";
import { PaginationSelect } from "@/ui/global/widgets/components";

interface MeasureTabProps {
  loading: boolean;
  rows: MeasurementDto[];
  cursor: { next: string | null; prev: string | null };
  parameterId: string;
  limit: number;
  uniqueParams: Array<{ id: string; name: string }>;
  setParam: (k: string, v: string | null) => void;
  loadMeasure: () => Promise<void>;
  formatDateTime: (d: Date) => string;
}

export function MeasureTab({
  loading,
  rows,
  cursor,
  parameterId,
  limit,
  uniqueParams,
  setParam,
  loadMeasure,
  formatDateTime,
}: MeasureTabProps) {
  return (
    <div className="space-y-4">
      <div className="w-full">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <Form method="get" replace className="flex flex-wrap items-end gap-2">
            <div className="flex flex-col">
              <label htmlFor="parameterId" className="text-xs text-stone-600">
                Filtrar por parâmetro
              </label>
              <select
                id="parameterId"
                name="parameterId"
                defaultValue={parameterId}
                className="h-9 rounded-md border border-stone-300 px-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos os Parâmetros</option>
                {uniqueParams.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
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

      <div className="rounded-lg border border-stone-200">
        <div className="flex items-center justify-between p-4 border-b border-stone-200">
          <h2 className="text-lg font-medium">Medições</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left">
            <tr>
              <th className="p-3 font-medium text-stone-700">Parâmetro</th>
              <th className="p-3 font-medium text-stone-700">Valor/Unidade</th>
              <th className="p-3 font-medium text-stone-700">
                Data da Leitura
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={3} className="p-6 text-center text-stone-500">
                  Carregando…
                </td>
              </tr>
            )}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={3} className="p-6 text-center text-stone-500">
                  Nenhum registro encontrado
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-stone-100 hover:bg-stone-50"
                >
                  <td className="p-3 font-medium text-stone-900">
                    {r.parameter.name}
                  </td>
                  <td className="p-3 text-stone-600">
                    {r.value} {r.parameter.unitOfMeasure}
                  </td>
                  <td className="p-3 text-stone-600">
                    {formatDateTime(r.measuredAt)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="h-8 px-3 rounded-md border border-stone-300 text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!cursor.prev}
          onClick={async () => {
            setParam("cursor", cursor.prev);
            await loadMeasure();
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
            await loadMeasure();
          }}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
