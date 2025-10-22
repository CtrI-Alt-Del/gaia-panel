import { AlertTriangle, AlertCircle, Info, Clock, Activity, MapPin } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/components/card'
import { Badge, type Color } from '@/ui/shadcn/components/badge'
import { Button } from '@/ui/shadcn/components/button'
import type { AlertDto } from '@/core/alerts/dtos'
import { Link } from 'react-router'
import { ROUTES } from '@/core/global/constants/routes'

export type LastAlertsViewProps = {
  alerts: AlertDto[]
  isLoading?: boolean
  getSeverityIcon: (severity: string) => string
  getSeverityColor: (severity: string) => Color
  getSeverityLabel: (severity: string) => string
  formatTimeAgo: (date: Date) => string
}

export const LastAlertsView = ({
  alerts,
  isLoading,
  getSeverityIcon,
  getSeverityColor,
  getSeverityLabel,
  formatTimeAgo,
}: LastAlertsViewProps) => {
  const severityStyleByColor = {
    stone: {
      container: 'border-stone-200/80 hover:bg-zinc-50',
      indicator: 'bg-stone-300',
      icon: 'bg-stone-100 text-stone-700',
    },
    blue: {
      container: 'border-blue-200/80 hover:bg-zinc-50',
      indicator: 'bg-blue-400',
      icon: 'bg-blue-100 text-blue-600',
    },
    sky: {
      container: 'border-sky-200/80 hover:bg-zinc-50',
      indicator: 'bg-sky-400',
      icon: 'bg-sky-100 text-sky-600',
    },
    teal: {
      container: 'border-teal-200/80 hover:bg-zinc-50',
      indicator: 'bg-teal-400',
      icon: 'bg-teal-100 text-teal-600',
    },
    green: {
      container: 'border-green-200/80 hover:bg-zinc-50',
      indicator: 'bg-green-400',
      icon: 'bg-green-100 text-green-600',
    },
    yellow: {
      container: 'border-yellow-200/80 hover:bg-zinc-50',
      indicator: 'bg-yellow-400',
      icon: 'bg-yellow-100 text-yellow-600',
    },
    orange: {
      container: 'border-orange-200/80 hover:bg-zinc-50',
      indicator: 'bg-orange-400',
      icon: 'bg-orange-100 text-orange-600',
    },
    red: {
      container: 'border-red-200/80 hover:bg-zinc-50',
      indicator: 'bg-red-400',
      icon: 'bg-red-100 text-red-600',
    },
    violet: {
      container: 'border-violet-200/80 hover:bg-zinc-50',
      indicator: 'bg-violet-400',
      icon: 'bg-violet-100 text-violet-600',
    },
  } satisfies Record<Color, { container: string; indicator: string; icon: string }>

  const renderSeverityIcon = (severity: string) => {
    const iconType = getSeverityIcon(severity)
    switch (iconType) {
      case 'AlertCircle':
        return <AlertCircle className='h-5 w-5' />
      case 'AlertTriangle':
        return <AlertTriangle className='h-5 w-5' />
      default:
        return <Info className='h-5 w-5' />
    }
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-lg font-semibold'>
          Alertas Recentes (Últimas 24h)
        </CardTitle>
        <Button asChild variant='ghost' size='sm' className='text-primary'>
          <Link to={ROUTES.alerts}>Ver Todos</Link>
        </Button>
      </CardHeader>
      <CardContent className='space-y-4'>
        {isLoading ? (
          <div className='text-center py-8'>
            <div className='text-muted-foreground'>Carregando alertas...</div>
          </div>
        ) : alerts.length === 0 ? (
          <p className='text-muted-foreground text-center py-8'>
            Nenhum alerta encontrado nas últimas 24 horas
          </p>
        ) : (
          <ul className='flex flex-col gap-3'>
            {alerts.map((alert) => {
              const severityColor = getSeverityColor(alert.level)
              const severityStyle = severityStyleByColor[severityColor]
              const severityLabel = getSeverityLabel(alert.level)

              return (
                <li
                  key={alert.id}
                  className={`group relative overflow-hidden rounded-2xl border px-4 py-4 transition-colors ${severityStyle.container}`}
                >
                  <span
                    aria-hidden
                    className={`absolute left-1 top-3 h-[calc(100%-1.5rem)] w-1 rounded-full ${severityStyle.indicator}`}
                  />

                  <div className='flex items-start gap-4 pl-3'>
                    <div
                      className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full transition-colors ${severityStyle.icon}`}
                    >
                      {renderSeverityIcon(alert.level)}
                    </div>

                    <div className='flex-1 space-y-2'>
                      <div className='flex flex-wrap items-center justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                          <h4 className='text-sm font-semibold leading-tight text-foreground'>
                            {alert.message}
                          </h4>
                          {!alert.isRead && (
                            <span className='h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/20' />
                          )}
                        </div>
                        <Badge
                          color={severityColor}
                          tone='solid'
                          className='uppercase tracking-wide'
                        >
                          {severityLabel}
                        </Badge>
                      </div>

                      <div className='flex flex-wrap items-center gap-3 text-xs text-muted-foreground'>
                        <span className='flex items-center gap-1'>
                          <MapPin className='h-3.5 w-3.5' />
                          {alert.parameterStationName}
                        </span>
                        <span className='flex items-center gap-1 text-foreground'>
                          <Activity className='h-3.5 w-3.5 text-muted-foreground' />
                          <span className='font-medium'>{alert.parameterName}</span>
                          <Badge
                            tone='outline'
                            color={severityColor}
                            className='text-[10px] font-semibold tracking-wide'
                          >
                            {alert.measurementValue} {alert.parameterUnitOfMeasure}
                          </Badge>
                        </span>
                      </div>

                      <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                        <Clock className='h-3.5 w-3.5' />
                        {formatTimeAgo(alert.createdAt)}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
