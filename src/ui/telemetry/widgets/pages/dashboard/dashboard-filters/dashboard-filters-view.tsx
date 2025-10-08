import { Form } from 'react-router'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/shadcn/components/select'
import { Card, CardContent } from '@/ui/shadcn/components/card'
import { useDashboardFilters } from './use-dashboard-filters'

export interface DashboardFiltersViewProps {
  selectedStation?: string | null
  selectedPeriod: string
  selectedParameter: string
  onStationChange?: (station: string) => void
  onPeriodChange?: (period: string) => void
  onParameterChange?: (parameter: string) => void
}

export const DashboardFiltersView = ({
  selectedStation,
  selectedPeriod,
  selectedParameter,
  onStationChange,
  onPeriodChange,
  onParameterChange,
}: DashboardFiltersViewProps) => {
  useDashboardFilters()

  return (
    <Card>
      <CardContent className="p-4">
        <Form
          preventScrollReset
          method='get'
          className='flex flex-wrap items-center gap-4'
        >
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Estação:</label>
            <Select 
              value={selectedStation || 'all'} 
              onValueChange={onStationChange}
              name="station"
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todas as Estações" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Estações</SelectItem>
                <SelectItem value="001">São Paulo Central</SelectItem>
                <SelectItem value="045">Rio Sul</SelectItem>
                <SelectItem value="023">Brasília Norte</SelectItem>
                <SelectItem value="089">Belo Horizonte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Período:</label>
            <Select 
              value={selectedPeriod} 
              onValueChange={onPeriodChange}
              name="period"
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 dia</SelectItem>
                <SelectItem value="7">7 dias</SelectItem>
                <SelectItem value="30">30 dias</SelectItem>
                <SelectItem value="90">90 dias</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Parâmetro:</label>
            <Select 
              value={selectedParameter} 
              onValueChange={onParameterChange}
              name="parameter"
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="temperature">Temperatura</SelectItem>
                <SelectItem value="humidity">Umidade</SelectItem>
                <SelectItem value="pressure">Pressão</SelectItem>
                <SelectItem value="air_quality">Qualidade do Ar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}
