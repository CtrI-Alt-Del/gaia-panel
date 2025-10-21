import type { LucideIcon } from 'lucide-react'
import {
  AlertCircle,
  AlertTriangle,
  Bell,
} from 'lucide-react'

import type { AlertDto } from '@/core/alerts/dtos'
import { Badge } from '@/ui/shadcn/components/badge'
import { Button } from '@/ui/shadcn/components/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui/shadcn/components/popover'
import { Separator } from '@/ui/shadcn/components/separator'
import { cn } from '@/ui/shadcn/utils'
import { useDateTimeProvider } from '@/ui/global/hooks'
import { Link } from 'react-router'
import { ROUTES } from '@/core/global/constants/routes'
import { MeasurementUnitIcon } from '../../components/measurement-unit-icon'


type Props = {
  alerts: AlertDto[]
  newAlertCount: number
}

export const AlertsPopoverView = ({ alerts, newAlertCount }: Props) => {
  const { formatDateTime } = useDateTimeProvider()
  const hasAlerts = alerts.length > 0
  const newAlertsBadgeLabel = hasAlerts ? `${newAlertCount} novos` : 'Sem novos'
  const newAlertsBadgeColor = hasAlerts ? 'red' : 'stone'
  const newAlertsBadgeTone = hasAlerts ? 'solid' : 'soft'

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size='icon'
          variant='outline'
          aria-label='Abrir alertas meteorológicos'
          className='relative rounded-full border-border bg-card text-foreground shadow-xs hover:bg-card/80'
        >
          <Bell className='size-5' />
          <span className='absolute -right-1.5 -top-1.5 flex h-5 min-w-[1.5rem] items-center justify-center rounded-full bg-[var(--destructive)] px-1 text-xs font-semibold text-[var(--destructive-foreground)] shadow-md'>
            {newAlertCount}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align='end'
        sideOffset={12}
        className='w-[360px] rounded-3xl border border-border bg-popover p-0 text-popover-foreground shadow-xl'
      >
        <header className='flex items-start justify-between gap-3 rounded-t-3xl border-b border-border bg-card px-5 py-4'>
          <div className='space-y-1'>
            <p className='text-sm font-semibold tracking-tight text-foreground'>
              Alertas Meteorológicos
            </p>
            <p className='text-xs text-muted-foreground'>Monitoramento em tempo real</p>
          </div>
          <Badge
            color={newAlertsBadgeColor}
            tone={newAlertsBadgeTone}
            className='rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide'
          >
            {newAlertsBadgeLabel}
          </Badge>
        </header>

        <div className='max-h-[420px] space-y-2 overflow-y-auto px-4 py-3'>
          {hasAlerts ? (
            alerts.map((alert, index) => {
              return (
                <article
                  key={`${alert.parameterStationName}-${alert.parameterName}-${alert.createdAt}-${index}`}
                  className={cn(
                    'rounded-2xl border border-transparent bg-card/60 px-4 py-3 transition-colors hover:border-border hover:bg-card/80',
                  )}
                >
                  <div className='flex items-center justify-between gap-3'>
                    <Badge
                      color={alert.level === 'danger' ? 'red' : 'yellow'}
                      tone='soft'
                      className='rounded-full px-2.5 py-1 text-xs tracking-wide'
                    >
                       {alert.level === 'critical' ? (
                      <>
                        <AlertTriangle className='w-3 h-3' />
                        Crítico
                      </>
                    ) : (
                      <>
                        <AlertCircle className='w-3 h-3' />
                        Aviso
                      </>
                    )}
                    </Badge>
                    <span className='text-xs font-medium text-muted-foreground'>{formatDateTime(alert.createdAt)}</span>
                  </div>

                  <Separator className='my-3 opacity-50' />

                  <div className='flex items-start gap-3'>
                    <span
                      className={cn(
                        'mt-0.5 flex size-12 items-center justify-center rounded-full',
                      )}
                    >
                     <MeasurementUnitIcon unit={alert.parameterUnitOfMeasure.toLowerCase()} className='size-10' />
                    </span>

                    <div className='space-y-1'>
                      <h3 className='text-sm font-semibold text-foreground'>
                        {alert.parameterName || 'Alerta Meteorológico'}
                      </h3>
                      {alert.message ? (
                        <p className='text-sm text-muted-foreground'>{alert.message}</p>
                      ) : null}
                    </div>
                  </div>
                </article>
              )
            })
          ) : (
            <div className='flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/70 bg-card/40 px-6 py-10 text-center'>
              <Bell className='size-8 text-muted-foreground' aria-hidden='true' />
              <div className='space-y-1'>
                <p className='text-sm font-semibold text-foreground'>Sem alertas no momento</p>
                <p className='text-xs text-muted-foreground'>
                  Os alertas meteorológicos recentes vão aparecer aqui.
                </p>
              </div>
            </div>
          )}
        </div>

        <footer className='flex items-center justify-between gap-3 rounded-b-3xl border-t border-border bg-card px-5 py-3 text-xs text-muted-foreground'>
          <div className='flex items-center gap-2'>
            <AlertTriangle className='size-6 text-muted-foreground' aria-hidden='true' />
            <span>Dados fornecidos pelo monitoramento em tempo real</span>
          </div>
          <Button
            variant='ghost'
            size='sm'
            className='h-8 rounded-full px-3 text-xs font-semibold text-foreground'
            asChild
          >
            <Link to={ROUTES.alerts}>Ver tudo</Link>
          </Button>
        </footer>
      </PopoverContent>
    </Popover>
  )
}
