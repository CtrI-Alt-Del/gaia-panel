import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

import type { DatetimeProvider } from '@/core/global/interfaces'

// Configure dayjs
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function useDateTimeProvider(): DatetimeProvider {
  function formatRelativeTime(date?: Date): string {
    if (!date) return 'Nunca'

    const now = dayjs()
    const targetDate = dayjs(date)
    const diffInMinutes = now.diff(targetDate, 'minute')

    if (diffInMinutes < 1) return 'Agora mesmo'
    if (diffInMinutes === 1) return '1 minuto atrás'
    if (diffInMinutes < 60) return `${diffInMinutes} minutos atrás`

    const diffInHours = now.diff(targetDate, 'hour')
    if (diffInHours === 1) return '1 hora atrás'
    if (diffInHours < 24) return `${diffInHours} horas atrás`

    const diffInDays = now.diff(targetDate, 'day')
    if (diffInDays === 1) return '1 dia atrás'
    return `${diffInDays} dias atrás`
  }

  return {
    formatRelativeTime,
  }
}
