

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/components/card'
import type { AlertEvolutionData, AlertEvolutionType } from './use-alerts-evolution'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface AlertsEvolutionViewProps {
  data: AlertEvolutionData[]
  type: AlertEvolutionType
  setType: (type: AlertEvolutionType) => void
}

export const AlertsEvolutionView = ({ data, type, setType }: AlertsEvolutionViewProps) => {
  const subtitle = type === 'week' ? 'Últimos 7 dias' : 'Últimos 12 meses'
  return (
    <Card className='w-full h-[430px]'>
      <CardHeader>
        <CardTitle>Histórico e Evolução dos Alertas</CardTitle>
        <div className='flex gap-2 mt-2'>
          <button
            className={`px-3 py-1 rounded ${type === 'week' ? 'bg-primary text-white' : 'bg-muted'}`}
            onClick={() => setType('week')}
          >
            Dias da Semana
          </button>
          <button
            className={`px-3 py-1 rounded ${type === 'month' ? 'bg-primary text-white' : 'bg-muted'}`}
            onClick={() => setType('month')}
          >
            Meses do Ano
          </button>
        </div>
        <div className='text-muted-foreground text-sm mt-1'>{subtitle}</div>
      </CardHeader>
      <CardContent>
        <div className='w-full h-64'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={data} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} strokeDasharray='3 3' />
              <XAxis
                dataKey='period'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Tooltip />
              <Line type='natural' dataKey='critical' stroke='#ef4444' name='Críticos' strokeWidth={2} dot={false} />
              <Line type='natural' dataKey='warning' stroke='#f59e0b' name='Avisos' strokeWidth={2} dot={false} />
              <Line type='natural' dataKey='info' stroke='#3b82f6' name='Info' strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
