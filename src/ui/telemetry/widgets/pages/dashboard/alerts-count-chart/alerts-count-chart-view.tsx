import { useCallback, useId, useMemo, type CSSProperties } from 'react'
import { TrendingUp } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/shadcn/components/card'
import type { AlertEvolutionData, AlertEvolutionType } from './use-alerts-count-chart'
import { useDateTimeProvider } from '@/ui/global/hooks'

type TooltipProps = {
  active: boolean
  payload: any[]
  label: string | number | undefined
}

type Props = {
  data: AlertEvolutionData[]
  type: AlertEvolutionType
  setType: (type: AlertEvolutionType) => void
}

const chartConfig = {
  warning: {
    label: 'Avisos',
    color: '#EAB308',
  },
  critical: {
    label: 'Críticos',
    color: '#DC2626',
  },
} as const

type ChartKey = keyof typeof chartConfig

const timeTypeLabel: Record<AlertEvolutionType, string> = {
  week: 'Últimos 7 dias',
  month: 'Últimos 12 meses',
}

export const AlertsCountChartView = ({ data, type, setType }: Props) => {
  const baseGradientId = useId().replace(/:/g, '')
  const warningGradientId = `${baseGradientId}-warning`
  const criticalGradientId = `${baseGradientId}-critical`
  const { localizeDate, formatDate } = useDateTimeProvider()

  const formatPeriodLabel = useCallback(
    (value: string | number) => {
      const raw = typeof value === 'number' ? new Date(value) : new Date(String(value))
      const isValidDate = !Number.isNaN(raw.getTime())

      if (!isValidDate) {
        return String(value)
      }

      const options: Intl.DateTimeFormatOptions =
        type === 'week'
          ? {
              day: '2-digit',
              month: '2-digit',
            }
          : {
              month: 'short',
            }

      return raw.toLocaleDateString('pt-BR', options)
    },
    [type],
  )

  const totals = useMemo(() => data.map((item) => item.critical + item.warning), [data])

  const { trendLabel, isPositive } = useMemo(() => {
    if (totals.length < 2) {
      return {
        trendLabel: 'Sem dados suficientes',
        isPositive: true,
      }
    }

    const previous = totals.at(-2) ?? 0
    const current = totals.at(-1) ?? 0

    if (previous === 0) {
      if (current === 0) {
        return {
          trendLabel: 'Sem variação',
          isPositive: true,
        }
      }

      return {
        trendLabel: '+100%',
        isPositive: true,
      }
    }

    const variation = ((current - previous) / previous) * 100
    const formatted = `${variation >= 0 ? '+' : ''}${variation.toFixed(1)}%`

    return {
      trendLabel: formatted,
      isPositive: variation >= 0,
    }
  }, [totals])

  const chartStyle = useMemo(
    () =>
      ({
        '--color-warning': chartConfig.warning.color,
        '--color-critical': chartConfig.critical.color,
      }) as CSSProperties,
    [],
  )

  const renderTooltip = useCallback(
    (props: TooltipProps | null) => {
      if (!props?.active || !props?.payload?.length) return null

      return (
        <div className='bg-background/95 text-foreground rounded-lg border p-3 shadow-md'>
          <div className='text-sm font-medium mb-2'>
            {props?.label != null ? formatPeriodLabel(props.label) : '—'}
          </div>
          <div className='flex flex-col gap-2'>
            {props?.payload.map((entry) => {
              const key = entry.dataKey as ChartKey
              const config = chartConfig[key]

              if (!config) return null

              return (
                <div key={entry.dataKey} className='flex items-center gap-2 text-sm'>
                  <span
                    className='h-2 w-2 rounded-full'
                    style={{ backgroundColor: config.color }}
                  />
                  <span>{config.label}</span>
                  <span className='ml-auto font-semibold'>{entry.value ?? 0}</span>
                </div>
              )
            })}
          </div>
        </div>
      )
    },
    [formatPeriodLabel],
  )

  return (
    <Card className='w-full h-[430px]'>
      <CardHeader>
        <CardTitle>Histórico e Evolução de Alertas</CardTitle>
        <CardDescription>{timeTypeLabel[type]}</CardDescription>
        <CardAction>
          <div className='flex rounded-lg border p-1 text-sm'>
            {(['week', 'month'] as AlertEvolutionType[]).map((option) => (
              <button
                key={option}
                type='button'
                onClick={() => setType(option)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  option === type
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {option === 'week' ? 'Dias da Semana' : 'Meses do Ano'}
              </button>
            ))}
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className='w-full h-60' style={chartStyle}>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={data}
              margin={{
                top: 12,
                right: 12,
                left: -10,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray='3 3' />
              <XAxis
                dataKey='period'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => formatDate(localizeDate(value)).slice(0, 5)}
                minTickGap={16}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={5}
                width={48}
                domain={[
                  0,
                  (dataMax: number) => {
                    if (!Number.isFinite(dataMax)) return 0
                    return Math.ceil(Math.max(dataMax, 0) * 1.1)
                  },
                ]}
                tickFormatter={(value) =>
                  Number.isFinite(value)
                    ? Math.max(value, 0).toLocaleString('pt-BR')
                    : String(value)
                }
              />
              <Tooltip
                cursor={false}
                content={({ active, payload, label }) =>
                  renderTooltip({ active, payload, label })
                }
              />
              <defs>
                <linearGradient id={warningGradientId} x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='var(--color-warning)' stopOpacity={0.4} />
                  <stop
                    offset='95%'
                    stopColor='var(--color-warning)'
                    stopOpacity={0.05}
                  />
                </linearGradient>
                <linearGradient id={criticalGradientId} x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='var(--color-critical)' stopOpacity={0.4} />
                  <stop
                    offset='95%'
                    stopColor='var(--color-critical)'
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey='warning'
                type='natural'
                name={chartConfig.warning.label}
                fill={`url(#${warningGradientId})`}
                stroke='var(--color-warning)'
                strokeWidth={2}
                stackId='alerts'
                dot={{ strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Area
                dataKey='critical'
                type='natural'
                name={chartConfig.critical.label}
                fill={`url(#${criticalGradientId})`}
                stroke='var(--color-critical)'
                strokeWidth={2}
                stackId='alerts'
                dot={{ strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className='flex w-full flex-col gap-2 text-sm'>
          <div
            className={`flex items-center gap-2 font-medium ${
              isPositive ? 'text-emerald-500' : 'text-destructive'
            }`}
          >
            Tendência de {trendLabel}{' '}
            <TrendingUp className={`h-4 w-4 ${isPositive ? '' : 'rotate-180'}`} />
          </div>
          <div className='text-muted-foreground leading-none'>{timeTypeLabel[type]}</div>
        </div>
      </CardFooter>
    </Card>
  )
}
