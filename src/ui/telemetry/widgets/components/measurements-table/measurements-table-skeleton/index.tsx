import { TableRow, TableCell } from '@/ui/shadcn/components/table'
import { Skeleton } from '@/ui/shadcn/components/skeleton'

type Props = {
  hasStation?: boolean
}

export const MeasurementsTableSkeleton = ({ hasStation }: Props) => {
  return (
    <TableRow>
      {hasStation && (
        <TableCell className='pl-6'>
          <Skeleton className='h-4 w-32' />
        </TableCell>
      )}
      <TableCell className='pl-6'>
        <Skeleton className='h-4 w-32' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-24' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-20' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-40' />
      </TableCell>
    </TableRow>
  )
}
