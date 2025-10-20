import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

export function useFormatDateTime() {
  const formatDateTime = (
    date: Date | string | null | undefined,
    locale: string = 'pt-BR',
  ) => {
    if (!date) {
      return { formattedDate: '', formattedTime: '' }
    }

    const d = dayjs(date).locale(locale.toLowerCase())

    return {
      formattedDate: d.format('L'),
      formattedTime: d.format('HH:mm'),
    }
  }

  return {
    formatDateTime,
  }
}
