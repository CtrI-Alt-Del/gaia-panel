import { Edit } from "lucide-react";

import type { ParameterDto } from "@/core/telemetry/dtos/parameter-dto";
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
import { getParameterIcon } from "@/ui/telemetry/widgets/utils/parameter-utils";
import { PaginationControl } from "@/ui/global/widgets/components/pagination-control";
import { Dialog } from "@/ui/global/widgets/components/dialog";
import { ParameterForm } from "../parameter-form";
import { ParameterStatusButton } from "../parameter-status-button";

export type ParametersTableViewProps = {
  parameters: ParameterDto[];
  nextCursor: string | null;
  previousCursor: string | null;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isLoading?: boolean;
  selectedParameter?: ParameterDto;
  onEdit?: (id: string) => void;
  onCloseModal?: () => void;
  onParameterUpdated?: (parameter: ParameterDto) => void;
};

export const ParametersTableView = ({
  parameters,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  selectedParameter,
  onEdit,
  onCloseModal,
}: ParametersTableViewProps) => {
  return (
    <Table>
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
        {isLoading ? (
          Array.from({ length: 5 }, (_, index) => {
            const skeletonId = `parameter-skeleton-${Date.now()}-${index}`;
            return (
              <TableRow key={skeletonId}>
                <TableCell
                  colSpan={6}
                  className="text-center text-stone-500 py-10"
                >
                  Carregando...
                </TableCell>
              </TableRow>
            );
          })
        ) : parameters.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-stone-500 py-10">
              Nenhum parâmetro encontrado.
            </TableCell>
          </TableRow>
        ) : (
          parameters.map((parameter) => {
            const {
              Icon: IconComponent,
              iconColor,
              badgeColor,
            } = getParameterIcon(parameter.name);

            return (
              <TableRow key={parameter.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex size-9 items-center justify-center rounded-xl ring-1 ${badgeColor}`}
                    >
                      <IconComponent className={`size-5 ${iconColor}`} />
                    </span>
                    <div className="leading-tight">
                      <div className="font-medium">{parameter.name}</div>
                      <div className="text-xs text-stone-500">
                        Criado em{" "}
                        {new Date(
                          parameter.createdAt || new Date()
                        ).toLocaleString("pt-BR")}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-sm text-stone-700">
                    {parameter.unitOfMeasure}
                  </div>
                </TableCell>

                <TableCell className="tabular-nums">
                  {parameter.factor}
                </TableCell>
                <TableCell className="tabular-nums">
                  {parameter.offset}
                </TableCell>

                <TableCell>
                  <StatusPill
                    active={parameter.isActive || false}
                    activeText="Ativo"
                    inactiveText="Inativo"
                  />
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex gap-2 justify-center">
                    {onEdit && (
                      <Dialog
                        onClose={onCloseModal || (() => {})}
                        title="Editar Parâmetro"
                        description="Edite as informações do parâmetro"
                        size="md"
                        trigger={
                          <button
                            type="button"
                            onClick={() => onEdit(parameter.id || "")}
                            className="inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800 border border-gray-200"
                            title="Editar parâmetro"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        }
                      >
                        {(closeDialog) => (
                          <ParameterForm
                            onSuccess={closeDialog}
                            onCancel={closeDialog}
                            parameterDto={parameter}
                          />
                        )}
                      </Dialog>
                    )}
                    <ParameterStatusButton
                      parameterId={parameter.id || ""}
                      isActive={parameter.isActive || false}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>
            <PaginationControl
              previousCursor={previousCursor}
              nextCursor={nextCursor}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
