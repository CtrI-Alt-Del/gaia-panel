import { Skeleton } from '@/ui/shadcn/components/skeleton'
import { TableRow, TableCell } from '@/ui/shadcn/components/table'

export type Props = {
  className?: string
}

export const AlarmTableSkeletonView = ({ className = '' }: Props) => {
  return (
    <TableRow className={className}>
      <TableCell>
        <div className='flex items-center gap-3'>
          <Skeleton className='h-6 w-6 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-32' />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-48' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-24' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-20' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-16' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-6 w-16 rounded-full' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-24' />
      </TableCell>
      <TableCell className='text-center'>
        <div className='flex gap-2 justify-center'>
          <Skeleton className='h-8 w-8 rounded-full' />
          <Skeleton className='h-8 w-8 rounded-full' />
        </div>
      </TableCell>
    </TableRow>
  )
}
