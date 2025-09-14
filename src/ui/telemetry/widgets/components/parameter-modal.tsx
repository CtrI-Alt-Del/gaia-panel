import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/shadcn/components/dialog";
import { ParameterForm } from "./parameter-form";

export type ParameterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ParameterModal({ isOpen, onClose }: ParameterModalProps) {
  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo Parâmetro Meteorológico</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para criar um novo parâmetro meteorológico.
          </DialogDescription>
        </DialogHeader>

        <ParameterForm
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
