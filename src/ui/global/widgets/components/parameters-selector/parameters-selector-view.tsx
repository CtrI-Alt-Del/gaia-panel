import { Button } from '@/ui/shadcn/components/button'
import { Label } from '@/ui/shadcn/components/label'
import { Badge } from '@/ui/shadcn/components/badge'
import { Input } from '@/ui/shadcn/components/input'
import { Checkbox } from '@/ui/shadcn/components/checkbox'
import { StatusPill } from '@/ui/shadcn/components/status-pill'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from '@/ui/shadcn/components/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/shadcn/components/select'
import { PaginationControl } from '@/ui/global/widgets/components/pagination-control'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'
import { MeasurementUnitIcon } from '../measurement-unit-icon'

type ParameterSelectorViewProps = {
  parameters: ParameterDto[]
  selectedParameters: ParameterDto[]
  isAllSelected: boolean
  isIndeterminate: boolean
  isExpanded: boolean
  isLoading: boolean
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage: boolean
  hasPreviousPage: boolean
  name: string
  pageSize: number
  className?: string
  handleParameterToggle: (parameterId: string) => void
  handleSelectAll: () => void
  handleRemoveParameter: (parameterId: string | undefined) => void
  handleToggleExpanded: () => void
  handleNameChange: (name: string) => void
  handlePageSizeChange: (pageSize: number) => void
}

export const ParametersSelectorView = ({
  parameters,
  selectedParameters,
  isAllSelected,
  isIndeterminate,
  isExpanded,
  isLoading,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  name,
  pageSize,
  handleParameterToggle,
  handleSelectAll,
  handleRemoveParameter,
  handleToggleExpanded,
  handleNameChange,
  handlePageSizeChange,
  className = '',
}: ParameterSelectorViewProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className='space-y-2'>
        <Button
          type='button'
          variant='outline'
          className='w-full justify-between h-auto p-4'
          onClick={handleToggleExpanded}
        >
          <div className='text-left'>
            <div className='font-medium'>
              {selectedParameters.length > 0
                ? `${selectedParameters.length} parâmetros selecionados`
                : 'Selecionar parâmetros'}
            </div>
            <div className='text-xs text-muted-foreground'>
              Clique para {isExpanded ? 'ocultar' : 'mostrar'} a lista de parâmetros
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className='w-4 h-4' />
          ) : (
            <ChevronDown className='w-4 h-4' />
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className='space-y-4 border rounded-lg p-4'>
          <div className='rounded-lg border border-gray-200 bg-white p-4'>
            <div className='flex flex-wrap items-end gap-2'>
              <div className='flex flex-col'>
                <Label htmlFor='q' className='text-xs text-stone-600 mb-1'>
                  Filtrar por nome
                </Label>
                <Input
                  id='q'
                  name='q'
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder='Ex.: Temperatura'
                  className='h-9 w-56'
                />
              </div>
              <div className='flex flex-col'>
                <Label className='text-xs text-stone-600 mb-1'>Itens por página</Label>
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => handlePageSizeChange(Number(value))}
                >
                  <SelectTrigger className='h-9 w-24'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='5'>5</SelectItem>
                    <SelectItem value='10'>10</SelectItem>
                    <SelectItem value='20'>20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Tabela de Parâmetros */}
          <div className='rounded-lg border border-stone-200'>
            <div className='flex items-center justify-between p-4 border-b border-stone-200'>
              <div className='flex items-center gap-3'>
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  ref={(ref) => {
                    if (ref && 'indeterminate' in ref) {
                      ;(ref as any).indeterminate = isIndeterminate
                    }
                  }}
                />
                <h3 className='text-lg font-medium'>
                  Selecionar Parâmetros ({selectedParameters.length} selecionados)
                </h3>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-12' />
                  <TableHead>Nome</TableHead>
                  <TableHead>Unidade</TableHead>
                  <TableHead>Fator</TableHead>
                  <TableHead>Offset</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }, (_, index) => {
                    const skeletonId = `parameter-skeleton-${Date.now()}-${index}`
                    return (
                      <TableRow key={skeletonId}>
                        <TableCell
                          colSpan={6}
                          className='text-center text-stone-500 py-10'
                        >
                          Carregando...
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : parameters.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center text-stone-500 py-10'>
                      Nenhum parâmetro encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  parameters.map((parameter) => {
                    if (!parameter.id) return null

                    const isSelected = selectedParameters.some(
                      (p) => p.id === parameter.id,
                    )
                    const isDisabled = !parameter.isActive

                    return (
                      <TableRow
                        key={parameter.id}
                        className={`${isSelected ? 'bg-primary/5' : ''} ${isDisabled ? 'opacity-50' : ''}`}
                      >
                        <TableCell>
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() =>
                              parameter.id && handleParameterToggle(parameter.id)
                            }
                            disabled={isDisabled}
                          />
                        </TableCell>

                        <TableCell>
                          <div className='flex items-center gap-3'>
                            <MeasurementUnitIcon unit={parameter.unitOfMeasure} />
                            <div className='leading-tight'>
                              <div className='font-medium'>{parameter.name}</div>
                              <div className='text-xs text-stone-500'>
                                Criado em{' '}
                                {new Date(
                                  parameter.createdAt || new Date(),
                                ).toLocaleString('pt-BR')}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className='text-sm text-stone-700'>
                            {parameter.unitOfMeasure}
                          </div>
                        </TableCell>

                        <TableCell className='tabular-nums'>{parameter.factor}</TableCell>

                        <TableCell className='tabular-nums'>{parameter.offset}</TableCell>

                        <TableCell>
                          <StatusPill
                            active={parameter.isActive || false}
                            activeText='Ativo'
                            inactiveText='Inativo'
                          />
                        </TableCell>
                      </TableRow>
                    )
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
          </div>
        </div>
      )}

      {selectedParameters.length > 0 && (
        <div className='space-y-2'>
          <Label>Parâmetros selecionados ({selectedParameters.length})</Label>
          <div className='flex flex-wrap gap-2'>
            {selectedParameters.map((parameter) => (
              <Badge key={parameter.id} className='flex items-center gap-2 pr-2'>
                <span className='text-xs'>{parameter.name}</span>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground'
                  onClick={() => handleRemoveParameter(parameter.id)}
                >
                  <X className='w-3 h-3' />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
