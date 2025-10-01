import { Skeleton } from '@/ui/shadcn/components/skeleton'
import { TableRow, TableCell } from '@/ui/shadcn/components/table'

export type Props = {
  className?: string
  isAuthenticated?: boolean
}

export const StationsTableSkeletonView = ({ className = '', isAuthenticated = false }: Props) => {
  return (
    <TableRow className={className}>
      <TableCell className='pl-6'>
        <Skeleton className='h-4 w-16' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-32' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-28' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-24' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-6 w-16 rounded-full' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-20' />
      </TableCell>
      {isAuthenticated && (
        <TableCell className='text-center'>
          <div className='flex gap-2 justify-center'>
            <Skeleton className='h-8 w-8 rounded-full' />
            <Skeleton className='h-8 w-8 rounded-full' />
          </div>
        </TableCell>
      )}
    </TableRow>
  )
}
