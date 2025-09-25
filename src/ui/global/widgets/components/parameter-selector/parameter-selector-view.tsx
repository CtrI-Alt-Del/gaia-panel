import { useState } from 'react'
import { Button } from '@/ui/shadcn/components/button'
import { Input } from '@/ui/shadcn/components/input'
import { Label } from '@/ui/shadcn/components/label'
import { Badge } from '@/ui/shadcn/components/badge'
import { Search, X, Check } from 'lucide-react'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'

type ParameterSelectorViewProps = {
  availableParameters: ParameterDto[] | undefined
  selectedParameterIds: string[]
  onSelectionChange: (parameterIds: string[]) => void
  className?: string
}

export const ParameterSelectorView = ({
  availableParameters,
  selectedParameterIds,
  onSelectionChange,
  className = '',
}: ParameterSelectorViewProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  // Ensure availableParameters is always an array
  const parametersArray = Array.isArray(availableParameters) ? availableParameters : []

  const filteredParameters = parametersArray.filter(parameter =>
    parameter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parameter.unitOfMeasure.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleParameterToggle = (parameterId: string | undefined) => {
    if (!parameterId) return

    const isSelected = selectedParameterIds.includes(parameterId)

    if (isSelected) {
      onSelectionChange(selectedParameterIds.filter(id => id !== parameterId))
    } else {
      onSelectionChange([...selectedParameterIds, parameterId])
    }
  }

  const handleRemoveParameter = (parameterId: string | undefined) => {
    if (!parameterId) return
    onSelectionChange(selectedParameterIds.filter(id => id !== parameterId))
  }

  const selectedParameters = parametersArray.filter(parameter =>
    parameter.id && selectedParameterIds.includes(parameter.id)
  )

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Campo de busca */}
      <div className="space-y-2">
        <Label htmlFor="parameter-search">Buscar parâmetros</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="parameter-search"
            placeholder="Digite para buscar parâmetros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Lista de parâmetros disponíveis */}
      <div className="space-y-2">
        <Label>Parâmetros disponíveis</Label>
        <div className="max-h-48 overflow-y-auto border rounded-lg">
          {filteredParameters.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              {searchTerm ? 'Nenhum parâmetro encontrado' : 'Nenhum parâmetro disponível'}
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {filteredParameters.map((parameter) => {
                const isSelected = parameter.id ? selectedParameterIds.includes(parameter.id) : false
                return (
                  <button
                    key={parameter.id}
                    type="button"
                    className={`w-full flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors text-left ${isSelected
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-muted/50'
                      }`}
                    onClick={() => handleParameterToggle(parameter.id)}
                  >
                    <div className="flex-shrink-0">
                      {isSelected ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <div className="w-4 h-4 border border-muted-foreground rounded" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{parameter.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {parameter.unitOfMeasure}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Parâmetros selecionados */}
      {selectedParameters.length > 0 && (
        <div className="space-y-2">
          <Label>Parâmetros selecionados ({selectedParameters.length})</Label>
          <div className="flex flex-wrap gap-2">
            {selectedParameters.map((parameter) => (
              <Badge
                key={parameter.id}
                className="flex items-center gap-2 pr-2"
              >
                <span className="text-xs">{parameter.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => handleRemoveParameter(parameter.id)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Informações */}
      <div className="text-xs text-muted-foreground">
        Selecione os parâmetros que serão monitorados por esta estação
      </div>
    </div>
  )
}
