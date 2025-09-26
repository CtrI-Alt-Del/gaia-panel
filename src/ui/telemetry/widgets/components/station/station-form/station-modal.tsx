import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/ui/shadcn/components/dialog'
import { StationForm } from './station-form'
import type { StationDto } from '@/core/dtos/telemetry/station-dto'
import type { ParameterDto } from '@/core/dtos/telemetry/parameter-dto'
import type { StationFormData } from './station-form'

export type StationModalProps = {
  isOpen: boolean
  station?: StationDto | null
  onClose: () => void
  onSubmit: (data: StationFormData) => Promise<void>
  availableParameters: ParameterDto[]
  mode: 'create' | 'edit'
}

export function StationModal({
  isOpen,
  onClose,
  station,
  onSubmit,
  availableParameters,
  mode,
}: StationModalProps) {
  const handleCancel = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[800px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Nova Estação' : 'Editar Estação'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Preencha os dados abaixo para criar uma nova estação de monitoramento.'
              : 'Ajuste os dados abaixo para editar a estação de monitoramento.'}
          </DialogDescription>
        </DialogHeader>

        <StationForm
          onCancel={handleCancel}
          station={station}
          onSubmit={onSubmit}
          availableParameters={availableParameters}
          mode={mode}
        />
      </DialogContent>
    </Dialog>
  )
}
