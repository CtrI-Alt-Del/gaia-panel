import { useUrl } from '@/ui/global/hooks/use-url'
import { PaginationControlView } from './pagination-control-view'

export type PaginationControlProps = {
  previousCursor: string | null
  nextCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  className?: string
}

export const PaginationControl = ({
  previousCursor,
  nextCursor,
  hasNextPage,
  hasPreviousPage,
  className,
}: PaginationControlProps) => {
  const { buildUrl } = useUrl()

  return (
    <PaginationControlView
      previousCursor={previousCursor}
      nextCursor={nextCursor}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      onbuildUrl={buildUrl}
      className={className}
    />
  )
}
