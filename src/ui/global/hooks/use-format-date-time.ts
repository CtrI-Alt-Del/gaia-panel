import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

export function useFormatDateTime() {
  const formatDateTime = (date: Date | string | null | undefined) => {
    if (!date) {
      return { formattedDate: '', formattedTime: '' }
    }

    const d = dayjs(date).locale('pt-br')

    return {
      formattedDate: d.format('DD/MM/YYYY'),
      formattedTime: d.format('HH:mm'),
    }
  }

  return {
    formatDateTime,
  }
}
