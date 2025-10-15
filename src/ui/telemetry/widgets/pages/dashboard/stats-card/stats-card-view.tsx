import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/components/card'
import { cn } from '@/ui/shadcn/utils'

export type StatsCardViewProps = {
  title: string
  value: string
  icon: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'destructive'
}

export const StatsCardView = ({ title, value, icon, variant = 'default' }: StatsCardViewProps) => {
  const variantStyles = {
    default: 'text-primary',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    destructive: 'text-red-600',
  }

  const variantBgStyles = {
    default: 'bg-primary/10',
    success: 'bg-green-100',
    warning: 'bg-yellow-100',
    destructive: 'bg-red-100',
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        <div className={cn('p-2 rounded-md flex justify-center items-center', variantBgStyles[variant])}>
          <div className={cn('w-6 h-6 flex justify-center items-center', variantStyles[variant])}>
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn('text-4xl font-bold', variantStyles[variant])}>
          {value}
        </div>
      </CardContent>
    </Card>
  )
}
