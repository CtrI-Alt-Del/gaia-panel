import { PageSizeSelectView } from './page-size-select-view'
import { usePageSizeSelect } from './use-page-size-select'

export type PageSizeSelectProps = {
  label: string
  className?: string
  id?: string
  variant?: 'pagination' | 'custom'
}

export const PageSizeSelect = ({
  label,
  className,
  id,
  variant = 'pagination',
}: PageSizeSelectProps) => {
  const { value } = usePageSizeSelect()

  return (
    <PageSizeSelectView
      id={id}
      label={label}
      value={value}
      className={className}
      variant={variant}
    />
  )
}

export { usePageSizeSelect }
