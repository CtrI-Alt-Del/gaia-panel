import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/shadcn/components/dialog";
import { ParameterForm } from "./parameter-form";
import type { ParameterDto } from "@/core/dtos/parameter-dto";

export type ParameterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  parameter?: ParameterDto;
  onUpdated?: (parameter: ParameterDto) => void;
};

export function ParameterModal({ isOpen, onClose, parameter, onUpdated }: ParameterModalProps) {
  const handleCancel = () => {
    onClose();
  };

  const isEditMode = !!parameter;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar Parâmetro Meteorológico" : "Novo Parâmetro Meteorológico"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Ajuste os dados abaixo para editar o parâmetro meteorológico."
              : "Preencha os dados abaixo para criar um novo parâmetro meteorológico."
            }
          </DialogDescription>
        </DialogHeader>

        <ParameterForm
          onCancel={handleCancel}
          parameter={parameter}
          onUpdated={onUpdated}
        />
      </DialogContent>
    </Dialog>
  );
}
