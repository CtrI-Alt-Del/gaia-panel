import { Avatar, AvatarFallback } from '@/ui/shadcn/components/avatar'

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export type UserAvatarViewProps = {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fallbackClassName?: string
}

const sizeClasses = {
  sm: 'size-8',
  md: 'size-9',
  lg: 'size-12',
}

export const UserAvatarView = ({
  name,
  size = 'md',
  className = '',
  fallbackClassName = 'bg-gray-300 text-white font-medium',
}: UserAvatarViewProps) => {
  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarFallback className={fallbackClassName}>{getInitials(name)}</AvatarFallback>
    </Avatar>
  )
}
