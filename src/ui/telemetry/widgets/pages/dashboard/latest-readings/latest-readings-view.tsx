import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/components/card'
import { Badge } from '@/ui/shadcn/components/badge'
import { Button } from '@/ui/shadcn/components/button'
import { Eye } from 'lucide-react'
import type { DashboardStatsDto } from '@/core/telemetry/dtos'
import { useLatestReadings } from './use-latest-readings'

export interface LatestReadingsViewProps {
  readings: DashboardStatsDto['latestReadings']
  isLoading?: boolean
}

export const LatestReadingsView = ({ readings, isLoading }: LatestReadingsViewProps) => {
  const { getStatusColor, getStatusLabel, formatTimeAgo } = useLatestReadings()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-bold">Últimas Leituras</CardTitle>
        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
          Ver Mais
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-600 pb-2 border-b">
            <div>CÓDIGO</div>
            <div>NOME</div>
            <div>STATUS</div>
            <div>ÚLTIMA LEITURA</div>
            <div>AÇÃO</div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">Carregando...</div>
            </div>
          ) : readings.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">Nenhuma leitura encontrada</div>
            </div>
          ) : (
            readings.map((reading) => (
              <div key={reading.code} className="grid grid-cols-5 gap-4 items-center py-2">
                <div className="font-mono text-sm">{reading.code}</div>
                <div className="text-sm">{reading.name}</div>
                <div>
                  <Badge color={getStatusColor(reading.status) as any}>
                    {getStatusLabel(reading.status)}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  {formatTimeAgo(reading.lastReading)}
                </div>
                <div>
                  <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
