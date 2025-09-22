import { Form } from "react-router";
import { Input } from "@/ui/shadcn/components/input";
import { Button } from "@/ui/shadcn/components/button";
import { PaginationSelect } from "@/ui/global/widgets/components";

interface AlarmsFiltersProps {
  searchValue: string;
  statusValue: "all" | "ativo" | "inativo";
  limit: number;
}

export const AlarmsFilters = ({
  searchValue,
  statusValue,
  limit,
}: AlarmsFiltersProps) => {
  return (
    <div className="w-full">
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <Form method="get" replace className="flex flex-wrap items-end gap-2">
          <div className="flex flex-col">
            <label htmlFor="q" className="text-xs text-stone-600">
              Filtrar por nome
            </label>
            <Input
              id="q"
              name="q"
              defaultValue={searchValue}
              placeholder="Ex.: Temperatura"
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
              defaultValue={statusValue}
              className="h-9 rounded-md border border-stone-300 px-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos</option>
              <option value="ativo">Ativos</option>
              <option value="inativo">Inativos</option>
            </select>
          </div>
          <PaginationSelect
            value={limit ?? 10}
          />
          <Button type="submit" className="h-9">
            Aplicar
          </Button>
        </Form>
      </div>
    </div>
  );
};
