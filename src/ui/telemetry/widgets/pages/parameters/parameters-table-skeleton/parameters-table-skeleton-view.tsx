import { Skeleton } from '@/ui/shadcn/components/skeleton'
import { TableRow, TableCell } from '@/ui/shadcn/components/table'

export type Props = {
  className?: string
  isAuthenticated?: boolean
}

export const ParametersTableSkeletonView = ({ className = '', isAuthenticated = false }: Props) => {
  return (
    <TableRow className={className}>
      <TableCell className='pl-6'>
        <div className='flex items-center gap-3'>
          <Skeleton className='h-6 w-6 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-3 w-24' />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-16' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-12' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-12' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-6 w-16 rounded-full' />
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
