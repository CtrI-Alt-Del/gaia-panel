import { StatusSelectView } from './status-select-view'
import { useStatusSelect } from './use-status-select'

export type StatusSelectProps = {
  className?: string
  id?: string
}

export const StatusSelect = ({ className, id }: StatusSelectProps) => {
  const { value } = useStatusSelect()

  return <StatusSelectView id={id} value={value} className={className} />
}
