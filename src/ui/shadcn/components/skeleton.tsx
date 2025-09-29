import { cn } from '@/ui/shadcn/utils/index'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      data-testid='skeleton'
      className={cn('bg-gray-300 animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }
