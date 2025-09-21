import { Link, Form } from "react-router";
import type { ParameterDto } from "@/core/dtos/telemetry/parameter-dto";
import { Input } from "@/ui/shadcn/components/input";
import { Button } from "@/ui/shadcn/components/button";
import { Badge } from "@/ui/shadcn/components/badge";
import { StatusPill } from "@/ui/shadcn/components/status-pill";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/ui/shadcn/components/table";
import { Power, Edit, Plus } from "lucide-react";
import { getParameterIcon, getBadgeColor } from "../../utils/parameter-utils";
import { ParameterModal } from "@/ui/telemetry/widgets/components/parameter/parameter-modal";
import { PaginationSelect } from "@/ui/global/widgets/components";

export type ParametersPageViewProps = {
  items: ParameterDto[];
  nextCursor: string | null;
  prevCursor: string | null;
  limit: number;
  q: string;
  isActive?: string;
  isModalOpen: boolean;
  onEdit?: (id: string) => void;
  onToggleisActive?: (id: string) => void;
  onNewParameter?: () => void;
  onCloseModal?: () => void;
};

// ‼️‼️‼️‼️ ESSA PAGINA ESTA MOCKADA APENAS POR DEMONSTRAÇÃO, NADA DISSO VAI ESTAR AQUI.

const urlWith = (params: Record<string, string>) => {
  const searchParams = new URLSearchParams(window.location.search)
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value)
    } else {
      searchParams.delete(key)
    }
  })
  return `?${searchParams.toString()}`
}

export function ParametersPageView({
  items,
  nextCursor,
  previousCursor,
  limit,
  q,
  isActive,
  isModalOpen,
  onEdit,
  onToggleisActive,
  onNewParameter,
  onCloseModal,
  onParameterUpdated,
  deactivateDialogOpen,
  parameterToDeactivate,
  onDeactivateClick,
  onConfirmDeactivate,
  setDeactivateDialogOpen,
}: ParametersPageViewProps) {
  const { register, errors } = useParametersFilters({
    initialValues: {
      q,
      isActive: isActive || 'all',
      limit,
    },
  })
  return (
    <section className='container mx-auto px-4 py-2'>
      <header className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <h1 className='text-xl font-semibold'>Parâmetros Meteorológicos</h1>
          <p className='text-sm text-stone-600'>Filtros por nome e status</p>
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
                defaultValue={isActive || "all"}
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

      <div className='rounded-lg border border-stone-200'>
        <div className='flex items-center justify-between p-4 border-b border-stone-200'>
          <h2 className='text-lg font-medium'>Parâmetros Meteorológicos</h2>
          {onNewParameter && (
            <Button
              onClick={onNewParameter}
              className="flex items-center gap-2 h-9"
            >
              <Plus className="w-4 h-4" />
              Novo Parâmetro
            </Button>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Fator</TableHead>
              <TableHead>Offset</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-center'>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className='text-center text-stone-500 py-10'>
                  Nenhum parâmetro encontrado.
                </TableCell>
              </TableRow>
            )}

            {items.map((p) => {
              const {
                Icon: IconComponent,
                iconColor,
                badgeColor,
              } = getParameterIcon(p.name)
              const color = getBadgeColor(p.unitOfMeasure)

              return (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <span
                        className={`inline-flex size-9 items-center justify-center rounded-xl ring-1 ${badgeColor}`}
                      >
                        <IconComponent className={`size-5 ${iconColor}`} />
                      </span>
                      <div className="leading-tight">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-stone-500">
                          Criado em{" "}
                          {new Date(p.createdAt || new Date()).toLocaleString(
                            "pt-BR"
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge color={color as any} className="capitalize">
                      {p.unitOfMeasure}
                    </Badge>
                  </TableCell>

                  <TableCell className='tabular-nums'>{p.factor}</TableCell>
                  <TableCell className='tabular-nums'>{p.offset}</TableCell>

                  <TableCell>
                    <StatusPill active={p.isActive || false} />
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-center">
                      {onEdit && (
                        <button
                          type='button'
                          onClick={() => onEdit(p.id || '')}
                          className='inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 border border-gray-200'
                          title='Editar parâmetro'
                        >
                          <Edit className='w-4 h-4' />
                        </button>
                      )}
                      {onToggleisActive && (
                        <button
                          type="button"
                          onClick={() => onToggleisActive(p.id || "")}
                          className={`inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${p.isActive
                            ? "bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 border border-red-200"
                            : p.isActive
                              ? "bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 border border-green-200"
                              : "bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 border border-green-200"
                            }`}
                          title={
                            p.isActive
                              ? onDeactivateClick?.(p)
                              : onToggleisActive(p.id || '')
                          }
                          className={`inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
                            p.isActive
                              ? 'bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 border border-red-200'
                              : 'bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 border border-green-200'
                          }`}
                          title={p.isActive ? 'Desativar parâmetro' : 'Ativar parâmetro'}
                        >
                          <Power className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-xs text-stone-600">
                Mostrando até {limit} itens • Nome: {q ? `"${q}"` : "nenhum"} •
                Status:{" "}
                {isActive === "all"
                  ? "todos"
                  : isActive === "ativo"
                    ? "ativos"
                    : "inativos"}
              </TableCell>
              <TableCell colSpan={3} className='text-right'>
                <nav className='inline-flex items-center gap-2'>
                  <Link
                    to={prevCursor ? urlWith({ cursor: prevCursor }) : '#'}
                    aria-disabled={!prevCursor}
                    className={`rounded-full border px-3 py-1.5 text-sm ${
                      prevCursor ? 'hover:bg-stone-50' : 'pointer-events-none opacity-50'
                    }`}
                  >
                    Anterior
                  </Link>
                  <Link
                    to={nextCursor ? urlWith({ cursor: nextCursor }) : '#'}
                    aria-disabled={!nextCursor}
                    className={`rounded-full border px-3 py-1.5 text-sm ${
                      nextCursor ? 'hover:bg-stone-50' : 'pointer-events-none opacity-50'
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
        <ParameterModal isOpen={isModalOpen} onClose={onCloseModal} />
      )}

      <AlertDialog
        open={deactivateDialogOpen}
        onOpenChange={setDeactivateDialogOpen}
        title='Confirmar Desativação'
        description='O parâmetro será desativado e não será mais utilizado nas medições.'
        confirmText='Desativar Parâmetro'
        variant='destructive'
        icon={<AlertTriangle className='w-5 h-5' />}
        onConfirm={onConfirmDeactivate}
      >
        {parameterToDeactivate && (
          <>
            <div className='bg-gray-50 rounded-lg p-4 border'>
              <h4 className='font-medium text-gray-900 mb-2'>
                Parâmetro a ser desativado:
              </h4>
              <div className='space-y-2 text-sm text-gray-600'>
                <div>
                  <span className='font-medium'>Nome:</span> {parameterToDeactivate.name}
                </div>
                <div>
                  <span className='font-medium'>Unidade:</span>{' '}
                  {parameterToDeactivate.unitOfMeasure}
                </div>
                <div>
                  <span className='font-medium'>Fator:</span>{' '}
                  {parameterToDeactivate.factor}
                </div>
                <div>
                  <span className='font-medium'>Offset:</span>{' '}
                  {parameterToDeactivate.offset}
                </div>
                <div>
                  <span className='font-medium'>Status:</span>{' '}
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      parameterToDeactivate.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {parameterToDeactivate.isActive ? '○ Ativo' : '• Inativo'}
                  </span>
                </div>
              </div>
            </div>

            <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
              <p className='text-sm text-red-800'>
                <strong>Atenção:</strong> Ao desativar este parâmetro, ele não será mais
                utilizado nas medições, mas as configurações serão mantidas e poderá ser
                reativado posteriormente.
              </p>
            </div>
          </>
        )}
      </AlertDialog>
    </section>
  )
}
