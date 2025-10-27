export type DatetimeProvider = {
  formatRelativeTime: (date?: Date) => string
  formatDateTime: (date?: Date) => string
  formatDate: (date?: Date) => string
  localizeDate: (date: Date) => Date
}
