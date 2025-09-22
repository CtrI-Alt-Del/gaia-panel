import { Edit, Power, AlertTriangle } from "lucide-react";

import type { ParameterDto } from "@/core/dtos/telemetry/parameter-dto";
import { StatusPill } from "@/ui/shadcn/components/status-pill";
import { Badge } from "@/ui/shadcn/components/badge";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/ui/shadcn/components/table";
import {
  getParameterIcon,
  getBadgeColor,
} from "../../../utils/parameter-utils";
import { PaginationControl } from "@/ui/global/widgets/components/pagination-control";
import { Dialog } from "@/ui/global/widgets/components/dialog";
import { ParameterForm } from "../parameter-form/parameter-form-view";
import { AlertDialogView } from "@/ui/global/widgets/components/alert-dialog/alert-dialog-view";

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
  onToggleActive?: (id: string) => void;
  onDeactivateClick?: (parameter: ParameterDto) => void;
  onConfirmDeactivate?: () => void;
  deactivateDialogOpen?: boolean;
  parameterToDeactivate?: ParameterDto | null;
  setDeactivateDialogOpen?: (open: boolean) => void;
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
  onParameterUpdated,
  onToggleActive,
  onDeactivateClick,
  onConfirmDeactivate,
  deactivateDialogOpen = false,
  parameterToDeactivate = null,
  setDeactivateDialogOpen,
}: ParametersTableViewProps) => {
  return (
    <>
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
              <TableCell
                colSpan={6}
                className="text-center text-stone-500 py-10"
              >
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
              const color = getBadgeColor(parameter.unitOfMeasure);

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
                    <Badge color={color as any} className="capitalize">
                      {parameter.unitOfMeasure}
                    </Badge>
                  </TableCell>

                  <TableCell className="tabular-nums">
                    {parameter.factor}
                  </TableCell>
                  <TableCell className="tabular-nums">
                    {parameter.offset}
                  </TableCell>

                  <TableCell>
                    <StatusPill active={parameter.isActive || false} />
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
                              parameterDto={selectedParameter}
                            />
                          )}
                        </Dialog>
                      )}
                      {onToggleActive && (
                        <button
                          type="button"
                          onClick={() => {
                            if (parameter.isActive && onDeactivateClick) {
                              onDeactivateClick(parameter);
                            } else {
                              onToggleActive(parameter.id || "");
                            }
                          }}
                          className={`inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
                            parameter.isActive
                              ? "bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 border border-red-200"
                              : "bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 border border-green-200"
                          }`}
                          title={
                            parameter.isActive
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

      <AlertDialogView
        isOpen={deactivateDialogOpen}
        open={() => setDeactivateDialogOpen?.(true)}
        close={() => setDeactivateDialogOpen?.(false)}
        isAnimating={false}
        title="Confirmar Desativação"
        description="O parâmetro será desativado e não será mais utilizado nas medições."
        confirmText="Desativar Parâmetro"
        variant="destructive"
        icon={<AlertTriangle className="w-5 h-5" />}
        onConfirm={onConfirmDeactivate}
      >
        {parameterToDeactivate && (
          <>
            <div className="bg-gray-50 rounded-lg p-4 border">
              <h4 className="font-medium text-gray-900 mb-2">
                Parâmetro a ser desativado:
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Nome:</span>{" "}
                  {parameterToDeactivate.name}
                </div>
                <div>
                  <span className="font-medium">Unidade:</span>{" "}
                  {parameterToDeactivate.unitOfMeasure}
                </div>
                <div>
                  <span className="font-medium">Fator:</span>{" "}
                  {parameterToDeactivate.factor}
                </div>
                <div>
                  <span className="font-medium">Offset:</span>{" "}
                  {parameterToDeactivate.offset}
                </div>
                <div>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      parameterToDeactivate.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {parameterToDeactivate.isActive ? "○ Ativo" : "• Inativo"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>Atenção:</strong> Ao desativar este parâmetro, ele não
                será mais utilizado nas medições, mas as configurações serão
                mantidas e poderá ser reativado posteriormente.
              </p>
            </div>
          </>
        )}
      </AlertDialogView>
    </>
  );
};
